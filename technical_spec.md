# Technical Specification: DecentraModels v2

## Core Components

### 1. Data Structure Updates

```typescript
interface ModelInfo {
  // Existing fields
  name: string;
  platform: string;
  category: string;
  base: string;
  downloads: string;
  rating: number;
  specialty: string;
  hardware: string;
  architecture: string;
  style: string;
  usecase: string;
  quality: string;
  modality: Modality;
  
  // New required fields
  source: 'lab' | 'community';
  lastUpdated: string; // ISO date
  isNew?: boolean; // Auto-calculated
  weeklyGrowth?: number; // For trending
  verified: boolean; // Real model flag
}
```

### 2. Component Architecture

```
App.tsx
├── Header.tsx (search + quick filters)
├── QuickAccessBar.tsx (NEW - hero actions)
├── ModelSections.tsx (NEW - replaces FeaturedModels)
│   ├── TrendingModels.tsx
│   ├── LabModels.tsx
│   └── CommunityModels.tsx
├── TrainingSection.tsx (simplified)
└── Footer.tsx
```

### 3. Smart Loading Strategy

```typescript
// Initial page load
const INITIAL_LOADS = {
  trending: 6,    // Most important, above fold
  lab: 8,         // Trusted sources
  community: 10   // Popular community models
};

// Progressive loading
const LOAD_MORE_INCREMENT = 12;
```

### 4. Real Models Database

```typescript
// Verified lab models
const LAB_MODELS = [
  'FLUX.1-dev',
  'FLUX.1-schnell', 
  'stable-diffusion-xl-base-1.0',
  'stable-diffusion-3.5-large',
  'HunyuanDiT-v1.2',
  'playground-v2.5'
];

// Verified community checkpoints
const COMMUNITY_MODELS = [
  'pony-diffusion-v6-xl',
  'illustrious-xl-v1.0',
  'noobai-xl-vpred-v1.0',
  'dreamshaper-xl-v2.1',
  'juggernaut-xl-v9'
];
```

### 5. Training Simplification

```typescript
interface TrainingOption {
  type: 'lora' | 'dreambooth' | 'merge';
  baseModels: string[]; // Compatible models
  minVRAM: number; // In GB
  estimatedTime: string; // Range
  description: string;
}

// No specific "trainer" cards, just options
const TRAINING_OPTIONS: TrainingOption[] = [
  {
    type: 'lora',
    baseModels: ['SDXL', 'FLUX'],
    minVRAM: 6,
    estimatedTime: '30min - 2hrs',
    description: 'Lightweight model customization'
  }
];
```

### 6. UI/UX Patterns

#### Compact Model Card
```jsx
<div className="model-card--compact">
  <div className="model-info">
    <h4>{name}</h4>
    <span className="model-meta">
      {source === 'lab' ? '🏢' : '🎨'} • {downloads}
    </span>
  </div>
  <div className="model-actions">
    {isNew && <span className="badge--new">NEW</span>}
    <button>Use</button>
  </div>
</div>
```

#### Progressive Disclosure
```jsx
const [expanded, setExpanded] = useState({
  trending: true,
  lab: true,
  community: false
});

const [visibleCounts, setVisibleCounts] = useState(INITIAL_LOADS);
```

### 7. Performance Targets

| Component | Target | Method |
|-----------|--------|--------|
| Initial render | <500ms | SSG/static data |
| Time to interactive | <1s | Code splitting |
| Search response | <50ms | Client-side filter |
| Model load | <100ms | Lazy loading |

### 8. Search & Filter Logic

```typescript
// Multi-field search
const searchFields = ['name', 'platform', 'category', 'specialty'];

// Smart sorting
const sortOptions = {
  trending: (a, b) => b.weeklyGrowth - a.weeklyGrowth,
  newest: (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated),
  popular: (a, b) => parseDownloads(b) - parseDownloads(a)
};

// Quick filters
const quickFilters = [
  { label: 'Image', modality: 'text-to-image' },
  { label: 'Video', modality: 'text-to-video' },
  { label: 'LoRA Ready', tag: 'trainable' }
];
```

## Implementation Checklist

- [ ] Remove all hardcoded/fake models
- [ ] Add source field to distinguish lab vs community
- [ ] Implement categorized sections
- [ ] Create compact card component
- [ ] Add quick access bar
- [ ] Simplify training to generic options
- [ ] Add progressive loading
- [ ] Implement smart search
- [ ] Add "last updated" dates
- [ ] Mobile-first responsive design 