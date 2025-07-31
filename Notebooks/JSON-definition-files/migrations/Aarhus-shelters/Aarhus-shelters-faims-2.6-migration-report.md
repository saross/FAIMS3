# Aarhus Shelters FAIMS2.6 to FAIMS3 Migration Report

## Executive Summary

The Aarhus Civil Defense Shelter Monitoring module has been successfully migrated from FAIMS2.6 to FAIMS3 with approximately 90% feature parity. All core data collection functionality has been preserved, with some advanced features simplified or replaced with alternative approaches. The migration now includes enhanced features such as Human-Readable IDs (HRIDs) and explicit parent-child relationships between shelters and shape annotations.

**Migration Date**: Generated from FAIMS2.6 module version (commit: fieldwork-2023)  
**Target Platform**: FAIMS3 (Fieldmark) v1.0  
**Overall Feature Parity**: ~90%
**Enhanced Features**: HRIDs, Parent-Child Relationships

## Migration Methodology

### Analysis Process
1. Examined module structure including data_schema.xml, ui_schema.xml, validation.xml, and ui_logic.bsh
2. Mapped all fields, vocabularies, and UI elements to FAIMS3 equivalents
3. Identified custom Beanshell functions requiring adaptation
4. Preserved all field names and vocabulary values for data compatibility

### Key Decisions
- Prioritized data collection functionality over advanced UI features
- Consolidated multiple coordinate fields into single GPS capture
- Maintained exact vocabulary values for backwards compatibility
- Separated image references into external documentation
- Added Human-Readable IDs for all records
- Implemented parent-child relationships for shape annotations

## Detailed Feature Mapping

### Successfully Migrated Features

| FAIMS2 Feature | FAIMS3 Implementation | Notes |
|----------------|----------------------|-------|
| **Entity: Shelter** | viewset: shelter-record | Full structural preservation + HRID |
| **Entity: Shape** | viewset: shape-annotation | Child of Shelter with HRID |
| **27 Shelter fields** | 29 fields (+ HRID + relationships) | All data fields preserved + enhancements |
| **Auto-increment ID** | BasicAutoIncrementer | Direct component mapping |
| **User/timestamp** | TextField + DateTimeNow | Auto-population preserved |
| **GPS capture** | TakePoint component | Enhanced with single capture |
| **Photo fields (4)** | TakePhoto components | Direct mapping |
| **Vocabularies (11)** | Select components | Text-only but complete |
| **Required validation** | Yup validation schemas | All requirements preserved |
| **Tab structure** | fviews sections | General/Access/Interior maintained |

### Simplified Features

| FAIMS2 Feature | FAIMS3 Simplification | Impact |
|----------------|----------------------|--------|
| **Picture vocabularies** | Text-only Select | Images moved to separate guide |
| **5 coordinate fields** | Single TakePoint + conditionals | Cleaner UI, same data |
| **WebView guide** | External documentation | No embedded HTML |
| **Map with shapes** | Point capture only | Basic spatial recording |
| **incAutoNum() function** | BasicAutoIncrementer | Native component |
| **populateAuthorAndTimestamp()** | Template + component | Declarative approach |

### Feature Conversion Details

#### 1. Auto-incrementing Feature ID
- **FAIMS2**: Custom `incAutoNum("Shelter/General/Feature_ID")` Beanshell function
- **FAIMS3**: BasicAutoIncrementer component with automatic increment
- **Rationale**: Native component provides same functionality without custom code

#### 2. GPS Coordinate Handling
- **FAIMS2**: Separate fields for Latitude, Longitude, Northing, Easting, Accuracy
- **FAIMS3**: Single TakePoint capturing all data, with conditional manual entry fields
- **Rationale**: Simplified UI while preserving manual entry option for edge cases

#### 3. Picture Vocabularies
- **FAIMS2**: Embedded images in dropdown options via pictureURL attribute
- **FAIMS3**: Text descriptions with separate image reference guide
- **Rationale**: FAIMS3 Select component doesn't support embedded images

