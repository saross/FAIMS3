# Botanical Collection - Complete Documentation

## Overview

The Botanical Collection - Complete notebook is a comprehensive digital data collection system designed for botanical field surveys and herbarium specimen documentation. This FAIMS3 notebook implements a hierarchical structure with survey sites as parent records and individual specimens as child records, enabling systematic botanical documentation with full taxonomic, morphological, and ecological data capture.

## Purpose

This notebook facilitates:
- Structured botanical survey documentation
- Hierarchical site-specimen relationships
- Comprehensive specimen data collection
- GPS-enabled location tracking
- Standardized habitat classification
- Morphological characteristic recording
- Herbarium specimen tracking
- Human-readable identification systems

## Key Features

### 1. Two-Tier Hierarchical Structure
- **Survey Sites**: Parent records for location-based surveys
- **Botanical Specimens**: Child records linked to survey sites
- Maintains site context for all specimens
- Enables site-level and specimen-level analysis

### 2. Human-Readable IDs (HRIDs)
- Sites: `SITE-{{survey-date}}-{{site-id}}` (e.g., "SITE-2024-03-15-0001")
- Specimens: `BOT-{{collection-date}}-{{specimen-id}}` (e.g., "BOT-2024-03-15-00001")
- Facilitates field identification and herbarium cataloguing

### 3. Comprehensive Data Capture
- Full taxonomic hierarchy (species, family)
- Morphological measurements and characteristics
- Ecological context and abundance
- Photo documentation
- GPS coordinates with accuracy
- Herbarium specimen status tracking

### 4. Flexible Tab-Based Interface
- Logical grouping of related fields
- Progressive data entry workflow
- Both site and specimen forms use tab layouts
- Efficient navigation for complex records

## Form Structure

### Survey Site (Parent Record)

#### Site Information Tab
- **Site ID** (Required): Auto-generated sequential identifier
- **Site Reference** (Required): Auto-generated HRID
- **Survey Date** (Required): Date of botanical survey
- **Site Name** (Required): Descriptive location name

#### Site Location & Habitat Tab
- **Site GPS Location**: Central coordinates with accuracy
- **Site Habitat Type** (Required): Primary ecosystem classification
- **Site Description**: General site characteristics

#### Specimens Tab
- **Botanical Specimens**: Links to child specimen records
- Add multiple specimens per site
- Maintains parent-child relationships

### Botanical Specimen (Child of Survey Site)

#### Collection Information Tab
- **Specimen ID** (Required): Auto-generated sequential identifier
- **Collection Number** (Required): Auto-generated HRID
- **Collection Date** (Required): Specimen collection date
- **Collector Name** (Required): Person who collected specimen

#### Location & Habitat Tab
- **GPS Location**: Specific specimen coordinates
- **Habitat Type** (Required): Microhabitat classification
  - Forest
  - Grassland
  - Wetland
  - Coastal
  - Alpine
  - Desert
  - Urban
  - Agricultural
  - Other

#### Taxonomy Tab
- **Species Name** (Required): Scientific binomial
- **Common Name**: Vernacular name(s)
- **Family**: Taxonomic family

#### Morphology Tab
- **Plant Height**: Measurement in centimeters
- **Flower Colors**: Multiple selection
- **Specimen Photos**: Visual documentation

#### Ecology & Notes Tab
- **Abundance**: Population assessment
  - Rare (1-2 individuals)
  - Uncommon (3-10 individuals)
  - Common (11-100 individuals)
  - Abundant (>100 individuals)
- **Field Notes**: Detailed observations
- **Herbarium Specimen Collected**: Physical specimen status

## Data Entry Workflow

### 1. Create Survey Site
1. Start new Survey Site record
2. Enter survey date and site name
3. Capture GPS coordinates
4. Select primary habitat type
5. Add site description
6. Save site record

### 2. Add Botanical Specimens
1. From site record, navigate to Specimens tab
2. Click "Add Botanical Specimens"
3. For each specimen:
   - Auto-generates specimen ID
   - Enter collection details
   - Record GPS if different from site
   - Complete taxonomic identification
   - Document morphological features
   - Assess ecological context
   - Take photographs
   - Note herbarium status
4. Save specimen record
5. Continue adding specimens

### 3. Data Organization Benefits
- All specimens automatically linked to survey site
- Site environmental data inherited by specimens
- Batch operations possible at site level
- Clear spatial and temporal relationships

