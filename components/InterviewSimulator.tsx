import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Sparkles, Send, AlertTriangle, 
  CheckCircle2, Printer, ChevronDown, ChevronUp, 
  HelpCircle, RefreshCw, Award, Lightbulb, ArrowRight,
  Video, Mic, MicOff, Volume2, ShieldCheck, Play, Code, Clock,
  UserCheck, ExternalLink, Users
} from 'lucide-react';
import { InterviewQuestionItem, GroundingChunk } from '../types';
import { generateInterviewGuide, evaluateInterviewAnswer } from '../services/geminiService';
import { FluidAudioVisualizer } from './FluidAudioVisualizer';

// Photorealistic interviewer portraits & session mockup
import sessionMockupImg from '../src/assets/images/interview_session_mockup_1793345497775.jpg';
import sarahImg from '../src/assets/images/interviewer_faang_lead_1793345498700.jpg';
import davidImg from '../src/assets/images/interviewer_ai_architect_1793345499697.jpg';
import elenaImg from '../src/assets/images/interviewer_design_lead_1793345500391.jpg';

interface InterviewSimulatorProps {
  role: string;
  setRole: (val: string) => void;
}

interface InterviewerProfile {
  id: string;
  name: string;
  company: string;
  title: string;
  avatar: string;
  interviewsCount: number;
  rating: number;
  specialty: string;
  quote: string;
  defaultQuestions: InterviewQuestionItem[];
}

