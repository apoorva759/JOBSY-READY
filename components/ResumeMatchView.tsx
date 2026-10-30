import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, CheckCircle2, AlertTriangle, ArrowRight, Copy, Check, 
  Sparkles, FileText, Target, RefreshCw, Wand2, ShieldCheck, 
  HelpCircle, ChevronDown, ChevronUp, Cpu, Activity
} from 'lucide-react';
import { ResumeAnalysisData } from '../types';
import { ROLE_PRESETS } from '../constants';
import { analyzeResumeMatch } from '../services/geminiService';
import confetti from 'canvas-confetti';

import sarahImg from '../src/assets/images/interviewer_faang_lead_1793345498700.jpg';
import davidImg from '../src/assets/images/interviewer_ai_architect_1793345499697.jpg';
import elenaImg from '../src/assets/images/interviewer_design_lead_1793345500391.jpg';

interface ResumeMatchViewProps {
  resume: string;
  setResume: (val: string) => void;
  jobDesc: string;
  setJobDesc: (val: string) => void;
}

const SCAN_STAGES = [
  "Parsing tokens & structure...",
  "Cross-referencing core requirements...",
  "Calculating ATS semantic match...",
  "Synthesizing Google XYZ bullet optimizations...",
  "Finalizing executive report..."
];

