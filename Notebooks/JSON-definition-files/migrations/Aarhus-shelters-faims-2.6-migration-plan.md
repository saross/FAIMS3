# Aarhus Shelters FAIMS 2.6 to FAIMS 3.x Migration Plan

## Module Overview

**Module Name**: Aarhus Civil Defense Shelter Monitoring Module  
**Purpose**: Data capture system for urban Cold-War civil defense amenity documentation in the Aarhus municipality, Denmark  
**Original Version**: FAIMS 2.6  
**Target Version**: FAIMS 3.x (Fieldmark)

### Key Module Features
- Precise documentation of spatial location, layout, and condition of surviving shelters (~250)
- Support for simultaneous multi-user data entry
- Online and offline functionality
- GPS data capture (internal and Bluetooth)
- Structured data entry with picture dictionaries and controlled vocabularies
- Map integration for spatial data collection

## Detailed Field Analysis

### 1. Entity Types

#### Shelter (Main Archaeological Element)
**Fields**:
1. **Feature ID** (measure, isIdentifier=true) - Auto-incrementing numeric ID
2. **Feature Type** (vocab, isIdentifier=true) - Picture vocabulary with shelter types
3. **Shelter author** (measure) - Auto-populated from current user
4. **Shelter timestamp** (measure) - Auto-populated current timestamp
5. **Feature Source** (vocab) - How the shelter was discovered
6. **Number of Iterations Subtype** (vocab) - Number of design repeats with embedded HTML/images
7. **Feature Description** (measure) - Text description
8. **Latitude/Longitude** (measure) - GPS coordinates
9. **Northing/Easting** (measure) - Alternative coordinate system
10. **Accuracy** (measure) - GPS accuracy
11. **Landuse on Top** (vocab) - Surface covering
12. **Landuse Around** (vocab) - Surrounding environment
13. **Overview Photo** (file) - Photo with thumbnail
14. **Locale Description** (measure) - Address and location details
15. **Entryway Type** (vocab) - Type of entrance
16. **Accessibility of Shelter During Visit** (vocab) - Access status
17. **Entryway Faces Direction** (vocab) - Compass direction
18. **Comments on Entryway and Access** (measure) - Text notes
19. **Entryway Photo** (file) - Photo with thumbnail
20. **Emergency Exit Shape** (vocab) - Exit shape
21. **Emergency Exit Location** (vocab) - Exit position
22. **Notes on Emergency Exit** (measure) - Text notes
23. **Emergency Exit Photo** (file) - Photo with thumbnail
24. **Distance from Swan neck to Emergency Exit m** (measure, decimal) - Numeric measurement
25. **Interior Description** (measure) - Text description
26. **Interior Photo** (file) - Photo with thumbnail
27. **Comments and Recommendations** (measure) - Final notes

#### Shape (Secondary Archaeological Element)
**Fields**:
1. **Label** (measure, isIdentifier=true)
2. **Note** (measure)

### 2. UI Structure

#### Tab Groups
1. **User** - Login functionality
2. **Start** - Main menu with:
   - Main tab: Create new feature, Next Feature ID, GPS Diagnostics
   - Search tab: Search functionality with entity list
   - Map tab: Map view with shape creation
3. **Shelter** - Main data entry with tabs:
   - General: Basic shelter information and location
   - Access: Entryway and emergency exit details
   - Interior: Internal features
4. **Shape** - Simple shape annotation

### 3. Custom Functionality

#### Beanshell Logic Features
1. **Auto-incrementing Feature ID** - Uses `incAutoNum()` function
2. **Auto-population of author and timestamp** - `populateAuthorAndTimestamp()`
3. **GPS capture** - `takePoint()` function with "Take From GPS" button
4. **Map integration** - Create shapes, center on location
5. **Search functionality** - Custom search with entity type filtering
6. **Duplicate feature** - `duplicateShelter()` with clearing of photos and GPS
7. **Picture vocabularies** - Image-based selection for shelter types
8. **WebView for guide** - HTML-based field guide
9. **Navigation buttons** - Dynamic add/remove for entity navigation
10. **Validation** - Required fields marked with CSS class

