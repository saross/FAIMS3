# EMSA Coarse Woody Debris Survey Documentation

## Overview

The EMSA Coarse Woody Debris Survey notebook is a comprehensive digital form system designed for standardized assessment of dead wood in forest ecosystems. This FAIMS3 notebook enables systematic data collection for coarse woody debris (CWD) and standing dead trees, supporting carbon storage estimates, habitat assessments, and forest health monitoring.

## Purpose

This notebook facilitates:
- Standardized measurement of coarse woody debris
- Assessment of standing dead trees
- Decay class documentation
- Spatial mapping of dead wood distribution
- Hierarchical data organization with parent-child relationships
- Human-readable identification system for all records

## Key Features

### 1. Two-Level Data Structure
- **Survey Level**: Metadata, parameters, and observer information
- **Observation Level**: Individual debris measurements and documentation
- Parent-child relationships maintain data integrity

### 2. Human-Readable IDs (HRIDs)
- Surveys: `CWD-{{project}}-{{plot}}-{{id}}` (e.g., "CWD-LTER-A1-0001")
- Observations: `OBS-{{waypoint}}-{{id}}` (e.g., "OBS-N47.123-0001")
- Meaningful identifiers for easy reference

### 3. Flexible Measurement System
- Conditional fields based on debris type
- Coarse woody debris: diameter and length measurements
- Standing dead trees: height and DBH measurements
- Standardized decay classification (1-5 scale)

### 4. Survey Parameter Documentation
- Area surveyed (hectares)
- Size thresholds (diameter and length)
- Complete metadata for reproducibility

## Form Structure

### Coarse Woody Debris Survey (Parent Record)

#### Survey Details
- **Survey ID**: Auto-generated identifier
- **Survey HRID**: Human-readable identifier
- **Context** (Required): Survey purpose/context
- **Project** (Required): Project name
- **Plot** (Required): Plot identifier
- **Visit** (Required): Visit number
- **Observer Name** (Required): Data collector

#### Survey Timing
- **Start Date & Time** (Required): Survey commencement
- **End Date & Time**: Survey completion

#### Survey Parameters
- **Survey Area** (Required): Area in hectares
- **Diameter Threshold** (Required): Minimum diameter (10cm or 20cm)
- **Length Threshold** (Required): Minimum length (50cm or 30cm)

#### Related Records
- **Dead Wood Observations**: Links to child observation records

### Dead Wood Observation (Child of Survey)

#### Basic Information
- **Observation ID**: Auto-generated identifier
- **Observation HRID**: Human-readable identifier
- **Location Waypoint** (Required): GPS coordinates
- **Debris Type** (Required): Coarse Woody Debris or Standing Dead Tree

#### Measurements

##### For Coarse Woody Debris:
- **Widest Diameter**: Maximum diameter in cm
- **Narrowest Diameter**: Minimum diameter in cm
- **Length**: Total length in meters

##### For Standing Dead Trees:
- **Height**: Tree height in meters
- **Diameter**: DBH in cm

##### Common:
- **Decay Class** (Required): 1-5 scale

#### Documentation
- **Photo**: Optional debris photograph
- **Photo Description**: Notes about the image

## Decay Classification System

1. **Class 1**: Recently dead, bark intact, wood hard
2. **Class 2**: Bark loosening, wood sound, twigs present
3. **Class 3**: Bark mostly absent, wood softening, no twigs
4. **Class 4**: Wood soft throughout, shape deforming
5. **Class 5**: Very decomposed, outline only, merging with soil

## Data Entry Workflow

### 1. Survey Initialization
1. Create new Coarse Woody Debris Survey
2. Enter project, plot, and visit information
3. Record observer and start time
4. Define survey parameters (area and thresholds)
5. Save survey record

### 2. Field Data Collection
1. Navigate to Related Records tab in survey
2. For each qualifying piece of debris:
   - Click "Add Dead Wood Observation"
   - Capture GPS location
   - Select debris type
   - Record appropriate measurements
   - Assess decay class
   - Optional photo documentation
   - Save observation

