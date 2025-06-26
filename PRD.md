# Product Requirements Document (PRD)
## Interactive Developer Salary Calculator

### 1. Product Overview
Create an interactive web-based salary calculator that visualizes developer compensation data from the JetBrains Developer Ecosystem Survey 2024, allowing users to filter and explore salary distributions across different parameters.

### 2. User Stories

#### Primary User Flow
1. **User visits the salary calculator page**
2. **User selects filters:**
   - Programming language (dropdown)
   - Country/Location (dropdown)
3. **System displays:**
   - Salary distribution chart by experience level
   - Salary ranges for each experience category
   - Statistical insights for the selected combination

#### Secondary User Flows
- User can reset filters to defaults
- User can explore different combinations of language/country
- User can view detailed salary information on hover/click

### 3. Functional Requirements

#### 3.1 Filter Components
- **Programming Language Selector**
  - Dropdown with all available languages from data
  - Default selection (e.g., JavaScript/TypeScript)
  - Support for searching/filtering languages

- **Country Selector**
  - Dropdown with all available countries from data
  - Default selection (e.g., United States)
  - Support for searching/filtering countries

#### 3.2 Data Visualization
- **Salary Distribution Chart**
  - X-axis: Experience levels (<1 year, 1-2 years, 3-5 years, 6-10 years, 11-16 years, 16+ years)
  - Y-axis: Salary ranges (in USD thousands)
  - Display salary distributions for selected language/country combination
  - Support for multiple visualization types (box plot, range chart, etc.)

#### 3.3 Data Display
- **Salary Information Panel**
  - Show selected filters (language and country)
  - Display salary ranges for each experience level
  - Show statistical data (median, percentiles if available)
  - Currency format: USD with 'K' notation (e.g., $75K)

### 4. Non-Functional Requirements

#### 4.1 Performance
- Page load time < 3 seconds
- Filter responses < 500ms
- Smooth animations and transitions
- Efficient data handling for 5MB dataset

#### 4.2 Usability
- Responsive design (mobile, tablet, desktop)
- Intuitive filter interface
- Clear data visualization
- Accessible design (WCAG compliance)

#### 4.3 Technical
- Modern browser support (Chrome, Firefox, Safari, Edge)
- SEO-friendly structure
- Clean, maintainable code
- Cross-platform compatibility

### 5. Technical Specifications

#### 5.1 Data Structure
```json
{
  "Country": {
    "Programming Language": {
      "entries": [
        {
          "value": salary_in_thousands,
          "category": experience_level,
          "metadata": {
            "Country": string,
            "Language": string,
            "Experience": string,
            "Salary": formatted_string
          }
        }
      ]
    }
  }
}
```

#### 5.2 Key Features
1. **Interactive Filters**: Real-time filtering capability
2. **Dynamic Visualization**: Chart updates based on selected filters
3. **Data Processing**: Client-side data manipulation
4. **Responsive Design**: Works across all device sizes
5. **Performance Optimization**: Efficient rendering of large datasets

### 6. Success Metrics
- User engagement time > 2 minutes
- Filter interaction rate > 70%
- Zero loading errors
- Mobile usability score > 95%
- Page performance score > 90%

### 7. Future Enhancements
- Additional filters (industry, company size, etc.)
- Export functionality (PDF, PNG)
- Comparison mode (multiple selections)
- Historical data trends
- Social sharing capabilities

### 8. Design Requirements
- Follow Figma design specifications
- Match JetBrains reference page styling
- Clean, professional interface
- Consistent color scheme and typography
- Interactive elements with clear visual feedback 