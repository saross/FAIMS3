/* eslint-disable n/no-process-exit */
/**
 * seedDocsDataset.ts
 *
 * Idempotent documentation-data seed script.
 *
 * Creates (or restores) a deterministic, documentation-grade dataset in the
 * configured CouchDB instance, so that screenshot capture runs (and anyone
 * standing up a demo instance) see content that looks like real fieldwork
 * rather than test fixtures. The script:
 *
 *   1. Ensures databases / design docs are initialised (does not wipe data).
 *   2. Upserts one team: "Fieldmark Demo Team" (stable ID).
 *   3. Upserts eleven background notebooks with plausible archaeological and
 *      ecological names, descriptions, and fixed creation timestamps, so the
 *      notebook list renders a populated first page plus pagination
 *      ("Page 1 of 2" at ten rows per page) with stable dates across re-runs.
 *   4. Upserts three pre-verified local-auth users (passwords set at
 *      creation, so automated capture can authenticate):
 *        - a team-admin capture account (the persona documentation
 *          screenshots are taken as — deliberately NOT a global admin, so
 *          the sidebar matches what a typical project lead sees),
 *        - a team-manager who appears as the creator of the background
 *          notebooks,
 *        - an operations admin for instance administration (never appears
 *          in screenshots).
 *
 * Differences from seedTestDataset.ts (which remains the seed for e2e
 * permission testing): this seed optimises for how the data LOOKS in
 * documentation screenshots — plausible names, descriptions on every row,
 * fixed timestamps — not for covering the role matrix.
 *
 * Usage:
 *   env-cmd ts-node src/scripts/seedDocsDataset.ts
 *
 * Environment variables:
 *   DOCS_SEED_PASSWORD   Shared password for the seeded documentation users.
 *                        Defaults to "DocsPassword123!".
 *   DOCS_SEED_NOTEBOOK   Path to the notebook JSON file used as the
 *                        uiSpecification for the background notebooks.
 *                        Defaults to "./notebooks/sample_notebook.json".
 *
 * Safe to re-run: seeded entities are restored to the intended state via
 * stable document IDs. Only these canonical seed documents and seed persona
 * emails are created or updated; nothing is deleted.
 */

import {
  addGlobalRole,
  addTeamRole,
  ExistingPeopleDBDocument,
  ExistingProjectDocument,
  ExistingTeamsDBDocument,
  PeopleDBDocument,
  ProjectDocument,
  ProjectStatus,
  Role,
  ROOT_DESCRIPTION_MAX_LENGTH,
  normalizeRootDescriptionForStore,
  safeWriteDocument,
} from '@faims3/data-model';
import {readFileSync} from 'fs';
import {addLocalPasswordForUser} from '../auth/helpers';
import {
  getTeamsDB,
  initialiseAndMigrateDBs,
  initialiseDataDb,
  localGetProjectsDb,
} from '../couchdb';
import {
  getProjectById,
  normalizeUiSpecificationOrThrow,
} from '../couchdb/notebooks';
import {
  createUser,
  getCouchUserFromEmailOrUserId,
  saveCouchUser,
} from '../couchdb/users';
import * as Exceptions from '../exceptions';

// ──────────────────────────────────────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────────────────────────────────────

const SEED_PASSWORD = process.env.DOCS_SEED_PASSWORD || 'DocsPassword123!';

const NOTEBOOK_PATH =
  process.env.DOCS_SEED_NOTEBOOK || './notebooks/sample_notebook.json';

/**
 * The identity shown in the "Created by" column for background notebooks.
 * Matches the team-manager persona seeded below.
 */
const CREATOR_EMAIL = 'sam.nguyen@fieldmark.test';

/** Stable document IDs so re-runs update in place instead of minting duplicates. */
const TEAM_ID = 'team_docs_demo';
const NOTEBOOK_ID_PREFIX = 'notebook_docs_';

/**
 * Canonical seed week (fixed, in the past) so creation timestamps — visible
 * in the notebook list's "Created" column — are identical across re-runs
 * and across machines. Any notebook created live during a capture run is
 * dated "now", so it always sorts above these under the default
 * newest-first ordering.
 */
const SEED_WEEK_BASE_UTC = Date.UTC(2026, 6, 6, 9, 0, 0); // Mon 2026-07-06 09:00Z

