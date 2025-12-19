
import React from 'react';
import { Prompt, CATEGORY_METADATA } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onClick: (prompt: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => {
  const meta = CATEGORY_METADATA[prompt.category];

  const playClick = () => {
    const audio = document.getElementById('click-sound') as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.1;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const handleInteraction = () => {
    playClick();
    onClick(prompt);
  };

  return (
    <article 
      onClick={handleInteraction}
      className="nft-card rounded-2xl p-6 cursor-pointer flex flex-col h-full group focus-ring haptic-active border-white/5 bg-white/[0.02]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleInteraction()}
      aria-label={`Open prompt: ${prompt.title}`}
    >
      <svg className="card-pattern transition-transform duration-700 group-hover:scale-110" viewBox="0 0 10 10">
        <path d={meta.pattern} stroke="currentColor" fill="none" strokeWidth="0.5" className={`text-${meta.color}-500/20`} />
      </svg>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md bg-${meta.color}-500/10 text-${meta.color}-400 uppercase tracking-widest border border-${meta.color}-500/20 group-hover:border-${meta.color}-500/50 transition-colors`}>
          {prompt.category}
        </span>
        <div className="flex space-x-1 opacity-20 group-hover:opacity-100 transition-opacity">
           <i className={`fa-solid fa-sparkles text-[10px] text-${meta.color}-400`}></i>
        </div>
      </div>
      
      <h3 className="heading-font text-xl font-bold mb-3 group-hover:text-white transition-colors underlined-link relative z-10">
        {prompt.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow relative z-10">
        {prompt.description}
      </p>
      
      <footer className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center text-[11px] font-medium text-slate-500 italic">
          <i className="fa-solid fa-fingerprint mr-1.5 text-blue-500/30"></i>
          {prompt.focus}
        </div>
        <div className="flex items-center space-x-2">
           <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">LAUNCH</span>
           <i className="fa-solid fa-arrow-right-long text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"></i>
        </div>
      </footer>
    </article>
  );
};

export default PromptCard;
