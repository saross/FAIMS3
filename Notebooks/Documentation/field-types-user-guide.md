# FAIMS3 Field Types Guide for Researchers

## Introduction

This guide helps researchers in archaeology, ecology, geoscience, and related fields choose the right input types when designing digital data collection forms. Each field type is designed for specific kinds of data you'll collect in the field.

## Quick Reference Table

| What You Want to Record | Field Type to Use | Example |
|------------------------|-------------------|---------|
| Site/specimen names | Single-line text | "Excavation Unit 5" |
| Detailed descriptions | Multi-line text | Field notes, context descriptions |
| Counts or measurements | Number field | Artifact count: 23 |
| Yes/No questions | Checkbox | "Is feature complete?" ✓ |
| Choose one option | Radio buttons or Dropdown | Soil type: Clay/Sand/Loam |
| Choose multiple options | Multi-select | Materials present: ✓Ceramic ✓Glass ✓Metal |
| Dates | Date picker | Collection date: 15/03/2024 |
| Photos | Photo capture | Site photos, specimen images |
| GPS coordinates | GPS point | Lat: -33.8688, Long: 151.2093 |
| Draw on a map | Map drawing | Site boundaries, transect lines |
| Scan specimen labels | QR/Barcode scanner | Bag ID: "EXC2024-001" |
| Relationships between records | Related records | Link samples to sites |

## Detailed Field Type Guide

### 📝 Text Fields

#### **Single-Line Text**
- **What it's for**: Short text like names, IDs, brief labels
- **Examples**: 
  - Site name: "Rock Shelter A"
  - Specimen ID: "BOT-2024-156"
  - Recorder name: "Dr. Sarah Chen"
- **Tip**: Keep to one line of text (under 100 characters)

#### **Multi-Line Text Box**
- **What it's for**: Longer descriptions, notes, observations
- **Examples**:
  - Context description in archaeology
  - Habitat notes in ecology
  - Rock formation descriptions in geology
- **Tip**: Great for field notes that need paragraphs

#### **Email Address**
- **What it's for**: Collecting contact information
- **Examples**: 
  - Principal investigator email
  - Lab contact for samples
- **Special feature**: Automatically checks for valid email format

#### **Street Address**
- **What it's for**: Recording physical locations with street addresses
- **Examples**:
  - Museum address for loans
  - Property address for surveys
  - Meeting location for teams

### 🔢 Number Fields

#### **Basic Number**
- **What it's for**: Simple counts without limits
- **Examples**:
  - Number of pottery sherds: 47
  - Tree count in quadrat: 12
  - Sample weight in grams: 156.3

#### **Controlled Number**
- **What it's for**: Numbers with minimum/maximum limits
- **Examples**:
  - pH reading (0-14): 7.2
  - Percentage cover (0-100): 65%
  - Temperature (-50 to 50°C): 23.5°C
- **Special feature**: Prevents invalid entries outside your range

#### **Auto-Incrementing ID**
- **What it's for**: Automatic sequential numbering
- **Examples**:
  - Sample numbers: 00001, 00002, 00003...
  - Feature IDs: F-001, F-002, F-003...
- **Special feature**: Generates next number automatically

### 📅 Date & Time Fields

#### **Date Picker**
- **What it's for**: Recording dates without times
- **Examples**:
  - Excavation date: 15/03/2024
  - Collection date for specimens
  - Survey date

#### **Date and Time Picker**
- **What it's for**: Recording exact date AND time
- **Examples**:
  - Timed observations: 15/03/2024 14:35
  - Camera trap deployment time
  - High tide measurement time

#### **Month/Year Picker**
- **What it's for**: When you only need month and year
- **Examples**:
  - Field season: March 2024
  - Historical records: June 1887
  - Seasonal surveys

#### **Current Timestamp**
- **What it's for**: Quick "recorded at" timestamps
- **Examples**:
  - Data entry time
  - Observation logged at
- **Special feature**: "Now" button for instant timestamp

### 📷 Media Fields

#### **Photo Capture**
- **What it's for**: Taking or uploading photos
- **Examples**:
  - Site photographs
  - Specimen images
  - Feature documentation
  - Context shots
- **Features**: 
  - Take multiple photos
  - Use device camera or upload existing
  - Add captions to each photo

#### **File Upload**
- **What it's for**: Attaching any type of file
- **Examples**:
  - PDF permits or maps
  - Audio recordings (bird calls, interviews)
  - Video files
  - Spreadsheets or documents
  - High-resolution DSLR photos

### 📍 Location Fields

#### **GPS Point**
- **What it's for**: Recording your current location
- **Examples**:
  - Site coordinates
  - Specimen collection point
  - Photo location
- **What you get**: Latitude, longitude, and accuracy
- **Tip**: Works best outdoors with clear sky view

#### **Map Drawing**
- **What it's for**: Drawing features on a map
- **Options**:
  - **Point**: Mark specific locations (sites, finds, trees)
  - **Line**: Draw transects, paths, or boundaries
  - **Polygon**: Draw areas (excavation units, survey areas, habitats)
- **Examples**:
  - Archaeological site boundaries
  - Ecological survey transects
  - Geological outcrop areas
- **Note**: Requires internet connection for base maps

### ✅ Choice Fields

