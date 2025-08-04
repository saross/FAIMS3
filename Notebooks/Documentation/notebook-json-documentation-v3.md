# FAIMS3 Notebook JSON Format Documentation v3
## (Updated for Latest Release - Optimized for AI/Human Use)

## ⚡ QUICK START REMINDERS
Before creating ANY notebook, remember:
1. **Every form needs an HRID** - Human-readable IDs are essential (see section below)
2. **Check for parent-child relationships** - Don't create orphaned forms
3. **Use the templates** - Copy-paste from working examples below

## 🚨 CRITICAL CHECKLIST - MUST HAVE ALL OF THESE
```json
{
  "metadata": {
    "name": "YOUR_NOTEBOOK_NAME"  // ✅ REQUIRED
  },
  "ui-specification": {
    "fields": {},      // ✅ REQUIRED (can be empty {})
    "fviews": {},      // ✅ REQUIRED (can be empty {})
    "viewsets": {},    // ✅ REQUIRED (can be empty {})
    "visible_types": [] // ✅ REQUIRED (can be empty [])
  }
}
```

### Every viewset MUST have:
```json
"viewsets": {
  "viewset-id": {
    "views": ["view-id"],
    "label": "Label",
    "hridField": "human-readable-id",  // ⭐ ALWAYS include HRID field!
    "publishButtonBehaviour": "always"  // ✅ REQUIRED! Options: "always" | "visited" | "noErrors"
  }
}
```

### Every field MUST have:
```json
"field-id": {
  "component-namespace": "xxx",     // ✅ REQUIRED
  "component-name": "xxx",          // ✅ REQUIRED
  "type-returned": "xxx",           // ✅ REQUIRED
  "component-parameters": {         // ✅ REQUIRED
    "label": "xxx",                 // ✅ REQUIRED - MUST be here, NOT in InputLabelProps!
    "name": "field-id"              // ✅ REQUIRED - MUST match the field key!
  }
}
```

## 📋 QUICK REFERENCE - COPY-PASTE TEMPLATES

### Minimal Working Notebook
```json
{
  "metadata": {
    "name": "My Notebook",
    "notebook_version": "1.0",
    "schema_version": "1.0",
    "accesses": ["admin", "moderator", "team"],
    "ispublic": false,
    "isrequest": false,
    "project_status": "New"
  },
  "ui-specification": {
    "fields": {
      "my-field": {
        "component-namespace": "formik-material-ui",
        "component-name": "TextField",
        "type-returned": "faims-core::String",
        "component-parameters": {
          "label": "My Field",
          "name": "my-field",
          "fullWidth": true,
          "variant": "outlined"
        },
        "validationSchema": [["yup.string"]],
        "initialValue": "",
        "meta": {
          "annotation": {"include": false, "label": "annotation"},
          "uncertainty": {"include": false, "label": "uncertainty"}
        }
      }
    },
    "fviews": {
      "main-view": {
        "fields": ["my-field"],
        "label": "Main View"
      }
    },
    "viewsets": {
      "main-form": {
        "views": ["main-view"],
        "label": "Main Form",
        "publishButtonBehaviour": "always"
      }
    },
    "visible_types": ["main-form"]
  }
}
```

## 🔧 COMPLETE FIELD TYPE REFERENCE

### TEXT INPUT FIELDS