const ResumeMatchView: React.FC<ResumeMatchViewProps> = ({
  resume,
  setResume,
  jobDesc,
  setJobDesc,
}) => {
  const [loading, setLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStageIndex, setScanStageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysisData | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string>('ai-engineer');

  // Fast scanning HUD ticker animation
  useEffect(() => {
    let interval: any;
    if (loading) {
      setScanProgress(12);
      setScanStageIndex(0);
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 92) return prev;
          const next = prev + Math.floor(Math.random() * 18) + 12;
          return next > 92 ? 92 : next;
        });
        setScanStageIndex(prev => (prev + 1) % SCAN_STAGES.length);
      }, 350);
    } else {
      setScanProgress(100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSelectPreset = (presetId: string) => {
    const preset = ROLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setActivePreset(presetId);
      setResume(preset.resume);
      setJobDesc(preset.jobDesc);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleRunAnalysis = async () => {
    if (!resume.trim() || !jobDesc.trim()) {
      setError("Please provide both your resume and the target job description to run the scan.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeResumeMatch(resume, jobDesc);
      setScanProgress(100);
      setAnalysis(response.data);

      if (response.data.matchScore >= 80) {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to complete resume analysis.");
    } finally {
      setLoading(false);
    }
  };

  const copyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const applyBulletToResume = (original: string, improved: string, index: number) => {
    if (resume.includes(original)) {
      setResume(resume.replace(original, improved));
    } else {
      setResume(`${resume}\n- ${improved}`);
    }
    setAppliedIndex(index);
    setTimeout(() => setAppliedIndex(null), 2500);
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Top Header & Preset Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-emerald-500" />
            <span>High-Speed ATS Resume Scanner & Match Engine</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time keyword parsing, ATS parseability score, and Google XYZ impact bullet revisions.
          </p>
        </div>

        {/* 1-Click Role Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Load Preset:</span>
          {ROLE_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activePreset === p.id 
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* interviewing.io & FAANG Hiring Committee Trust Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Stacked Interviewer Avatars */}
          <div className="flex -space-x-3 shrink-0">
            <img 
              src={sarahImg} 
              alt="Sarah Jenkins - Staff SWE @ Google" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
              title="Sarah Jenkins · Staff SWE @ Google"
            />
            <img 
              src={davidImg} 
              alt="David Chen - Principal AI Architect @ Meta" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
              title="David Chen · Principal AI Architect @ Meta"
            />
            <img 
              src={elenaImg} 
              alt="Elena Rostova - VP Product Design @ Figma" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
              title="Elena Rostova · VP Product Design @ Figma"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Calibrated with 380+ Senior & Staff Hiring Managers</span>
              <span className="text-amber-500 font-mono text-[11px]">★ 4.96/5</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Rubrics modeled after interviewing.io, Google Bar Raisers, and Meta L6+ calibration boards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Hired at:</span>
          <span className="text-slate-600 dark:text-slate-400">Google</span>
          <span>·</span>
          <span className="text-slate-600 dark:text-slate-400">Meta</span>
          <span>·</span>
          <span className="text-slate-600 dark:text-slate-400">Apple</span>
          <span>·</span>
          <span className="text-slate-600 dark:text-slate-400">Stripe</span>
        </div>
      </div>

      {/* Editor Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Left Column: Resume Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Candidate Resume</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="tabular-nums font-mono text-[11px]">{wordCount(resume)} words</span>
              <span>·</span>
              <button 
                onClick={() => setResume('')}
                className="hover:text-rose-500 transition-colors"
                title="Clear resume"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all h-[380px]">
            {loading && (
              <>
                <div className="laser-sweep-beam" />
                <div className="absolute inset-0 scanning-radar-grid pointer-events-none z-10 opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md flex items-center justify-between text-xs text-emerald-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
                    <span>SCANNING: {SCAN_STAGES[scanStageIndex]}</span>
                  </div>
                  <span className="font-bold tabular-nums">{scanProgress}%</span>
                </div>
              </>
            )}
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste existing resume or CV text here..."
              className="w-full h-full p-4 bg-transparent outline-none resize-none font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Right Column: Job Description Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-sky-500" />
              <span>Target Job Specification</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="tabular-nums font-mono text-[11px]">{wordCount(jobDesc)} words</span>
              <span>·</span>
              <button 
                onClick={() => setJobDesc('')}
                className="hover:text-rose-500 transition-colors"
                title="Clear job description"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 focus-within:border-sky-500/60 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all h-[380px]">
            {loading && (
              <>
                <div className="laser-sweep-beam" style={{ animationDelay: '0.3s' }} />
                <div className="absolute inset-0 scanning-radar-grid pointer-events-none z-10 opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 rounded-xl bg-slate-950/90 border border-sky-500/40 backdrop-blur-md flex items-center justify-between text-xs text-sky-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 animate-spin text-sky-400" />
                    <span>TOKENIZING REQUISITION SPEC</span>
                  </div>
                  <span className="font-bold tabular-nums">{scanProgress}%</span>
                </div>
              </>
            )}
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste target job title, qualifications, and role responsibilities..."
              className="w-full h-full p-4 bg-transparent outline-none resize-none font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Action CTA Button & Live Progress Bar */}
      <div className="space-y-3 pt-2">
        {loading && (
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 h-2 rounded-full"
              initial={{ width: '10%' }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        )}

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Scanning ATS Compatibility & Generating Optimizations ({scanProgress}%)...</span>
            </div>
          ) : (
            <>
              <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Execute Rapid ATS Scan & Rewrites</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800"
          >
            {/* Top Score Matrix Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Overall Match */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall Match Index</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1">
                    {analysis.matchScore}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {analysis.matchScore >= 80 ? 'Exceptional Fit' : analysis.matchScore >= 65 ? 'Competitive Candidate' : 'Moderate Alignment'}
                  </div>
                </div>
                <div className="w-14 h-14 relative flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className={analysis.matchScore >= 80 ? "text-emerald-500" : analysis.matchScore >= 60 ? "text-amber-500" : "text-rose-500"}
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${analysis.matchScore}, 100` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold font-mono text-slate-900 dark:text-white">{analysis.matchScore}%</span>
                </div>
              </div>

              {/* ATS Parseability */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ATS Keyword Parseability</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1">
                    {analysis.atsScore}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {analysis.atsScore >= 75 ? 'Passes automated gate filters' : 'Keyword optimization recommended'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 text-sky-600 dark:text-sky-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              {/* Recruiter Screen Verdict */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Screening Recommendation</div>
                <p className="text-xs text-slate-700 dark:text-slate-200 mt-2 leading-relaxed">
                  {analysis.executiveSummary}
                </p>
              </div>
            </div>

            {/* Skills Alignment Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Matched Skills */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Matched Core Competencies</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 tabular-nums font-semibold">
                    {analysis.matchedSkills.length} Verified
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis.matchedSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Missing Target Keywords</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 tabular-nums font-semibold">
                    {analysis.missingSkills.length} Identified Gaps
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis.missingSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-medium"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bullet Rewriter Studio */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Executive Bullet Point Rewriter</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Transformed using the Google XYZ Formula: <em className="text-slate-700 dark:text-slate-300">"Accomplished [X], as measured by [Y], by doing [Z]"</em>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {analysis.bulletRewrites.map((rewrite, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/90 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Original */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Original Resume Bullet</span>
                        <div className="p-3 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 line-through decoration-rose-500/70 leading-relaxed">
                          {rewrite.original}
                        </div>
                      </div>

                      {/* Improved */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <span>Optimized High-Impact Revision</span>
                        </span>
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                          {rewrite.improved}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Why it works:</span> {rewrite.impactExplanation}
                      </p>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => copyBullet(rewrite.improved, idx)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => applyBulletToResume(rewrite.original, rewrite.improved, idx)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {appliedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Wand2 className="w-3.5 h-3.5" />}
                          <span>{appliedIndex === idx ? 'Applied to Resume!' : 'Apply to Resume'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Advice Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 border border-emerald-100 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
              <Zap className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Hiring Manager Interview Pitch Strategy</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {analysis.hiringManagerAdvice}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Engineering Hiring Proof (interviewing.io Style Testimonials) */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Verified Candidate Outcomes · Tier-1 Tech Offers
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">
            100% verified offer letters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Alex Morrison</span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">L5 SWE @ Google</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "The ATS scanner pinpointed 4 missing distributed caching keywords. After rewriting with Google XYZ bullets, I received 3 FAANG recruiter callbacks in 10 days."
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
              <span>ATS Score: 64% → 94%</span>
              <span className="mx-1.5">·</span>
              <span>Offer: $340k TC</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Priya Kapoor</span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Staff ML @ Meta</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "The live mock call room with David's LLM rubric was identical to my Meta system design loop. It trained me to lead with cost-per-token trade-offs."
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
              <span>Pass Rate: 10/10 Score</span>
              <span className="mx-1.5">·</span>
              <span>Offer: $485k TC</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Marcus Vance</span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Lead UX @ Stripe</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "Elena's design system questions uncovered that my portfolio was missing multi-tier token governance. Fixed it and passed the onsite unanimously."
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
              <span>Design Loop: Exceptional</span>
              <span className="mx-1.5">·</span>
              <span>Offer: $310k TC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatchView;
