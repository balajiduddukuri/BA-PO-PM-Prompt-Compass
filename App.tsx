
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Category, Prompt, ThemeName } from './types';
import { PROMPTS } from './constants';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [theme, setTheme] = useState<ThemeName>('neon');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showHandbook, setShowHandbook] = useState(false);
  
  const categories = ['All', ...Object.values(Category)];
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return PROMPTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full"></div>
         <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-2xl" role="navigation">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500">
              <i className="fa-solid fa-compass-drafting text-white text-xl"></i>
            </div>
            <div>
              <h1 className="heading-font text-lg font-bold tracking-tight text-white leading-tight">Prompt Compass</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">BalajiDuddukuri</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10" role="group" aria-label="Theme selection">
              {(['neon', 'classic', 'high-contrast'] as ThemeName[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-2 rounded-lg transition-all haptic-active ${theme === t ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-white'}`}
                  aria-label={`Switch to ${t} theme`}
                  aria-pressed={theme === t}
                >
                  <i className={`fa-solid ${t === 'neon' ? 'fa-bolt' : t === 'classic' ? 'fa-sun' : 'fa-circle-half-stroke'}`}></i>
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center space-x-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] border-l border-white/10 pl-6 ml-6">
              <span>WCAG 2.2 AA</span>
            </div>
          </div>
        </div>
      </nav>

      <main id="main-content" className="relative z-10">
        <section className="art-fusion-hero py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="heading-font text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
               Navigate <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-purple-300">Modern Agile</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
               An expert-refined library of 52+ prompts designed to move teams toward value delivery over busy work.
            </p>
            
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-blue-600/10 blur-3xl group-focus-within:bg-blue-600/20 transition-all rounded-full"></div>
              <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl transition-all group-focus-within:border-blue-500/50">
                 <i className="fa-solid fa-magnifying-glass ml-6 text-slate-500"></i>
                 <input 
                   type="text" 
                   placeholder="Try 'Backlog', 'Charter' or 'Persona'..." 
                   className="w-full bg-transparent border-none focus:ring-0 text-white px-5 py-5 placeholder:text-slate-700 font-medium text-lg"
                   value={searchQuery}
                   onChange={e => {
                     setSearchQuery(e.target.value);
                     setShowSearchSuggestions(true);
                   }}
                   onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                   aria-label="Search prompt library"
                 />
                 {searchQuery && (
                   <button onClick={() => setSearchQuery('')} className="mr-4 text-slate-600 hover:text-white transition-colors">
                      <i className="fa-solid fa-circle-xmark"></i>
                   </button>
                 )}
                 
                 {showSearchSuggestions && searchSuggestions.length > 0 && (
                   <div className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-4">
                      {searchSuggestions.map(s => (
                        <button key={s.id} onClick={() => { setSearchQuery(s.title); setShowSearchSuggestions(false); }} className="w-full text-left px-8 py-4 hover:bg-white/[0.03] text-slate-400 hover:text-white text-sm flex items-center justify-between border-b border-white/5 last:border-0 transition-colors">
                           <span className="font-medium">{s.title}</span>
                           <span className="text-[10px] font-bold text-slate-700">{s.category}</span>
                        </button>
                      ))}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-white/5 pb-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">Resource Library</h3>
              <div className="flex overflow-x-auto pb-4 no-scrollbar gap-2" role="tablist" ref={tabListRef}>
                 {categories.map(cat => (
                   <button
                     key={cat}
                     role="tab"
                     aria-selected={selectedCategory === cat}
                     onClick={() => setSelectedCategory(cat as Category | 'All')}
                     className={`whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-bold transition-all border haptic-active ${
                       selectedCategory === cat 
                       ? 'bg-white text-black border-white shadow-xl shadow-white/10 scale-105' 
                       : 'bg-white/[0.02] text-slate-500 border-white/5 hover:border-white/20 hover:text-white'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5">
               {filteredPrompts.length} ASSETS DEPLOYED
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} onClick={setActivePrompt} />
            ))}
          </div>
          
          {filteredPrompts.length === 0 && (
            <div className="py-32 text-center animate-in fade-in zoom-in">
               <div className="w-24 h-24 bg-white/[0.02] rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                  <i className="fa-solid fa-ghost text-slate-800 text-3xl"></i>
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">No assets detected</h3>
               <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any prompts matching your current filter or search criteria.</p>
               <button onClick={() => {setSelectedCategory('All'); setSearchQuery('');}} className="mt-8 text-blue-400 font-bold hover:underline">Reset Exploration</button>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto border-t border-white/5 bg-[#050505] py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
           <div className="space-y-6">
              <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-compass-drafting text-blue-400 text-sm"></i>
                 </div>
                 <span className="heading-font text-xl font-bold text-white tracking-tighter">Prompt Compass</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Elevating the standard of Business Analysis and Product Ownership through AI-augmented reasoning and strategic prompt engineering.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Framework</h4>
                 <ul className="space-y-3 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                    <li><button onClick={() => setShowHandbook(true)} className="hover:text-blue-400 transition-colors">Handbook</button></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Governance</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Methods</a></li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Compliance</h4>
                 <ul className="space-y-3 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                    <li><a href="#" className="hover:text-blue-400 transition-colors">WCAG 2.2</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">MIT License</a></li>
                 </ul>
              </div>
           </div>

           <div className="space-y-6 md:text-right">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Connect</h4>
              <div className="flex md:justify-end space-x-4">
                 <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"><i className="fa-brands fa-github text-lg"></i></button>
                 <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"><i className="fa-brands fa-linkedin-in text-lg"></i></button>
              </div>
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                A BalajiDuddukuri Production
              </div>
           </div>
        </div>
      </footer>

      <PromptModal prompt={activePrompt} onClose={() => setActivePrompt(null)} />
      
      {showHandbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto no-scrollbar shadow-3xl">
              <div className="flex justify-between items-center mb-12">
                 <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Operational Guide</span>
                    <h2 className="heading-font text-4xl font-black text-white">Handbook v1.0</h2>
                 </div>
                 <button onClick={() => setShowHandbook(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-slate-500 hover:text-white"><i className="fa-solid fa-xmark text-2xl"></i></button>
              </div>
              <div className="prose prose-invert prose-blue max-w-none space-y-10">
                <section>
                   <h3 className="text-white flex items-center"><i className="fa-solid fa-fingerprint mr-3 text-blue-500"></i> Context Preservation</h3>
                   <p className="text-slate-400">The most critical success factor is the [BRACKETED] data. AI thrives on high-fidelity context. Always replace placeholders with specific project nouns and verbs.</p>
                </section>
                <section>
                   <h3 className="text-white flex items-center"><i className="fa-solid fa-wand-magic-sparkles mr-3 text-purple-500"></i> The Expert Polish Loop</h3>
                   <p className="text-slate-400">Our proprietary 3-step loop simulates a professional review cycle. Use it for high-stakes documentation like Project Charters or complex User Stories to catch architecture and QA issues early.</p>
                </section>
                <section>
                   <h3 className="text-white flex items-center"><i className="fa-solid fa-universal-access mr-3 text-green-500"></i> Inclusive Design</h3>
                   <p className="text-slate-400">Every asset in this library is audited for WCAG 2.2 principles. If you're building a consumer-facing tool, ensure you use the 'Accessibility Audit' prompts during the discovery phase.</p>
                </section>
              </div>
              <button onClick={() => setShowHandbook(false)} className="mt-12 w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-400 transition-all uppercase tracking-widest text-sm shadow-xl shadow-white/5">Start Navigating</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
