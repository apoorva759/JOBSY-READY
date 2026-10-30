import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Zap, Map, Award, MessageSquare, Send, 
  Sun, Moon, BookOpen, Mic
} from 'lucide-react';
import { TabType } from './types';
import { SAMPLE_RESUME, SAMPLE_JOB_DESC } from './constants';
import ResumeMatchView from './components/ResumeMatchView';
import CareerRoadmapView from './components/CareerRoadmapView';
import AptitudeTest from './components/AptitudeTest';
import InterviewSimulator from './components/InterviewSimulator';
import OutreachStudio from './components/OutreachStudio';
import PrepHubView from './components/PrepHubView';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import { BackgroundAmbience } from './components/BackgroundAmbience';

interface TabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'match', label: 'Resume & ATS Match', shortLabel: 'Resume Match', icon: Zap },
  { id: 'prep', label: 'Prep Vault & Notes (65+)', shortLabel: 'Prep Vault', icon: BookOpen },
  { id: 'roadmap', label: '12M Roadmap', shortLabel: 'Roadmap', icon: Map },
  { id: 'aptitude', label: 'Aptitude Arena', shortLabel: 'Aptitude', icon: Award },
  { id: 'interview', label: 'Mock Interview', shortLabel: 'Mock Interview', icon: MessageSquare },
  { id: 'outreach', label: 'Outreach Kit', shortLabel: 'Outreach', icon: Send },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('match');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('jobsy_theme') as 'dark' | 'light') || 'dark';
  });

  // Persistent user state
  const [resume, setResume] = useState(() => localStorage.getItem('jobsy_resume') || SAMPLE_RESUME);
  const [jobDesc, setJobDesc] = useState(() => localStorage.getItem('jobsy_job_desc') || SAMPLE_JOB_DESC);
  const [role, setRole] = useState(() => localStorage.getItem('jobsy_role') || 'Staff Machine Learning Engineer');

  useEffect(() => {
    localStorage.setItem('jobsy_resume', resume);
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('jobsy_job_desc', jobDesc);
  }, [jobDesc]);

  useEffect(() => {
    localStorage.setItem('jobsy_role', role);
  }, [role]);

  // Apply dark / light theme to html
  useEffect(() => {
    localStorage.setItem('jobsy_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 relative ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Ambience */}
      <BackgroundAmbience />

      {/* Primary Top Header */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark with Iconic Graduate Hat */}
          <div 
            onClick={() => setActiveTab('match')}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 cursor-pointer select-none group"
            title="Jobsy Career Engine"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm flex items-center justify-center text-white text-xl group-hover:scale-105 transition-transform">
              🎓
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Jobsy<span className="text-emerald-500">.</span>
              </span>
            </div>
          </div>

          {/* Navigation Links / Segmented Tabs */}
          <nav 
            className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-1 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl p-1 border border-slate-200/80 dark:border-slate-800"
            role="tablist"
            aria-label="Application views"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer relative ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Action & Controls */}
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3 py-1.5 rounded-lg font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Open ChatGPT-style Voice AI Assistant"
            >
              <Mic className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline">Voice Assistant</span>
              <span className="md:hidden">Voice</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 p-5 sm:p-7 lg:p-8 shadow-sm relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {activeTab === 'match' && (
                <ResumeMatchView
                  resume={resume}
                  setResume={setResume}
                  jobDesc={jobDesc}
                  setJobDesc={setJobDesc}
                />
              )}

              {activeTab === 'prep' && (
                <PrepHubView />
              )}

              {activeTab === 'roadmap' && (
                <CareerRoadmapView
                  role={role}
                  setRole={setRole}
                />
              )}

              {activeTab === 'aptitude' && (
                <AptitudeTest
                  currentRole={role}
                />
              )}

              {activeTab === 'interview' && (
                <InterviewSimulator
                  role={role}
                  setRole={setRole}
                />
              )}

              {activeTab === 'outreach' && (
                <OutreachStudio
                  role={role}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Clean, Professional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Jobsy</span>
            <span aria-hidden="true">·</span>
            <span>Career Acceleration & Technical Interview Platform</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span>ATS Resume Parser</span>
            <span aria-hidden="true">·</span>
            <span>Curated Prep Vault</span>
            <span aria-hidden="true">·</span>
            <span>System Design & Coding Practice</span>
          </div>
        </div>
      </footer>

      {/* Floating ChatGPT-style Voice AI Trigger Orb */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsVoiceModalOpen(true)}
          className="px-4 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xl ring-1 ring-slate-800/10 dark:ring-white/20 flex items-center gap-2.5 font-medium text-xs cursor-pointer group"
          title="Open AI Voice Assistant (ChatGPT style)"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <Mic className="w-4 h-4" />
          <span>Ask Jobsy AI</span>
        </motion.button>
      </div>

      {/* AI Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        contextRole={role}
      />
    </div>
  );
};

export default App;