### 3. Survey Completion
1. Return to survey record
2. Add end date/time
3. Review all observations
4. Verify data completeness

## Validation and Quality Control

### Required Fields
- Survey: 10 required fields ensure complete metadata
- Observation: 4 core required fields plus measurements

### Size Thresholds
- Only debris meeting defined thresholds recorded
- Ensures consistent sampling protocols
- Parameters documented for reproducibility

### Conditional Logic
- Measurement fields adapt to debris type
- Prevents inappropriate data entry
- Maintains logical consistency

### Parent-Child Integrity
- Observations only created from parent survey
- Relationships automatically maintained
- Export preserves hierarchical structure

## Best Practices

### Field Preparation
1. **Equipment Check**: GPS, camera, measuring tools
2. **Reference Materials**: Decay class guide with photos
3. **Survey Planning**: Define plot boundaries and transects
4. **Threshold Review**: Confirm size criteria

### Data Collection
1. **Systematic Search**: Use consistent transect patterns
2. **Complete Measurements**: All applicable dimensions
3. **Decay Assessment**: Reference guide for consistency
4. **GPS Accuracy**: Wait for good satellite signal
5. **Photo Standards**: Include scale reference

### Data Management
1. **Regular Saves**: Protect against data loss
2. **Daily Sync**: Upload data when network available
3. **Review Entries**: Check for completeness
4. **Backup Exports**: Maintain data security

## Data Export

### Format Options
- **Hierarchical JSON**: Preserves parent-child relationships
- **CSV**: Flattened format for analysis
- **GeoJSON**: Spatial analysis ready

### Export Contents
- Complete survey metadata
- All observations with measurements
- GPS coordinates for mapping
- Decay classifications
- Photo references
- HRIDs for identification

### Analysis Applications
- Volume calculations from dimensions
- Carbon storage estimates
- Decay class distributions
- Spatial pattern analysis
- Temporal change detection
- Fuel load assessment

## Technical Specifications

### Field Types
- Text fields for identifiers and descriptions
- Numeric fields for measurements
- DateTime fields for temporal data
- GPS capture for spatial locations
- Dropdown selects for standardized options
- Photo attachments for documentation

### Relationship Structure
- RelatedRecordSelector component
- Parent-child relationship type
- Multiple observations per survey
- No orphaned records possible
- Hierarchical data export

### Auto-population
- Survey/Observation IDs via BasicAutoIncrementer
- HRIDs via TemplatedStringField
- GPS coordinates via TakePoint component
- Parent-child links automatic

## Troubleshooting

### Common Issues

1. **GPS Signal Weak**
   - Move to open area
   - Wait for satellite acquisition
   - Check device location settings

2. **Conditional Fields Missing**
   - Verify debris type selected
   - Save and refresh if needed
   - Check all required fields

3. **Can't Create Observation**
   - Ensure survey saved first
   - Navigate to Related Records tab
   - Use "Add Dead Wood Observation" button

4. **Export Missing Data**
   - Verify all records synced
   - Check parent-child relationships
   - Use hierarchical export format

## Research Applications

### Carbon Accounting
- Volume estimates from measurements
- Decay class for density adjustments
- Spatial distribution patterns
- Temporal dynamics tracking

### Biodiversity Assessment
- Wildlife habitat quantification
- Decay stage preferences
- Spatial heterogeneity
- Microhabitat documentation

### Forest Management
- Fuel load assessment
- Post-disturbance monitoring
- Restoration tracking
- Health indicators

### Climate Research
- Carbon storage estimates
- Decomposition rates
- Disturbance impacts
- Long-term monitoring

## Support and Resources

### Getting Help
- Review this documentation
- Check field descriptions
- Consult decay class guide
- Contact system administrator

### Additional Resources
- EMSA monitoring protocols
- Decay classification photos
- Volume calculation methods
- Analysis templates

This notebook represents current best practices in coarse woody debris assessment, ensuring standardized data collection with hierarchical organization and complete documentation of survey parameters and individual observations.