# FAIMS2.x to FAIMS3.x Feature Mapping Analysis

## Overview

This document provides a comprehensive mapping of features between FAIMS2.x (legacy XML-based system) and FAIMS3.x (modern JSON-based system). Based on analysis of the documentation and example modules, this mapping identifies equivalent features, simplifications required, and features with no direct equivalent.

## 1. Core Architecture Comparison

| Aspect | FAIMS2.x | FAIMS3.x | Migration Notes |
|--------|----------|----------|-----------------|
| **File Format** | Multiple XML files + Beanshell | Single JSON file | All definitions must be consolidated |
| **UI Definition** | ui_schema.xml | ui-specification object | Structure conversion required |
| **Data Schema** | data_schema.xml (immutable) | Implicit in field definitions | Less rigid, more flexible |
| **Logic/Behavior** | ui_logic.bsh (Beanshell scripts) | Limited to conditions and actions | Complex logic requires simplification |
| **Validation** | validation.xml | validationSchema arrays (Yup) | Direct mapping possible |
| **Styling** | ui_styling.css | Limited inline styling | Visual customization reduced |
| **Translations** | arch16n files | Not directly supported | Single language per notebook |

## 2. UI Component Mapping

### Text Input Fields

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| `<input>` (default text) | TextField | Direct mapping |
| `<input f="notnull">` | TextField with required:true | Validation preserved |
| Multi-line text | MultipleTextField | Direct mapping |
| Formatted text | RichText | Enhanced capability in 3.x |

### Selection Fields

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| `<input t="dropdown">` | Select | Direct mapping |
| `<input t="radio">` | RadioGroup | Direct mapping |
| `<input t="checkbox">` | Checkbox (single) or MultiSelect (multiple) | Context dependent |
| `<input t="list">` | MultiSelect | For multiple selections |
| Hierarchical vocabularies | AdvancedSelect | Supports nested options |
| Picture vocabularies | Select with labels only | Images not supported in dropdowns |

### Special Fields

| FAIMS2.x | FAIMS3.x Equivalent | Notes |
|----------|---------------------|-------|
| `<input t="audio">` | FileUploader | Generic file upload, no recording UI |
| `<input t="video">` | FileUploader | Generic file upload, no recording UI |
| `<input t="camera">` | TakePhoto | Direct mapping |
| `<input t="file">` | FileUploader | Direct mapping |
| `<input t="gpsdiag">` | TakePoint | Simplified GPS capture |
| `<input t="map">` | MapFormField | Basic mapping only |
| `<input t="web">` | No equivalent | Feature lost |
| `<input t="qrcode">` | QRCodeFormField | Direct mapping |

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
| measure | faims-core::String or faims-core::Number | Context dependent |
| vocab | faims-core::String (with options) | Direct mapping |
| file | faims-attachment::Files | Direct mapping |

## 4. Advanced Features Requiring Simplification

### Geospatial Features

| FAIMS2.x Capability | FAIMS3.x Alternative | Impact |
|---------------------|---------------------|--------|
| Complex polygon editing | Basic polygon drawing | Reduced precision |
| Multiple geometry types | Single type per field | Separate fields needed |
| Spatial queries | Not supported | Feature lost |
| GIS layer management | Single GeoTIFF overlay | Simplified mapping |
| Coordinate transformations | Not supported | Manual conversion needed |

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

## 7. Expected Feature Parity

Based on this analysis, the expected feature parity of ~85% is realistic for most archaeological and field data collection use cases. The main losses are in:
- Advanced customization (scripts, styling)
- Complex geospatial capabilities  
- Dynamic behaviors
- Multimedia recording interfaces

Most core data collection functionality can be preserved through careful adaptation and simplification of module designs.