import React from 'react';
import { SalaryProvider, useSalary } from './context/SalaryContext';
import { FilterPanel } from './components/filters/FilterPanel';
import { SalaryChart } from './components/visualization/SalaryChart';
import './styles/globals.css';

const AppContent: React.FC = () => {
  const { state } = useSalary();

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-lg text-purple-200">Loading salary data...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md border border-purple-500/20">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
          <p className="text-purple-200 mb-4">{state.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              IT Salary Calculator
            </h1>
            <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Each year, our extensive surveys reach out to over 30,000 developers across over 180 
              countries, representing a diverse range of specialties. With data collected over 
              multiple years, we are able to present a comprehensive analysis of tech trends using 
              the methodology described here.
            </p>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto">
              Use our calculator to estimate your income potential based 
              on software developer skills, programming language, 
              location, and experience.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step 1: Filter Panel */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-500/20">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                1
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Enter your programming language and country.</h2>
              </div>
            </div>
            <FilterPanel />
          </div>

          {/* Step 2: Results */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-500/20">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                2
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Calculate the salary range based on your parameters.</h2>
              </div>
            </div>

            {/* Chart Visualization */}
            <SalaryChart 
              data={state.processedData}
              country={state.selectedCountry}
              language={state.selectedLanguage}
            />

            {/* Results Summary */}
            {state.processedData.length > 0 && state.selectedCountry && state.selectedLanguage && (
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-purple-500/10">
                <p className="text-purple-200 text-sm">
                  Coding specialists from <span className="text-white font-semibold">{state.selectedCountry}</span> who use{' '}
                  <span className="text-white font-semibold">{state.selectedLanguage}</span> reported
                  to have the following gross annual salaries (in USD including bonuses) in 2024:
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {state.processedData.reduce((sum, d) => sum + d.stats.count, 0)}
                    </div>
                    <div className="text-xs text-purple-300">Responses</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      ${Math.round(
                        state.processedData
                          .filter(d => d.stats.count > 0)
                          .reduce((sum, d) => sum + d.stats.median, 0) / 
                        state.processedData.filter(d => d.stats.count > 0).length
                      )}k
                    </div>
                    <div className="text-xs text-purple-300">Median Salary</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      ${Math.round(
                        Math.max(...state.processedData.map(d => d.stats.percentile75))
                      )}k
                    </div>
                    <div className="text-xs text-purple-300">75th Percentile</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-start space-x-3 text-left bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="text-purple-200 text-sm">
                <span className="font-semibold text-white">Note:</span> Experience level refers to total years of professional coding, not years using the 
                selected technology.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Tech Insights Lab Section */}
      <footer className="bg-gradient-to-r from-purple-800 to-violet-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Join the JetBrains Tech Insights Lab
            </h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Take part in surveys and UX studies to help make JetBrains 
              products even better. For participating in our research, 
              you'll also get the chance to earn rewards.
            </p>
            <button className="px-8 py-4 bg-white text-purple-800 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200 shadow-lg">
              Get Involved
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SalaryProvider>
      <AppContent />
    </SalaryProvider>
  );
};

export default App; 