import { 
  AIResponse, 
  GroundingChunk, 
  ResumeAnalysisData, 
  RoadmapData, 
  InterviewQuestionItem,
  OutreachData,
  Question
} from "../types";

/**
 * 1. ATS & Resume Match Analysis (Server Proxy)
 */
export const analyzeResumeMatch = async (
  resume: string, 
  jobDesc: string
): Promise<{ data: ResumeAnalysisData; rawText: string }> => {
  const response = await fetch('/api/resume/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jobDesc }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Resume analysis failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * 2. 12-Month Career Trajectory & Roadmap (Server Proxy)
 */
export const generateCareerRoadmap = async (
  targetRole: string
): Promise<{ data: RoadmapData; rawText: string; groundingChunks?: GroundingChunk[] }> => {
  const response = await fetch('/api/career/roadmap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Career roadmap failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * 3. High-Intensity Mock Interview Simulator (Server Proxy)
 */
export const generateInterviewGuide = async (
  role: string
): Promise<{ questions: InterviewQuestionItem[]; rawText: string; groundingChunks?: GroundingChunk[] }> => {
  const response = await fetch('/api/interview/guide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Interview guide generation failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * 4. Real-time AI Evaluation of Candidate Answer (Server Proxy)
 */
export const evaluateInterviewAnswer = async (
  question: string,
  userAnswer: string,
  role: string
): Promise<{ score: number; feedback: string; improvements: string[]; idealAnswer: string }> => {
  const response = await fetch('/api/interview/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, userAnswer, role }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Answer evaluation failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * 5. Cold Outreach & Networking Generator (Server Proxy)
 */
export const generateOutreachKit = async (
  role: string,
  targetCompany?: string,
  userHighlight?: string
): Promise<OutreachData> => {
  const response = await fetch('/api/outreach/kit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, targetCompany, userHighlight }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Outreach generation failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * 6. Dynamic Custom Aptitude Question Generator (Server Proxy)
 */
export const generateCustomAptitudeQuestions = async (
  domainOrRole: string
): Promise<Question[]> => {
  const response = await fetch('/api/aptitude/custom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domainOrRole }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Custom test generation failed with status ${response.status}`);
  }

  return response.json();
};
