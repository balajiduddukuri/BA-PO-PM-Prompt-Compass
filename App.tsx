
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Category, Prompt, ThemeName, Article } from './types';
import { PROMPTS, KNOWLEDGE_ARTICLES, APP_DOCS } from './constants';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import { marked } from 'marked';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'Prompts' | 'Knowledge' | 'Docs'>('Prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [theme, setTheme] = useState<ThemeName>('neon');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showHandbook, setShowHandbook] = useState(false);
  
  const categories = ['All', ...Object.values(Category)];
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const renderMarkdown = (text: string) => ({ __html: marked.parse(text) as string });

  const ThemeIcons = {
    neon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    classic: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    'high-contrast': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z" />
      </svg>
    )
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full"></div>
         <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-2xl" role="navigation">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="/" 
            onClick={scrollToTop}
            className="flex items-center space-x-4 group cursor-pointer focus-ring rounded-xl p-1"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500">
              <i className="fa-solid fa-compass-drafting text-white text-xl"></i>
            </div>
            <div>
              <h1 className="heading-font text-lg font-bold tracking-tight text-white leading-tight">Prompt Compass</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Operational Readiness</span>
            </div>
          </a>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {(['Prompts', 'Knowledge', 'Docs'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)} 
                  className={`hover:text-white transition-all py-2 border-b-2 ${activeTab === tab ? 'text-blue-400 border-blue-400' : 'border-transparent'}`}
                >
                  {tab === 'Knowledge' ? 'Knowledge Vault' : tab}
                </button>
              ))}
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10" role="group" aria-label="Theme selection">
              {(['neon', 'classic', 'high-contrast'] as ThemeName[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all haptic-active ${theme === t ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-slate-500 hover:text-white'}`}
                  aria-label={`Switch to ${t} theme`}
                  aria-pressed={theme === t}
                >
                  {ThemeIcons[t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main id="main-content" className="relative z-10">
        
        {/* Dynamic Header */}
        <section className="art-fusion-hero py-24 px-6 text-center border-b border-white/5">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="heading-font text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
               {activeTab === 'Prompts' ? 'The Expert Library' : activeTab === 'Knowledge' ? 'Knowledge Vault' : 'System Architecture'}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
               {activeTab === 'Prompts' ? 'High-fidelity workbench for Business Analysts and Product Owners.' : 
                activeTab === 'Knowledge' ? 'Accelerated nutshells for mastering core agile and PMP frameworks.' : 
                'Internal documentation, audit logs, and technical specifications.'}
            </p>
            
            {activeTab === 'Prompts' && (
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl group-focus-within:bg-blue-600/20 transition-all rounded-full"></div>
                <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl transition-all group-focus-within:border-blue-500/50">
                  <i className="fa-solid fa-magnifying-glass ml-6 text-slate-500"></i>
                  <input 
                    type="text" 
                    placeholder="Filter by feature, goal, or role..." 
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
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {activeTab === 'Prompts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b border-white/5 pb-10">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">Resource Filters</h3>
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
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  {filteredPrompts.length} DEPLOYED
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPrompts.map(prompt => (
                  <PromptCard key={prompt.id} prompt={prompt} onClick={setActivePrompt} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Knowledge' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {KNOWLEDGE_ARTICLES.map(article => (
                <article 
                  key={article.id} 
                  onClick={() => setActiveArticle(article)}
                  className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full uppercase tracking-widest border border-purple-400/20">
                      {article.tag}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center">
                      <i className="fa-regular fa-clock mr-1.5"></i> {article.readTime}
                    </span>
                  </div>
                  <h4 className="heading-font text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="pt-5 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                    <span>LAUNCH REFERENCE</span>
                    <i className="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'Docs' && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <i className="fa-solid fa-shield-halved text-8xl text-blue-500"></i>
                 </div>
                 <div className="prose prose-invert prose-blue max-w-none text-slate-400 leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(APP_DOCS)} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Implementation */}
      <footer className="mt-auto border-t border-white/5 bg-[#050505] py-24 px-6 relative z-10" role="contentinfo">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
           <div className="space-y-6">
              <a href="/" onClick={scrollToTop} className="flex items-center space-x-3 group cursor-pointer focus-ring rounded-lg w-fit">
                 <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <i className="fa-solid fa-compass-drafting text-blue-400 text-sm"></i>
                 </div>
                 <span className="heading-font text-xl font-bold text-white tracking-tighter group-hover:text-blue-400 transition-colors">Prompt Compass</span>
              </a>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Crafting excellence in Business Analysis and Product Ownership through AI-augmented strategic reasoning.
              </p>
              <div className="flex items-center space-x-2 py-2 px-3 bg-white/5 border border-white/10 rounded-lg w-fit">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">QA Verified v1.0.4</span>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Framework</h4>
                 <ul className="space-y-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                    <li>
                      <button onClick={() => setShowHandbook(true)} className="hover:text-white transition-colors flex items-center group w-full text-left focus-ring">
                        <i className="fa-solid fa-book-open mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-blue-400 transition-all"></i>
                        Handbook
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setActiveTab('Knowledge')} className="hover:text-white transition-colors flex items-center group w-full text-left focus-ring">
                        <i className="fa-solid fa-vault mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-purple-400 transition-all"></i>
                        Vault
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setActiveTab('Docs')} className="hover:text-white transition-colors flex items-center group w-full text-left focus-ring">
                        <i className="fa-solid fa-microchip mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-green-400 transition-all"></i>
                        Architecture
                      </button>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/learning/instructors/angela-wick?u=2113185" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center group focus-ring">
                        <i className="fa-solid fa-graduation-cap mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-blue-400 transition-all"></i>
                        Expert Learning
                      </a>
                    </li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Compliance</h4>
                 <ul className="space-y-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                    <li>
                      <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center group focus-ring">
                        <i className="fa-solid fa-universal-access mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-blue-400 transition-all"></i>
                        WCAG 2.2
                      </a>
                    </li>
                    <li>
                      <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center group focus-ring">
                        <i className="fa-solid fa-scale-balanced mr-3 text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-yellow-400 transition-all"></i>
                        MIT License
                      </a>
                    </li>
                 </ul>
              </div>
           </div>

           <div className="space-y-6 md:text-right">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Connect</h4>
              <div className="flex md:justify-end space-x-4">
                 <a href="https://github.com/BalajiDuddukuri" target="_blank" rel="noopener noreferrer" aria-label="Github Profile" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all focus-ring">
                    <i className="fa-brands fa-github text-lg"></i>
                 </a>
                 <a href="https://linkedin.com/in/balajiduddukuri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all focus-ring">
                    <i className="fa-brands fa-linkedin-in text-lg"></i>
                 </a>
              </div>
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                BalajiDuddukuri &copy; {new Date().getFullYear()}
              </div>
           </div>
        </div>
      </footer>

      <PromptModal prompt={activePrompt} onClose={() => setActivePrompt(null)} />
      
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-[#050505] border border-white/10 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-3xl">
              <header className="sticky top-0 z-10 px-12 py-8 bg-black/50 backdrop-blur-xl border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
                    <i className="fa-solid fa-book-open text-purple-400 text-sm"></i>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{activeArticle.tag}</h5>
                    <p className="text-[9px] font-bold text-slate-600 uppercase">Knowledge Reference</p>
                  </div>
                </div>
                <button onClick={() => setActiveArticle(null)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-slate-500 hover:text-white focus-ring transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </header>
              <div className="p-12 lg:p-20">
                 <div className="prose prose-invert prose-blue max-w-none prose-h1:heading-font prose-h1:text-5xl prose-h1:mb-12 prose-h1:tracking-tighter prose-h3:text-blue-400 prose-p:text-slate-400 prose-p:leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(activeArticle.content)} />
              </div>
           </div>
        </div>
      )}

      {showHandbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto no-scrollbar shadow-3xl">
              <div className="flex justify-between items-center mb-12">
                 <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Operational Guide</span>
                    <h2 className="heading-font text-4xl font-black text-white">Handbook v1.0</h2>
                 </div>
                 <button onClick={() => setShowHandbook(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-slate-500 hover:text-white focus-ring"><i className="fa-solid fa-xmark text-2xl"></i></button>
              </div>
              <div className="prose prose-invert prose-blue max-w-none space-y-10">
                <section>
                   <h3 className="text-white flex items-center underline decoration-blue-500/50 underline-offset-8"><i className="fa-solid fa-fingerprint mr-3 text-blue-500"></i> Context Preservation</h3>
                   <p className="text-slate-400">AI thrives on high-fidelity data. When replacing [PLACEHOLDERS], use specific project terminology to reduce hallucinations and increase strategic value.</p>
                </section>
                <section>
                   <h3 className="text-white flex items-center underline decoration-purple-500/50 underline-offset-8"><i className="fa-solid fa-wand-magic-sparkles mr-3 text-purple-500"></i> Expert Polish Loop</h3>
                   <p className="text-slate-400">Our multi-agent simulation provides three distinct lenses: Technical, Empathy, and Quality. Use it for complex artifacts like Charters and Risk Registers.</p>
                </section>
                <section>
                   <h3 className="text-white flex items-center underline decoration-green-500/50 underline-offset-8"><i className="fa-solid fa-universal-access mr-3 text-green-500"></i> Ethical AI Use</h3>
                   <p className="text-slate-400">AI is a co-pilot. Always perform a human-in-the-loop review of the generated content to ensure it aligns with your specific organizational governance.</p>
                </section>
              </div>
              <button onClick={() => setShowHandbook(false)} className="mt-12 w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-400 transition-all uppercase tracking-widest text-sm shadow-xl shadow-white/5 focus-ring">Begin Session</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
