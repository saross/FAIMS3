# EMSA Camera Trap Survey Documentation

## Overview

The EMSA Camera Trap Survey notebook is a comprehensive digital form system designed for standardized camera trap deployment, monitoring, and retrieval in wildlife research. This FAIMS3 notebook enables systematic data collection throughout the camera trap lifecycle with built-in quality control and equipment tracking features.

## Purpose

This notebook facilitates:
- Standardized camera trap deployment documentation
- Systematic maintenance visit recording
- Complete retrieval data capture
- Equipment and settings tracking
- Hierarchical data organization with parent-child relationships
- Human-readable identification system for all records

## Key Features

### 1. Three-Phase Data Collection
- **Deployment**: Initial camera setup with complete configuration
- **Re-equipping**: Multiple maintenance visits with status tracking
- **Retrieval**: Final collection with image count documentation

### 2. Hierarchical Data Structure
- Parent deployment records with child maintenance/retrieval records
- Explicit relationships prevent orphaned data
- Complete deployment history in one structure

### 3. Human-Readable IDs (HRIDs)
- Deployments: `DEP-{{point}}-{{id}}` (e.g., "DEP-CT01-00001")
- Re-equipping: `REQ-{{point}}-{{date}}` (e.g., "REQ-CT01-2024-03-15")
- Retrieval: `RET-{{point}}-{{date}}` (e.g., "RET-CT01-2024-06-20")

### 4. Comprehensive Equipment Tracking
- Camera identification and settings
- Memory card chain of custody
- Battery management with expiry dates
- Equipment status through deployment lifecycle

## Form Structure

### Camera Trap Deployment (Parent Record)

#### Survey Information
- **Survey ID** (Required): Project or survey identifier
- **Deployment Point** (Required): Unique location identifier
- **GPS Location** (Required): Automated coordinate capture
- **Author/Timestamp**: Auto-populated metadata

#### Location Details
- Direction camera faces
- Habitat type classification
- Altitude and GPS accuracy

#### Bait/Lure Configuration
- Type selection (None/Bait/Lure/Both)
- Conditional fields for bait/lure specifications
- Detailed descriptions

#### Camera Setup
- **Camera ID** (Required): Unique equipment identifier
- Make and model documentation
- Memory card ID and capacity
- Battery type and expiry date

#### Camera Settings
- Detection mode (Motion/Time-lapse/Both)
- Sensitivity levels
- Photos per trigger
- Flash configuration
- Image quality settings

#### Time-Lapse Configuration (Conditional)
- Interval settings
- Daily start/end times
- Enabled only when time-lapse selected

#### Physical Positioning
- Mounting method
- Height and angle measurements
- Field of view estimation
- Target distance
- Obstruction notes

#### Documentation
- Setup photograph
- Field of view photograph
- Deployment notes

#### Related Records
- Links to child re-equipping records
- Link to child retrieval record

### Camera Trap Re-equipping (Child of Deployment)

#### Basic Information
- **Visit Date** (Required): Date of maintenance
- **Point ID** (Required): Deployment location
- Auto-generated HRID with date stamp

#### Status Assessment
- **Camera Status** (Required): Operational condition
- Memory card status
- Battery status
- Damage assessment

#### Replacement Actions
- Memory card replacement tracking
- New card ID if replaced
- Battery replacement tracking
- New battery details if replaced

#### Documentation
- Current status photograph
- Maintenance notes

### Camera Trap Retrieval (Child of Deployment)

#### Basic Information
- **Retrieval Date** (Required): Collection date
- **Point ID** (Required): Deployment location
- Auto-generated HRID with date stamp

#### Final Status
- **Camera Status** (Required): Final condition
- Memory card status
- Total images collected
- Equipment retrieval confirmation

#### Documentation
- Final site photograph
- Retrieval notes

## Data Entry Workflow

### 1. Initial Deployment
1. Create new Camera Trap Deployment record
2. Complete all required fields across tabs
3. Configure camera settings
4. Document physical setup
5. Save deployment record

### 2. Maintenance Visits
1. Find deployment record by HRID
2. Navigate to Related Records tab
3. Add new Re-equipping record
4. Document current status
5. Record any replacements
6. Save as child record

### 3. Final Retrieval
1. Find deployment record by HRID
2. Navigate to Related Records tab
3. Add Retrieval record
4. Document final status
5. Record image count
6. Save as child record

## Validation and Quality Control

### Required Fields
- Deployment: 6 core fields + GPS
- Re-equipping: 3 fields minimum
- Retrieval: 3 fields minimum

### Conditional Logic
- Bait/lure fields appear based on type selection
- Time-lapse settings visible when enabled
- Replacement fields shown when action selected

### Data Integrity
- Parent-child relationships enforced
- Auto-generated IDs prevent duplicates
- Timestamp tracking for all records
- User attribution maintained

## Best Practices

### Field Use
1. **Consistency**: Use standardized point IDs across deployments
2. **Documentation**: Take clear photos showing setup and field of view
3. **Equipment Tracking**: Always record camera and memory card IDs
4. **Maintenance**: Document all visits, even if no action taken
5. **Completeness**: Fill all applicable fields for data quality

### Data Management
1. **Regular Syncing**: Upload data after each field session
2. **Photo Management**: Ensure photos upload successfully
3. **Review Records**: Check parent-child relationships
4. **Export Regularly**: Maintain backups of survey data

### Survey Design
1. **Point Naming**: Develop consistent naming scheme
2. **Equipment Lists**: Maintain camera/card inventory
3. **Visit Schedule**: Plan maintenance intervals
4. **Standard Operating Procedures**: Document survey-specific protocols

## Data Export

### Format Options
- **Hierarchical JSON**: Preserves parent-child structure
- **CSV**: Flattened format with relationships
- **GeoJSON**: Spatial analysis ready

### Export Contents
- Complete deployment configurations
- Full maintenance history
- Equipment tracking data
- All photos with metadata
- GPS coordinates with accuracy
- HRIDs for easy identification

## Technical Specifications

### Field Types
- Text fields for identifiers and descriptions
- Numeric fields for measurements
- Date/time fields for temporal data
- GPS capture for locations
- Photo attachments for documentation
- Boolean toggles for yes/no options
- Dropdown selects for standardized options

### Relationship Structure
- RelatedRecordSelector components
- Parent-child relationship type
- Multiple re-equippings per deployment
- Single retrieval per deployment
- No orphaned records possible

### Auto-population
- Deployment IDs via BasicAutoIncrementer
- HRIDs via TemplatedStringField
- User via {{user}} template
- Timestamp via DateTimeNow component

## Troubleshooting

### Common Issues

1. **GPS Not Working**
   - Ensure location services enabled
   - Move to area with clear sky view
   - Wait for GPS lock before capture

2. **Photos Not Uploading**
   - Check internet connection
   - Verify photo size limits
   - Ensure sufficient storage

3. **Can't Find Deployment**
   - Use HRID for searching
   - Check survey filter
   - Verify point ID accuracy

4. **Child Records Not Showing**
   - Ensure parent record saved
   - Refresh Related Records tab
   - Check relationship configuration

## Support and Resources

### Getting Help
- Review this documentation
- Check field descriptions
- Consult survey protocols
- Contact system administrator

### Training Materials
- Example deployments
- Standard operating procedures
- Equipment manuals
- Species identification guides

This notebook represents current best practices in camera trap data management, ensuring complete documentation of deployments while maintaining data quality and research integrity throughout the monitoring process.