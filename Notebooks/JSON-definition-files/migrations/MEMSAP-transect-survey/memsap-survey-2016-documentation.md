# MEMSAP Archaeological Survey 2016 - User Documentation

## Overview
This notebook supports the Malawi Earlier-Middle Stone Age Project (MEMSAP) field survey methodology. It is designed for transect-based archaeological survey with detailed lithic artifact analysis capabilities.

## Getting Started

### Initial Setup
1. Launch the notebook and select your **Team** (A, B, or C) from the main screen
2. Enter your name in the **Recorded by** field
3. Ensure GPS is enabled on your device for location capture

## Recording Workflows

### 1. Survey Unit (Transect)
A Survey Unit represents one transect walk. The workflow includes:

#### Starting a Transect
1. Create new **Survey Unit** record
2. Complete **Basic Information** tab:
   - Survey Unit ID (auto-generated)
   - Survey Unit HRID (auto-generated in format `SU-{{team}}-{{survey-line}}-{{id}}`, e.g., "SU-A-001-0001")
   - Team selection
   - Survey line number
   - Recorder name
   - Timestamp

3. In **Transect Details** tab:
   - Capture **Start GPS Location** 
   - Enter total transect width in meters
   - Record number of walkers
   - List all participants
   - Note any photo file numbers from external cameras

4. Complete **Landform & Visibility** tab:
   - Select landform type from dropdown
   - Add detailed landform remarks (slope angles, geological features)
   - Record surface visibility percentage (10% increments)
   - Note visibility conditions (grass, trees, etc.)
   - Record artifact exposure percentage
   - Document erosion causes

5. Fill **Geomorphology** tab:
   - Select geomorphic context
   - Record cobble distribution pattern
   - Estimate cobbles per square meter
   - Select all applicable sediment sizes
   - Record sediment thickness

#### Ending a Transect
6. In **Complete Transect** tab:
   - Capture **End GPS Location**
   - Add any final remarks
   - Take overview photos

7. In **Related Records** tab:
   - Create child POIs and Artifacts directly from the Survey Unit
   - All child records will be automatically linked to this transect
   - View all associated finds in one place

### 2. Point of Interest (POI) Recording
POIs are recorded for significant cobbles or cores found during survey. All POIs should be created as child records from their parent Survey Unit.

#### POI - Cobble
1. From the Survey Unit's **Related Records** tab, click **Add POI - Cobble**
2. The record will have:
   - POI Cobble ID (auto-generated)
   - POI Cobble HRID (format `POI-C-{{location}}-{{id}}`, e.g., "POI-C-S15E20-0001")
3. Basic information auto-fills team and recorder
4. Capture GPS location
5. Record measurements (weight, length, width, thickness)
6. Document material properties:
   - Raw material type
   - Crystal size (if applicable)
   - Abundance of flaws percentage
7. Select cobble angularity
8. Add photos and notes

#### POI - Core
1. From the Survey Unit's **Related Records** tab, click **Add POI - Core**
2. The record will have:
   - POI Core ID (auto-generated)
   - POI Core HRID (format `POI-CR-{{location}}-{{id}}`)
3. Follow basic POI workflow for location and measurements
4. Complete detailed core analysis:
   - Completeness (complete/broken)
   - Weathering stage
   - Cortex coverage percentages (whole, upper, lower)
   - Count flake scars ≥10mm
   - Number of platforms
   - Flaking on perimeter percentage
   - Core typology classification

### 3. Artifact Recording
Individual artifacts are recorded with detailed technological analysis. All artifacts should be created as child records from their parent Survey Unit.

#### Artefact - Flake
1. From the Survey Unit's **Related Records** tab, click **Add Artefact - Flake**
2. The record will have:
   - Artefact Flake ID (auto-generated)
   - Artefact Flake HRID (format `ART-F-{{location}}-{{id}}`)
3. Capture location and basic measurements
4. Note where thickness was measured (bulb/other)
5. Complete flake analysis:
   - Longitudinal portion present
   - Transverse portion present
   - Platform type and cortex
   - Termination type
   - Dorsal cortex percentage
