import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, Target, ArrowRight, CheckCircle, Circle, 
  ExternalLink, Printer, DollarSign, Layers, 
  Sparkles, Code, BookOpen, Clock, ChevronRight
} from 'lucide-react';
import { RoadmapData, GroundingChunk } from '../types';
import { generateCareerRoadmap } from '../services/geminiService';

interface CareerRoadmapViewProps {
  role: string;
  setRole: (val: string) => void;
}

const QUICK_ROLES = [
  "Senior Product Designer (UI/UX)",
  "Staff AI Engineer",
  "Principal Product Manager",
  "Senior Full-Stack Engineer",
  "Cloud Solutions Architect"
];

const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({ role, setRole }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [grounding, setGrounding] = useState<GroundingChunk[] | undefined>(undefined);
  
  // Track completed phase projects in localStorage
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('jobsy_roadmap_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('jobsy_roadmap_completed', JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleItem = (key: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBuildPath = async (targetRoleOverride?: string) => {
    const target = (targetRoleOverride || role).trim();
    if (!target) {
      setError("Please specify a target role to build the progression blueprint.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await generateCareerRoadmap(target);
      setRoadmap(response.data);
      setGrounding(response.groundingChunks);
    } catch (err: any) {
      setError(err.message || "Failed to generate career progression blueprint.");
    } finally {
      setLoading(false);
    }
  };

  const sources = grounding?.filter(chunk => chunk.web).map(chunk => chunk.web) || [];

  return (
    <div className="space-y-8">
      {/* Header & Role Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Map className="w-6 h-6 text-sky-400" />
            <span>12-Month Career Progression Blueprint</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Grounded architectural timeline, skill milestones, flagship capstone project, and market compensation.
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium self-start lg:self-auto transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Export Blueprint (Print/PDF)</span>
        </button>
      </div>

      {/* Role Input Bar */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBuildPath()}
            placeholder="e.g. Staff AI Engineer, Principal Product Manager, Distributed Systems Architect..."
            className="w-full py-4 pl-4 pr-36 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
          />
          <button
            onClick={() => handleBuildPath()}
            disabled={loading}
            className="absolute right-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-sky-400 hover:bg-sky-300 disabled:opacity-50 transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <span>Mapping...</span>
            ) : (
              <>
                <span>Build Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Popular:</span>
          {QUICK_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                handleBuildPath(r);
              }}
              className="text-slate-400 hover:text-sky-300 transition-colors underline decoration-slate-700 hover:decoration-sky-400 text-xs"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Generated Roadmap Display */}
      <AnimatePresence>
        {roadmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 pt-4"
          >
            {/* Target Role & Market Compensation Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 md:col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">Target Objective</span>
                  <h3 className="text-xl font-bold text-white mt-1">{roadmap.targetRole}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <span>12-Month Structured Trajectory</span>
                    <span>·</span>
                    <span>4 Strategic Progression Phases</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 hidden sm:block">
                  <Map className="w-8 h-8" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Compensation Benchmark</span>
                </span>
                <div className="text-xl font-extrabold text-emerald-300 font-mono tabular-nums my-1">
                  {roadmap.salaryRange}
                </div>
                <span className="text-[10px] text-slate-400">Estimated Total Comp (Base + Equity)</span>
              </div>
            </div>

            {/* Core Tools & Ecosystem Strip */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Required Tooling & Production Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {roadmap.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Phases Timeline */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Quarterly Progression Stages</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {roadmap.timeline.map((phase, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div>
                      {/* Phase Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-400">0{pIdx + 1}</span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{phase.phase}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 tabular-nums px-2 py-0.5 rounded bg-slate-800">
                          {phase.duration}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                        {phase.focus}
                      </p>

                      {/* Skills to master */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Competencies</span>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.skills.map((s, sIdx) => (
                            <span key={sIdx} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Deliverables */}
                      <div className="mt-4 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Portfolio Deliverables</span>
                        {phase.projects.map((proj, prIdx) => {
                          const itemKey = `${pIdx}-${prIdx}`;
                          const isDone = completedItems[itemKey];
                          return (
                            <button
                              key={prIdx}
                              onClick={() => toggleItem(itemKey)}
                              className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${
                                isDone 
                                  ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200 line-through opacity-80'
                                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                              )}
                              <span>{proj}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Certifications or Courses */}
                    {phase.certificationsOrCourses && phase.certificationsOrCourses.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                        <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{phase.certificationsOrCourses.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Flagship Capstone Showcase */}
            {roadmap.capstoneProject && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-sky-900/40 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Flagship Capstone Project Blueprint</span>
                </div>
                <h4 className="text-lg font-bold text-white">{roadmap.capstoneProject.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {roadmap.capstoneProject.description}
                </p>
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <span className="text-xs text-slate-400 font-medium">Architecture Stack:</span>
                  {roadmap.capstoneProject.techStack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/60 text-sky-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search Grounding Sources */}
            {sources.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Grounding Research & Market Trends</span>
                <div className="flex flex-wrap gap-2">
                  {sources.map((s, idx) => (
                    <a
                      key={idx}
                      href={s?.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-sky-400" />
                      <span className="truncate max-w-[220px]">{s?.title || 'Trend Report'}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerRoadmapView;
