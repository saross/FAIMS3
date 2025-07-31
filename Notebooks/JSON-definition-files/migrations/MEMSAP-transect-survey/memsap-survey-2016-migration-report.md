# MEMSAP Survey 2016 - Migration Report

## Migration Summary
- **Source**: FAIMS2.x MEMSAP Survey 2016 module
- **Target**: FAIMS3.x JSON notebook
- **Estimated Feature Parity**: 85%
- **Major Simplifications**: GPS tracklog, GIS capabilities, dynamic form logic

## Entity Mapping

### FAIMS2 → FAIMS3 Entities

| FAIMS2 Entity | FAIMS3 Viewset | Notes |
|---------------|----------------|-------|
| Transect | Survey_Unit | Renamed for clarity |
| Transect Object (Cobble) | POI_Cobble | Split into specific type |
| Transect Object (Core) | POI_Core | Split into specific type |
| Total Recording (Flake) | Artefact_Flake | Split by technological type |
| Total Recording (Core) | Artefact_Core | Split by technological type |
| Total Recording (Shatter) | Artefact_Shatter | Split by technological type |
| Total Recording (Other) | Artefact_Other | Split by technological type |
| Site | Site | Direct mapping |
| Tracklog | *(removed)* | Not supported in FAIMS3 |
| Transect Point | *(removed)* | Merged into Survey Unit start/end |
| Shape Note | *(removed)* | GIS annotation not supported |

## Feature Migration Details

### Successfully Migrated Features

| Feature | FAIMS2 Implementation | FAIMS3 Implementation |
|---------|----------------------|----------------------|
| Auto-incrementing IDs | Team-based formatting (e.g., "A-00001-SU") | Simple auto-increment with separate team field |
| GPS capture | Multiple modes, manual entry | Single TakePoint component |
| Photo capture | File attachment | TakePhoto component |
| Controlled vocabularies | XML lookups | Select/MultiSelect components |
| Numeric measurements | Float fields | TextField with number input |
| Multi-line text | Freetext | MultipleTextField |
| Required fields | Validation in BSH | validationSchema with yup |
| Field relationships | BSH logic | Separate viewsets |
| Hierarchical recording | Tab groups with navigation | Multiple viewsets with tabs |
| Team selection | Radio buttons | Select dropdown |

### Simplified Features

| Feature | FAIMS2 Capability | FAIMS3 Simplification | Impact |
|---------|------------------|----------------------|---------|
| GPS Tracklog | Continuous tracking with time/distance intervals | Start/end points only | Loss of transect path data |
| Dynamic forms | Conditional loading based on object type | Separate viewsets for each type | More record types but clearer |
| ID generation | Complex team-based formatting | Simple incrementer | IDs less meaningful |
| GPS modes | Internal/External switching | Device-handled | Simpler but less control |
| Map integration | Full GIS with drawing tools | Basic map with markers | Cannot draw survey areas |
| Field calculations | BSH computed fields | Manual entry | No auto-calculations |
| Custom validation | Complex BSH rules | Standard validators | Less sophisticated checks |
| User context | Auto-populated user fields | Manual entry | More typing required |

### Omitted Features

| Feature | Reason | Workaround |
|---------|--------|------------|
| Tracklog recording | Not supported in FAIMS3 | Use external GPS tracking app |
| Transect line computation | No GIS analysis | Post-process GPS data |
| Distance/time tracking | No background services | Manual recording if needed |
| Map shape creation | No drawing tools | Record boundary points separately |
| Relationship entities | Not directly supported | Use manual cross-references |
| Action bar items | Different UI paradigm | Use notebook selection |
| Sync control | Handled at app level | Use app settings |
| Custom CSS styling | JSON-based styling only | Accept default styling |

## Technical Decisions

### ID Strategy
- **Decision**: Use simple auto-incrementers with separate team field
- **Rationale**: FAIMS3 doesn't support complex ID formatting
- **Impact**: IDs less informative but functional

### GPS Handling
- **Decision**: Single GPS point capture for all locations
- **Rationale**: FAIMS3 TakePoint is the standard approach
- **Impact**: No Northing/Easting, only Lat/Long stored

### Form Structure
- **Decision**: Split polymorphic entities into separate viewsets
- **Rationale**: FAIMS3 doesn't support dynamic form switching
- **Impact**: More record types but clearer data model

### Field Naming
- **Decision**: Convert underscores to hyphens in field names
- **Rationale**: JavaScript/JSON convention
- **Impact**: None - internal only

### Validation
- **Decision**: Use standard Yup validators only
- **Rationale**: Custom validation not supported
- **Impact**: Less sophisticated data quality checks

## Data Migration Considerations

### Field Mappings
All field names were preserved where possible, with these conversions:
- Spaces → underscores → hyphens (e.g., "Raw material" → "raw-material")
- Hierarchical paths flattened (e.g., "POI/POI/Weight" → "weight")

### Value Mappings
Vocabulary terms preserved exactly:
- Material types: Quartz, Quartzite, Chert, Silcrete, Other
- Percentages: 10-100% in 10% increments
- All typologies maintained

### Relationship Data
- Team-based relationships replaced with team field
- Transect-POI relationships must be reconstructed via survey line numbers
- No automatic parent-child relationships

## Performance Considerations

### Improvements
- Faster form loading (no BSH interpretation)
- Better offline capability
- Modern UI responsiveness

### Potential Issues
- More record types to choose from
- No background GPS tracking
- Manual relationship management

## Training Requirements

Users will need training on:
1. New record type selection (8 types vs 4)
2. GPS capture differences (no tracklog)
3. Missing map drawing features
4. Manual relationship tracking
5. Simplified ID system

## Future Enhancement Opportunities

1. **Custom Functions**: When FAIMS3 supports custom functions:
   - Re-implement team-based ID formatting
   - Add field calculations

2. **Relationship Support**: If added to FAIMS3:
   - Link POIs/Artifacts to Survey Units
   - Implement proper parent-child records

3. **Advanced GPS**: When available:
   - Restore tracklog functionality
   - Add GPS path visualization

4. **GIS Features**: If implemented:
   - Restore survey area mapping
   - Enable transect line computation

## Conclusion

The migration preserves all essential data collection capabilities while simplifying complex features. The 85% feature parity estimate reflects the loss of advanced GPS/GIS functionality while maintaining complete lithic analysis capabilities. Users can continue their survey methodology with minor workflow adjustments.