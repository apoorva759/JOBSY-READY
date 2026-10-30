import { 
  GroundingChunk, 
  ResumeAnalysisData, 
  RoadmapData, 
  InterviewQuestionItem,
  OutreachData,
  Question
} from "../types";

const safePost = async (url: string, body: any): Promise<any> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const rawText = await response.text();
  let json: any = null;
  try {
    json = JSON.parse(rawText);
  } catch {
    throw new Error(`Server returned non-JSON response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(json?.error || `Server request failed with status ${response.status}`);
  }

  return json;
};

/**
 * 1. ATS & Resume Match Analysis (Server Proxy)
 */
export const analyzeResumeMatch = async (
  resume: string, 
  jobDesc: string
): Promise<{ data: ResumeAnalysisData; rawText: string }> => {
  return safePost('/api/resume/match', { resume, jobDesc });
};

/**
 * 2. 12-Month Career Trajectory & Roadmap (Server Proxy)
 */
export const generateCareerRoadmap = async (
  targetRole: string
): Promise<{ data: RoadmapData; rawText: string; groundingChunks?: GroundingChunk[] }> => {
  return safePost('/api/career/roadmap', { targetRole });
};

/**
 * 3. High-Intensity Mock Interview Simulator (Server Proxy)
 */
export const generateInterviewGuide = async (
  role: string
): Promise<{ questions: InterviewQuestionItem[]; rawText: string; groundingChunks?: GroundingChunk[] }> => {
  return safePost('/api/interview/guide', { role });
};

/**
 * 4. Real-time AI Evaluation of Candidate Answer (Server Proxy)
 */
export const evaluateInterviewAnswer = async (
  question: string,
  userAnswer: string,
  role: string
): Promise<{ score: number; feedback: string; improvements: string[]; idealAnswer: string }> => {
  return safePost('/api/interview/evaluate', { question, userAnswer, role });
};

/**
 * 5. Cold Outreach & Networking Generator (Server Proxy)
 */
export const generateOutreachKit = async (
  role: string,
  targetCompany?: string,
  userHighlight?: string
): Promise<OutreachData> => {
  return safePost('/api/outreach/kit', { role, targetCompany, userHighlight });
};

/**
 * 6. Dynamic Custom Aptitude Question Generator (Server Proxy)
 */
export const generateCustomAptitudeQuestions = async (
  domainOrRole: string
): Promise<Question[]> => {
  return safePost('/api/aptitude/custom', { domainOrRole });
};