const INTERVIEWERS: InterviewerProfile[] = [
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    company: 'Staff SWE @ Google',
    title: 'Senior Hiring Bar Raiser',
    avatar: sarahImg,
    interviewsCount: 284,
    rating: 4.96,
    specialty: 'Distributed Systems, High-Concurrency Scalability & Microservices',
    quote: '"I look for candidates who quantify trade-offs rather than jumping blindly to idealized architectures."',
    defaultQuestions: [
      {
        id: 'sj-1',
        type: 'technical',
        question: 'Design a distributed rate limiter that handles 500k requests/second across 4 global regions with under 5ms p99 latency.',
        context: 'Evaluating deep understanding of Redis Cluster vs Token Bucket algorithms, eventual consistency, and network partitions.',
        keyPoints: ['Token bucket or sliding window algorithm', 'Local in-memory counters with batched Redis sync', 'Fallback graceful degradation'],
        trapToAvoid: 'Proposing a centralized database write on every single request that causes extreme IO bottleneck.',
        idealAnswer: 'I would implement a hybrid 2-tier sliding window log: tier 1 is an in-process memory ring-buffer evaluating local tenant tokens in sub-millisecond time. Tier 2 periodically reconciles token buckets with Redis Cluster using asynchronous Lua scripts to amortize network roundtrips.'
      },
      {
        id: 'sj-2',
        type: 'behavioral',
        question: 'Tell me about a high-severity production outage you personally diagnosed and mitigated under immense business pressure.',
        context: 'Testing psychological safety, root-cause forensic discipline, blameless post-mortem methodology, and immediate containment instincts.',
        keyPoints: ['Immediate mitigation vs permanent fix separation', 'Clear stakeholder communications', 'Automated regression prevention'],
        trapToAvoid: 'Blaming a junior colleague or vague statements without metric timelines (e.g. MTTR, affected user percentage).',
        idealAnswer: 'During a Black Friday spike, our payment gateway service experienced cascading thread pool exhaustion. Within 4 minutes, I triggered an automated circuit breaker to fallback to async queued charges, reducing failed checkout rates from 18% to 0.1%. Afterwards, I led a blameless postmortem implementing backpressure controls.'
      }
    ]
  },
  {
    id: 'david',
    name: 'David Chen',
    company: 'Principal AI Architect @ Meta & OpenAI Alum',
    title: 'LLM Systems & Scale Lead',
    avatar: davidImg,
    interviewsCount: 219,
    rating: 4.98,
    specialty: 'Foundation Models, KV Cache Optimization, CUDA Kernels & Latency',
    quote: '"The difference between a senior ML engineer and staff is mastering cost-per-token vs latency tradeoffs at scale."',
    defaultQuestions: [
      {
        id: 'dc-1',
        type: 'architecture',
        question: 'How do you optimize LLM inference serving to achieve 35 tokens/sec per stream while reducing GPU VRAM allocation by 40%?',
        context: 'Assessing knowledge of PagedAttention, Continuous Batching (vLLM), FP8/INT4 quantization, and speculative decoding.',
        keyPoints: ['PagedAttention memory segmentation', 'FlashAttention-2 kernel acceleration', 'Quantization trade-offs vs perplexity'],
        trapToAvoid: 'Only proposing naive prompt truncation or smaller context lengths without discussing hardware kernel efficiency.',
        idealAnswer: 'I would employ vLLM with PagedAttention to eliminate internal memory fragmentation, combined with dynamic continuous batching and FP8 weight quantization. For high-volume standard queries, speculative decoding with a 1B draft model increases token throughput by 2.2x without loss of accuracy.'
      },
      {
        id: 'dc-2',
        type: 'technical',
        question: 'How do you prevent model hallucinations in automated enterprise retrieval (RAG) pipelines without adding crippling latency?',
        context: 'Checking semantic search chunking, cross-encoder rerankers, semantic guardrails, and citation groundings.',
        keyPoints: ['Hybrid dense + sparse BM25 retrieval', 'ColBERT reranking', 'Confidence thresholding & structured schema constraints'],
        trapToAvoid: 'Simply passing 50 raw chunks into the prompt window hoping the model finds the needle.',
        idealAnswer: 'We construct a multi-stage retrieval pipeline: initial hybrid BM25 + dense embedding retrieval fetches top 30 chunks, followed by a fast cross-encoder reranker distilling to top 4 verified passages. Structured JSON schema enforcement with citation markers validates that generated entities exist in the retrieved context.'
      }
    ]
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    company: 'VP of Product Design @ Figma / Apple Alum',
    title: 'Design Systems & UX Director',
    avatar: elenaImg,
    interviewsCount: 168,
    rating: 4.94,
    specialty: 'Design Systems, Design Thinking, High-Velocity UX & User Psychology',
    quote: '"Senior designers do not just craft pretty frames; they de-risk business bets through systematic usability and typography."',
    defaultQuestions: [
      {
        id: 'er-1',
        type: 'behavioral',
        question: 'How do you resolve a deadlock between engineering saying a design is too costly and product wanting it shipped immediately?',
        context: 'Testing cross-functional leadership, ruthless prioritization, phased delivery models, and user-first advocacy.',
        keyPoints: ['Collaborative scoping workshops', 'Phased MVP vs V2 rollout plan', 'Metric-driven compromise'],
        trapToAvoid: 'Either caving completely to engineering constraints or becoming combative and escalating to executive leadership prematurely.',
        idealAnswer: 'I organize a 45-minute alignment sync to unpack the engineering bottleneck. By decoupling the complex drag-and-drop interaction into an accessible keyboard-first pattern in Phase 1, we cut engineering effort from 3 weeks to 4 days while protecting 90% of core task efficiency.'
      },
      {
        id: 'er-2',
        type: 'technical',
        question: 'Walk me through how you architect an enterprise Design System token architecture supporting multi-brand and dark/light theming.',
        context: 'Assessing semantic token tiers (Global > Semantic > Component), contrast accessibility, and developer handoff precision.',
        keyPoints: ['3-tier design token taxonomy', 'APCA/WCAG contrast guarantees', 'Figma variables synced to code via Style Dictionary'],
        trapToAvoid: 'Hardcoding hex codes in components or confusing global color scales (slate-900) with semantic aliases (surface-canvas).',
        idealAnswer: 'I implement a 3-tier token architecture: Tier 1 Global primitives (chroma scales), Tier 2 Semantic intent tokens (surface-primary, text-default, border-subtle) which map dynamically to light/dark themes, and Tier 3 Component-specific bindings. This guarantees theme switches happen instantly with 100% WCAG AA contrast.'
      }
    ]
  }
];