#### Single-Line Text (FAIMS Text Field)
```json
"text-field": {
  "component-namespace": "faims-custom",
  "component-name": "FAIMSTextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Field Label",
    "name": "text-field",
    "helperText": "Help text here",
    "fullWidth": true,
    "variant": "outlined",
    "required": false
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "notes"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Short text like names, IDs, brief descriptions

#### Email Field
```json
"email-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "TextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Email Address",
    "name": "email-field",
    "fullWidth": true,
    "variant": "outlined",
    "InputProps": {"type": "email"}
  },
  "validationSchema": [["yup.string"], ["yup.email", "Invalid email address"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Collecting email addresses with built-in validation

#### Multi-Line Text Field
```json
"notes-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "MultipleTextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Notes",
    "name": "notes-field",
    "helperText": "Enter detailed notes",
    "fullWidth": true,
    "variant": "outlined",
    "multiline": true,
    "InputProps": {"rows": 4}
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Long text, descriptions, comments, field notes

#### Templated String Field (for HRIDs)
```json
"hrid-field": {
  "component-namespace": "faims-custom",
  "component-name": "TemplatedStringField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Record ID",
    "name": "hrid-field",
    "fullWidth": true,
    "template": "{{site-type}}-{{site-id}}-{{year}}",
    "helperText": "Auto-generated from type, ID and year",
    "InputProps": {"type": "text", "readOnly": true}
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Creating human-readable IDs by combining other field values

#### QR Code Scanner (Mobile Only)
```json
"qr-scanner": {
  "component-namespace": "qrcode",
  "component-name": "QRCodeFormField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Scan QR/Barcode",
    "name": "qr-scanner",
    "fullWidth": true,
    "helperText": "Tap to scan (mobile app only)"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Scanning QR codes or barcodes on specimens, bags, or labels (iOS/Android apps only)

#### Address Field
```json
"address-field": {
  "component-namespace": "faims-custom",
  "component-name": "AddressField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Street Address",
    "name": "address-field",
    "fullWidth": true,
    "helperText": "Enter a valid street address"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Structured address input with validation

### NUMBER FIELDS

#### Basic Number Field
```json
"number-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "TextField",
  "type-returned": "faims-core::Integer",
  "component-parameters": {
    "label": "Number",
    "name": "number-field",
    "fullWidth": true,
    "variant": "outlined",
    "InputProps": {"type": "number"}
  },
  "validationSchema": [["yup.number"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "measurement notes"},
    "uncertainty": {"include": true, "label": "accuracy"}
  }
}
```
**When to use**: Simple numeric input without constraints

#### Controlled Number Field
```json
"controlled-number": {
  "component-namespace": "faims-custom",
  "component-name": "NumberField",
  "type-returned": "faims-core::Number",
  "component-parameters": {
    "label": "Temperature (°C)",
    "name": "controlled-number",
    "fullWidth": true,
    "helperText": "Enter temperature between -50 and 50",
    "min": -50,
    "max": 50
  },
  "validationSchema": [["yup.number"], ["yup.min", -50], ["yup.max", 50]],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "measurement notes"},
    "uncertainty": {"include": true, "label": "accuracy"}
  }
}
```
**When to use**: Numeric input with min/max validation constraints

#### Auto-Incrementing Field
```json
"auto-id": {
  "component-namespace": "faims-custom",
  "component-name": "BasicAutoIncrementer",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Sample ID",
    "name": "auto-id",
    "variant": "outlined",
    "num_digits": 5,
    "form_id": "main-form"
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Sequential numbering (00001, 00002, etc.) for specimens, samples, or features

### DATE & TIME FIELDS

#### Date and Time Picker
```json
"datetime-field": {
  "component-namespace": "faims-custom",
  "component-name": "DateTimePicker",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Date & Time",
    "name": "datetime-field",
    "fullWidth": true,
    "helperText": "Select date and time"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Recording precise timestamps for events or observations

#### Date Picker (Date Only)
```json
"date-field": {
  "component-namespace": "faims-custom",
  "component-name": "DatePicker",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Collection Date",
    "name": "date-field",
    "fullWidth": true,
    "helperText": "Select date"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Recording dates without specific times

#### Month Picker
```json
"month-field": {
  "component-namespace": "faims-custom",
  "component-name": "MonthPicker",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Month/Year",
    "name": "month-field",
    "fullWidth": true,
    "helperText": "Select month and year"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Recording month/year only (e.g., "June 2024")

#### DateTime with Now Button
```json
"timestamp-field": {
  "component-namespace": "faims-custom",
  "component-name": "DateTimeNow",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Recorded At",
    "name": "timestamp-field",
    "fullWidth": true,
    "helperText": "Click 'Now' to set current time"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Capturing "recorded at" timestamps with one-click current time

### MEDIA FIELDS

#### File Upload
```json
"file-upload": {
  "component-namespace": "faims-custom",
  "component-name": "FileUploader",
  "type-returned": "faims-attachment::Files",
  "component-parameters": {
    "label": "Upload Files",
    "name": "file-upload",
    "fullWidth": true,
    "helperText": "Upload PDFs, images, or other documents"
  },
  "validationSchema": [
    ["yup.array"],
    ["yup.of", [["yup.object"], ["yup.nullable"]]],
    ["yup.nullable"]
  ],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "file description"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Attaching PDFs, audio files, videos, DSLR photos, permits, contracts, etc.

#### Photo Capture
```json
"photo-field": {
  "component-namespace": "faims-custom",
  "component-name": "TakePhoto",
  "type-returned": "faims-attachment::Files",
  "component-parameters": {
    "label": "Take Photos",
    "name": "photo-field",
    "fullWidth": true,
    "helperText": "Capture photos or upload images"
  },
  "validationSchema": [
    ["yup.array"],
    ["yup.of", [["yup.object"], ["yup.nullable"]]],
    ["yup.nullable"]
  ],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "photo description"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Taking photos with device camera or uploading existing images

### LOCATION FIELDS

#### Map Field (Interactive)
```json
"map-field": {
  "component-namespace": "mapping-plugin",
  "component-name": "MapFormField",
  "type-returned": "faims-core::JSON",
  "component-parameters": {
    "label": "Draw Feature",
    "name": "map-field",
    "fullWidth": true,
    "helperText": "Draw point, line, or polygon on map",
    "featureType": "Polygon",  // Options: "Point", "LineString", "Polygon"
    "zoom": 15
  },
  "validationSchema": [["yup.object"], ["yup.nullable"]],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "location notes"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Drawing geographic features on a map (requires internet for base maps)

#### GPS Point Capture
```json
"gps-location": {
  "component-namespace": "faims-custom",
  "component-name": "TakePoint",
  "type-returned": "faims-pos::Location",
  "component-parameters": {
    "label": "GPS Location",
    "name": "gps-location",
    "fullWidth": true,
    "helperText": "Click to capture GPS coordinates"
  },
  "validationSchema": [["yup.object"], ["yup.nullable"]],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "location notes"},
    "uncertainty": {"include": true, "label": "GPS accuracy"}
  }
}
```
**When to use**: Recording current GPS coordinates as a point

### CHOICE FIELDS

#### Checkbox (Boolean)
```json
"checkbox-field": {
  "component-namespace": "faims-custom",
  "component-name": "Checkbox",
  "type-returned": "faims-core::Bool",
  "component-parameters": {
    "label": "Is this complete?",
    "name": "checkbox-field",
    "fullWidth": true,
    "helperText": "Check if yes"
  },
  "validationSchema": [["yup.boolean"]],
  "initialValue": false,
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Yes/no questions, feature presence/absence

#### Select Multiple (Visible List)
```json
"multi-select-visible": {
  "component-namespace": "faims-custom",
  "component-name": "MultiSelect",
  "type-returned": "faims-core::Array",
  "component-parameters": {
    "label": "Select Materials",
    "name": "multi-select-visible",
    "fullWidth": true,
    "variant": "outlined",
    "select": true,
    "SelectProps": {"multiple": true},
    "ElementProps": {
      "options": [
        {"value": "ceramic", "label": "Ceramic"},
        {"value": "glass", "label": "Glass"},
        {"value": "metal", "label": "Metal"},
        {"value": "stone", "label": "Stone"}
      ]
    }
  },
  "validationSchema": [["yup.array"]],
  "initialValue": [],
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Multiple selections where seeing all options at once is helpful

#### Radio Group (Single Choice, Visible)
```json
"radio-field": {
  "component-namespace": "faims-custom",
  "component-name": "RadioGroup",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Condition",
    "name": "radio-field",
    "fullWidth": true,
    "variant": "outlined",
    "ElementProps": {
      "options": [
        {"value": "excellent", "label": "Excellent"},
        {"value": "good", "label": "Good"},
        {"value": "fair", "label": "Fair"},
        {"value": "poor", "label": "Poor"}
      ]
    }
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Single choice from 2-5 options where visibility is important

#### Select Dropdown (Single/Multi)
```json
"select-field": {
  "component-namespace": "faims-custom",
  "component-name": "Select",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Select Type",
    "name": "select-field",
    "fullWidth": true,
    "variant": "outlined",
    "required": false,
    "select": true,
    "ElementProps": {
      "options": [
        {"value": "type1", "label": "Type 1"},
        {"value": "type2", "label": "Type 2"},
        {"value": "type3", "label": "Type 3"}
      ]
    }
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "selection notes"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Compact selection from many options (can be configured for multi-select)

#### Hierarchical Select
```json
"hierarchical-select": {
  "component-namespace": "faims-custom",
  "component-name": "AdvancedSelect",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Classification",
    "name": "hierarchical-select",
    "fullWidth": true,
    "variant": "outlined",
    "ElementProps": {
      "options": [
        {
          "value": "fauna",
          "label": "Fauna",
          "children": [
            {
              "value": "fauna/mammal",
              "label": "Mammal",
              "children": [
                {"value": "fauna/mammal/small", "label": "Small"},
                {"value": "fauna/mammal/large", "label": "Large"}
              ]
            },
            {
              "value": "fauna/bird",
              "label": "Bird"
            }
          ]
        },
        {
          "value": "flora",
          "label": "Flora"
        }
      ]
    }
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Nested taxonomies, hierarchical vocabularies

### RELATIONSHIP FIELDS

#### Related Record Selector (Parent-Child)
```json
"child-records": {
  "component-namespace": "faims-custom",
  "component-name": "RelatedRecordSelector",
  "type-returned": "faims-core::Relationship",
  "component-parameters": {
    "label": "Add Samples",
    "name": "child-records",
    "fullWidth": true,
    "helperText": "Add sample records to this site",
    "related_type": "Sample-Form",
    "relation_type": "Child",
    "multiple": true,
    "allowLinkToExisting": false
  },
  "validationSchema": [["yup.array"]],
  "initialValue": [],
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Creating parent-child relationships between records

### DISPLAY FIELDS

#### Rich Text (Static Display)
```json
"instructions": {
  "component-namespace": "faims-custom",
  "component-name": "RichText",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "name": "instructions",
    "content": "## Instructions\n\nPlease follow these steps:\n1. First do this\n2. Then do that\n\n**Important:** Remember to save your work!"
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```
**When to use**: Adding headings, instructions, or formatted text to forms

### Common Field Templates

#### Text Field (Required)
```json
"field-name": {
  "component-namespace": "formik-material-ui",
  "component-name": "TextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Field Label",
    "name": "field-name",
    "helperText": "Help text here",
    "fullWidth": true,
    "variant": "outlined",
    "required": true
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "notes"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Multi-line Text Field
```json
"notes-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "MultipleTextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Notes",
    "name": "notes-field",
    "helperText": "Enter detailed notes",
    "fullWidth": true,
    "variant": "outlined",
    "multiline": true,
    "InputProps": {"rows": 4}
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Select Dropdown
```json
"select-field": {
  "component-namespace": "faims-custom",
  "component-name": "Select",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Select Option",
    "name": "select-field",
    "fullWidth": true,
    "variant": "outlined",
    "required": false,
    "select": true,
    "ElementProps": {
      "options": [
        {"value": "opt1", "label": "Option 1"},
        {"value": "opt2", "label": "Option 2"},
        {"value": "opt3", "label": "Option 3"}
      ]
    }
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "selection notes"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Multi-Select
```json
"multi-select": {
  "component-namespace": "faims-custom",
  "component-name": "MultiSelect",
  "type-returned": "faims-core::Array",
  "component-parameters": {
    "label": "Select Multiple",
    "name": "multi-select",
    "fullWidth": true,
    "variant": "outlined",
    "select": true,
    "SelectProps": {"multiple": true},
    "ElementProps": {
      "options": [
        {"value": "a", "label": "Option A"},
        {"value": "b", "label": "Option B"},
        {"value": "c", "label": "Option C"}
      ]
    }
  },
  "validationSchema": [["yup.array"]],
  "initialValue": [],
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Number Field
```json
"number-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "TextField",
  "type-returned": "faims-core::Integer",
  "component-parameters": {
    "label": "Number",
    "name": "number-field",
    "fullWidth": true,
    "variant": "outlined",
    "InputProps": {"type": "number"}
  },
  "validationSchema": [["yup.number"], ["yup.min", 0], ["yup.max", 100]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": true, "label": "measurement notes"},
    "uncertainty": {"include": true, "label": "accuracy"}
  }
}
```

#### Date Field
```json
"date-field": {
  "component-namespace": "formik-material-ui",
  "component-name": "TextField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Date",
    "name": "date-field",
    "fullWidth": true,
    "variant": "outlined",
    "InputProps": {"type": "date"}
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Checkbox
```json
"checkbox-field": {
  "component-namespace": "faims-custom",
  "component-name": "Checkbox",
  "type-returned": "faims-core::Bool",
  "component-parameters": {
    "label": "Check this box",
    "name": "checkbox-field",
    "fullWidth": true
  },
  "validationSchema": [["yup.boolean"]],
  "initialValue": false,
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Radio Group
```json
"radio-field": {
  "component-namespace": "faims-custom",
  "component-name": "RadioGroup",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Choose One",
    "name": "radio-field",
    "fullWidth": true,
    "variant": "outlined",
    "ElementProps": {
      "options": [
        {"value": "yes", "label": "Yes"},
        {"value": "no", "label": "No"},
        {"value": "maybe", "label": "Maybe"}
      ]
    }
  },
  "validationSchema": [["yup.string"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### GPS Location
```json
"gps-location": {
  "component-namespace": "faims-custom",
  "component-name": "TakePoint",
  "type-returned": "faims-pos::Location",
  "component-parameters": {
    "label": "GPS Location",
    "name": "gps-location",
    "fullWidth": true,
    "helperText": "Click to capture GPS coordinates"
  },
  "validationSchema": [["yup.object"], ["yup.nullable"]],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "location notes"},
    "uncertainty": {"include": true, "label": "GPS accuracy"}
  }
}
```

#### Photo Capture
```json
"photo-field": {
  "component-namespace": "faims-custom",
  "component-name": "TakePhoto",
  "type-returned": "faims-attachment::Files",
  "component-parameters": {
    "label": "Take Photos",
    "name": "photo-field",
    "fullWidth": true,
    "helperText": "Take or upload photos"
  },
  "validationSchema": [
    ["yup.array"],
    ["yup.of", [["yup.object"], ["yup.nullable"]]],
    ["yup.nullable"]
  ],
  "initialValue": null,
  "meta": {
    "annotation": {"include": true, "label": "photo description"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Auto-Incrementing ID
```json
"auto-id": {
  "component-namespace": "faims-custom",
  "component-name": "BasicAutoIncrementer",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "ID",
    "name": "auto-id",
    "variant": "outlined",
    "num_digits": 5,
    "form_id": "main-form"
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Templated String (HRID)
```json
"hrid-field": {
  "component-namespace": "faims-custom",
  "component-name": "TemplatedStringField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Record ID",
    "name": "hrid-field",
    "fullWidth": true,
    "template": "{{prefix}}-{{date}}-{{counter}}",
    "InputProps": {"type": "text", "readOnly": true}
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Related Record Selector (Parent-Child Relationships)
```json
"poi-cobbles": {
  "component-namespace": "faims-custom",
  "component-name": "RelatedRecordSelector",
  "type-returned": "faims-core::Relationship",
  "component-parameters": {
    "label": "POI Cobbles",
    "name": "poi-cobbles",
    "fullWidth": true,
    "helperText": "Add cobble points of interest",
    "related_type": "POI-Cobble",  // The viewset ID of the child form
    "relation_type": "Child",      // "Child" for parent-child relationships
    "multiple": true,              // Allow multiple children
    "allowLinkToExisting": false   // Only create new records (not link existing)
  },
  "validationSchema": [["yup.array"]],
  "initialValue": [],
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

#### Related Record Selector (Peer-to-Peer Relationships)
```json
"related-deployment": {
  "component-namespace": "faims-custom",
  "component-name": "RelatedRecordSelector",
  "type-returned": "faims-core::Relationship",
  "component-parameters": {
    "label": "Related Deployment",
    "name": "related-deployment",
    "fullWidth": true,
    "helperText": "Link to related deployment",
    "related_type": "CameraTrapDeployment",  // The viewset ID to link to
    "relation_type": "is-related-to",        // Peer-to-peer relationship
    "multiple": false,                        // Single relationship only
    "required": true                          // Make this relationship required
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}
```

**Key Parameters:**
- `related_type`: The viewset ID of the form type to relate to
- `relation_type`: Either "Child" (parent-child) or "is-related-to" (peer-to-peer)
- `multiple`: Whether multiple relationships can be created (true/false)
- `allowLinkToExisting`: Whether to link existing records (true) or only create new ones (false)
- `required`: Whether the relationship is mandatory

## 🎯 VALIDATION RULES QUICK REFERENCE

### Strings
```json
// Required string
"validationSchema": [["yup.string"], ["yup.required"]]

// Optional string (NO yup.nullable!)
"validationSchema": [["yup.string"]]

// String with pattern
"validationSchema": [["yup.string"], ["yup.matches", "^[A-Z]{3}-\\d{4}$"]]
```

### Numbers
```json
// Required number
"validationSchema": [["yup.number"], ["yup.required"]]

// Number with range
"validationSchema": [["yup.number"], ["yup.min", 0], ["yup.max", 100]]

// Integer only
"validationSchema": [["yup.number"], ["yup.integer"]]
```

### Objects (GPS, Photos)
```json
// Optional object
"validationSchema": [["yup.object"], ["yup.nullable"]]

// Required object
"validationSchema": [["yup.object"], ["yup.required"]]
```

### Arrays
```json
// Array (multi-select, related records with multiple=true)
"validationSchema": [["yup.array"]]

// Array with min items
"validationSchema": [["yup.array"], ["yup.min", 1]]
```

### Booleans
```json
// Checkbox
"validationSchema": [["yup.boolean"]]
```

### Special: TakePhoto
```json
// Always use this for TakePhoto
"validationSchema": [
  ["yup.array"],
  ["yup.of", [["yup.object"], ["yup.nullable"]]],
  ["yup.nullable"]
]
```

## ⚠️ COMMON MISTAKES TO AVOID

1. **Forgetting `visible_types`**: Without this, nothing shows up!
   ```json
   "visible_types": ["viewset-id"]  // Must list viewset IDs to display
   ```

2. **Missing `publishButtonBehaviour`**: Every viewset needs this!
   ```json
   "publishButtonBehaviour": "always"  // or "visited" or "noErrors"
   ```

3. **Wrong label location**: Label MUST be in component-parameters
   ```json
   // ❌ WRONG
   "InputLabelProps": {"label": "My Label"}
   
   // ✅ CORRECT
   "component-parameters": {"label": "My Label"}
   ```

4. **Mismatched name and field ID**:
   ```json
   // ❌ WRONG
   "my-field": {
     "component-parameters": {"name": "different-name"}
   }
   
   // ✅ CORRECT
   "my-field": {
     "component-parameters": {"name": "my-field"}
   }
   ```

5. **Using yup.nullable on strings**:
   ```json
   // ❌ WRONG for optional string
   "validationSchema": [["yup.string"], ["yup.nullable"]]
   
   // ✅ CORRECT for optional string
   "validationSchema": [["yup.string"]]
   ```

6. **Wrong initial values**:
   ```json
   // Strings: ""
   // Numbers: "" (not null!)
   // Arrays: []
   // Objects (GPS/Photos): null
   // Booleans: false
   ```

7. **Missing meta object**:
   ```json
   // Every field needs this, even if both are false
   "meta": {
     "annotation": {"include": false, "label": "annotation"},
     "uncertainty": {"include": false, "label": "uncertainty"}
   }
   ```

8. **Using faims-core::Number instead of faims-core::Integer**:
   ```json
   // ❌ WRONG - This will cause validation errors!
   "type-returned": "faims-core::Number"
   
   // ✅ CORRECT - Use Integer for all numeric fields
   "type-returned": "faims-core::Integer"
   ```

## 🏗️ BUILDING A COMPLETE NOTEBOOK

### Step 1: Start with the skeleton
```json
{
  "metadata": {"name": "My Notebook"},
  "ui-specification": {
    "fields": {},
    "fviews": {},
    "viewsets": {},
    "visible_types": []
  }
}
```

### Step 2: Add fields (copy from templates above)
```json
"fields": {
  "field-1": { /* field definition */ },
  "field-2": { /* field definition */ }
}
```

### Step 3: Create views (group fields)
```json
"fviews": {
  "section-1": {
    "fields": ["field-1", "field-2"],
    "label": "Section One"
  }
}
```

### Step 4: Create viewsets (group views)
```json
"viewsets": {
  "main-form": {
    "views": ["section-1"],
    "label": "Main Form",
    "publishButtonBehaviour": "always"
  }
}
```

### Step 5: Make viewsets visible
```json
"visible_types": ["main-form"]
```

## 📝 ADVANCED FEATURES

### Conditional Fields
```json
"condition": {
  "operator": "equal",
  "field": "trigger-field",
  "value": "show"
}

// Complex conditions
"condition": {
  "operator": "and",
  "conditions": [
    {"operator": "equal", "field": "field1", "value": "yes"},
    {"operator": "not-equal", "field": "field2", "value": "no"}
  ]
}
```

### Human Readable IDs (HRID)

**Best Practice**: Always include a TemplatedStringField to create meaningful human-readable identifiers by combining other fields.

```json
// 1. Create the HRID field using TemplatedStringField:
"human-readable-id": {
  "component-namespace": "faims-custom",
  "component-name": "TemplatedStringField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Record ID",
    "name": "human-readable-id",
    "fullWidth": true,
    "template": "{{site-type}}-{{site-id}}",  // Creates "Hearth-0025"
    "helperText": "Auto-generated from type and ID",
    "InputProps": {"type": "text", "readOnly": true}
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": "",
  "meta": {
    "annotation": {"include": false, "label": "annotation"},
    "uncertainty": {"include": false, "label": "uncertainty"}
  }
}

// 2. In viewset, specify it as the HRID:
"viewsets": {
  "records": {
    "hridField": "human-readable-id",  // This field will be shown in lists
    // ... other properties
  }
}

// Common patterns:
// "{{team}}-{{counter}}" → "A-0001"
// "{{type}}-{{year}}-{{counter}}" → "Ceramic-2024-0045"
// "{{site}}-{{feature}}-{{counter}}" → "Site1-F2-0012"
```

### Field Protection
```json
"component-parameters": {
  "protection": "protected"     // Cannot edit or hide
  // OR
  "protection": "allow-hiding"  // Can hide but not edit
  // OR
  "protection": "none"          // Can edit and hide (default)
}
```

### Tab Layout
```json
"viewsets": {
  "complex-form": {
    "views": ["view1", "view2", "view3"],
    "layout": "tabs"  // Shows views as tabs instead of inline
  }
}
```

## 🔍 DEBUGGING CHECKLIST

If import fails:
1. ✅ Check JSON syntax is valid (no trailing commas!)
2. ✅ Verify `metadata.name` exists
3. ✅ Confirm all 4 ui-specification properties exist
4. ✅ Check `visible_types` has viewset IDs
5. ✅ Verify all viewsets have `publishButtonBehaviour`
6. ✅ Ensure field names match their IDs
7. ✅ Check all labels are in component-parameters
8. ✅ Verify no null fields or conditions
9. ✅ Confirm all fields have required properties
10. ✅ Check all fields have meta objects

## 💡 PRO TIPS

1. **Start small**: Get a minimal notebook working first, then add complexity
2. **Copy working examples**: Use the templates above as starting points
3. **Test incrementally**: Add a few fields at a time and test
4. **Use meaningful IDs**: `specimen-date` is better than `field1`
5. **Keep related fields together**: Group in logical sections
6. **Don't over-validate**: Only require truly essential fields
7. **Use helper text**: Guide users on what to enter
8. **Consider mobile**: Use `fullWidth: true` for better mobile experience

## 🌟 ESSENTIAL BEST PRACTICES FOR ALL NOTEBOOKS

### 1. ALWAYS Include Human-Readable IDs (HRIDs)
**Every form/entity should have an HRID field** that combines meaningful values:

```json
// In fields:
"record-hrid": {
  "component-namespace": "faims-custom",
  "component-name": "TemplatedStringField",
  "type-returned": "faims-core::String",
  "component-parameters": {
    "label": "Record ID",
    "name": "record-hrid",
    "template": "{{type}}-{{counter}}-{{suffix}}",  // e.g., "Site-00001-2024"
    "fullWidth": true,
    "InputProps": {"type": "text", "readOnly": true}
  },
  "validationSchema": [["yup.string"], ["yup.required"]],
  "initialValue": ""
}

// In viewset:
"viewsets": {
  "my-form": {
    "hridField": "record-hrid",  // ⭐ CRITICAL: Links HRID to viewset
    // ... other properties
  }
}
```

**Why?** HRIDs make records identifiable in lists, exports, and relationships. Without them, users only see cryptic UUIDs.

### 2. ALWAYS Check for Parent-Child Relationships
**Before creating a notebook, analyze if any forms should be children of others:**

Questions to ask:
- Does this record "belong to" another record? (e.g., Sample belongs to Site)
- Is this record meaningless without its parent? (e.g., Measurement without Specimen)
- Are multiple of these typically associated with one parent? (e.g., Photos of an Artifact)

If YES to any, implement parent-child relationships:

```json
// In parent form:
"child-records": {
  "component-namespace": "faims-custom",
  "component-name": "RelatedRecordSelector",
  "type-returned": "faims-core::Relationship",
  "component-parameters": {
    "label": "Child Records",
    "name": "child-records",
    "related_type": "Child_Form_Viewset_ID",  // The child form's viewset ID
    "relation_type": "Child",                  // Parent-child relationship
    "multiple": true,                          // Allow multiple children
    "allowLinkToExisting": false              // Create new only
  },
  "validationSchema": [["yup.array"]],
  "initialValue": []
}
```

**Common Parent-Child Patterns:**
- Survey Unit → POIs, Artifacts, Sites
- Excavation Unit → Contexts, Features, Finds
- Site → Areas, Structures, Samples
- Specimen → Measurements, Photos, Analyses
- Transect → Observations, Samples

### 3. Notebook Creation Checklist

When creating ANY notebook, always:

- [ ] **Define HRIDs for EVERY form type**
  - Create TemplatedStringField with meaningful pattern
  - Set hridField in viewset
  - Test that HRIDs appear in record lists

- [ ] **Analyze relationships between forms**
  - Identify parent-child relationships
  - Add RelatedRecordSelector fields to parents
  - Use "Child" relation_type for true parent-child
  - Use "is-related-to" for peer relationships

- [ ] **Maintain consistency**
  - Use consistent HRID patterns (e.g., always {{team}}-{{id}}-{{type}})
  - Keep field naming consistent across related forms
  - Inherit common fields (team, date) from parent to child

- [ ] **Test the workflow**
  - Can users create child records from parent?
  - Do HRIDs display correctly in lists?
  - Are relationships maintained in exports?

## 🚫 COMMON RELATIONSHIP MISTAKES

1. **Creating orphaned forms**: Forms that should be children but aren't linked
2. **Missing HRIDs**: Forms without human-readable identifiers
3. **Wrong relationship type**: Using "is-related-to" when "Child" is appropriate
4. **Inconsistent patterns**: Different HRID formats across related forms
5. **No inheritance**: Child forms re-entering parent data instead of inheriting

## 📊 FIELD SELECTION DECISION GUIDE

### Choosing the Right Text Field
- **FAIMSTextField**: Default for single-line text (names, IDs, short descriptions)
- **Email Field**: When you need email validation
- **MultipleTextField**: Multi-line text (notes, descriptions, comments)
- **TemplatedStringField**: ALWAYS use for HRIDs - combines other fields
- **QRCodeFormField**: Scanning physical labels/codes (mobile only!)
- **AddressField**: Structured address with validation

### Choosing the Right Number Field
- **Basic TextField with type="number"**: Simple counts without validation
- **NumberField (Controlled)**: When you need min/max limits or decimal precision
- **BasicAutoIncrementer**: Sequential IDs (00001, 00002...)

### Choosing the Right Date/Time Field
- **DateTimePicker**: Need both date AND time
- **DatePicker**: Date only (most common)
- **MonthPicker**: Just month/year (e.g., seasonal data)
- **DateTimeNow**: "Recorded at" fields with quick timestamp button

### Choosing the Right Selection Field
**Single Selection:**
- **RadioGroup**: 2-5 options, all visible (e.g., Yes/No/Maybe)
- **Select (Dropdown)**: >5 options OR space is limited
- **AdvancedSelect**: Hierarchical/nested options (taxonomies)

**Multiple Selection:**
- **Checkbox**: Single yes/no boolean
- **MultiSelect**: Multiple choices from a list
- **Select with multiple:true**: Alternative multi-select implementation

### Choosing the Right Media Field
- **TakePhoto**: Field photos, specimen images (includes upload option)
- **FileUploader**: PDFs, audio, video, DSLR photos, documents

### Choosing the Right Location Field
- **TakePoint**: Single GPS coordinate capture
- **MapFormField**: Drawing features (points/lines/polygons) on a map
  - Requires internet for base maps
  - Can draw multiple features
  - Choose featureType: "Point", "LineString", or "Polygon"

### Special Considerations

#### Conditional Fields
Use the `condition` property to show/hide fields based on other field values:
```json
"condition": {
  "field": "has-measurements",
  "operator": "equal",
  "value": true
}
```

#### Field Visibility by Platform
- **QR Scanner**: Mobile apps only (iOS/Android)
- **Camera**: Works on all platforms but better on mobile
- **GPS**: Works best on mobile devices
- **Maps**: Requires internet connection

#### Performance Tips
- Use **RadioGroup/MultiSelect** for <10 options (all visible)
- Use **Select dropdown** for >10 options (saves screen space)
- Use **AdvancedSelect** for hierarchical data only
- Keep forms under 20 fields per view for better mobile performance

---

This documentation is optimized for quick reference and copy-paste workflows. When in doubt, start with the minimal example and build up!