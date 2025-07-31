# FAIMS3 Notebook JSON Format Documentation (Updated)

## Overview

FAIMS3 notebooks are defined using JSON files that specify the structure, fields, and behavior of electronic field notebooks. This document provides comprehensive documentation of the JSON format required to create functional notebooks, updated to reflect the latest changes in the codebase.

## JSON Structure

A notebook JSON file consists of two main sections:

```json
{
  "metadata": { /* Notebook metadata */ },
  "ui-specification": { /* UI components and structure */ }
}
```

## 1. Metadata Section

The `metadata` object contains notebook-level configuration:

### Required Fields:
- `name` (string): The display name of the notebook
- `notebook_version` (string): Version of this notebook (e.g., "1.0")
- `schema_version` (string): Schema version (e.g., "1.0")

### Optional Fields:
- `project_id` (string): Unique project identifier
- `project_lead` (string): Project leader's name
- `lead_institution` (string): Lead institution name
- `pre_description` (string): Project description
- `project_status` (string): Current status (e.g., "New", "Active")
- `ispublic` (boolean): Whether the notebook is public
- `isrequest` (boolean): Whether this is a request
- `showQRCodeButton` (boolean): Show QR code button in UI
- `accesses` (array): Available access levels (e.g., ["admin", "moderator", "team"])
- `filenames` (array): Associated files
- `access` (object): Form-specific access controls
- `forms` (object): Form-level settings (annotations, visibility, etc.)
- `behaviours` (object): Custom behaviors
- `meta` (object): Additional metadata

### Example:
```json
{
  "metadata": {
    "name": "Archaeological Survey",
    "notebook_version": "1.0",
    "schema_version": "1.0",
    "project_lead": "Dr. Smith",
    "lead_institution": "University X",
    "pre_description": "Survey of archaeological sites",
    "project_status": "Active",
    "ispublic": false,
    "accesses": ["admin", "moderator", "team"]
  }
}
```

## 2. UI Specification Section

The `ui-specification` object defines the notebook's user interface:

```json
{
  "ui-specification": {
    "fields": { /* Field definitions */ },
    "fviews": { /* Form sections/views */ },
    "viewsets": { /* Groups of views */ },
    "visible_types": [ /* Which viewsets to show */ ]
  }
}
```

### 2.1 Fields

Each field is defined with a unique ID as the key:

```json
{
  "field-id": {
    "component-namespace": "namespace",
    "component-name": "ComponentName",
    "type-returned": "data-type",
    "component-parameters": { /* Component-specific params */ },
    "validationSchema": [ /* Validation rules */ ],
    "initialValue": /* Default value */,
    "meta": { /* Annotations and uncertainty */ },
    "condition": { /* Conditional display */ },
    "access": [ /* Access roles */ ],
    "persistent": false,
    "displayParent": false
  }
}
```

### 2.2 Available Components (Updated List)

#### Text Input Components
| Component | Namespace | Type Returned | Description |
|-----------|-----------|---------------|-------------|
| TextField | formik-material-ui | faims-core::String | Basic text input |
| MultipleTextField | formik-material-ui | faims-core::String | Multi-line text |
| FAIMSTextField | faims-custom | faims-core::String | Simple text field |
| NumberField | faims-custom | faims-core::Number | Numeric input |
| RichText | faims-custom | faims-core::String | Rich text editor |

#### Selection Components
| Component | Namespace | Type Returned | Description |
|-----------|-----------|---------------|-------------|
| Select | faims-custom | faims-core::String | Single selection dropdown |
| MultiSelect | faims-custom | faims-core::Array | Multiple selection |
| AdvancedSelect | faims-custom | faims-core::String | Hierarchical picker |
| Checkbox | faims-custom | faims-core::Bool | Checkbox field |
| RadioGroup | faims-custom | faims-core::String | Radio buttons |

