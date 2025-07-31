# Archaeological Historical Artefact Recording Documentation

## Overview

The Archaeological Historical Artefact Recording notebook is a comprehensive digital recording system designed for documenting historical artefacts during archaeological excavations and surveys. This FAIMS3 notebook enables systematic artefact recording with QR code integration, hierarchical photo management, and standardized classification systems.

## Purpose

This notebook facilitates:
- Rapid artefact recording with QR code bag tracking
- Standardized artefact classification and quantification
- Hierarchical photo documentation with parent-child relationships
- Context-based artefact organization
- Human-readable identification system for all records
- Additional photo documentation linked to specific artefacts

## Key Features

### 1. QR Code Integration
- Scan QR codes on artefact bags for instant identification
- Reduces data entry errors and speeds up recording
- Maintains chain of custody through digital tracking

### 2. Hierarchical Data Structure
- Parent artefact records with child additional photo records
- Prevents orphaned photo documentation
- Maintains clear relationships between artefacts and their detailed imagery

### 3. Human-Readable IDs (HRIDs)
- Artefacts: `{{Artefact_ID}}-{{Bag_ID}}` (e.g., "0001-BAG123")
- Additional Photos: `PHOTO-{{photo-id}}` (e.g., "PHOTO-001")
- Facilitates easy identification in field and lab contexts

### 4. Comprehensive Classification System
- Seven standard artefact classes
- Quantity tracking for bulk finds
- Context number integration
- Detailed annotation capabilities

## Form Structure

### Artefact Record (Parent)

#### Basic Information Tab
- **Artefact ID** (Required): Auto-generated sequential identifier
- **Bag ID** (Required): QR code scan from artefact bag
- **Context Number**: Archaeological context reference
- **Human Readable ID**: Auto-generated from Artefact ID and Bag ID

#### Count & Details Tab
- **Class** (Required): Standardized artefact classification
  - Ceramic
  - Glass
  - Metal
  - Miscellaneous
  - Faunal
  - Organic
  - Building Materials
- **Quantity** (Required): Number of artefacts (default: 1)
- **Photograph**: Primary artefact documentation
- **Note**: Detailed observations and descriptions

#### Related Records Tab
- **Additional Photos**: Links to child photo records
- Allows multiple detailed photos per artefact
- Maintains parent-child relationship integrity

### Additional Photo Record (Child of Artefact)

#### Photo Documentation
- **Photo ID** (Required): Auto-generated sequential identifier
- **Photo Record ID**: Auto-generated HRID
- **Additional Photo** (Required): Detailed artefact photography
- **Note**: Specific observations about the photo view

## Data Entry Workflow

### 1. Initial Artefact Recording
1. Create new Artefact record
2. Scan QR code on artefact bag
3. Enter context number if known
4. Select appropriate artefact class
5. Specify quantity
6. Take overview photograph
7. Add descriptive notes
8. Save artefact record

### 2. Adding Detailed Photos
1. Navigate to Related Records tab in parent artefact
2. Click "Add Additional Photos"
3. System auto-generates photo ID
4. Take detailed photograph
5. Add photo-specific notes
6. Save as child record
7. Repeat for multiple views/details

### 3. Batch Processing
1. Process multiple bags from same context efficiently
2. Use auto-incrementing IDs for rapid recording
3. Add detailed photos later in lab setting if needed

## Validation and Quality Control

### Required Fields
- Artefact: Bag ID, Class, Quantity
- Additional Photo: Photo image

### Data Integrity
- QR code validation ensures correct bag tracking
- Parent-child relationships prevent orphaned photos
- Auto-generated IDs prevent duplicates
- Quantity validation (minimum 1)

### Annotation System
- Most fields support annotation for additional context
- Uncertainty flags for tentative identifications
- Preserves decision-making process

## Best Practices

### Field Recording
1. **QR Code Scanning**: Ensure good lighting and clean codes
2. **Photography**: Include scale and north arrow when relevant
3. **Classification**: Use standard class definitions consistently
4. **Quantity**: Count fragments vs. complete objects consistently
5. **Context**: Always record when known

### Photo Documentation
1. **Overview Photos**: Capture all artefacts in bag together
2. **Detail Photos**: Focus on diagnostic features
3. **Multiple Angles**: Document decorated surfaces, maker's marks
4. **Consistent Lighting**: Avoid harsh shadows
5. **Scale Reference**: Include in all photos

### Data Management
1. **Regular Syncing**: Upload data at end of each field day
2. **Photo Quality**: Check images before leaving field
3. **Completeness**: Fill all applicable fields
4. **Relationships**: Verify parent-child links
5. **Backup**: Export data regularly

## Data Export

### Format Options
- **Hierarchical JSON**: Preserves all relationships
- **CSV**: Flattened format for analysis
- **Photo Archives**: Organized by artefact ID

### Export Contents
- Complete artefact records with classifications
- All photo documentation with metadata
- Bag ID tracking information
- Context associations
- Annotation and uncertainty data
- HRIDs for easy cross-referencing

## Technical Specifications

### Field Types
- QR code scanner for bag identification
- Auto-incrementing IDs for sequential numbering
- Templated string fields for HRIDs
- Select dropdowns for standardized options
- Photo capture with annotation
- Multi-line text for detailed notes
- Numeric input with validation

### Relationship Structure
- RelatedRecordSelector with Child relationship type
- Multiple photos per artefact allowed
- No linking to existing records (create only)
- Maintains referential integrity

### Auto-population
- Artefact IDs via BasicAutoIncrementer (4 digits)
- Photo IDs via BasicAutoIncrementer (3 digits)
- HRIDs via TemplatedStringField
- Automatic relationship creation

## Integration Points

### Laboratory Workflow
- QR codes link field records to lab analysis
- Additional photos document conservation treatment
- Export for specialist analysis
- Integration with finds databases

### Reporting
- Automated finds registers by context
- Photo catalogues by artefact class
- Quantification summaries
- Spatial distribution analysis

## Troubleshooting

### Common Issues

1. **QR Code Not Scanning**
   - Clean camera lens
   - Ensure adequate lighting
   - Check QR code condition
   - Try manual entry if damaged

2. **Photos Not Saving**
   - Check device storage
   - Verify internet connection
   - Ensure photo size limits
   - Clear app cache if needed

3. **Relationship Errors**
   - Save parent record first
   - Refresh before adding children
   - Check viewset configuration

4. **ID Generation Issues**
   - Verify form_id parameters
   - Check for ID conflicts
   - Ensure sequential numbering

## Future Enhancements

### Planned Features
- Barcode support alongside QR codes
- 3D model attachment capability
- Direct laboratory integration
- Automated report generation
- Machine learning for classification assistance

### Integration Possibilities
- Museum database connections
- Conservation tracking systems
- Publication platforms
- Research data repositories

This notebook represents current best practices in archaeological artefact recording, balancing rapid field documentation with detailed analytical requirements while maintaining data quality throughout the recording process.