/** Deterministic per-notebook timestamp: three per day, 09:00/12:00/15:00. */
function notebookCreatedAtIso(index: number): string {
  const day = Math.floor(index / 3); // 0-based day offset from the Monday
  const hour = (index % 3) * 3; // 0, 3, 6 hours after the 09:00 base
  const ms = SEED_WEEK_BASE_UTC + day * 24 * 3600 * 1000 + hour * 3600 * 1000;
  return new Date(ms).toISOString();
}

/**
 * Background notebooks: plausible fieldwork projects that make the notebook
 * list look like a working installation. These are scenery — documentation
 * walkthroughs never open them — so they all share one uiSpecification.
 * Eleven rows guarantees pagination ("Page 1 of 2") before the tutorial's
 * own notebook is created.
 */
const BACKGROUND_NOTEBOOKS: Array<{name: string; description: string}> = [
  {
    name: 'Ridgeline Transect Survey',
    description:
      'Systematic transect recording of surface artefact scatters along the eastern ridgeline.',
  },
  {
    name: 'Harbourside Heritage Audit',
    description:
      'Condition assessment of heritage-listed structures in the harbourside precinct.',
  },
  {
    name: 'Wetland Bird Census',
    description:
      'Seasonal waterbird counts across the northern wetland monitoring sites.',
  },
  {
    name: 'Cemetery Headstone Recording',
    description:
      'Photographic and inscription record of monuments in the old cemetery.',
  },
  {
    name: 'Campus Tree Inventory',
    description:
      'Species, girth, and condition data for street and campus trees.',
  },
  {
    name: 'Rock Art Condition Monitoring',
    description:
      'Repeat monitoring of pigment condition and visitor impacts at gallery sites.',
  },
  {
    name: 'Creekline Erosion Survey',
    description: 'Gully and bank erosion observations following storm events.',
  },
  {
    name: 'Historic Farmstead Recording',
    description:
      'Building fabric and artefact scatter recording at the farmstead complex.',
  },
  {
    name: 'Intertidal Biodiversity Survey',
    description:
      'Quadrat-based intertidal species counts at rocky shore sites.',
  },
  {
    name: 'Excavation Context Register',
    description:
      'Context sheets and stratigraphic relationships for the test excavation.',
  },
  {
    name: 'Soil Profile Descriptions',
    description:
      'Field descriptions of soil profiles and horizons for the catchment study.',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

interface UserSpec {
  email: string;
  name: string;
  tag: string; // short identifier for summary output
  /** Global roles to assign (beyond the default GENERAL_USER). */
  globalRoles?: Role[];
  /** Team role to assign on the demo team, if any. */
  teamRole?: Role;
}

/**
 * Documentation persona matrix. All three are pre-verified local-auth
 * accounts with passwords set at creation (SSO accounts cannot be automated
 * and cannot gain a password later).
 */
const USER_SPECS: UserSpec[] = [
  // The capture account: a team admin, NOT a global admin, so screenshots
  // show the sidebar a typical project lead sees (no Users entry).
  {
    email: 'alex.taylor@fieldmark.test',
    name: 'Alex Taylor',
    tag: 'CAPTURE',
    teamRole: Role.TEAM_ADMIN,
  },
  // Creator of the background notebooks (the "Created by" column).
  {
    email: CREATOR_EMAIL,
    name: 'Sam Nguyen',
    tag: 'CREATOR',
    teamRole: Role.TEAM_MANAGER,
  },
  // Instance administration and automation; never appears in screenshots.
  {
    email: 'docs-admin@fieldmark.test',
    name: 'Docs Administrator',
    tag: 'OPS_ADMIN',
    globalRoles: [Role.OPERATIONS_ADMIN],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

interface NotebookSpec {
  name: string;
  uiSpecification: Record<string, unknown>;
}

function loadNotebookJson(path: string): NotebookSpec {
  const raw = readFileSync(path, 'utf-8');
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  if (!parsed.name || !parsed.uiSpecification) {
    throw new Error(
      `Notebook file ${path} is missing required 'name' or 'uiSpecification' fields`
    );
  }
  return parsed as unknown as NotebookSpec;
}

/** Normalise a description for storage, respecting the schema length cap. */
function seedDescription(description: string): string {
  const trimmed = description.trim();
  const clamped =
    trimmed.length > ROOT_DESCRIPTION_MAX_LENGTH
      ? trimmed.slice(0, ROOT_DESCRIPTION_MAX_LENGTH)
      : trimmed;
  return normalizeRootDescriptionForStore(clamped) ?? clamped;
}

function isNotFoundError(error: unknown): boolean {
  if (error instanceof Exceptions.ItemNotFoundException) {
    return true;
  }
  const status = (error as {status?: number} | null)?.status;
  const name = (error as {name?: string} | null)?.name;
  return status === 404 || name === 'not_found';
}

async function upsertDemoTeam(): Promise<ExistingTeamsDBDocument> {
  const teamsDb = getTeamsDB();
  const name = 'Fieldmark Demo Team';
  const description =
    'Demonstration projects for Fieldmark documentation and training.';
  const createdAt = SEED_WEEK_BASE_UTC - 30 * 60 * 1000; // 08:30 on the Monday

  try {
    const existing = await teamsDb.get(TEAM_ID);
    const updated = {
      ...existing,
      name,
      description,
      createdBy: CREATOR_EMAIL,
      createdAt,
      updatedAt: createdAt,
    };
    await safeWriteDocument({db: teamsDb, data: updated});
    console.log(`  ✓ Updated team ${name} : ${TEAM_ID}`);
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
    await teamsDb.put({
      _id: TEAM_ID,
      name,
      description,
      createdAt,
      updatedAt: createdAt,
      createdBy: CREATOR_EMAIL,
    });
    console.log(`  ✓ Created team ${name} : ${TEAM_ID}`);
  }
  return await teamsDb.get(TEAM_ID);
}

async function upsertBackgroundNotebook({
  index,
  name,
  description,
  uiSpecification,
  teamId,
}: {
  index: number;
  name: string;
  description: string;
  uiSpecification: Record<string, unknown>;
  teamId: string;
}): Promise<string> {
  const projectsDb = localGetProjectsDb();
  const normalizedUiSpecification =
    normalizeUiSpecificationOrThrow(uiSpecification);
  const id = `${NOTEBOOK_ID_PREFIX}${String(index + 1).padStart(2, '0')}`;
  const createdAt = notebookCreatedAtIso(index);
  const dataDBName = `data-${id}`;

  let existing: ExistingProjectDocument | undefined;
  try {
    existing = await getProjectById(id);
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
  }

  if (existing) {
    const updated: ProjectDocument = {
      ...existing,
      name: name.trim(),
      description: seedDescription(description),
      ownedByTeamId: teamId,
      createdBy: CREATOR_EMAIL,
      status: ProjectStatus.OPEN,
      uiSpecification: normalizedUiSpecification,
      createdAt,
      updatedAt: createdAt,
      dataDb: existing.dataDb ?? {db_name: dataDBName},
    };
    await safeWriteDocument({db: projectsDb, data: updated});
    await initialiseDataDb({projectId: id, force: true});
    console.log(`  ✓ Updated notebook ${name} : ${id}`);
    return id;
  }

  const projectDoc: ProjectDocument = {
    _id: id,
    name: name.trim(),
    description: seedDescription(description),
    dataDb: {
      db_name: dataDBName,
    },
    status: ProjectStatus.OPEN,
    ownedByTeamId: teamId,
    createdBy: CREATOR_EMAIL,
    createdAt,
    updatedAt: createdAt,
    uiSpecification: normalizedUiSpecification,
  };
  await projectsDb.put(projectDoc);
  await initialiseDataDb({projectId: id, force: true});
  console.log(`  ✓ Created notebook ${name} : ${id}`);
  return id;
}

/**
 * Reset a seed persona to the intended baseline (name, verified email,
 * GENERAL_USER only, no resource roles) before applying UserSpec grants.
 */
function resetSeedUserBaseline(
  user: ExistingPeopleDBDocument | PeopleDBDocument,
  spec: UserSpec
): PeopleDBDocument {
  user.name = spec.name;
  user.disabled = false;
  user.emails = [{email: spec.email.toLowerCase(), verified: true}];
  user.globalRoles = [Role.GENERAL_USER];
  user.teamRoles = [];
  user.projectRoles = [];
  user.templateRoles = [];
  return user;
}

async function upsertSeedUser(
  spec: UserSpec,
  teamId: string
): Promise<PeopleDBDocument> {
  const existing = await getCouchUserFromEmailOrUserId(spec.email);
  let user: PeopleDBDocument;

  if (existing) {
    user = resetSeedUserBaseline(existing, spec);
    console.log(`  ✓ Updated ${spec.email} (${spec.name})`);
  } else {
    const [created, error] = await createUser({
      email: spec.email,
      name: spec.name,
      verified: true,
    });
    if (!created) {
      throw new Error(`Failed to create user ${spec.email}: ${error}`);
    }
    user = created;
    console.log(`  ✓ Created ${spec.email} (${spec.name})`);
  }

  for (const role of spec.globalRoles ?? []) {
    addGlobalRole({user, role});
  }
  if (spec.teamRole) {
    addTeamRole({user, role: spec.teamRole, teamId});
  }

  await saveCouchUser(user);
  await addLocalPasswordForUser(user, SEED_PASSWORD);
  return user;
}

function printSummary(
  teamId: string,
  notebookIds: string[],
  users: Array<{user: PeopleDBDocument; spec: UserSpec}>
): void {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('               DOCS DATASET SEED COMPLETE                   ');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('TEAM');
  console.log(`  Fieldmark Demo Team : ${teamId}`);

  console.log(`\nNOTEBOOKS (${notebookIds.length} background)`);
  for (const [i, id] of notebookIds.entries()) {
    console.log(
      `  ${BACKGROUND_NOTEBOOKS[i].name.padEnd(32)} ${id}  ${notebookCreatedAtIso(i)}`
    );
  }

  console.log('\nUSERS (pre-verified, local-auth)');
  for (const {user, spec} of users) {
    const email = user.emails[0]?.email ?? user._id;
    const role =
      spec.teamRole ?? spec.globalRoles?.join(', ') ?? '(general user)';
    console.log(`  ${email.padEnd(34)} ${spec.name.padEnd(20)} ${role}`);
  }

  console.log(
    '\nCREDENTIALS (all seeded documentation users share this password)'
  );
  console.log(`  Password : ${SEED_PASSWORD}`);

  console.log('\nENV VARS FOR DOCS CAPTURE\n');
  console.log(`DOCS_CAPTURE_USERNAME=${USER_SPECS[0].email}`);
  console.log(`DOCS_CAPTURE_PASSWORD=${SEED_PASSWORD}`);
  console.log('');
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

const main = async () => {
  try {
    // ── Phase 1: Ensure databases / design docs ──────────────────────────────
    console.log(
      'Phase 1: Initialising databases (design docs; data preserved)...'
    );
    await initialiseAndMigrateDBs({force: true, pushKeys: false});
    console.log('✓ Databases initialised');

    // ── Phase 2: Team ─────────────────────────────────────────────────────────
    console.log('\nPhase 2: Upserting team...');
    const team = await upsertDemoTeam();

    // ── Phase 3: Background notebooks ────────────────────────────────────────
    console.log('\nPhase 3: Upserting background notebooks...');
    const notebookSpec = loadNotebookJson(NOTEBOOK_PATH);

    const notebookIds: string[] = [];
    for (const [index, nb] of BACKGROUND_NOTEBOOKS.entries()) {
      const id = await upsertBackgroundNotebook({
        index,
        name: nb.name,
        description: nb.description,
        uiSpecification: notebookSpec.uiSpecification,
        teamId: team._id,
      });
      notebookIds.push(id);
    }

    // ── Phase 4: Users + roles ────────────────────────────────────────────────
    console.log('\nPhase 4: Upserting users and assigning roles...');
    const createdUsers: Array<{user: PeopleDBDocument; spec: UserSpec}> = [];
    for (const spec of USER_SPECS) {
      const user = await upsertSeedUser(spec, team._id);
      createdUsers.push({user, spec});
    }

    // ── Summary ───────────────────────────────────────────────────────────────
    printSummary(team._id, notebookIds, createdUsers);

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Seed failed:', error);
    process.exit(1);
  }
};

main();