#### Date/Time Components
| Component | Namespace | Type Returned | Description |
|-----------|-----------|---------------|-------------|
| DatePicker | faims-custom | faims-core::Date | Date picker |
| DateTimePicker | faims-custom | faims-core::Datetime | Date and time picker |
| MonthPicker | faims-custom | faims-core::String | Month picker |
| DateTimeNow | faims-custom | faims-core::Datetime | DateTime with Now button |

#### Special Components
| Component | Namespace | Type Returned | Description |
|-----------|-----------|---------------|-------------|
| BasicAutoIncrementer | faims-custom | faims-core::String | Auto-incrementing ID |
| TemplatedStringField | faims-custom | faims-core::String | Template-based field |
| RelatedRecordSelector | faims-custom | faims-core::Relationship | Record relationships |
| RandomStyle | faims-custom | faims-core::String | Title/subtitle display |
| ActionButton | faims-custom | faims-core::String | Action trigger button |
| FileUploader | faims-custom | faims-attachment::Files | File upload |

#### Location/Media Components
| Component | Namespace | Type Returned | Description |
|-----------|-----------|---------------|-------------|
| TakePoint | faims-custom | faims-pos::Location | GPS capture |
| AddressField | faims-custom | faims-core::JSON | Address input |
| MapFormField | mapping-plugin | faims-core::JSON | Map-based input |
| TakePhoto | faims-custom | faims-attachment::Files | Camera capture |
| QRCodeFormField | qrcode | faims-core::String | QR/barcode scanner |

### 2.3 Component Parameters

Common parameters across most components:
- `label`: Display label
- `name`: Field identifier (must match field ID)
- `id`: HTML element ID
- `helperText`: Help text below field
- `fullWidth`: Make field full width (boolean)
- `variant`: Visual variant (usually "outlined")
- `required`: Whether field is required (boolean)
- `InputProps`: Additional input properties (e.g., `{type: "color"}`)
- `advancedHelperText`: Extended help text in modal (NEW)
- `protection`: Field protection level (NEW) - "protected" | "allow-hiding" | "none"

Component-specific parameters vary by type. Examples:

#### Select/MultiSelect:
```json
{
  "ElementProps": {
    "options": [
      {"label": "Option 1", "value": "opt1"},
      {"label": "Option 2", "value": "opt2"}
    ]
  }
}
```

#### TemplatedStringField:
```json
{
  "template": "{{field1}}-{{field2}}",
  "hrid": true  // Use as human-readable ID
}
```

#### AdvancedSelect (Hierarchical Dropdown):
```json
{
  "ElementProps": {
    "options": [
      {
        "name": "Plate",
        "children": [
          {
            "name": "Large",
            "children": []
          },
          {
            "name": "Medium",
            "children": []
          },
          {
            "name": "Small",
            "children": []
          }
        ]
      },
      {
        "name": "Bowl",
        "children": [
          {
            "name": "Deep",
            "children": []
          },
          {
            "name": "Shallow",
            "children": []
          }
        ]
      }
    ]
  }
}
```

Note: Each option must have a `name` property and a `children` array. The children array contains objects with the same structure, allowing for multiple levels of hierarchy. Even leaf nodes (final options) must have an empty `children` array.

#### MapFormField:
```json
{
  "featureType": "Point",  // or "Polygon", "LineString"
  "zoom": 12,
  "geoTiff": ""  // Optional GeoTIFF overlay
}
```

#### RelatedRecordSelector:
```json
{
  "related_type": "FormName",
  "relation_type": "faims-core::Child",  // or "is-related-to"
  "multiple": true,
  "allowLinkToExisting": false  // NEW - allows linking existing records
}
```

### 2.4 Validation Schema (Updated)

Validation uses Yup validation library with array syntax. **Important**: The validation requirements have changed:

#### For Required Fields:
```json
"validationSchema": [
  ["yup.string"],
  ["yup.required"]
]
```

