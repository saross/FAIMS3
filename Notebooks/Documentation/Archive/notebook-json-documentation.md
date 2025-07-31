# FAIMS3 Notebook JSON Format Documentation

## Overview

FAIMS3 notebooks are defined using JSON files that specify the structure, fields, and behavior of electronic field notebooks. This document provides comprehensive documentation of the JSON format required to create functional notebooks.

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

### 2.2 Available Components

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

### 2.4 Validation Schema

Validation uses Yup validation library with array syntax:

```json
"validationSchema": [
  ["yup.string"],
  ["yup.required"],
  ["yup.min", 3],
  ["yup.max", 50]
]
```

Common validation types:
- `["yup.string"]` - String validation
- `["yup.number"]` - Number validation
- `["yup.bool"]` - Boolean validation
- `["yup.array"]` - Array validation
- `["yup.object"]` - Object validation
- `["yup.mixed"]` - Any type
- `["yup.required"]` - Field is required
- `["yup.nullable"]` - Can be null
- `["yup.min", value]` - Minimum value/length
- `["yup.max", value]` - Maximum value/length
- `["yup.matches", regex]` - Pattern matching

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
    "fields": ["field1", "field2", "field3"]
  }
}
```

#### viewsets (Form Types)
Group sections into complete forms:

```json
"viewsets": {
  "form-type": {
    "label": "Form Label",
    "views": ["section1", "section2"]
  }
}
```

#### visible_types
Array of viewset IDs to display:

```json
"visible_types": ["form-type1", "form-type2"]
```

## 3. Complete Example

```json
{
  "metadata": {
    "name": "Simple Survey",
    "notebook_version": "1.0",
    "schema_version": "1.0"
  },
  "ui-specification": {
    "fields": {
      "site-name": {
        "component-namespace": "formik-material-ui",
        "component-name": "TextField",
        "type-returned": "faims-core::String",
        "component-parameters": {
          "label": "Site Name",
          "name": "site-name",
          "helperText": "Enter the site name",
          "fullWidth": true,
          "required": true
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
          "required": true,
          "ElementProps": {
            "options": [
              {"label": "Cave", "value": "cave"},
              {"label": "Open Site", "value": "open"},
              {"label": "Structure", "value": "structure"}
            ]
          }
        },
        "validationSchema": [["yup.string"], ["yup.required"]],
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
        "fields": ["site-name", "site-type", "location"]
      }
    },
    "viewsets": {
      "site-record": {
        "label": "Site Record",
        "views": ["basic-info"]
      }
    },
    "visible_types": ["site-record"]
  }
}
```

## 4. Best Practices

1. **Field IDs**: Use descriptive, kebab-case IDs
2. **Labels**: Use clear, user-friendly labels
3. **Helper Text**: Provide guidance for complex fields
4. **Validation**: Add appropriate validation for data quality
5. **Sections**: Group related fields logically
6. **Required Fields**: Only mark truly essential fields as required
7. **Initial Values**: Set sensible defaults where appropriate
8. **Conditional Logic**: Use sparingly to avoid complexity

## 5. Tips for Different Use Cases

### Archaeological Survey
- Use GPS capture for site locations
- Include photo fields for artifact documentation
- Use select fields for standardized typologies
- Add relationship fields for linking finds to sites

### Ecological Sampling
- Include date/time fields with "now" buttons
- Use numeric fields for measurements
- Add multi-select for species lists
- Include map fields for plot boundaries

### Infrastructure Inspection
- Use QR scanner for asset identification
- Include checkbox lists for inspection items
- Add photo fields for damage documentation
- Use templated fields for inspection IDs