6. Record technology:
   - Flake typology
   - Scar orientation pattern
   - Count dorsal scars >15mm
   - Note if retouched
   - Add detailed comments

#### Artefact - Core
1. From the Survey Unit's **Related Records** tab, click **Add Artefact - Core**
2. The record will have:
   - Artefact Core ID (auto-generated)
   - Artefact Core HRID (format `ART-C-{{location}}-{{id}}`)
3. Similar to POI Core but recorded as an individual artifact find

#### Artefact - Shatter/Fragment
1. From the Survey Unit's **Related Records** tab, click **Add Artefact - Shatter/Fragment**
2. The record will have:
   - Artefact Shatter ID (auto-generated)
   - Artefact Shatter HRID (format `ART-S-{{location}}-{{id}}`)
3. Simplified recording for shatter pieces:
   - Basic measurements
   - Cortical coverage percentage
   - Photos

#### Artefact - Other
1. From the Survey Unit's **Related Records** tab, click **Add Artefact - Other**
2. The record will have:
   - Artefact Other ID (auto-generated)
   - Artefact Other HRID (format `ART-O-{{location}}-{{id}}`)
3. For manuports, hammerstones, and grindstones:
   - Select specific type
   - Standard measurements
   - Photos and notes

### 4. Site Recording
For significant archaeological sites discovered during survey:

1. From the Survey Unit's **Related Records** tab, click **Add Site**
2. The record will have:
   - Site ID (auto-generated)
   - Site HRID (format `SITE-{{survey-line}}-{{id}}`)
3. Enter site name and basic information
4. Capture GPS location
5. Select site type (rock shelter, erosion gully, etc.)
6. Select all applicable:
   - Estimated ages (ESA, MSA, LSA, etc.)
   - Materials present at site
   - Site conditions
7. Make recommendation for further investigation
8. Add detailed notes and photos

## Field Tips

### GPS Usage
- The notebook now uses device GPS (internal or external if connected)
- Always wait for good GPS fix before capturing locations
- GPS accuracy is recorded with each point

### Photography
- Use the built-in camera function for all photos
- Photos are automatically linked to records
- Note external camera photo numbers in text fields when applicable

### Data Entry
- Required fields are marked and must be completed
- Use annotation features for additional context
- Uncertainty sliders help record confidence levels

### Efficiency Tips
- Complete transect details while walking
- Use multi-select fields to choose all applicable options
- Tab layout helps organize complex records
- Save frequently - use "Save and Continue" option

## Changes from Original FAIMS2 Module

### Simplified Features
- **GPS Tracking**: No continuous tracklog - only start/end points for transects
- **Map Interface**: Basic map viewing only - no drawing capabilities
- **Team IDs**: Simplified to team selection + auto-incrementing IDs

### Maintained Features
- All lithic analysis fields and vocabularies
- Complete measurement recording
- Photo documentation
- Multi-level recording (transect → POI/artifact → detailed analysis)

### New Features
- Human-Readable IDs (HRIDs) for all records - easy identification
- Parent-child relationships - all POIs, Artifacts, and Sites linked to Survey Units
- Related Records tab - create and manage child records from one location
- Modern interface with tab organization
- Better photo integration
- Improved dropdown selections
- Auto-calculation where possible

## Troubleshooting

### GPS Issues
- Ensure location services are enabled
- Wait for GPS indicator before capturing
- If external GPS, ensure Bluetooth connection

### Record Relationships
- All POIs, Artifacts, and Sites are now child records of Survey Units
- Parent-child relationships are automatically maintained
- Create all finds from the Survey Unit's Related Records tab
- Exports will preserve the hierarchical structure
- HRIDs make it easy to identify which transect contains which finds

### Data Synchronization
- Sync regularly when network available
- Check sync status indicator
- Resolve conflicts promptly

## Contact
For technical support or questions about the notebook, contact the FAIMS team.
For questions about the MEMSAP project or survey methodology, contact the project leads.