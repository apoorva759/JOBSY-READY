import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Clock, CheckCircle2, AlertCircle, RotateCcw, 
  ArrowRight, Sparkles, RefreshCw, BarChart2, Check, X
} from 'lucide-react';
import { APTITUDE_QUESTIONS } from '../constants';
import { Question } from '../types';
import { generateCustomAptitudeQuestions } from '../services/geminiService';
import confetti from 'canvas-confetti';

interface AptitudeTestProps {
  currentRole?: string;
}

const CATEGORIES = ['All', 'UI/UX', 'Quantitative', 'Logic', 'Technical', 'Product'] as const;

const AptitudeTest: React.FC<AptitudeTestProps> = ({ currentRole }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customDomainInput, setCustomDomainInput] = useState(currentRole || 'Software Engineering');

  const startStandardTest = (category: string = selectedCategory) => {
    let pool = [...APTITUDE_QUESTIONS];
    if (category !== 'All') {
      pool = pool.filter(q => q.category === category);
    }
    // Pick 5 random
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffled);
    setTestStarted(true);
    setSubmitted(false);
    setCurrentAnswers({});
    setTimeLeft(600);
  };

  const startCustomAITest = async () => {
    if (!customDomainInput.trim()) return;
    setIsGeneratingCustom(true);
    try {
      const generated = await generateCustomAptitudeQuestions(customDomainInput.trim());
      if (generated && generated.length > 0) {
        setQuestions(generated);
        setTestStarted(true);
        setSubmitted(false);
        setCurrentAnswers({});
        setTimeLeft(600);
      } else {
        startStandardTest();
      }
    } catch {
      startStandardTest();
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    let newScore = 0;
    questions.forEach((q) => {
      if (currentAnswers[q.questionNumber] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);

    if (newScore >= 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [submitted, questions, currentAnswers]);

  useEffect(() => {
    let timer: any;
    if (testStarted && !submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testStarted && !submitted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [testStarted, submitted, timeLeft, handleSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Keyboard shortcut listener for options A, B, C, D
  useEffect(() => {
    if (!testStarted || submitted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        // Find first unanswered question
        const unanswered = questions.find(q => !currentAnswers[q.questionNumber]);
        if (unanswered) {
          setCurrentAnswers(prev => ({
            ...prev,
            [unanswered.questionNumber]: key
          }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testStarted, submitted, questions, currentAnswers]);

  // Landing view when test not yet started
  if (!testStarted) {
    return (
      <div className="space-y-8">
        <div className="pb-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Executive Aptitude & Problem Solving Arena</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Timed assessments calibrated against quantitative reasoning, algorithmic logic, and technical systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A: Curated Industry Standards */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Standard Track</span>
              <h3 className="text-lg font-bold text-white">Curated Assessment Bank</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                5 rapid-fire questions covering quantitative analysis, formal logic, and computer systems architecture.
              </p>

              {/* Category buttons */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs text-slate-400 font-semibold">Select Focus Domain:</span>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => startStandardTest()}
              className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin 10-Minute Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Option B: AI-Generated Custom Test */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-purple-900/40 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Generator Track</span>
              </span>
              <h3 className="text-lg font-bold text-white">Custom Role-Specific Arena</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gemini 3.8 Flash synthesizes 5 bespoke questions tailored specifically to your target discipline.
              </p>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs text-slate-400 font-semibold">Target Specialization:</label>
                <input
                  type="text"
                  value={customDomainInput}
                  onChange={(e) => setCustomDomainInput(e.target.value)}
                  placeholder="e.g. Distributed Systems, Kubernetes, Product Analytics..."
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/60"
                />
              </div>
            </div>

            <button
              onClick={startCustomAITest}
              disabled={isGeneratingCustom}
              className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGeneratingCustom ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Tailored Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate & Launch Custom Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active or Submitted Assessment View
  const answeredCount = Object.keys(currentAnswers).length;

  return (
    <div className="space-y-6">
      {/* Sticky Assessment Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md sticky top-4 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Assessment Status:</span>
              <span className={`text-xs font-mono font-semibold ${submitted ? 'text-slate-400' : 'text-emerald-400'}`}>
                {submitted ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <span className="text-xs text-slate-400 tabular-nums font-mono">
              {answeredCount} of {questions.length} answered
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer Display */}
          <div className={`px-4 py-2 rounded-xl font-mono text-base font-bold flex items-center gap-2 border ${
            timeLeft < 60 && !submitted 
              ? 'bg-rose-950/60 border-rose-800 text-rose-300 animate-pulse' 
              : 'bg-slate-950 border-slate-800 text-amber-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="tabular-nums">{formatTime(timeLeft)}</span>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md shadow-emerald-500/20"
            >
              Finish & Score
            </button>
          ) : (
            <button
              onClick={() => startStandardTest()}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry / New Test</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Scoreboard Banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Scorecard</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-white font-mono tabular-nums">{score}</span>
                  <span className="text-base text-slate-400 font-mono">/ {questions.length}</span>
                  <span className="text-xs font-semibold text-emerald-400 ml-2 font-mono">
                    ({Math.round((score / questions.length) * 100)}% Accuracy)
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 max-w-md">
                {score === questions.length ? (
                  <span className="text-emerald-400 font-semibold">Perfect score. Exceptional quantitative and domain problem solving readiness.</span>
                ) : score >= 3 ? (
                  <span className="text-sky-300 font-semibold">Solid passing benchmark. Review specific question derivations below.</span>
                ) : (
                  <span className="text-amber-400 font-semibold">Refine core fundamentals. Focus on time management and logic deduction.</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Cards */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const selected = currentAnswers[q.questionNumber];
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={q.questionNumber || idx}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? (isCorrect 
                      ? 'bg-emerald-950/20 border-emerald-800/60' 
                      : 'bg-rose-950/20 border-rose-900/60')
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Question text */}
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  {q.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                      {q.category} Reasoning
                    </span>
                  )}
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {q.question}
                  </p>
                </div>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.entries(q.options) as [keyof typeof q.options, string][]).map(([optKey, optVal]) => {
                  const isOptSelected = selected === optKey;
                  const isTargetCorrect = optKey === q.correctAnswer;

                  let optClass = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700";
                  if (submitted) {
                    if (isTargetCorrect) {
                      optClass = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold";
                    } else if (isOptSelected && !isCorrect) {
                      optClass = "bg-rose-950/60 border-rose-600/80 text-rose-200 line-through";
                    } else {
                      optClass = "bg-slate-950/30 border-slate-900 text-slate-500 opacity-60";
                    }
                  } else if (isOptSelected) {
                    optClass = "bg-amber-400/10 border-amber-400/60 text-amber-200 ring-1 ring-amber-400/30";
                  }

                  return (
                    <button
                      key={optKey}
                      disabled={submitted}
                      onClick={() => setCurrentAnswers(prev => ({ ...prev, [q.questionNumber]: optKey }))}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2.5 ${optClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-slate-800/80 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                          {optKey}
                        </span>
                        <span>{optVal}</span>
                      </div>

                      {submitted && isTargetCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && isOptSelected && !isCorrect && (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown on Submitted */}
              {submitted && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px] uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Derivation & Explanation</span>
                  </div>
                  <p className="leading-relaxed text-slate-400">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AptitudeTest;
