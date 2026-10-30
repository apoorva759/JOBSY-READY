export type TabType = 'match' | 'roadmap' | 'aptitude' | 'interview' | 'outreach' | 'prep';

export interface PrepResource {
  id: string;
  title: string;
  provider: string;
  category: 'DSA & LeetCode' | 'Machine Learning & AI' | 'System Design' | 'Full-Stack Web Dev' | 'DevOps & Cloud' | 'UI/UX & Product Design' | 'Cheat Sheets & Notes';
  roleTarget: 'SDE / Software Engineer' | 'AI / ML Engineer' | 'Full-Stack Developer' | 'DevOps / Cloud' | 'UI/UX & Product Designer' | 'All Engineering Roles';
  description: string;
  url: string;
  badge?: string;
  isDownloadableNotes?: boolean;
  notesContent?: string;
}

export interface OptionSet {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  questionNumber: number;
  question: string;
  options: OptionSet;
  correctAnswer: keyof OptionSet;
  explanation: string;
  category?: 'Logic' | 'Verbal' | 'Quantitative' | 'Technical' | 'Product' | 'UI/UX';
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface AIResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}

export interface ResumeAnalysisData {
  matchScore: number;
  atsScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  criticalGaps: string[];
  bulletRewrites: Array<{
    original: string;
    improved: string;
    impactExplanation: string;
  }>;
  executiveSummary: string;
  hiringManagerAdvice: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  skills: string[];
  projects: string[];
  certificationsOrCourses: string[];
}

export interface RoadmapData {
  targetRole: string;
  salaryRange: string;
  timeline: RoadmapPhase[];
  keyTools: string[];
  capstoneProject: {
    title: string;
    description: string;
    techStack: string[];
  };
}

export interface InterviewQuestionItem {
  id: string;
  type: 'technical' | 'behavioral' | 'architecture';
  question: string;
  context: string;
  keyPoints: string[];
  starGuide?: string;
  trapToAvoid: string;
  idealAnswer: string;
  userAnswer?: string;
  aiEvaluation?: {
    score: number;
    feedback: string;
    improvements: string[];
  };
}

export interface OutreachData {
  hiringManagerEmail: string;
  linkedinConnectionNote: string;
  recruiterMessage: string;
  thirtySixtyNinetySummary: string;
}
