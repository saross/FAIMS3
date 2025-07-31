# Aarhus Civil Defense Shelter Monitoring - User Documentation

## Overview

This notebook supports the documentation of Cold War-era civil defense shelters in Aarhus Municipality, Denmark. It enables precise recording of spatial location, layout, and condition of surviving shelters and other civil defense structures in urban environments.

**Project Lead**: Adela Sobotkova, Aarhus University  
**Funding**: SDAM, SHAPE projects, and Augustinus Fonden via the MELICA project

## Getting Started

### Creating a New Shelter Record

1. Open the notebook and select **"Shelter"** from the main menu
2. The system will automatically generate:
   - A unique **Feature ID** for your record
   - A **Human-Readable ID (HRID)** in the format `{{feature-type}}-{{feature-id}}` (e.g., "Shelter_Type_I-00001")
3. Fill in the required fields (marked with asterisks)
4. Use the GPS button to capture location coordinates
5. Save your record regularly as you work
6. To add shape annotations, use the **Related Records** tab after saving

### Required Equipment
- Mobile device with GPS capability
- Camera for photo documentation
- Measuring tape for distance measurements
- Compass for directional readings
- Reference images for shelter types (provided separately)

## Field Guide

### General Section

#### Basic Information
- **Feature ID**: Automatically generated unique identifier - do not modify
- **Shelter HRID**: Human-readable identifier combining feature type and ID for easy reference
- **Feature Type** (Required): Select the shelter type from the dropdown. Refer to the separate image guide for visual examples of each type:
  - Shelter Types I-VI (refer to architectural plans)
  - Bunker
  - Emergency hospital
  - Observation post
  - Other
- **Shelter author**: Automatically populated with your username
- **Shelter timestamp**: Automatically set to current date/time when created

#### Source and Iterations
- **Feature Source**: How you discovered this shelter (Informant, Map, etc.)
- **Number of Iterations Subtype**: Count how many times the basic shelter design repeats at this location. Each entrance should eventually be recorded separately. Refer to image guide for examples.

#### Location Data
- **GPS Location**: Press the button to capture current coordinates. This replaces manual entry of Lat/Long/Northing/Easting
- **Manual Coordinates**: Check this box only if GPS is unavailable and you need to enter coordinates manually
- **Feature Description**: Detailed description of preservation state and characteristics

#### Site Context
- **Landuse on Top** (Required): What covers the shelter surface
- **Landuse Around**: The surrounding environment (choose majority landuse)
- **Overview Photo**: Capture the entire feature with a scale reference
- **Locale Description**: Provide address and directions for future visits

### Access Section

#### Entryway Details
- **Entryway Type** (Required): Select the entrance type
  - Concrete slabs
  - Doorway
  - Access buried or indeterminate
  - Other/NA
- **Accessibility of Shelter During Visit** (Required): Current access status
- **Entryway Faces Direction** (Required): Use compass to determine direction (N, NE, E, SE, S, SW, W, NW, etc.)
- **Comments on Entryway and Access**: Note pedestrian accessibility
- **Entryway Photo**: Document the entrance

#### Emergency Exit
- **Emergency Exit Shape** (Required): Round, Square, Other, or NA
- **Emergency Exit Location** (Required): Position relative to shelter plan
  - Central (typical for round shelters)
  - Side or Corner (typical for square shelters)
- **Notes on Emergency Exit**: Additional observations
- **Emergency Exit Photo**: If not visible in overview photo
- **Distance from Swan neck to Emergency Exit**: Measure in meters if swan neck ventilation is present

### Interior Section

- **Interior Description**: If accessible, describe internal shape, contents, condition, and current use
- **Interior Photo**: Document interior if accessible
- **Comments and Recommendations**: Final observations and suggestions for preservation/management

### Related Records Tab

After saving your shelter record, use the **Related Records** tab to:
- **Add Shape Annotations**: Create child records for additional spatial features
- Each shape annotation will receive its own HRID (e.g., "SHAPE-00001")
- Shape annotations are permanently linked to their parent shelter

### Shape Annotation (Child Records)

Created from the parent shelter's Related Records tab:
- **Shape ID**: Automatically generated
- **Shape HRID**: Human-readable identifier in format `SHAPE-{{shape-id}}`
- **Label**: Brief identifier for the shape
- **Note**: Detailed description of what the shape represents

## Important Changes from Previous Version

### New Features
1. **Human-Readable IDs (HRIDs)**: All records now have meaningful identifiers for easy reference
2. **Parent-Child Relationships**: Shape annotations are explicitly linked to their parent shelters
3. **Related Records Tab**: Manage shape annotations directly from the shelter record
4. **Automatic GPS capture**: Single button replaces manual coordinate entry
5. **Auto-generated timestamps**: No manual date/time entry needed
6. **Streamlined photo capture**: Direct camera integration

### Modified Features
1. **Shelter Type Selection**: Image references now provided in separate guide (not embedded in dropdown)
2. **Number of Iterations**: Glossary images provided separately
3. **Simplified data entry**: All fields in single scrollable form

### Removed Features
1. **Map drawing tools**: Focus on point capture only
2. **HTML guide**: Reference this documentation instead
3. **Search by author**: Use standard search functionality

## Data Quality Guidelines

### Required Fields
Ensure all fields marked with asterisks (*) are completed:
- Feature ID (auto-generated)
- Feature Type
- GPS Location
- Landuse on Top
- All Entryway fields
- Emergency Exit Shape and Location

### Best Practices
1. **Photos**: Include scale references where possible
2. **Descriptions**: Be specific about current condition and changes since construction
3. **Locations**: Always use GPS when available; manual entry is backup only
4. **Annotations**: Use the annotation feature for any uncertainty about field values
5. **Multiple Iterations**: Create separate records for each entrance when shelters have multiple entry points

## Troubleshooting

### GPS Issues
- Ensure location services are enabled
- Wait for GPS signal to stabilize before capturing
- In urban canyons, try moving to open areas
- Use manual coordinate entry as last resort

### Photo Problems
- Ensure adequate lighting
- Clean camera lens before use
- Take multiple angles if needed
- Photos are automatically compressed for storage

### Data Synchronization
- Save frequently during fieldwork
- Sync when network connection is available
- Check that all photos have uploaded before leaving site

## Contact Information

For questions about:
- **The shelter monitoring project**: Contact Adela Sobotkova at adela@cas.au.dk
- **Technical issues**: Contact FAIMS support at enquiries@faims.edu.au
- **Project website**: https://cas.au.dk/en/melica

## Reference Materials

Please refer to the separate image guides for:
1. Shelter Type visual reference (Types I-VI)
2. Number of Iterations examples
3. Field equipment checklist
4. Safety guidelines for shelter entry

---
*This documentation corresponds to Aarhus Shelters Notebook v1.0 for FAIMS3*