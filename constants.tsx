import { Question } from './types';

export interface RolePreset {
  id: string;
  label: string;
  role: string;
  resume: string;
  jobDesc: string;
}

export const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'ai-engineer',
    label: 'AI / ML Engineer',
    role: 'Staff Machine Learning Engineer',
    resume: `Alex Rivera
San Francisco, CA | (555) 321-9870 | alex.rivera@ai-engineer.dev | github.com/alexrivera-ml

SUMMARY
Senior AI/ML Engineer with 6+ years specializing in Large Language Models, PyTorch, Retrieval-Augmented Generation (RAG), and scalable model serving on Kubernetes. Proven track record architecting LLM agent systems and vector search pipelines handling 10M+ daily queries at sub-100ms latency.

EXPERIENCE
Senior AI Engineer | NeuralScale Inc. | 2022 - Present
- Architected enterprise RAG system with hybrid dense-sparse vector search, boosting document retrieval precision by 34% across 5M enterprise docs.
- Fine-tuned open-source 7B and 14B parameter models with LoRA/QLoRA on specialized domain datasets, saving $120K/yr in proprietary API inference costs.
- Reduced inference p99 latency from 420ms to 92ms utilizing vLLM, TensorRT-LLM, and speculative decoding on Nvidia H100 clusters.
- Mentored 4 junior ML engineers and instituted automated evaluation benchmarks with LLM-as-a-judge pipelines.

Machine Learning Engineer | DataPulse Labs | 2019 - 2022
- Developed computer vision and NLP pipelines with PyTorch and Transformers for automated financial document extraction with 98.2% F1 score.
- Implemented automated CI/CD for model deployment using Kubeflow, Docker, and AWS SageMaker.

EDUCATION
M.S. in Computer Science (Machine Learning Focus) | Carnegie Mellon University
B.S. in Applied Mathematics & Computer Science | UC Berkeley

SKILLS
Python, C++, PyTorch, Hugging Face, vLLM, LangChain, LlamaIndex, Qdrant, Pinecone, Docker, Kubernetes, AWS, Triton Inference Server`,
    jobDesc: `Job Title: Staff Machine Learning Engineer, Generative AI & Systems
Company: DeepMatrix AI
Location: San Francisco, CA / Hybrid
Compensation: $210,000 - $260,000 + Equity

About the Role:
We are looking for a Staff Machine Learning Engineer to drive next-generation Generative AI agent platforms. You will architect high-throughput LLM pipelines, autonomous reasoning agents, and custom fine-tuned models deployed globally.

Responsibilities:
- Lead the architecture and engineering of multi-agent LLM systems with real-time tool calling and semantic memory.
- Optimize inference throughput, KV cache utilization, and quantization strategies on modern GPU clusters.
- Design resilient evaluation frameworks for hallucination reduction, safety guardrails, and deterministic tool execution.
- Partner with product and platform teams to translate cutting-edge research into production products.

Qualifications:
- 6+ years of production software and ML engineering experience.
- Deep expertise in PyTorch, transformer architectures, tokenization, and distributed GPU training/serving.
- Strong hands-on experience with vector databases, semantic caching, and asynchronous API design.
- Track record of shipping production ML products at scale.`
  },
  {
    id: 'product-manager',
    label: 'Product Manager',
    role: 'Principal Product Manager, AI Solutions',
    resume: `Jane Doe
(555) 987-6543 | jane.doe@email.com | linkedin.com/in/jane-doe-pm

Summary
Highly analytical Principal Product Manager with 8 years in the B2B SaaS space, specializing in data analytics and machine learning workflows. Led cross-functional teams of 18+ engineers and designers to launch platforms generating $15M+ ARR within 12 months.

Experience
Senior Product Manager | Growth Solutions SaaS | 2020 - Present
- Defined product strategy and roadmap for enterprise intelligence dashboards used by 500+ Fortune 1000 organizations.
- Spearheaded adoption of predictive churn models, resulting in an 18% improvement in customer retention and $3.2M saved revenue.
- Ran 45+ customer discovery interviews and structured product telemetry in Mixpanel to prioritize sprint backlogs.

Product Manager | E-Commerce Innovations | 2017 - 2020
- Managed mobile checkout and personalization funnels, boosting conversion rate by 28% through iterative multivariate experimentation.
- Led transition to agile shape-up framework, cutting cycle time by 22%.

Education
MBA, Technology Management | Stanford University
B.S. in Economics | UC Berkeley`,
    jobDesc: `Job Title: Principal Product Manager, AI Solutions
Company: FutureTech Global

We seek a Principal Product Manager to drive the product strategy and execution of our next-generation enterprise AI platform.

Responsibilities:
- Own the end-to-end product lifecycle for machine learning features, agentic workflows, and developer APIs.
- Define market requirements, competitive moats, pricing tiers, and north-star KPIs.
- Collaborate with AI/ML research, engineering, and enterprise sales teams.

Requirements:
- 7+ years of product management experience with proven success in AI/ML SaaS products.
- Deep knowledge of data science workflows, model lifecycle, and API-first developer ecosystems.
- Proven leadership driving products from 0 to 1 and scaling to $10M+ ARR.`
  },
  {
    id: 'fullstack-dev',
    label: 'Full-Stack Developer',
    role: 'Senior Full-Stack Engineer (React / Node / Cloud)',
    resume: `David Kim
Seattle, WA | (555) 441-2309 | david.kim.dev@gmail.com | github.com/davidkim-fullstack

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 7 years architecting high-performance web applications, distributed microservices, and reactive frontend experiences. Strong mastery of TypeScript, React, Next.js, Node.js, GraphQL, PostgreSQL, and AWS.

EXPERIENCE
Senior Full-Stack Engineer | CloudNova Technologies | 2021 - Present
- Architected real-time collaborative workspace supporting 50,000+ simultaneous WebSocket connections with sub-40ms event propagation.
- Migrated monolith backend to modular microservices with Node.js, TypeScript, Docker, and Redis caching, cutting server latency by 55%.
- Implemented comprehensive CI/CD pipeline using GitHub Actions and automated end-to-end Cypress testing suite, raising test coverage to 92%.

Software Engineer | Apex Systems | 2018 - 2021
- Built responsive UI components with React, Tailwind CSS, and state management (Zustand/Redux Toolkit) for financial analytics dashboard.
- Designed REST and GraphQL APIs backed by PostgreSQL and Prisma ORM with optimized query indexing.

EDUCATION & CERTS
B.S. in Computer Science | University of Washington
AWS Certified Solutions Architect - Associate`,
    jobDesc: `Job Title: Senior Full-Stack Engineer (TypeScript, React, Distributed Systems)
Company: Vertex Cloud
Location: Remote

We are seeking a Senior Full-Stack Engineer to scale our distributed cloud monitoring application.

Requirements:
- 5+ years building production-grade web applications with modern React, TypeScript, and Node.js.
- Deep familiarity with SQL databases (PostgreSQL), schema design, query optimization, and caching with Redis.
- Experience with real-time protocols (WebSockets, Server-Sent Events) and event-driven architectures.
- Strong eye for clean frontend UI/UX, accessibility standards, and component modularity.`
  },
  {
    id: 'ui-ux-designer',
    label: 'UI / UX Designer',
    role: 'Senior Product Designer & UI/UX Lead',
    resume: `Sarah Chen
San Francisco, CA | (555) 789-2341 | sarah.chen.design@gmail.com | portfolio: sarahchen.design

PROFESSIONAL SUMMARY
Senior Product Designer & UI/UX Lead with 7+ years architecting enterprise design systems, complex data-dense SaaS dashboards, and consumer mobile applications. Deep expertise in Figma variables, token architecture, WCAG 2.1 AA compliance, and quantitative usability experimentation.

EXPERIENCE
Lead Product Designer | LatticeScale Systems | 2021 - Present
- Architected enterprise multi-brand design system in Figma adopted by 45+ engineers and designers, reducing frontend UI development time by 38%.
- Redesigned core onboarding flow and analytics dashboard, lifting user trial-to-paid conversion by 26% and increasing NPS by 18 points.
- Conducted 60+ moderated usability test sessions, translating qualitative feedback and Amplitude heatmaps into high-impact sprint backlogs.
- Established design token pipeline synchronizing Figma variables directly with Tailwind CSS tokens via GitHub Actions.

Senior UI/UX Designer | Streamline Apps | 2018 - 2021
- Led product design for mobile iOS & web financial dashboard handling $4B+ in annual transaction volume.
- Created micro-interactions, responsive auto-layout component library, and interactive prototypes with Framer and Principle.

EDUCATION & SKILLS
B.F.A. in Interaction Design | Rhode Island School of Design (RISD)
Tools: Figma, FigJam, Framer, Principle, Adobe CC, UserTesting, Amplitude, Mixpanel, HTML/CSS/Tailwind
Specialties: Design Systems, Information Architecture, Heuristic Evaluation, User Research, Accessibility (WCAG 2.1 AA)`,
    jobDesc: `Job Title: Senior Product Designer, Core Platform & Design Systems
Company: Prism Cloud
Location: San Francisco, CA / Remote

About the Role:
We are looking for a Senior Product Designer to elevate our core platform experience and scale our design system. You will bridge the gap between user delight, system architecture, and product growth metrics.

Responsibilities:
- Own end-to-end product design across complex workflows, from discovery and wireframes to pixel-perfect Figma components.
- Maintain and govern our multi-platform design system (web, desktop, mobile), establishing scalable design token architecture.
- Partner closely with engineering and product leaders to validate hypotheses through user research, prototype testing, and usability audits.
- Champion accessibility standards (WCAG 2.1 AA) and inclusive design across all interfaces.

Qualifications:
- 5+ years of product design / UI/UX experience for complex B2B SaaS or consumer products.
- Mastery of Figma (Auto-layout, Variants, Component Properties, Variables, Interactive Prototyping).
- Proven track record demonstrating quantifiable user outcomes and conversion improvements.
- Strong portfolio showcasing systems thinking, typography, interaction design, and user research.`
  }
];

