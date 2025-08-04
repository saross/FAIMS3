# FAIMS2.x to FAIMS3.x Feature Mapping Analysis

## Overview

This document provides a comprehensive mapping of features between FAIMS2.x (legacy XML-based system) and FAIMS3.x/Fieldmark (modern JSON-based system). Based on extensive analysis of the codebase, successful migrations of multiple notebooks (MEMSAP Survey 2016, EMSA Camera Traps, EMSA Coarse Woody Debris, Archaeological Artefact Recording), and hands-on experience with the latest FAIMS3 release, this mapping identifies equivalent features, simplifications required, and features with no direct equivalent.

**Last Updated**: Based on FAIMS3 release as of January 2025 and practical migration experience.

## 1. Core Architecture Comparison

| Aspect | FAIMS2.x | FAIMS3.x | Migration Notes |
|--------|----------|----------|-----------------|
| **File Format** | Multiple XML files + Beanshell | Single JSON file | All definitions must be consolidated |
| **UI Definition** | ui_schema.xml | ui-specification object | Structure conversion required |
| **Data Schema** | data_schema.xml (immutable) | Implicit in field definitions | Less rigid, more flexible |
| **Logic/Behavior** | ui_logic.bsh (Beanshell scripts) | Limited to conditions and actions | Complex logic requires simplification |
| **Validation** | validation.xml | validationSchema arrays (Yup) | Direct mapping possible |
| **Styling** | ui_styling.css | Limited inline styling (variant, fullWidth) | Visual customization reduced |
| **Translations** | arch16n files | Not directly supported | Single language per notebook |
| **Required Fields** | XML attributes | `visible_types` array, `publishButtonBehaviour` | Critical for notebook to load |

## 2. UI Component Mapping

### Text Input Fields

| FAIMS2.x | FAIMS3.x Equivalent | Component Namespace | Notes |
|----------|---------------------|-------------------|-------|
| `<input>` (default text) | TextField | formik-material-ui | Direct mapping |
| `<input f="notnull">` | TextField with required:true | formik-material-ui | Validation preserved |
| Multi-line text | MultipleTextField | formik-material-ui | Use `multiline:true` and `InputProps.rows` |
| Formatted text | RichText | faims-custom | Enhanced capability in 3.x |
| Auto-generated IDs | BasicAutoIncrementer | faims-custom | Requires `form_id` parameter |
| Human-readable IDs | TemplatedStringField | faims-custom | **Best practice** for HRIDs |

### Selection Fields

| FAIMS2.x | FAIMS3.x Equivalent | Component Namespace | Notes |
|----------|---------------------|-------------------|-------|
| `<input t="dropdown">` | Select | faims-custom | Use `ElementProps.options` array |
| `<input t="radio">` | RadioGroup | faims-custom | Use `ElementProps.options` array |
| `<input t="checkbox">` | Checkbox | faims-custom | Single boolean value |
| `<input t="list">` | MultiSelect | faims-custom | Use `SelectProps.multiple:true` |
| Hierarchical vocabularies | AdvancedSelect | faims-custom | Supports nested options |
| Picture vocabularies | Select with labels only | faims-custom | Images not supported in dropdowns |
| Controlled vocabularies | Select/MultiSelect | faims-custom | Options array with value/label pairs |

### Special Fields

| FAIMS2.x | FAIMS3.x Equivalent | Component Namespace | Notes |
|----------|---------------------|-------------------|-------|
| `<input t="audio">` | FileUploader | faims-custom | Generic file upload, no recording UI |
| `<input t="video">` | FileUploader | faims-custom | Generic file upload, no recording UI |
| `<input t="camera">` | TakePhoto | faims-custom | Direct mapping, multiple photos supported |
| `<input t="file">` | FileUploader | faims-custom | Direct mapping |
| `<input t="gpsdiag">` | TakePoint | faims-custom | Returns faims-pos::Location object |
| `<input t="map">` | MapFormField | mapping-plugin | Points, lines, polygons supported |
| `<input t="web">` | No equivalent | - | Feature lost |
| `<input t="qrcode">` | QRCodeFormField | qrcode | Namespace: qrcode, not faims-custom |

### Date/Time Fields

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| Date input | DatePicker | Direct mapping |
| Datetime input | DateTimePicker or DateTimeNow | Now button available |
| Custom date formats | Limited to standard formats | Some flexibility lost |