## Validation and Quality Control

### Required Fields
- **Survey Site**: Site name, survey date, habitat type
- **Specimen**: Collection date, collector, habitat, species

### Data Integrity
- Parent-child relationships enforced
- Auto-generated IDs prevent duplicates
- Date validation ensures logical sequences
- GPS accuracy recorded
- Taxonomic names standardized

### Annotation System
- Extensive annotation support for uncertainty
- Location notes for GPS readings
- Taxonomic uncertainty tracking
- Abundance confidence levels

## Best Practices

### Field Survey Planning
1. **Pre-Survey**:
   - Define survey sites in advance
   - Check GPS functionality
   - Prepare species lists
   - Charge devices fully

2. **Site Selection**:
   - Choose representative areas
   - Mark site boundaries
   - Record access routes
   - Note safety hazards

### Specimen Documentation
1. **In-Field Recording**:
   - Complete entries immediately
   - Take multiple photos per specimen
   - Include habitat context photos
   - Record while plant is fresh

2. **Taxonomic Identification**:
   - Use standard references
   - Note uncertainty levels
   - Photograph diagnostic features
   - Collect vouchers when permitted

3. **Morphological Data**:
   - Measure before collecting
   - Use consistent units
   - Record range if variable
   - Note phenological stage

### Data Management
1. **Daily Procedures**:
   - Review entries each evening
   - Sync data when connected
   - Backup photos separately
   - Check specimen-site links

2. **Quality Assurance**:
   - Verify taxonomic names
   - Cross-check GPS coordinates
   - Ensure photo quality
   - Complete all applicable fields

## Data Export

### Format Options
- **Hierarchical JSON**: Complete relationships preserved
- **CSV**: Flattened for analysis
- **Darwin Core**: Museum/herbarium integration
- **GeoJSON**: Spatial analysis ready

### Export Contents
- Complete site surveys with all specimens
- Full taxonomic hierarchies
- Morphological measurements
- Ecological assessments
- GPS tracks and accuracy
- Photo collections with metadata
- Herbarium collection status

## Technical Specifications

### Field Types
- Date pickers for temporal data
- GPS capture with accuracy metadata
- Single and multi-select dropdowns
- Numeric inputs with validation ranges
- Photo arrays with annotation
- Boolean checkboxes
- Multi-line text areas
- Auto-incrementing identifiers
- Templated string generators

### Relationship Structure
- RelatedRecordSelector with Child type
- Multiple specimens per site
- Unidirectional parent-child links
- No orphaned specimens allowed

### Tab Organization
- **Survey Site**: 3 tabs (Info, Location, Specimens)
- **Specimen**: 5 tabs (Collection, Location, Taxonomy, Morphology, Ecology)
- Logical workflow progression
- Related fields grouped together

## Integration Possibilities

### Herbarium Systems
- Specimen barcoding compatibility
- Label generation from data
- Accession number tracking
- Loan management preparation

### Biodiversity Databases
- GBIF data formatting
- iNaturalist integration
- Regional flora connections
- Conservation status lookup

### Research Applications
- Species distribution modeling
- Phenological studies
- Population assessments
- Habitat association analysis

## Troubleshooting

### Common Issues

1. **GPS Not Working**
   - Enable location services
   - Move to open area
   - Wait for satellite lock
   - Check device GPS settings

2. **Site-Specimen Linking**
   - Save site before adding specimens
   - Use site's specimen tab
   - Don't create orphaned specimens
   - Verify relationships in export

3. **Photo Management**
   - Check storage space
   - Reduce photo resolution if needed
   - Sync frequently
   - Use consistent naming

4. **Taxonomic Entry**
   - Use standard nomenclature
   - Include author citations
   - Check spelling carefully
   - Update taxonomy regularly

## Advanced Features

### Batch Operations
- Multiple specimens per photo session
- Bulk abundance assessments
- Site-level habitat updates
- Coordinated team surveys

### Data Analysis
- Species accumulation curves
- Habitat preference analysis
- Temporal distribution patterns
- Morphological variation studies

## Support Resources

### Field Guides
- Regional flora keys
- Habitat classification systems
- Standard measurement protocols
- Photography guidelines

### Training Materials
- Video tutorials for app use
- Taxonomic workshops
- GPS best practices
- Data management courses

This notebook represents current best practices in botanical field data collection, balancing comprehensive documentation needs with practical field constraints while maintaining scientific rigor throughout the collection process.