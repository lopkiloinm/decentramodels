# Responsive Pagination Update

## Overview
Updated the pagination system to dynamically adjust the number of models per page based on screen width and grid columns.

## Changes Made

### 1. **Dynamic Models Per Page**
- Replaced fixed `MODELS_PER_PAGE = 6` with dynamic calculation
- Always shows **2 rows** of models per page
- Models per page = columns × 2

### 2. **Column Detection**
Automatically detects grid columns based on window width:
- **< 960px**: 2 columns → 4 models per page
- **960px - 1280px**: 3 columns → 6 models per page  
- **1280px - 1600px**: 4 columns → 8 models per page
- **1600px - 1920px**: 5 columns → 10 models per page
- **> 1920px**: 6 columns → 12 models per page (capped)

### 3. **Responsive Behavior**
- Recalculates on window resize
- Adjusts current page if out of bounds after resize
- Updates page input values automatically

## Technical Implementation

```typescript
// Calculate columns based on container width
const minCardWidth = 320; // From CSS grid
const gap = 12;
const containerWidth = window.innerWidth - 48;

// Determine how many columns fit
let columns = 1;
while (totalWidth + gap + minCardWidth <= containerWidth) {
    columns++;
}
```

## Benefits
1. **Better Space Utilization**: Always fills the viewport with 2 full rows
2. **Consistent Experience**: Same visual density across all screen sizes
3. **Smart Adaptation**: No awkward single row with 1-2 items on wide screens
4. **Future Proof**: Works with any screen size without hardcoding breakpoints

## Grid Layout Reference
The model grid uses: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`
- Minimum card width: 320px
- Gap between cards: 12px
- Responsive without media queries 