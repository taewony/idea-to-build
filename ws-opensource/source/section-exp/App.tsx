import React, { useState } from 'react';
import { TABS_DATA } from './constants';
import ProgramCard from './components/ProgramCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exp-panel-0');

  const activeTabData = TABS_DATA.find(tab => tab.id === activeTab);

  return (
    <main className="bg-[#211d21] min-h-screen text-white font-['Pretendard',_sans-serif]">
      <section id="exp" className="py-16 sm:py-24" aria-labelledby="exp-tit">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-16">
                <div className="text-center lg:text-left mb-12">
                  <h2 id="exp-tit" className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    시민참여 세션
                  </h2>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 lg:flex-col lg:justify-start" role="tablist">
                  {TABS_DATA.map((tab) => (
                    <button
                      key={tab.id}
                      id={`exp-tab-${tab.id.split('-')[2]}`}
                      type="button"
                      className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-[#FF0A73] lg:w-full lg:text-left lg:py-3 ${
                        activeTab === tab.id
                          ? 'bg-[#FF0A73] text-white shadow-md'
                          : 'text-gray-300 hover:bg-slate-700'
                      }`}
                      role="tab"
                      aria-controls={tab.id}
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
            
            <div className="lg:col-span-8 mt-12 lg:mt-0">
              {TABS_DATA.map((tab) => (
                <div
                  key={tab.id}
                  id={tab.id}
                  role="tabpanel"
                  aria-labelledby={`exp-tab-${tab.id.split('-')[2]}`}
                  hidden={activeTab !== tab.id}
                >
                  {activeTab === tab.id && (
                     <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
                        {activeTabData?.programs.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default App;