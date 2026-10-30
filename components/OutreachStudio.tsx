import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Copy, Check, Sparkles, Building, 
  UserCheck, Mail, Linkedin, Calendar, RefreshCw
} from 'lucide-react';
import { OutreachData } from '../types';
import { generateOutreachKit } from '../services/geminiService';

interface OutreachStudioProps {
  role: string;
}

const OutreachStudio: React.FC<OutreachStudioProps> = ({ role }) => {
  const [targetCompany, setTargetCompany] = useState('');
  const [highlight, setHighlight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outreachData, setOutreachData] = useState<OutreachData | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateOutreachKit(
        role || 'Senior Professional',
        targetCompany.trim() || undefined,
        highlight.trim() || undefined
      );
      setOutreachData(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate outreach materials.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Send className="w-6 h-6 text-amber-400" />
            <span>Executive Outreach & Referral Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            High-converting cold pitches to hiring managers, under-300-char LinkedIn notes, and 30-60-90 day impact plans.
          </p>
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>Target Company (Optional)</span>
          </label>
          <input
            type="text"
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
            placeholder="e.g. Stripe, OpenAI, Google, Datadog..."
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Key Metric or Differentiator</span>
          </label>
          <input
            type="text"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="e.g. Scaled distributed systems to 500K QPS; launched $15M ARR product"
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            <span>Crafting High-Conversion Pitches...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate Customized Outreach Kit for {role || 'Target Role'}</span>
          </>
        )}
      </button>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Results grid */}
      <AnimatePresence>
        {outreachData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4"
          >
            {/* 1. Direct Email */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Hiring Manager Cold Pitch</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(outreachData.hiringManagerEmail, 'email')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {outreachData.hiringManagerEmail}
                </div>
              </div>
              <span className="text-[10px] text-slate-500">Concise, quantifiable, respectful of executive calendar time.</span>
            </div>

            {/* 2. LinkedIn Note */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">LinkedIn Invitation Note</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(outreachData.linkedinConnectionNote, 'linkedin')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'linkedin' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {outreachData.linkedinConnectionNote}
                </div>
              </div>
              <span className="text-[10px] text-slate-500">Optimized under LinkedIn's 300 character constraint.</span>
            </div>

            {/* 3. Recruiter InMail */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Internal Recruiter Outreach</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(outreachData.recruiterMessage, 'recruiter')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'recruiter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'recruiter' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {outreachData.recruiterMessage}
                </div>
              </div>
              <span className="text-[10px] text-slate-500">Highlights exact keyword and seniority alignment.</span>
            </div>

            {/* 4. 30-60-90 Day Plan */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">30-60-90 Day Strategic Plan</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(outreachData.thirtySixtyNinetySummary, 'plan')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'plan' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'plan' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {outreachData.thirtySixtyNinetySummary}
                </div>
              </div>
              <span className="text-[10px] text-slate-500">Brings immediate credibility into final round executive interviews.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutreachStudio;