### Structural Elements

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| Tab groups | viewsets | Conceptual mapping |
| Tabs | fviews | Direct mapping as sections |
| Column groups | No direct equivalent | Use field order |
| `<desc>` help text | helperText parameter | Direct mapping |

## 3. Data Model Features

### Entity Management

| FAIMS2.x Feature | FAIMS3.x Equivalent | Notes |
|------------------|---------------------|-------|
| Entity types (ArchaeologicalElement) | Record types (viewsets) | Simplified structure |
| Entity relationships | RelatedRecordSelector | Basic relationships only |
| Hierarchical relationships | Parent-child in RelatedRecordSelector | Limited hierarchy support |
| Entity attributes | Field definitions | Direct mapping |
| isIdentifier properties | hrid in TemplatedStringField | Human-readable IDs |

### Validation

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| Required fields (`f="notnull"`) | `["yup.required"]` | Direct mapping |
| Type validation | Yup type validators | Enhanced validation |
| Custom validation (Beanshell) | Limited to Yup schemas | Complex validation lost |
| Validation warnings | Not supported | Only hard validation |

### Data Types

| FAIMS2.x Type | FAIMS3.x Type | Notes |
|---------------|---------------|-------|
| measure | faims-core::Integer | **CRITICAL**: Use Integer, not Number |
| vocab | faims-core::String (with options) | Direct mapping |
| file | faims-attachment::Files | Direct mapping |
| checkbox | faims-core::Bool | Boolean type |
| multi-select | faims-core::Array | Array of strings |
| GPS location | faims-pos::Location | Object with lat/lon/accuracy |
| Related records | faims-core::Relationship | Requires relation_type parameter |

## 4. Critical Implementation Details (From Experience)

### Mandatory Fields for Valid Notebooks

| Field | Location | Required Value | Common Error |
|-------|----------|----------------|--------------|
| `visible_types` | ui-specification | Array of viewset IDs | Empty array = nothing displays |
| `publishButtonBehaviour` | Each viewset | "always", "visited", or "noErrors" | Missing = notebook won't load |
| `label` | component-parameters | Field label string | In InputLabelProps = field won't render |
| `name` | component-parameters | Must match field ID | Mismatch = validation errors |
| `meta` object | Each field | annotation & uncertainty objects | Missing = import fails |

### Validation Schema Patterns (Yup)

| Type | Required | Optional | Notes |
|------|----------|----------|-------|
| String | `[["yup.string"], ["yup.required"]]` | `[["yup.string"]]` | NO yup.nullable for strings! |
| Number | `[["yup.number"], ["yup.required"]]` | `[["yup.number"]]` | Use with TextField type="number" |
| Boolean | `[["yup.boolean"]]` | Same | For Checkbox component |
| Array | `[["yup.array"]]` | Same | For MultiSelect, relationships |
| Object | `[["yup.object"], ["yup.required"]]` | `[["yup.object"], ["yup.nullable"]]` | For GPS, photos |
| TakePhoto | Special pattern | - | `[["yup.array"], ["yup.of", [["yup.object"], ["yup.nullable"]]], ["yup.nullable"]]` |

### Component-Specific Requirements

| Component | Critical Parameters | Common Mistakes |
|-----------|-------------------|-----------------|
| BasicAutoIncrementer | `form_id` must match viewset ID | Wrong form_id = no increment |
| TemplatedStringField | `template` with {{field}} syntax | Missing fields = empty output |
| RelatedRecordSelector | `related_type`, `relation_type` | Missing = no relationships |
| TakePoint | Returns object, not string | Wrong validation = errors |
| Select/MultiSelect | `ElementProps.options` array | Wrong structure = empty dropdown |

## 5. Advanced Features Requiring Simplification

### Geospatial Features

| FAIMS2.x Capability | FAIMS3.x Alternative | Impact |
|---------------------|---------------------|--------|
| GPS tracklog | TakePoint (start/end only) | No continuous tracking |
| External GPS integration | Device-handled via OS | Works with Bluetooth GPS |
| Northing/Easting display | Lat/Long only | Post-processing needed |
| Complex polygon editing | MapFormField (mapping-plugin) | Full support for points, lines, polygons |
| Multiple geometry types | Single type per field | Use featureType parameter |
| Spatial queries | Not supported | Feature lost |
| GIS layer management | Automatic tile server | Requires internet, offline experimental |
| Coordinate transformations | Not supported | Manual conversion needed |
| GPS accuracy display | Included in Location object | Automatic capture |
| Drawing on maps | MapFormField | Interactive drawing of features |
| Feature editing | MapFormField | Can edit drawn features |
| GeoJSON export | MapFormField returns GeoJSON | Standard format for GIS |