export const SAMPLE_RESUME = ROLE_PRESETS[0].resume;
export const SAMPLE_JOB_DESC = ROLE_PRESETS[0].jobDesc;

export const APTITUDE_QUESTIONS: Question[] = [
  {
    questionNumber: 1,
    category: 'Quantitative',
    question: "If a train running at 72 km/h crosses a 180-meter long platform in 15 seconds, what is the length of the train in meters?",
    options: { A: "120 m", B: "140 m", C: "160 m", D: "180 m" },
    correctAnswer: "A",
    explanation: "Speed = 72 km/h = 72 * (5/18) = 20 m/s. Total distance in 15s = 20 * 15 = 300m. Train length = 300m - 180m = 120m."
  },
  {
    questionNumber: 2,
    category: 'Logic',
    question: "Find the missing term in the sequence: 4, 11, 30, 85, 248, ?",
    options: { A: "735", B: "741", C: "739", D: "744" },
    correctAnswer: "A",
    explanation: "Each number is multiplied by 3 and then has an alternating offset: 4*3 - 1 = 11; 11*3 - 3 = 30; 30*3 - 5 = 85; 85*3 - 7 = 248; 248*3 - 9 = 735."
  },
  {
    questionNumber: 3,
    category: 'Technical',
    question: "What is the worst-case time complexity of finding an element in a balanced Binary Search Tree (AVL / Red-Black) with N nodes?",
    options: { A: "O(1)", B: "O(log N)", C: "O(N)", D: "O(N log N)" },
    correctAnswer: "B",
    explanation: "Because the tree remains balanced with maximum height proportional to log2(N), the worst-case search time is guaranteed to be O(log N)."
  },
  {
    questionNumber: 4,
    category: 'Product',
    question: "A SaaS company has 10,000 active users. Monthly churn rate is 5% and monthly acquisition is 600 new users. What is the net monthly growth rate?",
    options: { A: "1.0%", B: "1.5%", C: "2.0%", D: "6.0%" },
    correctAnswer: "A",
    explanation: "5% churn of 10,000 = 500 churned. Net new users = 600 acquired - 500 lost = 100 net gain. Net growth = 100 / 10,000 = 1.0%."
  },
  {
    questionNumber: 5,
    category: 'Logic',
    question: "Statements: All algorithms are recipes. Some recipes are delicious. Conclusion I: Some algorithms are delicious. Conclusion II: All delicious things are recipes. Which is valid?",
    options: { A: "Only I follows", B: "Only II follows", C: "Neither follows", D: "Both follow" },
    correctAnswer: "C",
    explanation: "Neither follows logically. Some recipes being delicious does not prove any algorithms are delicious, nor that all delicious things are recipes."
  },
  {
    questionNumber: 6,
    category: 'Technical',
    question: "In database design, which normal form guarantees that every non-key attribute is non-transitively dependent on the primary key?",
    options: { A: "1NF", B: "2NF", C: "3NF", D: "BCNF" },
    correctAnswer: "C",
    explanation: "Third Normal Form (3NF) requires 2NF plus the elimination of transitive dependencies (non-key attributes dependent on other non-key attributes)."
  },
  {
    questionNumber: 7,
    category: 'Verbal',
    question: "Select the word most nearly opposite in meaning to 'EQUIVOCAL':",
    options: { A: "Ambiguous", B: "Unambiguous", C: "Evasive", D: "Dubious" },
    correctAnswer: "B",
    explanation: "'Equivocal' means open to more than one interpretation or deliberately ambiguous. The exact antonym is 'Unambiguous'."
  },
  {
    questionNumber: 8,
    category: 'Quantitative',
    question: "A company's cloud server cost decreases by 20% due to optimization, but workload increases by 25%. What is the net change in total cloud cost?",
    options: { A: "5% decrease", B: "No change (0%)", C: "5% increase", D: "10% increase" },
    correctAnswer: "B",
    explanation: "New Cost = (Original * 0.80) * 1.25 = Original * 1.00. The net change is exactly 0%."
  },
  {
    questionNumber: 9,
    category: 'UI/UX',
    question: "According to WCAG 2.1 Level AA guidelines, what is the minimum required contrast ratio for standard body text (below 18pt regular)?",
    options: { A: "3.0 : 1", B: "4.5 : 1", C: "7.0 : 1", D: "2.5 : 1" },
    correctAnswer: "B",
    explanation: "WCAG 2.1 Level AA mandates a minimum contrast ratio of 4.5:1 for normal body text, and 3:1 for large text (>=18pt regular or >=14pt bold)."
  },
  {
    questionNumber: 10,
    category: 'UI/UX',
    question: "Which UX law states that the time required to rapidly move to a target area is a function of the target's distance and width?",
    options: { A: "Hick's Law", B: "Miller's Law", C: "Fitts's Law", D: "Jakob's Law" },
    correctAnswer: "C",
    explanation: "Fitts's Law models human movement time: larger and closer clickable targets are significantly faster and easier for users to acquire."
  },
  {
    questionNumber: 11,
    category: 'UI/UX',
    question: "In atomic design methodology by Brad Frost, what is the correct hierarchical progression from smallest to largest?",
    options: {
      A: "Atoms -> Molecules -> Organisms -> Templates -> Pages",
      B: "Molecules -> Atoms -> Organisms -> Pages -> Templates",
      C: "Tokens -> Components -> Blocks -> Views -> Layouts",
      D: "Atoms -> Organisms -> Molecules -> Templates -> Pages"
    },
    correctAnswer: "A",
    explanation: "Brad Frost's Atomic Design progresses: Atoms (buttons, inputs) -> Molecules (form groups) -> Organisms (headers, cards) -> Templates (page skeleton) -> Pages (populated content)."
  }
];
