# Pagination System Update

## Overview
Replaced the "Show More" progressive loading system with a full pagination system for model sections.

## Changes Made

### 1. **Pagination Logic**
- Each page displays exactly **6 models**
- Removed the expanding/collapsing system
- Each section maintains its own current page state

### 2. **Navigation Controls**
- **Previous/Next buttons** (← →) for sequential navigation
- **Page number buttons** for direct page access
- **Ellipsis** (...) to indicate skipped pages
- **Page input field** for typing specific page numbers

### 3. **Pagination Display Logic**
Shows pages in this pattern:
- If 7 or fewer pages: Show all pages
- If more than 7 pages:
  - Always show first and last page
  - Show current page and one page on each side
  - Use ellipsis (...) to indicate gaps

Example with 20 pages, current page 10:
```
← 1 ... 9 10 11 ... 20 → Page [10] of 20
```

### 4. **Page Input Feature**
- Users can type a page number directly
- Press Enter or click outside to navigate
- Invalid inputs reset to current page
- Only accepts numeric input

## UI Components

### Pagination Container
```html
<div class="pagination">
  <button class="pagination__btn pagination__btn--prev">←</button>
  <div class="pagination__items">
    <button class="pagination__btn">1</button>
    <span class="pagination__ellipsis">...</span>
    <button class="pagination__btn pagination__btn--active">5</button>
    <!-- etc -->
  </div>
  <button class="pagination__btn pagination__btn--next">→</button>
  <div class="pagination__input-group">
    <span class="pagination__label">Page</span>
    <input class="pagination__input" />
    <span class="pagination__label">of 10</span>
  </div>
</div>
```

## Benefits
1. **Predictable navigation** - Users know exactly where they are
2. **Direct access** - Jump to any page without clicking through
3. **Better performance** - Only renders 6 models at a time
4. **Clear boundaries** - Users see total pages available

## Styling
- Consistent with existing button styles
- Active page highlighted with primary color
- Disabled state for prev/next at boundaries
- Smooth transitions and hover effects 