import React, { useState } from 'react';
import { GroundingChunk } from '../types';
import { ExternalLink, Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  groundingChunks?: GroundingChunk[];
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, groundingChunks }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (text: string) => {
    let html = text
      // Score block if present
      .replace(/# Match Score: (\d+)%/g, (_, score) => {
        const scoreInt = parseInt(score);
        const colorClass = scoreInt >= 80 ? 'text-emerald-400' : (scoreInt >= 60 ? 'text-amber-400' : 'text-rose-400');
        return `
          <div class="my-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">ATS Compatibility Index</span>
            <div class="text-6xl font-black ${colorClass} my-2 font-mono tabular-nums">${score}%</div>
            <p class="text-xs text-slate-400">${scoreInt >= 80 ? 'High alignment with core criteria' : 'Requires key phrase and metric calibration'}</p>
          </div>
        `;
      })
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-base font-bold text-slate-100 dark:text-slate-100 mt-6 mb-2 tracking-tight">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-slate-100 dark:text-slate-100 mt-8 mb-4 border-b border-slate-800 pb-2 tracking-tight">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-extrabold text-slate-100 dark:text-slate-100 mb-6 tracking-tight">$1</h1>')
      // List items
      .replace(/^\* (.*$)/gm, '<li class="flex items-start gap-2.5 my-2 text-slate-300 leading-relaxed text-sm"><span class="text-emerald-400 font-bold mt-0.5">·</span><span>$1</span></li>')
      .replace(/^- (.*$)/gm, '<li class="flex items-start gap-2.5 my-2 text-slate-300 leading-relaxed text-sm"><span class="text-slate-500 font-bold mt-0.5">·</span><span>$1</span></li>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>')
      // Code tags
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-xs">$1</code>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-300 text-sm leading-relaxed font-normal">')
      .replace(/\n/g, '<br/>');

    html = html.replace(/(<li.*<\/li>(\s*<li.*<\/li>)*)/gs, '<ul class="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 my-4 space-y-1">$1</ul>');

    return `<div class="prose-content"><p class="mb-4 text-slate-300 text-sm leading-relaxed">${html}</p></div>`;
  };

  const sources = groundingChunks?.filter(chunk => chunk.web).map(chunk => chunk.web) || [];

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700"
          title="Copy markdown content"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Text'}</span>
        </button>
      </div>

      <div 
        className="text-slate-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderContent(content) }} 
      />
      
      {sources.length > 0 && (
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grounding Citations</span>
            <span className="text-xs text-slate-500">· Real-time web verified</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, idx) => (
              <a 
                key={idx}
                href={source?.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-800 hover:border-slate-700 transition-all"
              >
                <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[200px]">{source?.title || 'External Source'}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownRenderer;