#### For Non-Required String Fields:
```json
"validationSchema": [
  ["yup.string"]
]
```
Note: Non-required string fields typically do NOT use `["yup.nullable"]`

#### For Non-Required Object Fields (photos, locations, etc.):
```json
"validationSchema": [
  ["yup.object"],
  ["yup.nullable"]
]
```

#### Common validation types:
- `["yup.string"]` - String validation
- `["yup.number"]` - Number validation
- `["yup.bool"]` - Boolean validation
- `["yup.array"]` - Array validation
- `["yup.object"]` - Object validation
- `["yup.mixed"]` - Any type
- `["yup.required"]` - Field is required
- `["yup.nullable"]` - Can be null (mainly for object types)
- `["yup.min", value]` - Minimum value/length
- `["yup.max", value]` - Maximum value/length
- `["yup.matches", regex]` - Pattern matching

#### Special Cases:
- **RelatedRecordSelector with multiple=true**: Use array validation
```json
"validationSchema": [["yup.array"]]
```
- **RelatedRecordSelector with multiple=false**: Use string validation
```json
"validationSchema": [["yup.string"]]
```

### 2.5 Meta Options

The `meta` object controls annotations and uncertainty:

```json
"meta": {
  "annotation": {
    "include": true,
    "label": "annotation"
  },
  "uncertainty": {
    "include": true,
    "label": "uncertainty"
  }
}
```

Note: Some fields use the older format `"annotation_label": "annotation", "annotation": true` which is automatically migrated.

### 2.6 Conditional Display

Fields can be conditionally shown based on other field values:

```json
"condition": {
  "operator": "equal",
  "field": "other-field-id",
  "value": "expected-value"
}
```

Or complex conditions:
```json
"condition": {
  "operator": "and",
  "conditions": [
    {
      "operator": "equal",
      "field": "field1",
      "value": "value1"
    },
    {
      "operator": "not-equal",
      "field": "field2",
      "value": "value2"
    }
  ]
}
```

Operators: `equal`, `not-equal`, `and`, `or`

### 2.7 Form Structure

#### fviews (Form Views/Sections)
Define sections of fields:

```json
"fviews": {
  "section-id": {
    "label": "Section Label",
    "fields": ["field1", "field2", "field3"],
    "uidesign": "form"  // Optional, defaults to "form"
  }
}
```

#### viewsets (Form Types)
Group sections into complete forms:

```json
"viewsets": {
  "form-type": {
    "label": "Form Label",
    "views": ["section1", "section2"],
    "hridField": "field-id",  // NEW - specifies Human Readable ID field
    "layout": "inline",  // NEW - "inline" or "tabs"
    "summary_fields": ["field1", "field2"],  // NEW - fields for summaries
    "publishButtonBehaviour": "noErrors"  // NEW - "always" | "visited" | "noErrors"
  }
}
```

#### visible_types
Array of viewset IDs to display:

```json
"visible_types": ["form-type1", "form-type2"]
```

## 3. New Features and Changes

### 3.1 Field Protection
Fields can now have protection levels:
```json
"component-parameters": {
  "protection": "protected"  // Field cannot be edited or hidden
  // OR
  "protection": "allow-hiding"  // Field can be hidden but not edited
  // OR
  "protection": "none"  // Field can be edited and hidden (default)
}
```

### 3.2 Advanced Helper Text
Fields can have extended help in a modal dialog:
```json
"component-parameters": {
  "helperText": "Brief help text",
  "advancedHelperText": "# Detailed Help\n\nMarkdown formatted extended help..."
}
```

### 3.3 Human Readable ID (HRID)
HRIDs are now specified at the viewset level instead of field level:
```json
"viewsets": {
  "Record": {
    "label": "Record",
    "views": ["main-section"],
    "hridField": "record-id-field"  // Specify which field is the HRID
  }
}
```

### 3.4 Publish Button Behavior
Control when the publish/save button is enabled:
```json
"viewsets": {
  "Record": {
    "publishButtonBehaviour": "noErrors"  // Only enable when no validation errors
  }
}
```

