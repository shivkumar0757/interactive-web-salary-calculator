import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterSection } from './components/FilterSection';
import { SalaryChart } from './components/SalaryChart';
import { StatisticsPanel } from './components/StatisticsPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useData } from './hooks/useData';
import { DataProcessor } from './utils/dataProcessor';

function App() {
  const { data, loading, error } = useData();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  // Get available options
  const availableCountries = useMemo(() => {
    if (!data) return [];
    return DataProcessor.getAvailableCountries(data);
  }, [data]);

  const availableLanguages = useMemo(() => {
    if (!data || !selectedCountry) return [];
    return DataProcessor.getAvailableLanguages(data, selectedCountry);
  }, [data, selectedCountry]);

  // Set default selections
  useEffect(() => {
    if (availableCountries.length > 0 && !selectedCountry) {
      const defaultCountry = availableCountries.includes('United States') 
        ? 'United States' 
        : availableCountries[0];
      setSelectedCountry(defaultCountry);
    }
  }, [availableCountries, selectedCountry]);

  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLanguage) {
      const defaultLanguage = availableLanguages.includes('JavaScript') 
        ? 'JavaScript' 
        : availableLanguages.includes('TypeScript')
        ? 'TypeScript'
        : availableLanguages[0];
      setSelectedLanguage(defaultLanguage);
    }
  }, [availableLanguages, selectedLanguage]);

  // Process data for visualization
  const processedData = useMemo(() => {
    if (!data || !selectedCountry || !selectedLanguage) return [];
    return DataProcessor.processData(data, selectedCountry, selectedLanguage);
  }, [data, selectedCountry, selectedLanguage]);

  const chartData = useMemo(() => {
    return DataProcessor.processForChart(processedData);
  }, [processedData]);

  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedLanguage(''); // Reset language when country changes
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-purple-pink opacity-20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              IT Salary Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Use our calculator to estimate your income as a developer. 
              Explore salary ranges across different programming languages, 
              countries, and experience levels based on our comprehensive 2024 survey data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step 1: Input Panel */}
          <div>
            <FilterSection
              countries={availableCountries}
              languages={availableLanguages}
              selectedCountry={selectedCountry}
              selectedLanguage={selectedLanguage}
              onCountryChange={handleCountryChange}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {/* Step 2: Output Panel */}
          <div>
            {selectedCountry && selectedLanguage && (
              <SalaryChart
                data={chartData}
                country={selectedCountry}
                language={selectedLanguage}
              />
            )}
          </div>
        </div>

        {/* Statistics Panel */}
        {selectedCountry && selectedLanguage && (
          <div className="mt-8">
            <StatisticsPanel
              data={chartData}
              country={selectedCountry}
              language={selectedLanguage}
            />
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16">
          <div className="gradient-bg rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the JetBrains Tech Insights Lab
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Get early access to cutting-edge research, exclusive insights, and help shape 
              the future of developer tools and technologies.
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Involved
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>IntelliJ IDEA</li>
                <li>WebStorm</li>
                <li>PyCharm</li>
                <li>DataGrip</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>For Teams</li>
                <li>For Education</li>
                <li>For Open Source</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Blog</li>
                <li>Events</li>
                <li>User Groups</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Documentation</li>
                <li>Tutorials</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Data from JetBrains Developer Ecosystem Survey 2024 • 
              This calculator provides salary insights based on survey responses from developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;