#### 4. Author/Timestamp Population
- **FAIMS2**: `populateAuthorAndTimestamp()` function called on entity creation
- **FAIMS3**: 
  - Author: TextField with `initialValue: "{{user}}"`
  - Timestamp: DateTimeNow component with auto-capture
- **Rationale**: Declarative configuration replaces imperative code

#### 5. HTML Content
- **FAIMS2**: WebView displaying HTML guide with embedded images
- **FAIMS3**: Removed in favor of external documentation
- **Rationale**: No WebView equivalent; RichText insufficient for complex HTML

#### 6. Validation Implementation
- **FAIMS2**: validation.xml with blankchecker validators
- **FAIMS3**: Yup validation arrays on each field
- **Mapping**: All 13 required fields maintained with `["yup.required"]`

### Features Omitted

| Feature | Reason | Workaround |
|---------|--------|------------|
| **GPS diagnostics display** | No equivalent component | Use device GPS status |
| **Dynamic navigation buttons** | No runtime UI manipulation | Standard navigation |
| **Duplicate with photo clearing** | No custom duplication logic | Manual process |
| **Search by author filter** | No dynamic user list | Use general search |
| **Complex map shapes** | Limited geometry support | Point capture only |
| **Custom Beanshell logic** | No scripting engine | Native components |

### Enhanced Features (FAIMS3 Additions)

| Feature | Implementation | Benefit |
|---------|---------------|----------|
| **Human-Readable IDs** | TemplatedStringField | Records identifiable by "Shelter_Type_I-00001" instead of UUIDs |
| **Parent-Child Relationships** | RelatedRecordSelector | Shape annotations explicitly linked to parent shelters |
| **Hierarchical Data** | Relationship fields | Export preserves shelter→shape hierarchy |
| **Auto-generated HRIDs** | Template patterns | Consistent identification across all records |

#### Human-Readable ID Patterns
- **Shelter**: `{{feature-type}}-{{feature-id}}` → "Shelter_Type_I-00001"
- **Shape**: `SHAPE-{{shape-id}}` → "SHAPE-00001"

#### Relationship Structure
- Shelter Record contains `shape-annotations` field
- Shape Annotations created as children from Shelter's Related Records tab
- Parent reference automatically maintained
- No orphaned shape annotations possible

## Data Model Preservation

### Field Name Mapping
All original field names preserved with kebab-case conversion:
- `Feature_ID` → `feature-id`
- `Shelter_author` → `shelter-author`
- `Emergency_Exit_Shape` → `emergency-exit-shape`

### Vocabulary Value Preservation
All 80+ vocabulary terms maintained exactly:
- `Shelter_Type_I` through `Shelter_Type_VI`
- Direction codes (N, NE, E, SE, etc.)
- All "Other" and "NA" options preserved

### Data Type Compatibility
| FAIMS2 Type | FAIMS3 Type | Compatible |
|-------------|-------------|------------|
| measure | faims-core::String/Number | ✓ |
| vocab | faims-core::String | ✓ |
| file | faims-attachment::Files | ✓ |

## Implementation Challenges

### 1. Picture Vocabulary Migration
**Challenge**: FAIMS3 Select component lacks image support  
**Solution**: Maintained vocabulary structure with detailed helperText and separate image guide  
**Impact**: Users must reference external guide for visual shelter type identification

### 2. Coordinate System Handling
**Challenge**: Multiple coordinate systems (Lat/Long + Northing/Easting) in single record  
**Solution**: Primary TakePoint capture with conditional manual fields  
**Impact**: Slightly more complex for manual coordinate entry

### 3. HTML Guide Content
**Challenge**: Complex HTML with embedded images in WebView  
**Solution**: Comprehensive external documentation  
**Impact**: Users must access guide outside the app

