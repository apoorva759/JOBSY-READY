import { PrepResource } from '../types';

export const PREP_RESOURCES: PrepResource[] = [
  // ==========================================
  // DSA, Striver & LeetCode (1-17)
  // ==========================================
  {
    id: 'striver-a2z',
    title: "Striver's A2Z DSA Course & Sheet",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'The golden standard step-by-step roadmap from basic math to advanced dynamic programming, graphs, and tries with video walkthroughs in C++ & Java.',
    url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    badge: 'Striver A2Z'
  },
  {
    id: 'striver-sde-sheet',
    title: "Striver's SDE Sheet (Top 190+ Interview Problems)",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'The most revered 190+ coding interview challenge sheet covering the exact questions asked in Amazon, Google, Microsoft, and Uber technical interview loops.',
    url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
    badge: 'Top Pick'
  },
  {
    id: 'striver-blind-75',
    title: "Striver's Blind 75 LeetCode Sheet",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Curated 75 high-yield coding questions with detailed video solutions and editorial code implementations.',
    url: 'https://takeuforward.org/interview-sheets/blind-75-leetcode-problems-detailed-video-solutions/',
    badge: 'High Yield'
  },
  {
    id: 'striver-dp-series',
    title: "Striver's Dynamic Programming Masterclass Series",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Master DP from 1D to 2D grids, subsequences, DP on strings, and partition DP with complete space-optimized derivations.',
    url: 'https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/',
    badge: 'DP Special'
  },
  {
    id: 'striver-graph-series',
    title: "Striver's Complete Graph Series & Sheet",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal, Disjoint Set Union (DSU), and topological sort.',
    url: 'https://takeuforward.org/graph/striver-graph-series-top-graph-interview-questions/',
    badge: 'Graphs'
  },
  {
    id: 'striver-trees-series',
    title: "Striver's Binary Trees & BST Series",
    provider: 'takeUforward (Striver)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Inorder, preorder, postorder traversals, view problems (top/bottom/left/right), LCA, and BST properties.',
    url: 'https://takeuforward.org/binary-tree/binary-tree-traversal-inorder-preorder-postorder/',
    badge: 'Trees'
  },
  {
    id: 'leetcode-top-150',
    title: 'LeetCode Top Interview 150 Study Plan',
    provider: 'LeetCode Official',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Official LeetCode collection of the 150 most essential questions grouped by algorithmic technique.',
    url: 'https://leetcode.com/studyplan/top-interview-150/',
    badge: 'Official'
  },
  {
    id: 'neetcode-150',
    title: 'NeetCode 150 & Interactive Roadmap',
    provider: 'NeetCode',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Interactive flowchart categorizing 150 canonical problems into Two Pointers, Sliding Window, Trees, and Dynamic Programming.',
    url: 'https://neetcode.io/roadmap',
    badge: 'Interactive'
  },
  {
    id: 'leetcode-sql-50',
    title: 'LeetCode Curated SQL 50 Study Plan',
    provider: 'LeetCode Official',
    category: 'DSA & LeetCode',
    roleTarget: 'All Engineering Roles',
    description: '50 essential SQL problems testing window functions (RANK, DENSE_RANK), CTEs, self-joins, and aggregations.',
    url: 'https://leetcode.com/studyplan/top-sql-50/',
    badge: 'SQL'
  },
  {
    id: 'abdul-bari-algo',
    title: 'Abdul Bari - Algorithms Masterclass',
    provider: 'Abdul Bari (YouTube)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'The world-famous animated blackboard lectures breaking down asymptotic notation, divide & conquer, and dynamic programming.',
    url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
    badge: 'Legendary'
  },
  {
    id: 'love-babbar-450',
    title: 'Love Babbar 450 DSA Cracker Sheet',
    provider: 'Love Babbar',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Topic-wise collection of 450 coding challenges covering Arrays, Matrix, Strings, Searching, Trees, and Graphs.',
    url: 'https://450dsa.com/',
    badge: '450 Sheet'
  },
  {
    id: 'kunal-dsa-bootcamp',
    title: 'Complete Java + DSA + Interview Bootcamp',
    provider: 'Kunal Kushwaha (YouTube)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: '50+ hours of open-source instruction covering Git, Java OOP, Linear/Binary Search, Math, Bitwise, and Recursion.',
    url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
    badge: 'Free Bootcamp'
  },
  {
    id: 'tech-interview-handbook',
    title: 'Tech Interview Handbook - Algorithm Cheatsheet',
    provider: 'Yangshun Tay (ex-Meta)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Practical cheat sheet on recognizing problem patterns, edge cases to watch out for, and time complexity tradeoffs.',
    url: 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/',
    badge: 'Cheat Sheet'
  },
  {
    id: 'cses-problemset',
    title: 'CSES Problem Set (Competitive Programming)',
    provider: 'CSES Finland',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'High-quality benchmark problem collection for testing algorithmic implementation accuracy and speed.',
    url: 'https://cses.fi/problemset/',
    badge: 'Benchmark'
  },
  {
    id: 'gate-smashers-cs',
    title: 'Gate Smashers - Core CS Subjects (OS, DBMS, CN)',
    provider: 'Varun Singla (Gate Smashers)',
    category: 'DSA & LeetCode',
    roleTarget: 'SDE / Software Engineer',
    description: 'Fast, clear conceptual explanations of Operating Systems, Database Management Systems, and Computer Networks.',
    url: 'https://www.youtube.com/@GateSmashers',
    badge: 'Core CS'
  },

  // ==========================================
  // Machine Learning, AI & CampusX (16-32)
  // ==========================================
  {
    id: 'campusx-100-days-ml',
    title: 'CampusX - 100 Days of Machine Learning Playlist',
    provider: 'Nitish Singh (CampusX)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Nitish Singh’s definitive, mathematically rigorous 100-day series from linear regression to gradient boosting and deployment.',
    url: 'https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLujyshP',
    badge: 'CampusX Hit'
  },
  {
    id: 'campusx-deep-learning',
    title: 'CampusX - Deep Learning & Neural Networks Playlist',
    provider: 'Nitish Singh (CampusX)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Perceptrons, forward/backward propagation calculus, vanishing gradients, CNNs, RNNs, and LSTM architectures.',
    url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxQRXtNn',
    badge: 'CampusX DL'
  },
  {
    id: 'campusx-nlp-llm',
    title: 'CampusX - NLP & Large Language Models (LLM) Masterclass',
    provider: 'Nitish Singh (CampusX)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Text preprocessing, Word2Vec, Attention Mechanisms, Transformer architecture, BERT, and GenAI implementations.',
    url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvbPRtA9OEYR9o5F13R232bQ',
    badge: 'CampusX NLP'
  },
  {
    id: 'campusx-mlops',
    title: 'CampusX - End-to-End MLOps Pipeline Course',
    provider: 'Nitish Singh (CampusX)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Model packaging, MLflow experiment tracking, DVC data versioning, Dockerization, and automated AWS/GCP pipelines.',
    url: 'https://www.youtube.com/playlist?list=PLKnIA16_Rmvb152U2t2eGfip6E3zK7y6S',
    badge: 'CampusX MLOps'
  },
  {
    id: 'campusx-notes-repo',
    title: 'CampusX Official GitHub Notes & Notebooks Repository',
    provider: 'CampusX Official',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Handwritten mathematical derivations, Jupyter notebooks, assignments, and slides for all 100 days of ML.',
    url: 'https://github.com/campusx-official',
    badge: 'Notes Repo'
  },
  {
    id: 'karpathy-nn-zero-to-hero',
    title: 'Neural Networks: Zero to Hero',
    provider: 'Andrej Karpathy (ex-Tesla AI / OpenAI)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Legendary series building micrograd, makemore, and GPT architectures from scratch using pure Python and PyTorch.',
    url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
    badge: 'Must Watch'
  },
  {
    id: 'andrew-ng-ml-spec',
    title: 'Machine Learning Specialization',
    provider: 'Andrew Ng (DeepLearning.AI / Stanford)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'The foundational ML curriculum teaching supervised learning, advanced algorithms, and practical advice on model tuning.',
    url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    badge: 'Stanford / DeepLearning.AI'
  },
  {
    id: 'fast-ai-deep-learning',
    title: 'Practical Deep Learning for Coders',
    provider: 'Fast.ai (Jeremy Howard)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Top-down, practical deep learning utilizing PyTorch and fastai to build state-of-the-art vision and text models.',
    url: 'https://course.fast.ai/',
    badge: 'Top-Down'
  },
  {
    id: 'huggingface-nlp-course',
    title: 'Hugging Face Transformers & LLM Course',
    provider: 'Hugging Face',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Official hands-on guide on tokenizers, fine-tuning pretrained models, LoRA/PEFT, and hosting on Hugging Face Hub.',
    url: 'https://huggingface.co/learn/nlp-course',
    badge: 'Official'
  },
  {
    id: 'stanford-cs229',
    title: 'Stanford CS229: Machine Learning Lecture Collection',
    provider: 'Stanford University',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Rigorous theoretical formulations covering SVMs, EM algorithm, Gaussian mixture models, and reinforcement learning.',
    url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
    badge: 'Academic'
  },
  {
    id: 'statquest-ml',
    title: 'StatQuest with Josh Starmer - Machine Learning Library',
    provider: 'Josh Starmer (StatQuest)',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Unmatched visual breakdowns of PCA, ROC/AUC, Random Forests, Gradient Boost, and Neural Networks with zero jargon.',
    url: 'https://www.youtube.com/@statquest',
    badge: 'Visual Magic'
  },
  {
    id: 'google-ml-crash-course',
    title: 'Google Machine Learning Crash Course with TensorFlow',
    provider: 'Google for Developers',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Fast-paced, practical introduction to ML with interactive exercises, loss curves, and feature engineering.',
    url: 'https://developers.google.com/machine-learning/crash-course',
    badge: 'Google'
  },
  {
    id: 'langchain-docs',
    title: 'LangChain & LlamaIndex Agentic Workflow Guides',
    provider: 'LangChain / LlamaIndex',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Architecting multi-stage RAG pipelines, vector store embeddings, semantic cache, and autonomous reasoning agents.',
    url: 'https://python.langchain.com/docs/get_started/introduction',
    badge: 'GenAI Tools'
  },
  {
    id: 'wandb-mlops',
    title: 'Weights & Biases Production ML & LLM Courses',
    provider: 'Weights & Biases',
    category: 'Machine Learning & AI',
    roleTarget: 'AI / ML Engineer',
    description: 'Training dynamics, experiment tracking, hyperparameter optimization, and LLM evaluation benchmarks.',
    url: 'https://www.wandb.courses/',
    badge: 'Production MLOps'
  },

  // ==========================================
  // System Design & Architecture (33-44)
  // ==========================================
  {
    id: 'bytebytego-alex-xu',
    title: 'ByteByteGo - Visual System Design Guides (Alex Xu)',
    provider: 'Alex Xu (ByteByteGo)',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'The premier visual architectural breakdowns of rate limiters, distributed caches, payment systems, and search engines.',
    url: 'https://bytebytego.com/',
    badge: 'Industry Standard'
  },
  {
    id: 'donne-martin-primer',
    title: 'The System Design Primer (GitHub #1 Repository)',
    provider: 'Donne Martin',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'Over 270,000 GitHub stars. Comprehensive open-source guide covering CAP theorem, microservices, CDN, caching, and SQL vs NoSQL.',
    url: 'https://github.com/donnemartin/system-design-primer',
    badge: '270k+ Stars'
  },
  {
    id: 'gaurav-sen-sysdesign',
    title: 'Gaurav Sen - System Design Masterclass (YouTube)',
    provider: 'Gaurav Sen',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'Intuitive engineering breakdowns of Consistent Hashing, Bloom Filters, Kafka, Message Queues, and Sharding.',
    url: 'https://www.youtube.com/playlist?list=PLMC9HnG_svVoUgi7yhzO5n_iZz5z_53xR',
    badge: 'Classic'
  },
  {
    id: 'ddia-martin-kleppmann',
    title: 'Designing Data-Intensive Applications (DDIA) Notes',
    provider: 'Martin Kleppmann (Cambridge)',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'The bible of distributed systems. Replicas, partitions, transactions, linearizability, and batch/stream processing.',
    url: 'https://github.com/ept/ddia-references',
    badge: 'Canonical Book'
  },
  {
    id: 'arpit-bhayani-systems',
    title: 'Arpit Bhayani - Asynchronous Systems & Internals',
    provider: 'Arpit Bhayani (ex-Google)',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'Deep dives into how Redis, PostgreSQL indexing, LSM trees, and Kafka work under the hood.',
    url: 'https://arpitbhayani.me/',
    badge: 'Deep Dives'
  },
  {
    id: 'shrayansh-jain-lld',
    title: 'Shrayansh Jain - Low Level Design (LLD) & Design Patterns',
    provider: 'Shrayansh Jain',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'Master Factory, Observer, Strategy, Decorator patterns and design Tic-Tac-Toe, Parking Lot, and Elevator systems in Java/C++.',
    url: 'https://www.youtube.com/@ShrayanshJain',
    badge: 'LLD Patterns'
  },
  {
    id: 'high-scalability-cases',
    title: 'High Scalability - Enterprise Architectural Case Studies',
    provider: 'HighScalability.com',
    category: 'System Design',
    roleTarget: 'All Engineering Roles',
    description: 'In-depth real-world architectural blueprints of WhatsApp serving billions with Erlang, Instagram scaling Python, and Netflix AWS migrations.',
    url: 'http://highscalability.com/',
    badge: 'Case Studies'
  },
  {
    id: 'microservices-patterns',
    title: 'Microservice Architecture Patterns by Chris Richardson',
    provider: 'Chris Richardson (Microservices.io)',
    category: 'System Design',
    roleTarget: 'SDE / Software Engineer',
    description: 'The definitive catalogue of Sagas, API Gateways, CQRS, Event Sourcing, and Service Mesh patterns.',
    url: 'https://microservices.io/patterns/index.html',
    badge: 'Patterns'
  },
  {
    id: 'uber-tech-blog',
    title: 'Uber Engineering Tech Blog & Architecture Archive',
    provider: 'Uber Engineering',
    category: 'System Design',
    roleTarget: 'All Engineering Roles',
    description: 'Real production post-mortems, distributed tracing systems (Jaeger), and geospatial data indexing architectures.',
    url: 'https://www.uber.com/blog/engineering/',
    badge: 'Tech Blog'
  },

  // ==========================================
  // Full-Stack Web Development (45-54)
  // ==========================================
  {
    id: 'fullstack-open',
    title: 'Full Stack Open 2024 (University of Helsinki)',
    provider: 'University of Helsinki',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'World-renowned university course teaching React, Redux, Node.js, Express, REST APIs, GraphQL, TypeScript, and CI/CD.',
    url: 'https://fullstackopen.com/en/',
    badge: 'University Level'
  },
  {
    id: 'the-odin-project',
    title: 'The Odin Project - Full Stack JavaScript Curriculum',
    provider: 'The Odin Project',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Hands-on, project-based curriculum guiding developers from HTML/CSS to advanced Node.js and PostgreSQL backends.',
    url: 'https://www.theodinproject.com/',
    badge: 'Project-Based'
  },
  {
    id: 'chai-aur-code',
    title: 'Chai aur Code - JavaScript & Backend Masterclass',
    provider: 'Hitesh Choudhary',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Hitesh Choudhary’s widely celebrated Hindi/English series on JavaScript execution contexts, React hooks, and production Node backends.',
    url: 'https://www.youtube.com/@ChaiAurCode',
    badge: 'Chai aur Code'
  },
  {
    id: 'harkirat-100xdevs',
    title: 'Harkirat Singh - 100xDevs Open Source Web Dev & DevOps',
    provider: 'Harkirat Singh',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Production web development, Next.js, WebSockets, Docker, Kubernetes, and open-source contributions.',
    url: 'https://www.youtube.com/@harkirat1',
    badge: '100xDevs'
  },
  {
    id: 'roadmap-sh',
    title: 'roadmap.sh - Community Developer Roadmaps',
    provider: 'roadmap.sh',
    category: 'Full-Stack Web Dev',
    roleTarget: 'All Engineering Roles',
    description: 'Visual step-by-step career path guides for Frontend, Backend, DevOps, AI Engineer, and Software Architect.',
    url: 'https://roadmap.sh/',
    badge: 'Visual Paths'
  },
  {
    id: 'react-dev-official',
    title: 'React.dev - Official Modern Interactive Tutorial',
    provider: 'Meta / React Team',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Thinking in React, managing state, escape hatches (useRef, useEffect), and server-side rendering paradigms.',
    url: 'https://react.dev/learn',
    badge: 'Official Docs'
  },
  {
    id: 'typescript-handbook',
    title: 'TypeScript Official Handbook & Type System Guide',
    provider: 'Microsoft',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Generics, conditional types, mapped types, keyof, template literal types, and enterprise architecture practices.',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    badge: 'Microsoft'
  },
  {
    id: 'nextjs-learn',
    title: 'Next.js Official Learn Course (App Router & Server Actions)',
    provider: 'Vercel',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Hands-on dashboard creation with Next.js App Router, streaming with Suspense, Server Actions, and Postgres.',
    url: 'https://nextjs.org/learn',
    badge: 'Vercel'
  },
  {
    id: 'tailwind-css-guide',
    title: 'Tailwind CSS Documentation & Utility Patterns',
    provider: 'Tailwind Labs',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Modern styling reference covering flex/grid math, arbitrary values, responsive breakpoints, and dark mode.',
    url: 'https://tailwindcss.com/docs',
    badge: 'Styling'
  },
  {
    id: 'freecodecamp-certifications',
    title: 'freeCodeCamp 300-Hour Certifications',
    provider: 'freeCodeCamp',
    category: 'Full-Stack Web Dev',
    roleTarget: 'Full-Stack Developer',
    description: 'Free interactive certifications covering JavaScript algorithms, backend development, and relational databases.',
    url: 'https://www.freecodecamp.org/learn',
    badge: 'Free Certs'
  },

  // ==========================================
  // DevOps, Cloud & SRE (55-60)
  // ==========================================
  {
    id: 'kunal-devops-bootcamp',
    title: 'Kunal Kushwaha - Complete DevOps Bootcamp',
    provider: 'Kunal Kushwaha (Community Classroom)',
    category: 'DevOps & Cloud',
    roleTarget: 'DevOps / Cloud',
    description: 'Git, GitHub Actions, Docker, Kubernetes, Terraform, and Prometheus/Grafana monitoring explained from zero.',
    url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnqacZsP2jGU38q1ncyvH_6j',
    badge: 'DevOps Hit'
  },
  {
    id: 'techworld-with-nana',
    title: 'TechWorld with Nana - Docker & Kubernetes Visual Guides',
    provider: 'Nana Janashia',
    category: 'DevOps & Cloud',
    roleTarget: 'DevOps / Cloud',
    description: 'Crisp, beautifully illustrated diagrams explaining pods, ReplicaSets, Services, Ingress, and ConfigMaps.',
    url: 'https://www.youtube.com/@TechWorldwithNana',
    badge: 'K8s Visual'
  },
  {
    id: 'kodekloud-devops',
    title: 'KodeKloud - Free DevOps Prerequisite Course',
    provider: 'Mumshad Mannambeth (KodeKloud)',
    category: 'DevOps & Cloud',
    roleTarget: 'DevOps / Cloud',
    description: 'Hands-on browser terminals for mastering Linux system administration, networking, YAML, and Git basics.',
    url: 'https://kodekloud.com/courses/devops-pre-requisite-course/',
    badge: 'Hands-On Labs'
  },
  {
    id: 'aws-skill-builder',
    title: 'AWS Skill Builder & Cloud Practitioner Learning Plans',
    provider: 'Amazon Web Services',
    category: 'DevOps & Cloud',
    roleTarget: 'DevOps / Cloud',
    description: 'Official free AWS modules covering EC2, S3, IAM security, VPC subnets, and CloudFormation.',
    url: 'https://explore.skillbuilder.aws/',
    badge: 'AWS Official'
  },
  {
    id: 'overthewire-bandit',
    title: 'OverTheWire Bandit - Linux Terminal Wargames',
    provider: 'OverTheWire Community',
    category: 'DevOps & Cloud',
    roleTarget: 'All Engineering Roles',
    description: 'Gamified hands-on terminal levels teaching SSH, file permissions, pipe redirection, grep, and cron jobs.',
    url: 'https://overthewire.org/wargames/bandit/',
    badge: 'Linux Wargame'
  },
  {
    id: 'milan-devops-roadmap',
    title: 'DevOps Roadmap by Milan Milanović (GitHub)',
    provider: 'Milan Milanović',
    category: 'DevOps & Cloud',
    roleTarget: 'DevOps / Cloud',
    description: 'Complete landscape diagram of modern infrastructure as code, CI/CD tools, telemetry stacks, and security protocols.',
    url: 'https://github.com/milanm/DevOps-Roadmap',
    badge: 'Architecture'
  },

  // ==========================================
  // Downloadable Cheat Sheets & Notes (61-65)
  // ==========================================
  {
    id: 'striver-sde-sheet-notes',
    title: "Striver's SDE Sheet Problem Formula & Notes",
    provider: 'Jobsy Vault (takeUforward Curriculum)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'SDE / Software Engineer',
    description: 'Curated quick-reference formulas, time complexities, and key pattern pointers for Striver’s Top 190 SDE sheet.',
    url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# Striver SDE Sheet - Core Formulas & Pattern Guide

## 1. Two Pointers & Sliding Window
- **Two Sum (Sorted)**: Left = 0, Right = N-1. If sum < target, Left++; else Right--.
- **3Sum**: Sort array. Fix index i from 0..N-3. Run Two Sum on remainder. Skip duplicates at each step: \`while (nums[i] == nums[i+1]) i++\`.
- **Sliding Window Maximum**: Use Monotonic Decreasing Deque storing indices. Front is always maximum. Pop smaller elements from back before inserting.

## 2. Dynamic Programming Patterns
- **0/1 Knapsack**: Pick vs Not Pick. Subproblem: \`dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])\`. Space optimization: reverse inner loop \`for w in W..0\`.
- **Longest Common Subsequence (LCS)**:
  - If \`s1[i] == s2[j]\`: \`1 + dp[i-1][j-1]\`
  - Else: \`max(dp[i-1][j], dp[i][j-1])\`
- **Longest Increasing Subsequence (LIS)**: O(N log N) using Binary Search (\`std::lower_bound\`) on tails array.

## 3. Binary Trees & Graphs
- **LCA (Lowest Common Ancestor)**:
  - Base case: root == null or root == p or root == q -> return root.
  - Left = LCA(root.left), Right = LCA(root.right).
  - If both non-null -> root is LCA. If one non-null -> propagate that child.
- **Dijkstra**: Priority Queue storing \`(distance, node)\`. Time: O((V+E) log V). Does not work on negative edge cycles.
- **Disjoint Set Union (DSU)**: Path compression + Rank/Size optimization -> \`O(α(N))\` near-constant time.
`
  },
  {
    id: 'campusx-ml-handwritten-notes',
    title: 'CampusX Machine Learning Mathematical Formulas & Cheat Sheet',
    provider: 'Jobsy Vault (CampusX Series)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'AI / ML Engineer',
    description: 'Handcrafted notes summarizing Linear Regression gradient descent derivations, PCA covariance matrix, and Cross-Entropy loss.',
    url: 'https://github.com/campusx-official',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# CampusX Machine Learning - Core Mathematics & Formula Sheet

## 1. Linear & Logistic Regression
- **Ordinary Least Squares (OLS)**:
  - Objective: Minimize MSE = \`(1/N) * Σ(y_i - ŷ_i)^2\`
  - Closed-form solution: \`θ = (X^T X)^(-1) X^T y\`
  - Assumptions: Linearity, Independence of errors, Homoscedasticity, Normality of residuals.
- **Logistic Regression**:
  - Sigmoid function: \`σ(z) = 1 / (1 + e^(-z))\`
  - Binary Cross-Entropy Loss (Log Loss):
    \`Loss = - (1/N) * Σ [ y_i * log(ŷ_i) + (1 - y_i) * log(1 - ŷ_i) ]\`
  - Decision Boundary: Class 1 if \`σ(w^T x + b) >= 0.5\`

## 2. Regularization & Feature Engineering
- **Ridge (L2)**: \`Loss + λ * Σ w_j^2\` -> Shrinks coefficients towards zero, handles multicollinearity.
- **Lasso (L1)**: \`Loss + λ * Σ |w_j|\` -> Drives coefficients strictly to 0 (built-in feature selection).
- **ElasticNet**: Combines L1 and L2 penalties with mix ratio \`α\`.

## 3. Tree-Based Models & Ensemble
- **Entropy**: \`H(S) = - Σ p_i * log2(p_i)\`
- **Gini Impurity**: \`Gini = 1 - Σ (p_i)^2\`
- **Random Forest**: Bagging (Bootstrap Aggregation) + random feature subspace sampling. Reduces Variance.
- **Gradient Boosting (GBDT / XGBoost)**: Sequential additive trees fitting on pseudo-residuals (negative gradient of loss). Reduces Bias.

## 4. Dimensionality Reduction (PCA)
1. Standardize features to mean = 0, std = 1.
2. Compute Covariance Matrix: \`Cov = (1/N) * X^T X\`.
3. Compute Eigenvalues and Eigenvectors: \`Cov * v = λ * v\`.
4. Project data onto top-K eigenvectors with highest variance explained.
`
  },
  {
    id: 'system-design-vault-notes',
    title: 'Ultimate System Design Architecture & Estimation Cheat Sheet',
    provider: 'Jobsy Vault (ByteByteGo & DDIA)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'SDE / Software Engineer',
    description: 'Back-of-the-envelope calculations, storage sizing numbers, latency comparison numbers, and CAP theorem trade-offs.',
    url: 'https://bytebytego.com/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# Ultimate System Design - Back-of-the-Envelope & Architecture Cheat Sheet

## 1. Latency Numbers Every Engineer Should Know
- L1 Cache Reference: 0.5 ns
- Mutex lock / unlock: 17 ns
- Main Memory (RAM) Reference: 100 ns
- Read 1 MB sequentially from RAM: 3,000 ns (3 µs)
- Read 1 MB sequentially from NVMe SSD: 1,000,000 ns (1 ms)
- Read 1 MB sequentially from Spinning Disk: 20,000,000 ns (20 ms)
- Packet Roundtrip between California and Netherlands: 150,000,000 ns (150 ms)
- **Rule of Thumb**: Disk access is 10,000x slower than RAM. Network access across continents is 150,000x slower.

## 2. Throughput & Estimation Math
- **1 Day = 86,400 seconds** (approx. 10^5 seconds for mental math).
- **Requests Per Second (RPS)**:
  - 10 Million Daily Active Users (DAU) * 10 requests/day = 100M requests/day.
  - Average QPS = \`100,000,000 / 86,400 ≈ 1,150 QPS\`.
  - Peak QPS = Average QPS * 2 to 3 = \`2,500 to 3,500 QPS\`.
- **Storage Estimation**:
  - 10M posts/day * 500 bytes metadata = 5 GB/day.
  - 5 GB * 365 = ~1.8 TB/year.
  - With 3x replication = ~5.4 TB/year.

## 3. High-Availability & Scalability Patterns
- **Consistent Hashing**: Minimizes key remapping when servers scale out. Keys and nodes mapped onto a 360-degree hash ring. Virtual nodes prevent hot spots.
- **Cache Invalidation**:
  - Cache-Aside (Lazy Loading): App reads cache first, on miss reads DB and writes to cache.
  - Write-Through: App writes to cache; cache writes synchronously to DB.
  - Write-Behind (Write-Back): App writes to cache; cache writes asynchronously in batches to DB.
- **CAP Theorem**:
  - In a distributed system with Network Partition (P), you MUST choose between Consistency (CP) or Availability (AP).
`
  },
  {
    id: 'sql-interview-notes',
    title: 'SQL & Database Indexing Interview Reference Sheet',
    provider: 'Jobsy Vault (Database Core)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'All Engineering Roles',
    description: 'Window functions (ROW_NUMBER vs RANK vs DENSE_RANK), B-Tree indexing rules, CTEs, and isolation levels.',
    url: 'https://leetcode.com/studyplan/top-sql-50/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# SQL & Database Optimization - Interview Cheat Sheet

## 1. Window Functions Demystified
- **ROW_NUMBER()**: Consecutive integers without gaps: \`1, 2, 3, 4, 5\`.
- **RANK()**: Same value gets same rank, skips subsequent rank: \`1, 2, 2, 4, 5\`.
- **DENSE_RANK()**: Same value gets same rank, NO gaps: \`1, 2, 2, 3, 4\`.
- **Syntax Pattern**:
\`\`\`sql
SELECT employee_id, department_id, salary,
  DENSE_RANK() OVER (
    PARTITION BY department_id 
    ORDER BY salary DESC
  ) as salary_rank
FROM employees;
\`\`\`

## 2. Common Table Expressions (CTEs) & Nth Highest
\`\`\`sql
WITH RankedEmployees AS (
  SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
  FROM employees
)
SELECT salary FROM RankedEmployees WHERE rnk = 2; -- 2nd highest salary
\`\`\`

## 3. B-Tree Indexing & Query Tuning
- **Leftmost Prefix Rule**: A composite index \`(A, B, C)\` can satisfy queries filtering on \`(A)\`, \`(A, B)\`, or \`(A, B, C)\`. It CANNOT satisfy queries on \`(B)\` or \`(C)\` alone.
- **SARGable Queries**: Avoid wrapping indexed columns in functions:
  - ❌ \`WHERE YEAR(created_at) = 2024\` (forces full table scan)
  - ✅ \`WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'\` (uses index range scan)
- **ACID & Isolation Levels**:
  - Read Uncommitted (Dirty reads allowed)
  - Read Committed (No dirty reads; default in PostgreSQL)
  - Repeatable Read (No non-repeatable reads; default in MySQL InnoDB)
  - Serializable (Strict serial execution, zero phantom reads)
`
  },
  {
    id: 'big-o-cheat-sheet',
    title: 'Big-O Complexity & Data Structures Matrix',
    provider: 'Jobsy Vault (Core CS)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'All Engineering Roles',
    description: 'Complete lookup matrix of time and space complexities for arrays, linked lists, binary heaps, hash tables, and sorting algorithms.',
    url: 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# Big-O Complexity & Data Structures Reference Matrix

## 1. Common Data Structures Time Complexity
| Data Structure | Average Access | Average Search | Average Insert | Average Delete | Worst Space |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) | O(N) | O(N) | O(N) | O(N) |
| **Hash Table** | N/A | O(1) | O(1) | O(1) | O(N) |
| **Singly Linked List** | O(N) | O(N) | O(1) | O(1) | O(N) |
| **Binary Search Tree** | O(log N) | O(log N) | O(log N) | O(log N) | O(N) |
| **Red-Black / AVL Tree** | O(log N) | O(log N) | O(log N) | O(log N) | O(N) |
| **Binary Heap** | O(1) peek | O(N) | O(log N) | O(log N) | O(N) |
| **Trie** | O(K) | O(K) | O(K) | O(K) | O(N * K) |

*(Where K = length of word/string)*

## 2. Sorting Algorithms Time Complexity
| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | O(N log N) | O(N log N) | O(N^2) | O(log N) | No |
| **Merge Sort** | O(N log N) | O(N log N) | O(N log N) | O(N) | Yes |
| **Heap Sort** | O(N log N) | O(N log N) | O(N log N) | O(1) | No |
| **Tim Sort (Python/Java)** | O(N) | O(N log N) | O(N log N) | O(N) | Yes |
| **Counting Sort** | O(N + K) | O(N + K) | O(N + K) | O(K) | Yes |
`
  },

  // ==========================================
  // UI/UX & Product Design (66-77)
  // ==========================================
  {
    id: 'nngroup-ux-heuristics',
    title: 'Nielsen Norman Group (NN/g) - 10 Usability Heuristics',
    provider: 'Jakob Nielsen & Don Norman (NN/g)',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'The definitive foundation of user experience evaluation: Visibility of system status, match between system and real world, user control & freedom, and error prevention.',
    url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
    badge: 'NN/g Essential'
  },
  {
    id: 'laws-of-ux',
    title: 'Laws of UX - Psychological Design Principles (Jon Yablonski)',
    provider: 'Jon Yablonski',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Interactive visual guide to key behavioral laws: Fitts’s Law, Hick’s Law, Miller’s Law, Jakob’s Law, Peak-End Rule, and Aesthetic-Usability Effect.',
    url: 'https://lawsofux.com/',
    badge: 'Must Know'
  },
  {
    id: 'refactoring-ui',
    title: 'Refactoring UI - Visual Tactics for Developers & Designers',
    provider: 'Adam Wathan & Steve Schoger (Tailwind Creators)',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Tactical design rules: starting with feature hierarchy rather than layout, picking harmonious palettes, and using spacing rather than borders.',
    url: 'https://www.refactoringui.com/',
    badge: 'Tailwind Team'
  },
  {
    id: 'design-systems-repo',
    title: 'Design Systems Repo - Enterprise Systems Showcase',
    provider: 'Design Systems Community',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Live production component guides from Shopify Polaris, Apple Human Interface Guidelines, Google Material 3, and Atlassian Design.',
    url: 'https://designsystemsrepo.com/',
    badge: 'Systems Archive'
  },
  {
    id: 'figma-official-tutorials',
    title: 'Figma Official Auto-Layout & Design Tokens Masterclass',
    provider: 'Figma Official',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Master advanced responsive auto-layout, nested component variants, interactive prototyping variables, and design token handoff.',
    url: 'https://help.figma.com/hc/en-us/categories/360002042553-Figma-design',
    badge: 'Figma Master'
  },
  {
    id: 'mobbin-design-library',
    title: 'Mobbin - Real-World Mobile & Web UI Patterns Archive',
    provider: 'Mobbin',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'The world’s largest searchable reference library of real iOS, Android, and web screens from Airbnb, Stripe, Uber, Linear, and Notion.',
    url: 'https://mobbin.com/',
    badge: 'Pattern Library'
  },
  {
    id: 'checklist-design',
    title: 'Checklist Design - UI Best Practice Checklists',
    provider: 'George Hatzi',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Comprehensive UI component checklists for Modals, Tables, Forms, Pricing Cards, Empty States, and Navigation drawers.',
    url: 'https://www.checklist.design/',
    badge: 'Checklists'
  },
  {
    id: 'mizko-design-systems',
    title: 'Mizko - Product Design & Figma System Architecture',
    provider: 'Michael Wong (Mizko)',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Hands-on architectural tutorials covering typography scales, elevation math, component variant naming, and client presentation.',
    url: 'https://www.youtube.com/@mizko',
    badge: 'Figma Architect'
  },
  {
    id: 'femke-design',
    title: 'Femke Design - Product Design & UX Case Studies',
    provider: 'Femke van Schoonhoven',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Real-world product design workflows, design critique frameworks, user testing iterations, and design portfolio presentation.',
    url: 'https://www.youtube.com/@FemkeDesign',
    badge: 'Case Studies'
  },
  {
    id: 'google-ux-certificate',
    title: 'Google UX Design Professional Certificate Curriculum',
    provider: 'Google Career Certificates',
    category: 'UI/UX & Product Design',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Foundations of UX research, empathy maps, wireframing, low/high-fidelity interactive prototypes in Figma, and usability audits.',
    url: 'https://grow.google/certificates/ux-design/',
    badge: 'Google Cert'
  },
  {
    id: 'uiux-heuristics-cheat-sheet',
    title: 'UI/UX Visual Hierarchy, Spatial Math & Accessibility Cheat Sheet',
    provider: 'Jobsy Vault (Design Constitution)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'UI/UX & Product Designer',
    description: 'WCAG AA/AAA contrast ratios, 8pt spatial grid math, button padding ratios, typography scales, and Hick’s Law optimization.',
    url: 'https://lawsofux.com/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# UI/UX Visual Hierarchy & Spatial Math Cheat Sheet

## 1. The 8-Point Spatial Grid System
- **Why 8pt?**: Most modern screen resolutions are divisible by 8 (e.g. 1920, 1440, 1280, 1024, 768, 375).
- **Spacing Scale**:
  - \`2px\` (Hairline borders & sub-pixel offsets)
  - \`4px\` (Tight icon-to-label gap, tag padding)
  - \`8px\` (Input inner padding, small gap)
  - \`12px\` (Button vertical padding)
  - \`16px\` (Card padding, default gutter)
  - \`24px\` (Section gap between related blocks)
  - \`32px\` / \`48px\` (Major section separations)
  - \`64px\`+ (Hero section breathing room)
- **Nested Border Radius Formula**:
  \`R_inner = R_outer - Padding\`
  *(e.g., if container outer radius is 24px and padding is 8px, inner child radius must be 16px to prevent optical distortion)*.

## 2. Typographic Scale & Rhythm
- **The Golden Proportion (1.25 Major Third or 1.333 Perfect Fourth)**:
  - Display / Hero: \`36px\` to \`48px\` (Bold 700 / Black 900, Line-height 1.1)
  - Section Heading (H2): \`24px\` to \`30px\` (Bold 700, Line-height 1.25)
  - Subheading (H3): \`18px\` to \`20px\` (SemiBold 600, Line-height 1.35)
  - Body Text: \`14px\` to \`16px\` (Regular 400 / Medium 500, Line-height 1.5 to 1.6)
  - Muted Metadata / Microcopy: \`11px\` to \`12px\` (Medium 500, Line-height 1.4)
- **Optimal Line Measure (Line Length)**: \`50\` to \`75\` characters per line for maximum readability. Never stretch paragraph prose to 100% full-width on widescreen monitors.

## 3. WCAG 2.1 Accessibility & Contrast Standards
- **Normal Text (< 18px or < 14px bold)**: Minimum **4.5:1** contrast ratio against background.
- **Large Text (>= 18px or >= 14px bold)**: Minimum **3.0:1** contrast ratio.
- **Interactive Controls & Graphical Objects**: Minimum **3.0:1** against adjacent colors.
- **Touch Targets**: Minimum **44px x 44px** on mobile (iOS/Android guidelines) or **40px** on desktop.
- **Color-Blind Rule**: Never communicate state by color alone. Always pair color with an explicit icon or label (e.g. Red text + Alert icon for errors).

## 4. Key Laws of UX for Interface Designers
- **Fitts’s Law**: The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target. *(Make primary actions large and placed within easy thumb/cursor reach).*
- **Hick’s Law**: The time it takes to make a decision increases with the number and complexity of choices. *(Minimize choice overload on pricing cards and navigation).*
- **Jakob’s Law**: Users spend most of their time on other sites. They expect your site to work like all the others they already know. *(Use familiar mental models: search top-right, cart top-right, logo top-left).*
- **Peak-End Rule**: People judge an experience largely based on how they felt at its peak (intense point) and at its end. *(Invest in celebratory post-action delight: confetti on test pass, clear success receipts).*
`
  },
  {
    id: 'design-tokens-cheat-sheet',
    title: 'Design Token Architecture & Component States Guide',
    provider: 'Jobsy Vault (Design Systems)',
    category: 'Cheat Sheets & Notes',
    roleTarget: 'UI/UX & Product Designer',
    description: 'Semantic color tokens (surface, text, border, status), 6 essential interactive states, and responsive design checklists.',
    url: 'https://designsystemsrepo.com/',
    badge: 'Downloadable',
    isDownloadableNotes: true,
    notesContent: `# Design Token Architecture & Interactive States Guide

## 1. Three-Tier Token Architecture
1. **Global / Primitive Tokens**: Hardcoded raw values.
   - \`color-slate-900: #0f172a\`
   - \`color-emerald-500: #10b981\`
   - \`radius-md: 8px\`
2. **Semantic / Contextual Tokens**: Describe intended purpose.
   - \`color-surface-canvas: color-slate-950 (dark) / color-white (light)\`
   - \`color-text-primary: color-slate-100 (dark) / color-slate-900 (light)\`
   - \`color-border-subtle: color-slate-800 / color-slate-200\`
3. **Component-Specific Tokens**: Scoped to specific UI modules.
   - \`button-primary-bg: color-emerald-500\`
   - \`button-primary-hover-bg: color-emerald-400\`
   - \`card-header-padding: spacing-6\`

## 2. The 6 Mandatory Interactive Component States
Every interactive control (button, input, select, card) must explicitly define:
1. **Default (Resting)**: Clean, legible baseline.
2. **Hover**: Visual elevation or subtle color shift within 150ms.
3. **Focus-Visible**: High-contrast outline or ring (\`ring-2 ring-emerald-500 ring-offset-2\`) for keyboard tab navigation.
4. **Active (Pressed)**: \`scale(0.98)\` or inset shadow indicating tactile depression.
5. **Disabled**: Reduced opacity (40-50%), \`cursor-not-allowed\`, removed pointer events.
6. **Loading / Processing**: Replaced or paired with an animated spinner or skeleton; disabled from double-clicks.

## 3. High-Converting Form UX Rules
- **Top-Aligned Labels**: Eyes scan vertically. Left-aligned labels increase cognitive scan time by 30%.
- **Single-Column Layout**: Forms laid out in a single vertical column convert 25% higher than multi-column forms.
- **Inline Validation on Blur**: Validate fields only when user leaves the field (\`onBlur\`), not while they are typing their first character.
`
  }
];