### 4. Validation Requirements
Required fields (from validation.xml):
- Feature ID
- Feature Type
- All GPS fields (Latitude, Longitude, Northing, Easting, Accuracy)
- Landuse on Top
- Entryway Type
- Accessibility of Shelter During Visit
- Entryway Faces Direction
- Emergency Exit Shape
- Emergency Exit Location

## Features Requiring Modification

### 1. Direct Mappings Available
- ✅ Text fields → TextField
- ✅ Dropdowns → Select
- ✅ Photos → TakePhoto
- ✅ GPS capture → TakePoint
- ✅ Required field validation → Yup validation
- ✅ Numeric fields → NumberField

### 2. Features Requiring Adaptation

#### Picture Vocabularies
**FAIMS2.x**: Dropdown with image URLs in vocabulary terms  
**FAIMS3.x**: Regular Select component (no image support)  
**Solution**: Use descriptive labels, provide reference images in documentation

#### Auto-incrementing Feature ID
**FAIMS2.x**: Custom Beanshell `incAutoNum()` function  
**FAIMS3.x**: BasicAutoIncrementer component  
**Solution**: Direct component replacement

#### Author/Timestamp Auto-population
**FAIMS2.x**: `populateAuthorAndTimestamp()` Beanshell function  
**FAIMS3.x**: Combination of user context and DateTimeNow component  
**Solution**: Use metadata fields and DateTimeNow with initialValue

#### HTML Guide Content
**FAIMS2.x**: WebView with HTML content  
**FAIMS3.x**: RichText field or external documentation  
**Solution**: Convert to RichText or reference external guide

#### Map Integration
**FAIMS2.x**: Full map with shape creation  
**FAIMS3.x**: MapFormField with basic geometry  
**Solution**: Simplified to point capture only

### 3. Features Lost in Migration

1. **Picture vocabularies** - No image support in dropdowns
2. **WebView guide** - No embedded HTML viewer
3. **Complex map shapes** - Limited to basic geometries
4. **Dynamic navigation buttons** - No custom UI manipulation
5. **Duplicate with photo clearing** - Manual process
6. **Search by author** - No dynamic user filtering
7. **GPS diagnostics display** - Basic location capture only

## Migration Strategy

### Phase 1: Core Structure
1. Create JSON metadata section with project information
2. Define all fields with appropriate FAIMS3.x components
3. Map vocabularies to Select component options
4. Structure forms into logical sections (fviews)

### Phase 2: Field Mapping
1. Convert all text fields to TextField
2. Map all vocabularies to Select with text-only options
3. Replace file fields with TakePhoto component
4. Implement BasicAutoIncrementer for Feature ID
5. Use TakePoint for GPS capture
6. Add DateTimeNow for timestamp

### Phase 3: Validation and Logic
1. Implement Yup validation for all required fields
2. Add conditional logic where applicable
3. Set appropriate initial values
4. Configure field relationships

### Phase 4: Documentation
1. Create user guide explaining changes
2. Document lost features and workarounds
3. Provide vocabulary reference images separately
4. Include migration notes for data transfer

## Expected Outcomes

### Preserved Functionality (~85%)
- All core data fields
- GPS location capture
- Photo documentation
- Controlled vocabularies (text only)
- Multi-user support
- Required field validation
- Basic search functionality

### Simplified Features
- Map interaction (point only)
- No embedded guides
- Manual duplication process
- Text-only vocabularies

### Lost Features
- Picture galleries in dropdowns
- WebView HTML content
- Complex shape creation
- Dynamic UI elements
- GPS diagnostics display

## Implementation Notes

1. **Field IDs**: Maintain original field names for data compatibility
2. **Vocabularies**: Preserve all term values exactly
3. **Validation**: Implement all required fields from original
4. **Structure**: Maintain three-tab organization (General, Access, Interior)
5. **User Experience**: Document changes clearly for field teams