### Custom Logic

| FAIMS2.x (Beanshell) | FAIMS3.x Alternative | Impact |
|----------------------|---------------------|--------|
| Database queries | Not supported | Pre-populate options |
| Dynamic UI generation | Conditional fields only | Limited dynamism |
| Custom calculations | TemplatedStringField for simple cases | Complex logic lost |
| Event handlers | ActionButton for simple triggers | Limited interactivity |
| External integrations | Not supported | Feature lost |

### User Management

| FAIMS2.x | FAIMS3.x | Notes |
|----------|----------|-------|
| Server-synced users | Role-based access | Simplified permissions |
| `f="user"` dropdowns | Manual user list in options | No dynamic updates |
| Team synchronization | Project-level access | Different paradigm |

## 5. Features with No Direct Equivalent

The following FAIMS2.x features have no direct equivalent in FAIMS3.x:

1. **Web views** - Embedded web content
2. **Custom Beanshell scripts** - Complex programmatic logic
3. **Dynamic vocabulary updates** - Runtime vocabulary changes
4. **Multi-language support** - Arch16n translations
5. **CSS styling** - Visual customization
6. **Audio/video recording UI** - Only file upload available
7. **Validation warnings** - Soft validation with "dirty" flags
8. **Complex spatial analysis** - Advanced GIS features
9. **External system integration** - API calls, external databases
10. **Custom search interfaces** - Only basic search available

## 6. Migration Strategy Recommendations

### High Priority (Direct Mapping Available)
- Text fields, selections, dates
- Basic validation rules
- File/photo uploads
- Simple relationships
- GPS point capture

### Medium Priority (Requires Adaptation)
- Hierarchical vocabularies → AdvancedSelect
- Column layouts → Sequential fields
- Entity identifiers → TemplatedStringField
- Basic calculations → Templates

### Low Priority (Major Rework Required)
- Complex Beanshell logic
- Advanced GIS features
- Dynamic UI generation
- External integrations

### Not Migratable
- Web views
- Audio/video recording interfaces
- Multi-language support
- Custom styling
- Validation warnings

## 7. Lessons Learned from Specific Migrations

### MEMSAP Survey 2016
- **Challenge**: Complex team-based ID formatting (e.g., "A-00001-SU")
- **Solution**: TemplatedStringField with team selection + auto-increment
- **Result**: Human-readable IDs maintained with simpler implementation

### EMSA Camera Traps
- **Challenge**: Multiple viewsets (3) with complex conditional logic
- **Solution**: Tab-based layout with clear separation of concerns
- **Result**: Cleaner UI with better mobile experience

### EMSA Coarse Woody Debris
- **Challenge**: Validation errors with numeric fields
- **Discovery**: Must use faims-core::Integer, not faims-core::Number
- **Result**: Critical bug fix documented for future migrations

### Archaeological Artefact Recording
- **Challenge**: Simple structure but missing required fields
- **Solution**: Added visible_types and publishButtonBehaviour
- **Result**: Template for minimal viable notebook

## 8. Best Practices Discovered

1. **Always include HRIDs**: Use TemplatedStringField for human-readable identifiers
2. **Test incrementally**: Add fields in small batches to isolate errors
3. **Use fullWidth**: Better mobile experience with fullWidth: true
4. **Simplify relationships**: Flatten complex hierarchies into viewset choices
5. **Document limitations**: Clear user documentation about missing features
6. **Preserve vocabularies**: Exact term matching for data compatibility

## 9. Expected Feature Parity

Based on practical migration experience, the expected feature parity varies by module type:
- **Simple data collection**: 95% (most features directly map)
- **Complex surveys**: 90% (improved with MapFormField for drawing)
- **Highly customized modules**: 70% (loss of Beanshell logic)
- **Media-heavy workflows**: 80% (no recording UI)

The main losses are in:
- Advanced customization (scripts, styling)
- Offline GIS layers (requires internet for base maps)
- Dynamic behaviors
- Multimedia recording interfaces
- Background services (GPS tracking)

Notable improvements in FAIMS3:
- Interactive map drawing (points, lines, polygons)
- Better mobile experience
- Simplified relationship management
- Modern validation framework (Yup)
- GeoJSON standard for spatial data

Most core data collection functionality can be preserved through careful adaptation and simplification of module designs. The modern UI and offline capabilities often compensate for lost features.