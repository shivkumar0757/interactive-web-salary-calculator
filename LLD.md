# Low Level Design (LLD)
## Interactive Developer Salary Calculator

### 1. System Architecture

#### 1.1 Overall Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │  React Frontend │    │  Static Data    │
│                 │◄──►│                 │◄──►│calculatorData   │
│  - UI/UX        │    │  - Components   │    │     .json       │
│  - Interactions │    │  - State Mgmt   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### 1.2 Technology Stack
- **Frontend Framework**: React 18+ with TypeScript
- **Visualization**: Chart.js / D3.js / Recharts
- **Styling**: Tailwind CSS / Styled Components
- **State Management**: React Context + useReducer / Zustand
- **Build Tool**: Vite
- **Data Processing**: Custom utilities for JSON parsing

### 2. Component Architecture

#### 2.1 Component Hierarchy
```
App
├── Header
├── FilterSection
│   ├── CountrySelector
│   └── LanguageSelector
├── VisualizationSection
│   ├── SalaryChart
│   ├── StatisticsPanel
│   └── ExperienceLegend
└── Footer
```

#### 2.2 Component Specifications

##### App Component
```typescript
interface AppState {
  selectedCountry: string;
  selectedLanguage: string;
  filteredData: SalaryData[];
  isLoading: boolean;
  error: string | null;
}
```

##### FilterSection Components
```typescript
interface FilterProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

// CountrySelector Component
// LanguageSelector Component
```

##### Visualization Components
```typescript
interface ChartData {
  experienceLevel: string;
  salaryRange: {
    min: number;
    max: number;
    median: number;
    values: number[];
  };
}

interface SalaryChartProps {
  data: ChartData[];
  country: string;
  language: string;
}
```

### 3. Data Management

#### 3.1 Data Loading Strategy
```typescript
// Data loader utility
class DataLoader {
  private static instance: DataLoader;
  private cachedData: SalaryDataMap | null = null;

  async loadData(): Promise<SalaryDataMap> {
    if (this.cachedData) return this.cachedData;
    
    const response = await fetch('/calculatorData.json');
    const data = await response.json();
    this.cachedData = data;
    return data;
  }
}
```

#### 3.2 Data Processing
```typescript
interface SalaryEntry {
  value: number;
  category: string;
  metadata: {
    Country: string;
    Language: string;
    Experience: string;
    Salary: string;
  };
}

interface ProcessedData {
  experienceLevel: string;
  salaries: number[];
  stats: {
    min: number;
    max: number;
    median: number;
    percentile25: number;
    percentile75: number;
  };
}

class DataProcessor {
  static processData(
    rawData: SalaryDataMap,
    country: string,
    language: string
  ): ProcessedData[] {
    // Implementation for data filtering and processing
  }
}
```

### 4. State Management

#### 4.1 Application State
```typescript
interface AppContextType {
  // Current selections
  selectedCountry: string;
  selectedLanguage: string;
  
  // Available options
  availableCountries: string[];
  availableLanguages: string[];
  
  // Processed data
  currentData: ProcessedData[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCountry: (country: string) => void;
  setLanguage: (language: string) => void;
  resetFilters: () => void;
}
```

#### 4.2 State Flow
```
User Action → State Update → Data Processing → Chart Re-render
     ↓              ↓              ↓              ↓
Filter Change → Update Context → Filter Data → Update Chart
```

### 5. File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Loading.tsx
│   ├── filters/
│   │   ├── CountrySelector.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── FilterSection.tsx
│   ├── visualization/
│   │   ├── SalaryChart.tsx
│   │   ├── StatisticsPanel.tsx
│   │   ├── ExperienceLegend.tsx
│   │   └── VisualizationSection.tsx
│   └── App.tsx
├── hooks/
│   ├── useData.ts
│   ├── useFilters.ts
│   └── useChart.ts
├── utils/
│   ├── dataLoader.ts
│   ├── dataProcessor.ts
│   ├── chartHelpers.ts
│   └── constants.ts
├── types/
│   ├── data.ts
│   ├── chart.ts
│   └── common.ts
├── styles/
│   ├── globals.css
│   ├── components.css
│   └── tailwind.config.js
├── context/
│   └── AppContext.tsx
└── public/
    ├── calculatorData.json
    ├── index.html
    └── favicon.ico
```

### 6. Chart Implementation

#### 6.1 Chart Configuration
```typescript
interface ChartConfig {
  type: 'boxplot' | 'range' | 'scatter';
  responsive: true;
  scales: {
    x: ExperienceLevels;
    y: SalaryRanges;
  };
  plugins: {
    legend: boolean;
    tooltip: TooltipConfig;
  };
}
```

#### 6.2 Chart Data Format
```typescript
interface ChartDataPoint {
  x: string; // Experience level
  y: number[]; // Salary values for box plot
  // OR
  yMin: number; // Min salary for range chart
  yMax: number; // Max salary for range chart
}
```

### 7. Performance Optimizations

#### 7.1 Data Loading
- Lazy load data on component mount
- Cache processed results
- Implement data virtualization for large datasets

#### 7.2 Component Optimization
- Use React.memo for expensive components
- Implement useMemo for data processing
- Debounce filter changes

#### 7.3 Bundle Optimization
- Code splitting by route/feature
- Tree shaking for unused code
- Optimize chart library imports

### 8. Error Handling

#### 8.1 Data Loading Errors
```typescript
interface ErrorState {
  type: 'NETWORK_ERROR' | 'PARSE_ERROR' | 'DATA_ERROR';
  message: string;
  retry?: () => void;
}
```

#### 8.2 User Experience
- Graceful error messages
- Loading states for all async operations
- Fallback data or empty states

### 9. Testing Strategy

#### 9.1 Unit Tests
- Data processing utilities
- Individual component functionality
- Custom hooks

#### 9.2 Integration Tests
- Filter interactions
- Chart updates
- Data flow

#### 9.3 E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Performance metrics

### 10. Deployment

#### 10.1 Build Process
```bash
npm run build
npm run preview
npm run deploy
```

#### 10.2 Static Hosting
- Vercel/Netlify deployment
- CDN for data file
- Environment-specific configurations 