## 4. Complete Example (Updated)

```json
{
  "metadata": {
    "name": "Simple Survey",
    "notebook_version": "1.0",
    "schema_version": "1.0",
    "accesses": ["admin", "moderator", "team"]
  },
  "ui-specification": {
    "fields": {
      "site-id": {
        "component-namespace": "faims-custom",
        "component-name": "BasicAutoIncrementer",
        "type-returned": "faims-core::String",
        "component-parameters": {
          "label": "Site ID",
          "name": "site-id",
          "helperText": "Auto-generated site identifier",
          "fullWidth": true,
          "num_digits": 4,
          "form_id": "site-record"
        },
        "validationSchema": [["yup.string"], ["yup.required"]],
        "initialValue": "",
        "meta": {
          "annotation": {
            "include": false
          },
          "uncertainty": {
            "include": false
          }
        }
      },
      "site-name": {
        "component-namespace": "formik-material-ui",
        "component-name": "TextField",
        "type-returned": "faims-core::String",
        "component-parameters": {
          "label": "Site Name",
          "name": "site-name",
          "helperText": "Enter the site name",
          "fullWidth": true,
          "required": true,
          "protection": "none"
        },
        "validationSchema": [["yup.string"], ["yup.required"]],
        "initialValue": ""
      },
      "site-type": {
        "component-namespace": "faims-custom",
        "component-name": "Select",
        "type-returned": "faims-core::String",
        "component-parameters": {
          "label": "Site Type",
          "name": "site-type",
          "required": false,
          "ElementProps": {
            "options": [
              {"label": "Cave", "value": "cave"},
              {"label": "Open Site", "value": "open"},
              {"label": "Structure", "value": "structure"}
            ]
          }
        },
        "validationSchema": [["yup.string"]],
        "initialValue": ""
      },
      "location": {
        "component-namespace": "faims-custom",
        "component-name": "TakePoint",
        "type-returned": "faims-pos::Location",
        "component-parameters": {
          "label": "GPS Location",
          "name": "location",
          "helperText": "Capture current GPS location"
        },
        "validationSchema": [["yup.object"], ["yup.nullable"]],
        "initialValue": null
      }
    },
    "fviews": {
      "basic-info": {
        "label": "Basic Information",
        "fields": ["site-id", "site-name", "site-type", "location"]
      }
    },
    "viewsets": {
      "site-record": {
        "label": "Site Record",
        "views": ["basic-info"],
        "hridField": "site-id",
        "publishButtonBehaviour": "noErrors"
      }
    },
    "visible_types": ["site-record"]
  }
}
```

## 5. Migration Notes

When updating older notebooks:

1. **Validation Schema**: 
   - Required fields must have `["yup.required"]` in validationSchema
   - Non-required string/number fields should NOT have `["yup.nullable"]`
   - Non-required object fields (photos, GPS) should have `["yup.nullable"]`

2. **HRID Fields**: Move `hrid: true` from field parameters to viewset level as `hridField`

3. **Labels**: All labels should be in `component-parameters.label`, not in nested properties

4. **RelatedRecordSelector**: 
   - Use array validation for `multiple: true`
   - Use string validation for `multiple: false`
   - Initial value should be `[]` for multiple, `""` for single

5. **Protection**: Add `"protection": "none"` to allow field editing (default behavior)

## 6. Best Practices

1. **Field IDs**: Use descriptive, kebab-case IDs
2. **Labels**: Use clear, user-friendly labels
3. **Helper Text**: Provide guidance for complex fields
4. **Validation**: Match validation schema to required status
5. **Sections**: Group related fields logically
6. **Required Fields**: Only mark truly essential fields as required
7. **Initial Values**: 
   - Strings: `""`
   - Numbers: `null`
   - Arrays: `[]`
   - Objects: `null`
8. **Conditional Logic**: Use sparingly to avoid complexity