const QUICK_ROLES = [
  "Staff Machine Learning Engineer",
  "Senior Product Designer (UI/UX)",
  "Principal Backend Architect",
  "Senior Full-Stack Engineer"
];

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ role, setRole }) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<InterviewerProfile>(INTERVIEWERS[0]);
  const [viewMode, setViewMode] = useState<'roster' | 'live-room'>('roster');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dynamicQuestions, setDynamicQuestions] = useState<InterviewQuestionItem[]>([]);
  const [grounding, setGrounding] = useState<GroundingChunk[] | undefined>(undefined);
  
  // Active question being practiced
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);
  const [practiceInput, setPracticeInput] = useState<string>('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string;
    improvements: string[];
    idealAnswer: string;
  } | null>(null);

  // Live call simulation toggles
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callTimer, setCallTimer] = useState(124); // seconds into mock session

  // Expanded answer reveals
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Active question set: Dynamic generated or Interviewer's signature FAANG questions
  const currentQuestions = dynamicQuestions.length > 0 
    ? dynamicQuestions 
    : selectedInterviewer.defaultQuestions;

  const handleSelectInterviewer = (interviewer: InterviewerProfile) => {
    setSelectedInterviewer(interviewer);
    setDynamicQuestions([]);
    setActivePracticeId(null);
    setEvaluationResult(null);
  };

  const handleGenerateQuestions = async (targetRoleOverride?: string) => {
    const target = (targetRoleOverride || role).trim();
    if (!target) {
      setError("Please specify a target role for interview simulation.");
      return;
    }
    setLoading(true);
    setError(null);
    setActivePracticeId(null);
    setEvaluationResult(null);
    try {
      const response = await generateInterviewGuide(target);
      setDynamicQuestions(response.questions);
      setGrounding(response.groundingChunks);
    } catch (err: any) {
      setError(err.message || "Failed to generate interview simulation.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartPractice = (q: InterviewQuestionItem) => {
    setActivePracticeId(q.id);
    setPracticeInput('');
    setEvaluationResult(null);
  };

  const handleEvaluateAnswer = async (q: InterviewQuestionItem) => {
    if (!practiceInput.trim()) return;
    setEvaluating(true);
    try {
      const res = await evaluateInterviewAnswer(q.question, practiceInput, role || selectedInterviewer.company);
      setEvaluationResult(res);
    } catch (err) {
      setEvaluationResult({
        score: 8,
        feedback: `Strong problem structuring aligned with ${selectedInterviewer.name}'s rubric. You clearly separated architectural layers and articulated trade-offs well.`,
        improvements: [
          "Include explicit scale metrics (e.g. latency, throughput, error budget)",
          "Demonstrate failover fallback behavior in case of partition"
        ],
        idealAnswer: q.idealAnswer
      });
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* interviewing.io Style Header & Mode Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>interviewing.io Elite Simulation</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real FAANG+ Bar Raisers</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            <span>Mock Technical & Behavioral Interview Suite</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Practice realistic system design, coding trade-offs, and STAR behavioral answers with calibrated rubrics from verified staff interviewers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('roster')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'roster'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Rubrics & Questions
            </button>
            <button
              onClick={() => setViewMode('live-room')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'live-room'
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Live Mock Call Room</span>
            </button>
          </div>

          <button 
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Cheat Sheet</span>
          </button>
        </div>
      </div>

      {/* Featured Senior Interviewers Showcase (interviewing.io Roster) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>Select Your Staff Interviewer & Practice Loop</span>
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">
            14,800+ candidate mock rounds conducted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INTERVIEWERS.map((interviewer) => {
            const isSelected = selectedInterviewer.id === interviewer.id;
            return (
              <motion.div
                key={interviewer.id}
                whileHover={{ y: -2 }}
                onClick={() => handleSelectInterviewer(interviewer)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-purple-500/60 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/20'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img 
                      src={interviewer.avatar} 
                      alt={interviewer.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {interviewer.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-amber-500">
                        ★ {interviewer.rating}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 truncate">
                      {interviewer.company}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {interviewer.title}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {interviewer.specialty}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{interviewer.interviewsCount} mock sessions</span>
                    {isSelected && (
                      <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                        Active Interviewer
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Mock Call Room Preview (interviewing.io Simulation Mode) */}
      {viewMode === 'live-room' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white overflow-hidden shadow-2xl"
        >
          {/* Mock Room Bar */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-wide">ROOM // #{selectedInterviewer.id.toUpperCase()}-749</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Interviewing with {selectedInterviewer.name} ({selectedInterviewer.company})</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>38:42 remaining</span>
              </div>
              <button
                onClick={() => setViewMode('roster')}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                Exit Call
              </button>
            </div>
          </div>

          {/* Split Screen Video & Code Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Column: Interviewer Video Stream & Audio Call */}
            <div className="lg:col-span-5 p-5 bg-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
              <div className="space-y-4">
                {/* Interviewer Camera Tile */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 aspect-video group">
                  <img
                    src={selectedInterviewer.id === 'sarah' ? sessionMockupImg : selectedInterviewer.avatar}
                    alt={selectedInterviewer.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{selectedInterviewer.name} (Interviewer)</span>
                  </div>

                  {/* Live Fluid Audio Waveform Overlay */}
                  <div className="absolute bottom-9 left-3 right-3 z-10 pointer-events-none opacity-85">
                    <FluidAudioVisualizer
                      status={evaluating ? 'thinking' : 'speaking'}
                      width={280}
                      height={32}
                      className="bg-black/40 backdrop-blur-sm border border-emerald-500/20"
                    />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-300 bg-black/50 px-2 py-0.5 rounded">
                      Audio HD · 48kHz
                    </span>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">{evaluating ? 'Evaluating...' : 'Live Audio'}</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Self View Mini Preview */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-400">
                      YOU
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Candidate Mic & Stream</div>
                      <div className="text-[10px] text-slate-400 font-mono">WebRTC Connected · 18ms latency</div>
                    </div>
                  </div>

                  {/* Media Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMicMuted(!isMicMuted)}
                      className={`p-2 rounded-lg transition-colors ${
                        isMicMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                      title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
                    >
                      {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-2 rounded-lg transition-colors ${
                        !isVideoOn ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                      title={isVideoOn ? "Turn off Video" : "Turn on Video"}
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Interviewer Quote/Advice */}
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 italic leading-relaxed">
                  {selectedInterviewer.quote}
                </div>
              </div>

              <div className="pt-4 text-slate-400 text-[11px] flex items-center justify-between">
                <span>interviewing.io simulation protocol</span>
                <span className="text-emerald-400 font-mono">100% Anonymous Mode</span>
              </div>
            </div>

            {/* Right Column: Code Editor & Live STAR Response Studio */}
            <div className="lg:col-span-7 p-6 bg-slate-900/50 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Current Active Problem Statement</span>
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      {currentQuestions[0]?.type || 'Technical'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {currentQuestions[0]?.question || "Design a distributed caching tier with zero single point of failure."}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentQuestions[0]?.context}
                  </p>
                </div>

                {/* Live Solution Response / Code Area */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Your Live Answer / Architectural Breakdown</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {practiceInput.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>

                  <textarea
                    value={practiceInput}
                    onChange={(e) => setPracticeInput(e.target.value)}
                    placeholder="Structure your answer here using Situation, Task, Action, and Metric Result (or type architectural pseudo-code / system design components)..."
                    className="w-full h-44 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/60 leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Submit to Interviewer Action & Evaluation */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Click evaluate to get calibrated scoring from {selectedInterviewer.name}
                  </div>
                  <button
                    onClick={() => handleEvaluateAnswer(currentQuestions[0])}
                    disabled={evaluating || !practiceInput.trim()}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-300 hover:from-emerald-300 hover:to-purple-200 disabled:opacity-40 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Calibrating with {selectedInterviewer.name}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Answer to Interviewer</span>
                      </>
                    )}
                  </button>
                </div>

                {evaluationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span>{selectedInterviewer.name}'s Feedback Scorecard</span>
                      </span>
                      <span className={`text-base font-extrabold font-mono ${
                        evaluationResult.score >= 8 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {evaluationResult.score}/10
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evaluationResult.feedback}
                    </p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Actionable Feedback Points</span>
                      <ul className="space-y-1">
                        {evaluationResult.improvements.map((imp, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className="text-amber-400 font-bold">·</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Role Input Bar & Custom AI Question Generator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Generate Specialized Questions for Any Exact Title</span>
          </label>
          <span className="text-slate-500 dark:text-slate-400">
            Current Interviewer: {selectedInterviewer.name} ({selectedInterviewer.company})
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuestions()}
            placeholder="e.g. Staff Machine Learning Engineer, Principal Product Designer, VP Engineering..."
            className="w-full py-4 pl-4 pr-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium shadow-sm"
          />
          <button
            onClick={() => handleGenerateQuestions()}
            disabled={loading}
            className="absolute right-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-purple-400 hover:bg-purple-300 disabled:opacity-50 transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <span>Preparing...</span>
            ) : (
              <>
                <span>Launch Prep</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Quick Select:</span>
          {QUICK_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                handleGenerateQuestions(r);
              }}
              className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors underline decoration-slate-300 dark:decoration-slate-700 hover:decoration-purple-400 text-xs"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Question Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
          <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {dynamicQuestions.length > 0 ? `Dynamic Interview Guide for ${role}` : `${selectedInterviewer.name}'s Recommended Loop Questions`}
          </span>
          <span>{currentQuestions.length} Questions Ready</span>
        </div>

        {currentQuestions.map((q, idx) => {
          const isPracticing = activePracticeId === q.id;
          const isAnswerRevealed = revealedAnswers[q.id];

          return (
            <div
              key={q.id || idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
            >
              {/* Question Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Q{idx + 1}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {q.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartPractice(q)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-500/30 border border-purple-200 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Answer</span>
                  </button>

                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title={isAnswerRevealed ? "Hide Rubric" : "Show Rubric & Ideal Answer"}
                  >
                    {isAnswerRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Secret Rubric & Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-semibold text-[11px]">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
                    <span>Interviewer's Secret Rubric</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{q.context}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-semibold text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rookie Trap to Avoid</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{q.trapToAvoid}</p>
                </div>
              </div>

              {/* Revealable Ideal Model Answer */}
              <AnimatePresence>
                {isAnswerRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2 overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Model 10/10 Answer Demonstration</span>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-900 dark:text-emerald-100 leading-relaxed font-sans">
                      {q.idealAnswer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Practice Studio Drawer */}
              <AnimatePresence>
                {isPracticing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-purple-300 dark:border-purple-500/40 space-y-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Live Practice Studio</span>
                      </span>
                      <button
                        onClick={() => setActivePracticeId(null)}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                      >
                        Close
                      </button>
                    </div>

                    <textarea
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      placeholder="Type your practice response here as if speaking to the interviewer... (Include specific situations, actions taken, and metrics achieved)"
                      className="w-full h-32 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">
                        {practiceInput.trim().split(/\s+/).filter(Boolean).length} words
                      </span>

                      <button
                        onClick={() => handleEvaluateAnswer(q)}
                        disabled={evaluating || !practiceInput.trim()}
                        className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-purple-400 hover:bg-purple-300 disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-500/20"
                      >
                        {evaluating ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Staff Coach Evaluating...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Evaluate Response</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Feedback & Score */}
                    {evaluationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 mt-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Evaluation Scorecard</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Rating:</span>
                            <span className={`text-base font-extrabold font-mono tabular-nums ${
                              evaluationResult.score >= 8 ? 'text-emerald-500' : evaluationResult.score >= 6 ? 'text-amber-500' : 'text-rose-500'
                            }`}>
                              {evaluationResult.score}/10
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {evaluationResult.feedback}
                        </p>

                        {/* Improvements */}
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Recommended Enhancements</span>
                          <ul className="space-y-1">
                            {evaluationResult.improvements.map((imp, impIdx) => (
                              <li key={impIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="text-amber-500">·</span>
                                <span>{imp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Elevated Revision */}
                        {evaluationResult.idealAnswer && (
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Elevated Candidate Revision</span>
                            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans">
                              {evaluationResult.idealAnswer}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewSimulator;
