import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, ExternalLink, Download, Check, 
  CheckCircle2, Circle, Copy, Sparkles, Filter, 
  FileText, Bookmark, X, ArrowUpRight, Share2, Layers
} from 'lucide-react';
import { PrepResource } from '../types';
import { PREP_RESOURCES } from '../data/prepResources';
import MarkdownRenderer from './MarkdownRenderer';

const ROLE_FILTERS = [
  'All Engineering Roles',
  'UI/UX & Product Designer',
  'SDE / Software Engineer',
  'AI / ML Engineer',
  'Full-Stack Developer',
  'DevOps / Cloud'
] as const;

const CATEGORY_FILTERS = [
  'All Categories',
  'UI/UX & Product Design',
  'DSA & LeetCode',
  'Machine Learning & AI',
  'System Design',
  'Full-Stack Web Dev',
  'DevOps & Cloud',
  'Cheat Sheets & Notes'
] as const;

const PrepHubView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All Engineering Roles');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  
  // Track completed resources in localStorage
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('jobsy_prep_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modal for viewing downloadable notes
  const [activeNotesResource, setActiveNotesResource] = useState<PrepResource | null>(null);
  const [copiedNote, setCopiedNote] = useState(false);

  useEffect(() => {
    localStorage.setItem('jobsy_prep_completed', JSON.stringify(completedMap));
  }, [completedMap]);

  const toggleComplete = (id: string) => {
    setCompletedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return PREP_RESOURCES.filter(item => {
      // Role filter
      if (selectedRole !== 'All Engineering Roles' && item.roleTarget !== 'All Engineering Roles' && item.roleTarget !== selectedRole) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesProvider = item.provider.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        return matchesTitle || matchesProvider || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedRole, selectedCategory, searchQuery]);

  const completedCount = useMemo(() => {
    return Object.values(completedMap).filter(Boolean).length;
  }, [completedMap]);

  const downloadNoteAsFile = (resource: PrepResource) => {
    if (!resource.notesContent) return;
    const blob = new Blob([resource.notesContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.id}-notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyNoteContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span>Preparation Vault: Striver DSA, CampusX ML & Notes Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Over 65+ hand-curated playlists, SDE sheets, machine learning courses, system design bibles, and downloadable notes.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
            <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">Study Tracker:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {completedCount} / {PREP_RESOURCES.length} Done
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, creator (e.g. Striver, CampusX, LeetCode, Karpathy, System Design)..."
            className="w-full py-3.5 pl-11 pr-24 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">Role:</span>
            {ROLE_FILTERS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-all ${
                  selectedRole === r
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">Category:</span>
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-all ${
                selectedCategory === c
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
        <span>Showing {filteredResources.length} curated resources & playlists</span>
        {(selectedRole !== 'All Engineering Roles' || selectedCategory !== 'All Categories' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedRole('All Engineering Roles');
              setSelectedCategory('All Categories');
              setSearchQuery('');
            }}
            className="text-emerald-500 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          const isDone = completedMap[res.id];

          return (
            <div
              key={res.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isDone
                  ? 'bg-emerald-950/10 border-emerald-500/30 dark:bg-emerald-950/20'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                {/* Card Top: Provider & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {res.provider}
                  </span>
                  {res.badge && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      res.category === 'DSA & LeetCode' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                      res.category === 'Machine Learning & AI' ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' :
                      res.category === 'System Design' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' :
                      res.category === 'Cheat Sheets & Notes' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {res.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {res.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {res.description}
                </p>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                {/* Complete Toggle */}
                <button
                  onClick={() => toggleComplete(res.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    isDone 
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-[11px]">{isDone ? 'Mastered' : 'Track'}</span>
                </button>

                {/* Launch / Notes Action */}
                <div className="flex items-center gap-2">
                  {res.isDownloadableNotes ? (
                    <>
                      <button
                        onClick={() => setActiveNotesResource(res)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Notes</span>
                      </button>
                      <button
                        onClick={() => downloadNoteAsFile(res)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        title="Download Markdown Sheet"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span>Open Playlist</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes Modal / Slideover Drawer */}
      <AnimatePresence>
        {activeNotesResource && activeNotesResource.notesContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    {activeNotesResource.provider}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeNotesResource.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyNoteContent(activeNotesResource.notesContent || '')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNote ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => downloadNoteAsFile(activeNotesResource)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>

                  <button
                    onClick={() => setActiveNotesResource(null)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-4">
                <MarkdownRenderer content={activeNotesResource.notesContent} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrepHubView;
