
import React, { useState, useEffect, useMemo } from 'react';
import { Prompt, VariableValue, CATEGORY_METADATA } from '../types';
import { geminiService } from '../services/gemini';
import { marked } from 'marked';

interface PromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, onClose }) => {
  const [variables, setVariables] = useState<VariableValue>({});
  const [result, setResult] = useState<string>('');
  const [critiqueSteps, setCritiqueSteps] = useState<{ [key: number]: string }>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const meta = useMemo(() => prompt ? CATEGORY_METADATA[prompt.category] : null, [prompt]);

  const extractedVars = useMemo(() => {
    if (!prompt) return [];
    const matches = prompt.template.match(/\[[A-Z0-9_/ -]+\]/g);
    return matches ? Array.from(new Set(matches.map(m => m.slice(1, -1)))) : [];
  }, [prompt]);

  useEffect(() => {
    if (prompt) {
      setVariables({});
      setResult('');
      setCritiqueSteps({});
      setError(null);
      setCopiedResponse(false);
    }
  }, [prompt]);

  const applySample = (sample: VariableValue) => setVariables(prev => ({ ...prev, ...sample }));

  const getFinalPromptText = () => {
    if (!prompt) return '';
    let text = prompt.template;
    Object.entries(variables).forEach(([key, value]) => {
      text = text.split(`[${key}]`).join(value || `[${key}]`);
    });
    return text;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const executePrompt = async () => {
    if (!prompt) return;
    setIsExecuting(true);
    setResult('');
    setCritiqueSteps({});
    try {
      await geminiService.executeStreamPrompt(
        getFinalPromptText(), 
        "You are a world-class BA/PO assistant. Focus on value and clarity. Use Markdown.", 
        (chunk) => setResult(prev => prev + chunk)
      );
    } catch (err) { setError("API Unavailable. Check your keys."); } finally { setIsExecuting(false); }
  };

  const runExpertPolish = async () => {
    if (!prompt) return;
    setIsPolishing(true);
    setCritiqueSteps({});
    setResult('');
    try {
      await geminiService.executeExpertPolish(getFinalPromptText(), (step, data) => {
        setCritiqueSteps(prev => ({ ...prev, [step]: data }));
      });
    } catch (err) { setError("Expert Polish failed."); } finally { setIsPolishing(false); }
  };

  if (!prompt) return null;

  const renderMarkdown = (text: string) => ({ __html: marked.parse(text) });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-500">
        
        {/* Modal Header */}
        <header className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl bg-${meta?.color}-500/10 flex items-center justify-center border border-${meta?.color}-500/20`}>
               <i className={`fa-solid fa-scroll text-${meta?.color}-400`}></i>
            </div>
            <div>
              <span className={`text-[10px] font-bold text-${meta?.color}-500 uppercase tracking-[0.3em]`}>{prompt.category}</span>
              <h2 id="modal-title" className="heading-font text-2xl font-bold text-white tracking-tight">{prompt.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-slate-500 hover:text-white focus-ring">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-10 space-y-12 no-scrollbar">
          
          {/* Section: Configuration */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                <span className={`w-2 h-2 rounded-full bg-${meta?.color}-500 mr-3 animate-pulse`}></span> Parameterization
              </h3>
              {prompt.samples && (
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-600 mr-2 uppercase font-bold">Presets:</span>
                  {prompt.samples.map((s, i) => (
                    <button key={i} onClick={() => applySample(s)} className="text-[10px] px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all focus-ring">
                      Sample {i+1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {extractedVars.map(v => (
                <div key={v} className="group">
                  <label htmlFor={v} className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1 group-focus-within:text-blue-400 transition-colors">{v.replace(/_/g, ' ')}</label>
                  <input 
                    id={v}
                    type="text" 
                    placeholder={`Enter ${v.toLowerCase()}...`}
                    value={variables[v] || ''} 
                    onChange={e => setVariables(prev => ({ ...prev, [v]: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus-ring outline-none hover:border-white/10 transition-all placeholder:text-slate-700"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Section: Expert Stepper */}
          {(isPolishing || critiqueSteps[1]) && (
            <section className="animate-in fade-in slide-in-from-top-8 duration-700">
               <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-10 text-center">Polish Lifecycle</h3>
               <div className="relative max-w-3xl mx-auto space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-[20px] top-4 bottom-4 w-px bg-white/5"></div>

                  {[1, 2, 3].map(step => (
                    critiqueSteps[step] && (
                      <div key={step} className="relative pl-14 animate-in fade-in slide-in-from-left-4">
                        {/* Bullet */}
                        <div className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                          isPolishing && !critiqueSteps[step+1] && step < 3 ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 border-white/10'
                        }`}>
                           {step === 1 ? <i className="fa-solid fa-comments text-xs"></i> : step === 2 ? <i className="fa-solid fa-wand-magic text-xs"></i> : <i className="fa-solid fa-check-double text-xs"></i>}
                        </div>
                        
                        <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Step 0{step}: {step === 1 ? 'Roundtable Critique' : step === 2 ? 'Director Refinement' : 'Structural Audit'}
                              </span>
                              {step === 3 && <button onClick={() => handleCopy(critiqueSteps[3])} className="text-[10px] text-blue-400 font-bold hover:underline">COPY FINAL</button>}
                           </div>
                           <div className="prose prose-invert prose-sm max-w-none text-slate-400 leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(critiqueSteps[step])} />
                        </div>
                      </div>
                    )
                  ))}
               </div>
            </section>
          )}

          {/* Section: Fast Response */}
          {(result || isExecuting) && !isPolishing && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span> Output Stream
                 </h3>
                 {result && <button onClick={() => handleCopy(result)} className="text-[10px] text-blue-400 font-bold uppercase hover:underline">Copy Result</button>}
              </div>
              <div className="p-8 bg-blue-500/[0.01] border border-blue-500/10 rounded-3xl">
                 <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                    {result ? <div dangerouslySetInnerHTML={renderMarkdown(result)} /> : <div className="flex items-center space-x-3 text-slate-600"><i className="fa-solid fa-circle-notch fa-spin"></i><span>Synthesizing logic...</span></div>}
                 </div>
              </div>
            </section>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="px-10 py-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button 
                disabled={isExecuting || isPolishing}
                onClick={executePrompt}
                className="h-12 px-8 bg-white text-black font-bold rounded-2xl hover:bg-blue-400 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center"
              >
                <i className="fa-solid fa-bolt-lightning mr-2 text-xs"></i> Quick Draft
              </button>
              <button 
                disabled={isExecuting || isPolishing}
                onClick={runExpertPolish}
                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-30 flex items-center shadow-lg shadow-purple-500/20"
              >
                <i className="fa-solid fa-wand-magic-sparkles mr-2 text-xs"></i> Expert Polish
              </button>
           </div>
           
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-600 uppercase mb-2">Model: Gemini 3 Pro</span>
              <button onClick={() => handleCopy(getFinalPromptText())} className="text-[11px] font-bold text-slate-500 hover:text-white flex items-center group transition-colors">
                <i className="fa-regular fa-copy mr-2 group-hover:text-blue-400"></i> Template
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PromptModal;
