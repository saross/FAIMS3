# Field Design Insights and Patterns for FAIMS3 Documentation

## Context for Opus
This document contains patterns, gotchas, and insights discovered while analyzing FAIMS3 notebooks and migrations. These should inform the field types guide and best practices documentation.

## 1. System Variables vs Manual Entry

### Available System Variables
These can be accessed via TemplatedStringField instead of manual entry:
- `{{_CREATED_BY}}` - Current user
- `{{_CREATED_TIME}}` - Timestamp of record creation
- `{{_PROJECT_NAME}}` - Current project name
- `{{_RECORD_ID}}` - System-generated UUID (though HRIDs are better)

### Common Mistakes to Address
- ❌ Using text field for "Recorded by" - should use system variable
- ❌ Using DateTimeNow for "Entry timestamp" - should use {{_CREATED_TIME}}
- ❌ Manual project name entry - should use {{_PROJECT_NAME}}

## 2. Human-Readable ID (HRID) Patterns

### Best Practices Discovered
1. **Always include an HRID field** using TemplatedStringField
2. **Common effective patterns**:
   - `{{type}}-{{auto-increment}}` → "Ceramic-00045"
   - `{{site}}-{{date}}-{{counter}}` → "SITE1-20240315-001"
   - `{{team}}-{{feature}}-{{number}}` → "TeamA-Hearth-05"

### HRID Requirements
- Must be defined in field definitions
- Must be referenced in viewset as `hridField`
- Should combine meaningful components
- Avoid just using auto-increment alone

## 3. Parent-Child Relationship Patterns

### Common Archaeological Patterns
- Site → Areas → Features → Finds
- Trench → Context → Sample
- Survey Unit → Features/Artifacts/Photos

### Common Ecological Patterns  
- Transect → Observation Points → Species Records
- Site → Quadrats → Measurements
- Individual Organism → Repeated Measurements

### Implementation Notes
- Parent must have RelatedRecordSelector field
- Child forms should inherit key fields from parent
- Use `relation_type: "Child"` for true hierarchies
- Consider when to allow `allowLinkToExisting`

## 4. Field Combinations That Work Well Together

### Location Recording Pattern
```
1. GPS Point (TakePoint) - for device location
2. Map Drawing (MapFormField) - for boundaries/areas  
3. Grid Reference (TextField) - for manual coordinates
4. Location Notes (MultipleTextField) - for access/directions
```

### Measurement Pattern
```
1. Measurement Type (RadioGroup/Select)
2. Value (NumberField with min/max)
3. Units (Select or static text)
4. Uncertainty (Checkbox or NumberField)
```

### Identification Pattern
```
1. Quick ID (Select from common options)
2. "Other" checkbox (Checkbox)
3. Detailed ID (Conditional TextField, shown if Other=true)
4. Confidence Level (RadioGroup: Certain/Probable/Possible)
```

## 5. Conditional Logic Best Practices

### Effective Uses
- Show detailed fields only when needed
- Display "specify other" boxes
- Show relevant measurement fields based on type
- Toggle between metric/imperial units

### Pattern: Progressive Disclosure
```
Basic Recording? → Show minimal fields
Detailed Recording? → Show extended fieldset
```

## 6. Mobile vs Desktop Considerations

### Design for Mobile First
- `fullWidth: true` on all fields
- Avoid side-by-side layouts
- Keep labels concise
- Test dropdown list lengths on small screens

### Platform-Specific Features to Document
- QR scanning (mobile only)
- GPS accuracy (better on mobile)
- Photo quality (device-dependent)
- Offline reliability (mobile apps superior)

## 7. Data Quality Patterns

### Validation Strategies
1. **Constrain at entry**: Use controlled vocabularies vs free text
2. **Range validation**: NumberField with min/max for measurements
3. **Required fields**: Only for truly essential data
4. **Uncertainty tracking**: Include annotation/uncertainty options for scientific data

### Common Validation Mistakes
- Over-validating (too many required fields)
- Under-validating (accepting any text where vocabulary exists)
- Wrong number types (Integer vs Number)
- Missing null handling for optional numbers

## 8. Performance Considerations

### Form Design for Speed
- Limit fields per view to ~20
- Use tabs for complex forms
- Avoid deeply nested conditionals
- Pre-populate common values

### Field Choice Impact
- Select/RadioGroup faster than hierarchical for <10 options
- AutoIncrementer faster than manual ID entry
- Checkbox faster than Select for boolean choices

## 9. Export and Analysis Considerations

### Design for Data Analysis
- Consistent vocabularies across related forms
- Numeric fields for anything that might be graphed
- Separate fields for compound data (not "5.2m" in one field)
- Consider how multi-select data exports (array format)

## 10. Common Anti-Patterns to Avoid

### In Field Design
- ❌ Free text where vocabulary exists
- ❌ Mixing units in one field
- ❌ Manual entry of system data
- ❌ Orphaned forms without parent relationships
- ❌ Missing HRIDs

### In Form Structure
- ❌ Everything on one view (use sections)
- ❌ No clear workflow order
- ❌ Duplicate data entry across related forms
- ❌ No indication of which fields are required

## 11. Discipline-Specific Insights

### Archaeology
- Contexts/features often need parent-child hierarchies
- Photo documentation critical - multiple angles per feature
- Standardized vocabularies essential for period/type/material

### Ecology
- Repeated measures common - design for efficiency
- Species lists can be very long - consider search/filter
- Weather/conditions often recorded - consider reusable section

### Geology
- Precise measurements critical - include uncertainty
- Sample relationships complex - may need multiple parents
- Coordinate systems vary - document projection used

## 12. Questions for Best Practices Guide

1. When should data be entered in the field vs. lab?
2. How to handle equipment-specific data (e.g., GPS model)?
3. Best practices for versioning vocabularies?
4. How to design for multi-language projects?
5. Strategies for training data collectors?

## 13. Suggested Documentation Sections

### For Field Types Guide
- "Choosing between similar fields" section
- "Common combinations" for each discipline
- "Migration guide" from paper forms
- "Troubleshooting" common issues

### For Best Practices Guide  
- Design workflow (paper → digital)
- Testing protocols
- Vocabulary management
- Quality assurance strategies
- Team coordination patterns