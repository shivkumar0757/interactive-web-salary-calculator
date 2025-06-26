# Interactive Developer Salary Calculator

An interactive web application that visualizes developer salary data from the JetBrains Developer Ecosystem Survey 2024. Built with React, TypeScript, Chart.js, and Tailwind CSS.

![Application Preview](./docs/preview.png)

## 🌟 Features

- **Interactive Filters**: Filter by country and programming language
- **Real-time Visualizations**: Bar charts showing salary distributions by experience level
- **Statistical Insights**: View median, 25th/75th percentiles, and sample sizes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Professional UI**: Modern design with loading states and error handling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivkumar0757/interactive-salary-calculator.git
   cd interactive-salary-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## 🏗️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: Chart.js with react-chartjs-2
- **State Management**: React Context API + useReducer
- **Data Processing**: Custom utilities for statistical calculations

## 📊 Data Source

The salary data is sourced from the **JetBrains Developer Ecosystem Survey 2024**, providing insights into:

- 📍 **Countries**: Global developer salary information
- 💻 **Programming Languages**: Popular languages like JavaScript, Python, Java, etc.
- 📈 **Experience Levels**: From <1 year to 16+ years of experience
- 💰 **Compensation**: Annual gross salaries in USD (including bonuses)

## 🎯 Key Features Explained

### Interactive Filtering
- **Country Selection**: Choose from available countries in the dataset
- **Language Selection**: Filter by specific programming languages
- **Real-time Updates**: Charts update instantly when filters change

### Advanced Visualizations
- **Bar Charts**: Compare salaries across different experience levels
- **Statistical Analysis**: View percentiles, medians, and sample sizes
- **Responsive Charts**: Mobile-optimized chart layouts

### User Experience
- **Loading States**: Smooth loading animations while data loads
- **Error Handling**: Graceful error messages with retry options
- **No Data States**: Clear messaging when no data is available
- **Responsive Design**: Works seamlessly on all device sizes

## 🏛️ Architecture

### Component Structure
```
src/
├── components/
│   ├── filters/
│   │   ├── FilterDropdown.tsx    # Reusable dropdown component
│   │   └── FilterPanel.tsx       # Combined filter interface
│   └── visualization/
│       └── SalaryChart.tsx       # Chart.js bar chart component
├── context/
│   └── SalaryContext.tsx         # Global state management
├── types/
│   └── data.ts                   # TypeScript type definitions
├── utils/
│   └── dataProcessor.ts          # Data processing and statistics
└── styles/
    └── globals.css               # Global styles and Tailwind imports
```

### Data Flow
1. **Data Loading**: JSON file loaded asynchronously on app start
2. **State Management**: React Context manages filters and processed data
3. **Data Processing**: Custom utilities calculate statistics and percentiles
4. **Visualization**: Chart.js renders interactive bar charts
5. **User Interaction**: Filter changes trigger real-time data updates

## 🔧 Configuration

### Environment Setup
The application requires no environment variables for basic functionality. The salary data is served as a static file from the `public/` directory.

### Custom Configuration
- **Chart Colors**: Modify chart colors in `SalaryChart.tsx`
- **Tailwind Theme**: Customize design tokens in `tailwind.config.js`
- **Data Structure**: Extend types in `src/types/data.ts` for additional data fields

## 📈 Performance Features

- **Memoized Calculations**: React.useMemo optimizes expensive computations
- **Lazy Loading**: Components render only when needed
- **Optimized Bundle**: Vite provides fast builds and optimal code splitting
- **Responsive Images**: Tailwind CSS responsive utilities

## 🐛 Troubleshooting

### Common Issues

**Build Fails with TypeScript Errors**
```bash
npm run build
# Fix any TypeScript errors shown in the output
```

**Charts Not Displaying**
- Ensure Chart.js is properly imported and registered
- Check browser console for JavaScript errors

**Tailwind Styles Not Loading**
- Verify PostCSS configuration in `postcss.config.js`
- Check Tailwind configuration in `tailwind.config.js`

**Data Not Loading**
- Ensure `calculatorData.json` is in the `public/` directory
- Check network tab in browser dev tools for fetch errors

## 📚 Development Guide

### Adding New Features

1. **New Chart Types**: Extend `SalaryChart.tsx` with additional Chart.js chart types
2. **Additional Filters**: Add new filter components in `components/filters/`
3. **Data Processing**: Extend `DataProcessor` class with new statistical methods
4. **UI Components**: Create reusable components following the existing patterns

### Code Quality

- **TypeScript**: Strict type checking enabled
- **Linting**: Follow React and TypeScript best practices
- **Component Structure**: Keep components focused and reusable
- **State Management**: Use Context API for global state, local state for component-specific data

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the component documentation in the codebase

## 🙏 Acknowledgments

- **JetBrains** for providing the Developer Ecosystem Survey 2024 data
- **Chart.js** team for the excellent charting library
- **Tailwind CSS** team for the utility-first CSS framework
- **React** team for the component framework

---

**Built with ❤️ using React, TypeScript, and modern web technologies.** 