#### **Checkbox**
- **What it's for**: Simple yes/no questions
- **Examples**:
  - "Is this feature disturbed?" ✓
  - "Sample collected?" ✓
  - "Photographs taken?" ✓

#### **Radio Buttons**
- **What it's for**: Choose ONE option from 2-5 choices (all visible)
- **Examples**:
  - Preservation: Excellent / Good / Fair / Poor
  - Soil texture: Clay / Silt / Sand
  - Weather: Sunny / Cloudy / Rainy
- **Tip**: Use when you want all options visible at once

#### **Dropdown List**
- **What it's for**: Choose ONE option from many choices
- **Examples**:
  - Species selection from taxonomy
  - Artifact types (20+ options)
  - Rock types
- **Tip**: Saves screen space for long lists

#### **Multi-Select List**
- **What it's for**: Choose MULTIPLE options
- **Examples**:
  - Materials present: ✓Ceramic ✓Glass ✓Metal ✓Bone
  - Site features: ✓Hearth ✓Midden ✓Structure
  - Environmental conditions: ✓Wet ✓Shaded ✓Disturbed

#### **Hierarchical Dropdown**
- **What it's for**: Nested categories (like taxonomies)
- **Examples**:
  - Biological classification: Kingdom > Phylum > Class > Order > Family > Genus > Species
  - Artifact typology: Material > Type > Subtype
  - Geological classification: Rock type > Formation > Member

### 🔗 Special Fields

#### **QR/Barcode Scanner** *(Mobile App Only)*
- **What it's for**: Scanning codes on bags, labels, or equipment
- **Examples**:
  - Specimen bag barcodes
  - Equipment inventory tags
  - Pre-printed context labels
- **Important**: Only works on iOS/Android apps, not web browser

#### **Generated ID Field**
- **What it's for**: Creating human-readable IDs from other fields
- **Examples**:
  - Site-Date-Number: "SITE1-2024-001"
  - Team-Feature-ID: "TeamA-Hearth-05"
  - Species-Location-Date: "ACAC-Grid5-20240315"
- **Tip**: Combines multiple fields into one meaningful identifier

#### **Related Records**
- **What it's for**: Linking records together
- **Examples**:
  - Link samples to their site
  - Connect photos to specific features
  - Associate finds with contexts
  - Link measurements to specimens
- **How it works**: Create child records from parent records

#### **Static Instructions**
- **What it's for**: Adding help text, warnings, or section headers to forms
- **Examples**:
  - "⚠️ Remember to photograph before excavating"
  - Section headers: "### Soil Sample Data"
  - Instructions for specific procedures
- **Note**: This is display-only, not for data entry

### 🌐 Conditional Fields

Any field can be set to appear only when certain conditions are met:
- **Example 1**: Show "Specify other" text box only when "Other" is selected
- **Example 2**: Show detailed measurements only if "Measure in detail?" is checked
- **Example 3**: Show cultural fields only for "Cultural" site types

## Platform-Specific Features

### Mobile App Features (iOS/Android)
- ✅ QR/Barcode scanning
- ✅ Better GPS accuracy
- ✅ Offline data collection
- ✅ Camera integration

### Web Browser Features
- ✅ Larger screen for data review
- ✅ Easier bulk data entry
- ❌ No QR scanning
- ⚠️ GPS less accurate than mobile

## Best Practices for Field Design

### 1. **Start Simple**
Begin with essential fields and add complexity only as needed.

### 2. **Use Consistent Naming**
- Sites: SITE-001, SITE-002
- Samples: SAMP-2024-001
- Features: F-01, F-02

### 3. **Group Related Fields**
Put related information together:
- Location section: GPS, site name, grid reference
- Sample section: Type, quantity, storage
- Environmental section: Weather, soil, vegetation

### 4. **Consider Data Export**
- Dropdowns create consistent data for analysis
- Free text is harder to analyze later
- Numbers are better than text for measurements

### 5. **Test in the Field**
- Is text too small on mobile?
- Are dropdown lists too long?
- Can you enter data with gloves on?

## Common Field Combinations

### Archaeological Site Recording
1. Site ID (auto-generated)
2. Site name (text)
3. GPS location (GPS point)
4. Site type (dropdown)
5. Period (multi-select)
6. Description (multi-line text)
7. Photos (photo capture)
8. Recorded by (text)
9. Date (date picker)

### Ecological Survey
1. Transect ID (generated from location+date)
2. Start GPS (GPS point)
3. End GPS (GPS point) 
4. Species observed (hierarchical dropdown)
5. Count (number)
6. Habitat type (radio buttons)
7. Canopy cover % (controlled number 0-100)
8. Photo (photo capture)
9. Notes (multi-line text)

### Geological Sample
1. Sample ID (auto-increment)
2. Location (GPS point)
3. Rock type (hierarchical dropdown)
4. Strike/Dip (numbers)
5. Weathering (radio: Fresh/Slight/Moderate/Heavy)
6. Color (text or dropdown)
7. Grain size (dropdown)
8. Photos (photo capture)
9. Thin section needed? (checkbox)

## Getting Help

When designing your form, consider:
- What data do you need to collect?
- How will you analyze it later?
- What conditions will you be working in?
- Who will be entering the data?

Remember: The best form is one that captures your essential data efficiently and accurately in field conditions.