### 4. Auto-increment Synchronization
**Challenge**: Multi-user increment coordination  
**Solution**: BasicAutoIncrementer handles this natively  
**Impact**: Improved reliability over custom implementation

## Testing Recommendations

### Field Testing Required
1. **GPS capture** in urban environments with poor signal
2. **Photo capture** workflow for 4 photo fields per record
3. **Auto-increment** behavior with multiple concurrent users
4. **Validation** triggering for all 13 required fields
5. **Data export** format compatibility with existing data

### User Acceptance Testing
1. Reference image availability for shelter types
2. Coordinate entry workflow (GPS vs manual)
3. Multi-section form navigation
4. Photo documentation process
5. Field description clarity

## Migration Instructions

### For System Administrators
1. Deploy JSON notebook definition to FAIMS3 server
2. Configure user access permissions
3. Provide separate image reference guides to field teams
4. Set up data synchronization schedule

### For Existing Data
1. Export FAIMS2 data using standard export
2. Transform field names to match new schema
3. Import using FAIMS3 data import tools
4. Verify coordinate data integrity
5. Re-link photo attachments

### For Field Teams
1. Review new documentation before fieldwork
2. Download reference images to devices
3. Practice GPS capture in test environment
4. Understand validation requirements
5. Learn new photo capture workflow

## Conclusions

### Successes
- All core data fields successfully migrated
- Validation logic fully preserved
- Photo documentation workflow maintained
- GPS capture actually improved (single action)
- Multi-user support retained

### Limitations
- No embedded images in vocabularies
- Simplified map interaction
- Loss of custom UI behaviors
- External guide requirement
- Manual coordinate entry more complex

### Recommendations
1. Create laminated field reference cards for shelter types
2. Develop training materials highlighting UI changes
3. Consider future enhancement for image-enabled selections
4. Monitor user feedback on GPS capture workflow
5. Plan for potential custom extensions as FAIMS3 evolves

### FAIMS3 Enhancements Beyond Original
The migration process identified opportunities to enhance the original FAIMS2 design:

1. **Human-Readable IDs**: All records now have meaningful identifiers visible in lists and exports
2. **Explicit Relationships**: Shape annotations are properly linked as children of shelters
3. **Data Integrity**: Parent-child relationships prevent orphaned annotations
4. **Improved Export**: Hierarchical data structure maintained in exports
5. **Better User Experience**: HRIDs make record selection and identification easier

## Appendix: Vocabulary Migration Table

### Feature Type Vocabulary
| FAIMS2 Value | FAIMS3 Value | Image Reference |
|--------------|--------------|-----------------|
| {Shelter_Type_I} | Shelter_Type_I | Type1.jpg |
| {Shelter_Type_II} | Shelter_Type_II | Type2.jpg |
| {Shelter_Type_III} | Shelter_Type_III | Type3.jpg |
| {Shelter_Type_IV} | Shelter_Type_IV | Type4.jpg |
| {Shelter_Type_V} | Shelter_Type_V | Type5.jpg |
| {Shelter_Type_VI} | Shelter_Type_VI | Type6.jpg |
| {Bunker} | Bunker | N/A |
| {Emergency_hospital} | Emergency_hospital | N/A |
| {Observation_post} | Observation_post | N/A |
| {Other} | Other | N/A |

### Number of Iterations Vocabulary
| FAIMS2 Value | FAIMS3 Value | Image Reference |
|--------------|--------------|-----------------|
| {1} | 1 | Subtypes1.jpg |
| {2} | 2 | Subtypes2a_d.jpg, Subtypes2e_m.jpg |
| {3} | 3 | Subtypes3.jpg |
| {4} | 4 | Subtypes4.jpg |
| {5} | 5 | Subtypes5.jpg |
| {Indeterminate} | Indeterminate | N/A |
| {Other} | Other | N/A |
| {NA} | NA | N/A |

*All other vocabularies follow similar direct value mapping*

---
*Migration completed by FAIMS3 Migration Tool v1.0*