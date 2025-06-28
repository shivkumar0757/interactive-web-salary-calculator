# Interactive Developer Salary Calculator

An interactive web-based salary calculator that visualizes developer compensation data from the JetBrains Developer Ecosystem Survey 2024. Built with React, TypeScript, and modern visualization libraries.

## 🚀 Live Demo

Access the live application at: [Coming Soon]

## 📋 Features

- **Interactive Data Visualization**: Real-time salary charts based on JetBrains survey data
- **Dynamic Filtering**: Filter by programming language and country
- **Experience Level Breakdown**: Salary ranges across different experience levels
- **Statistical Insights**: Min, max, median, and quartile data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📊 Data

The application uses salary data from the JetBrains Developer Ecosystem Survey 2024, containing:
- 138,561+ salary data points
- Multiple countries and programming languages
- Experience levels from <1 year to 16+ years
- USD salary ranges with statistical breakdowns

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interactive-web
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
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
interactive-web/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── FilterSection.tsx
│   │   ├── SalaryChart.tsx
│   │   ├── StatisticsPanel.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useData.ts
│   ├── types/              # TypeScript type definitions
│   │   └── data.ts
│   ├── utils/              # Utility functions
│   │   └── dataProcessor.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── calculatorData.json     # Salary survey data
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # This file
```

## 🎯 Usage

1. **Select Country**: Choose from available countries in the dropdown
2. **Select Language**: Pick a programming language based on selected country
3. **View Results**: Explore salary distributions and statistics
4. **Interactive Charts**: Hover over chart elements for detailed information

## 📈 Key Components

### FilterSection
- Country and language dropdowns
- Real-time filtering
- Default selections (US + JavaScript)

### SalaryChart
- Box plot visualization using Recharts
- Experience level breakdown
- Salary range display with quartiles

### StatisticsPanel
- Summary statistics for selected filters
- Count of data points
- Min/max/median salary information

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

### Vite
Build tool configuration is in `vite.config.ts` with React plugin support.

## 📋 Requirements Fulfilled

✅ Interactive data visualization similar to JetBrains reference page  
✅ Working filters for programming language and country  
✅ Salary ranges and distributions display  
✅ Modern frontend framework (React + TypeScript)  
✅ Responsive design  
✅ Static data file usage (calculatorData.json)  
✅ Complete setup documentation  

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder or connect repo
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Any Static Hosting**: Upload `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Documentation

- [Product Requirements Document (PRD)](./PRD.md) - Detailed product specifications
- [Low Level Design (LLD)](./LLD.md) - Technical architecture and design
- [Requirements](./requirements.md) - Original project requirements

## 🔮 Future Enhancements

- Additional filters (industry, company size)
- Export functionality (PDF, PNG)
- Comparison mode for multiple selections
- Historical data trends
- Social sharing capabilities

## 📞 Support

For questions or issues, please:
1. Check existing [GitHub Issues](../../issues)
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

## 📝 License

This project is part of an assignment for Air Research. See project requirements for usage terms.

---

**Built with ❤️ for the developer community** 