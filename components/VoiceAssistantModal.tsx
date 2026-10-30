import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Volume2, VolumeX, X, MessageSquare, 
  Send, Sparkles, RefreshCw, Square, ArrowRight, CornerDownLeft
} from 'lucide-react';
import { FluidAudioVisualizer } from './FluidAudioVisualizer';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextRole?: string;
}

type VoiceStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_VOICE_PROMPTS = [
  "Drill me on a behavioral question",
  "How do I explain system design tradeoffs?",
  "Explain Fitts's law and UI hierarchy",
  "Tips for Striver SDE Sheet"
];

const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  contextRole,
}) => {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm Jobsy Voice, your executive AI career coach. You can speak to me or type your question about interviews, resume strategy, or technical concepts. What would you like to prepare today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Stop current speech playback
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (status === 'speaking') {
      setStatus('idle');
    }
  }, [status]);

  // Speak response out loud
  const speakText = useCallback((text: string) => {
    if (isSpeakerMuted || !synthRef.current) {
      setStatus('idle');
      return;
    }

    synthRef.current.cancel(); // cancel any active utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Alex')) &&
      v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setStatus('speaking');
    };

    utterance.onend = () => {
      setStatus('idle');
    };

    utterance.onerror = () => {
      setStatus('idle');
    };

    synthRef.current.speak(utterance);
  }, [isSpeakerMuted]);

  // Handle AI Response Dispatch
  const sendUserMessage = useCallback(async (userText: string) => {
    if (!userText.trim()) return;

    stopSpeaking();
    setStatus('thinking');
    setLiveTranscript('');

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    try {
      const response = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-4),
          contextRole: contextRole || 'Software Engineer'
        })
      });

      const data = await response.json();
      const replyText = data.reply || "I'm right here with you. Let me know what interview topic you'd like to dive into next.";

      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      speakText(replyText);
    } catch {
      const fallbackText = "I heard you. When preparing for technical rounds, always structure your answer clearly using the STAR framework.";
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      speakText(fallbackText);
    }
  }, [messages, contextRole, speakText, stopSpeaking]);

  // SpeechRecognition Setup
  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setLiveTranscript("Speech recognition not supported in this browser. Please type below.");
      return;
    }

    stopSpeaking();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setStatus('listening');
        setLiveTranscript('Listening to your voice...');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setLiveTranscript(final || interim);

        if (final.trim()) {
          sendUserMessage(final.trim());
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('SpeechRecognition error:', e);
        if (status === 'listening') {
          setStatus('idle');
          setLiveTranscript('');
        }
      };

      recognition.onend = () => {
        if (status === 'listening') {
          setStatus('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('SpeechRecognition start failed:', err);
      setStatus('idle');
    }
  }, [sendUserMessage, status, stopSpeaking]);

  // Toggle mic button
  const handleToggleMic = () => {
    if (status === 'listening') {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setStatus('idle');
      setLiveTranscript('');
    } else {
      startListening();
    }
  };

  // Auto start speech recognition upon opening modal if mic not muted
  useEffect(() => {
    if (isOpen && !isMicMuted && status === 'idle') {
      const timer = setTimeout(() => {
        startListening();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      setStatus('idle');
      setLiveTranscript('');
    }
  }, [isOpen, stopSpeaking]);

  if (!isOpen) return null;

  const latestAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0]?.content;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 select-none"
      >
        {/* Top Control Bar */}
        <div className="w-full max-w-4xl flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
              AI
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Jobsy Voice Assistant</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 uppercase tracking-widest">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Powered by Gemini 3.8 Flash</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(prev => !prev)}
              className={`p-2.5 rounded-xl border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                showHistory 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle Transcript"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Transcript</span>
            </button>

            <button
              onClick={() => {
                setIsSpeakerMuted(prev => !prev);
                if (!isSpeakerMuted) stopSpeaking();
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isSpeakerMuted ? "Unmute Speaker" : "Mute Speaker"}
            >
              {isSpeakerMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Voice Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Visualizer & Conversation Display */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center py-6 text-center z-10 relative">
          {/* Glowing Animated Voice Orb (ChatGPT Voice Mode Style) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
            {/* Outer pulsating concentric ripples */}
            <motion.div
              animate={{
                scale: status === 'speaking' ? [1, 1.45, 1.1, 1.55, 1] :
                       status === 'listening' ? [1, 1.25, 1] : [1, 1.08, 1],
                opacity: status === 'speaking' ? [0.3, 0.6, 0.3] :
                         status === 'listening' ? [0.2, 0.5, 0.2] : [0.15, 0.25, 0.15]
              }}
              transition={{ repeat: Infinity, duration: status === 'speaking' ? 2.2 : 3, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-sky-500/30 blur-3xl pointer-events-none"
            />

            <motion.div
              animate={{
                scale: status === 'speaking' ? [1.1, 1.35, 1.1] :
                       status === 'thinking' ? [1, 1.2, 1] : [1, 1.04, 1],
                rotate: status === 'thinking' ? 360 : 0
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 2, ease: 'linear' },
                scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-emerald-500/30 bg-emerald-500/5 blur-md"
            />

            {/* Core Orb Sphere */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={handleToggleMic}
              animate={{
                scale: status === 'speaking' ? [1, 1.12, 0.98, 1.08, 1] :
                       status === 'listening' ? [1, 1.06, 1] : [1, 1.02, 1],
                boxShadow: status === 'speaking'
                  ? '0 0 80px rgba(16, 185, 129, 0.7), inset 0 0 50px rgba(56, 189, 248, 0.6)'
                  : status === 'listening'
                  ? '0 0 60px rgba(56, 189, 248, 0.6), inset 0 0 35px rgba(16, 185, 129, 0.5)'
                  : '0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 25px rgba(16, 185, 129, 0.3)'
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full cursor-pointer relative z-10 flex items-center justify-center transition-all ${
                status === 'speaking'
                  ? 'bg-gradient-to-br from-emerald-400 via-teal-300 to-sky-400'
                  : status === 'listening'
                  ? 'bg-gradient-to-br from-sky-400 via-emerald-400 to-teal-500'
                  : status === 'thinking'
                  ? 'bg-gradient-to-br from-purple-400 via-pink-400 to-emerald-400 animate-pulse'
                  : 'bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 border border-emerald-400/50'
              }`}
            >
              {status === 'thinking' ? (
                <RefreshCw className="w-10 h-10 text-white animate-spin" />
              ) : status === 'speaking' ? (
                <div className="flex items-center gap-1.5">
                  {[40, 70, 100, 60, 90, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                      transition={{ repeat: Infinity, duration: 0.6 + i * 0.15, ease: 'easeInOut' }}
                      className="w-1.5 rounded-full bg-slate-950/80"
                    />
                  ))}
                </div>
              ) : status === 'listening' ? (
                <Mic className="w-12 h-12 text-slate-950 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10 text-emerald-200" />
              )}
            </motion.div>
          </div>

          {/* Real-time Fluid Waveform Visualizer */}
          <FluidAudioVisualizer
            status={status}
            width={360}
            height={60}
            className="mb-3 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md"
          />

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`w-2.5 h-2.5 rounded-full ${
              status === 'listening' ? 'bg-sky-400 animate-ping' :
              status === 'thinking' ? 'bg-purple-400 animate-spin' :
              status === 'speaking' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
            }`} />
            <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
              {status === 'listening' ? 'Listening... Speak Now' :
               status === 'thinking' ? 'Synthesizing Guidance...' :
               status === 'speaking' ? 'Speaking...' : 'Ready · Tap Orb or Mic to Talk'}
            </span>
          </div>

          {/* Subtitles & Live Transcript */}
          <div className="min-h-[80px] max-w-xl px-4 flex flex-col items-center justify-center">
            {liveTranscript ? (
              <p className="text-base font-medium text-emerald-300 leading-relaxed font-sans italic">
                "{liveTranscript}"
              </p>
            ) : status === 'speaking' && latestAssistantMessage ? (
              <p className="text-base font-medium text-slate-100 leading-relaxed max-w-lg">
                "{latestAssistantMessage}"
              </p>
            ) : (
              <p className="text-xs text-slate-400 max-w-md">
                Try asking: "Give me a mock interview question for {contextRole || 'a Senior Software Engineer'}", or "How can I negotiate a higher equity offer?"
              </p>
            )}
          </div>

          {/* Quick Voice Prompts */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
            {QUICK_VOICE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendUserMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Voice Input Controls & Fallback Text */}
        <div className="w-full max-w-2xl z-20 space-y-3">
          <div className="flex items-center gap-3">
            {/* Big Mic Button */}
            <button
              onClick={handleToggleMic}
              className={`p-4 rounded-2xl font-bold transition-all flex items-center justify-center shadow-lg cursor-pointer ${
                status === 'listening'
                  ? 'bg-rose-500 text-white shadow-rose-500/30 animate-pulse ring-4 ring-rose-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
              }`}
              title={status === 'listening' ? 'Stop Listening' : 'Start Speaking'}
            >
              {status === 'listening' ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Stop speaking button if currently narrating */}
            {status === 'speaking' && (
              <button
                onClick={stopSpeaking}
                className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="Stop audio narration"
              >
                <Square className="w-5 h-5 fill-current" />
              </button>
            )}

            {/* Text input fallback */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textInput.trim()) {
                    sendUserMessage(textInput.trim());
                    setTextInput('');
                  }
                }}
                placeholder="Or type your career query here..."
                className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
              <button
                onClick={() => {
                  if (textInput.trim()) {
                    sendUserMessage(textInput.trim());
                    setTextInput('');
                  }
                }}
                disabled={!textInput.trim()}
                className="absolute right-2 p-2 rounded-xl text-slate-400 hover:text-emerald-400 disabled:opacity-30 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide-over Transcript Drawer */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Voice Transcript</span>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 ml-6'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-300 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-bold uppercase tracking-wider">
                        {m.role === 'user' ? 'You' : 'Jobsy Voice'}
                      </span>
                      <span>{m.timestamp}</span>
                    </div>
                    <p>{m.content}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMessages([messages[0]])}
                className="w-full py-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear Transcript
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAssistantModal;
