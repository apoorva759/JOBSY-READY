const SKILL_CATALOG = [
  { name: 'Python', aliases: ['python'] },
  { name: 'JavaScript', aliases: ['javascript', 'js'] },
  { name: 'TypeScript', aliases: ['typescript'] },
  { name: 'React', aliases: ['react'] },
  { name: 'Node.js', aliases: ['node.js', 'nodejs'] },
  { name: 'Next.js', aliases: ['next.js', 'nextjs'] },
  { name: 'PyTorch', aliases: ['pytorch'] },
  { name: 'TensorFlow', aliases: ['tensorflow'] },
  { name: 'Kubernetes', aliases: ['kubernetes', 'k8s'] },
  { name: 'Docker', aliases: ['docker'] },
  { name: 'AWS', aliases: ['aws', 'amazon web services'] },
  { name: 'GCP', aliases: ['gcp', 'google cloud'] },
  { name: 'Azure', aliases: ['azure'] },
  { name: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
  { name: 'MongoDB', aliases: ['mongodb'] },
  { name: 'Redis', aliases: ['redis'] },
  { name: 'Kafka', aliases: ['kafka'] },
  { name: 'GraphQL', aliases: ['graphql'] },
  { name: 'REST APIs', aliases: ['rest api', 'rest apis'] },
  { name: 'System Design', aliases: ['system design'] },
  { name: 'CI/CD', aliases: ['ci/cd', 'continuous integration', 'continuous delivery'] },
  { name: 'Microservices', aliases: ['microservices'] },
  { name: 'Large Language Models', aliases: ['large language model', 'large language models', 'llm', 'llms'] },
  { name: 'RAG', aliases: ['rag', 'retrieval augmented generation'] },
  { name: 'Machine Learning', aliases: ['machine learning', 'ml'] },
  { name: 'SQL', aliases: ['sql'] },
  { name: 'Agile', aliases: ['agile'] },
  { name: 'Scrum', aliases: ['scrum'] },
  { name: 'DevOps', aliases: ['devops'] },
  { name: 'Terraform', aliases: ['terraform'] },
  { name: 'Golang', aliases: ['golang', 'go language'] },
  { name: 'Rust', aliases: ['rust'] },
  { name: 'C++', aliases: ['c++'] },
  { name: 'Distributed Systems', aliases: ['distributed system', 'distributed systems'] },
  { name: 'Tailwind CSS', aliases: ['tailwind css', 'tailwind'] },
  { name: 'Webpack', aliases: ['webpack'] },
  { name: 'Prometheus', aliases: ['prometheus'] },
  { name: 'Grafana', aliases: ['grafana'] },
  { name: 'Figma', aliases: ['figma'] },
  { name: 'Design Systems', aliases: ['design system', 'design systems'] },
  { name: 'Design Tokens', aliases: ['design token', 'design tokens'] },
  { name: 'User Research', aliases: ['user research'] },
  { name: 'Usability Testing', aliases: ['usability testing'] },
  { name: 'Wireframing', aliases: ['wireframing'] },
  { name: 'Prototyping', aliases: ['prototyping'] },
  { name: 'WCAG', aliases: ['wcag'] },
  { name: 'Information Architecture', aliases: ['information architecture'] },
  { name: 'Interaction Design', aliases: ['interaction design'] },
  { name: 'Transformer Architecture', aliases: ['transformer architecture', 'transformer architectures', 'transformers'] },
  { name: 'Tokenization', aliases: ['tokenization', 'tokenizer'] },
  { name: 'Vector Databases', aliases: ['vector database', 'vector databases', 'qdrant', 'pinecone', 'weaviate'] },
  { name: 'Vector Search', aliases: ['vector search'] },
  { name: 'GPU Training and Serving', aliases: ['gpu training', 'gpu serving', 'gpu clusters'] },
  { name: 'Inference Optimization', aliases: ['inference', 'inference optimization', 'model inference'] },
  { name: 'Fine-tuning', aliases: ['fine-tuning', 'fine tuning', 'fine-tuned'] },
  { name: 'Semantic Caching', aliases: ['semantic caching', 'semantic cache'] },
  { name: 'API Design', aliases: ['api design', 'asynchronous api', 'async api'] },
  { name: 'Multi-agent Systems', aliases: ['multi-agent', 'multi agent', 'agent systems'] },
  { name: 'Model Serving', aliases: ['model serving', 'serving models'] }
];

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').replace(/\s+/g, ' ').trim();

const containsAlias = (text: string, alias: string) => {
  const normalizedText = ' ' + normalize(text) + ' ';
  const normalizedAlias = normalize(alias);
  return normalizedAlias.length > 0 && normalizedText.includes(' ' + normalizedAlias + ' ');
};

const countOccurrences = (text: string, pattern: RegExp) => (text.match(pattern) || []).length;

const getBullets = (resume: string) => {
  const lines = resume.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const explicitBullets = lines
    .filter((line) => /^[-*•]\s+/.test(line))
    .map((line) => line.replace(/^[-*•]\s+/, '').trim())
    .filter((line) => line.length > 20);
  if (explicitBullets.length > 0) return explicitBullets.slice(0, 3);

  return lines
    .filter((line) => line.length > 55 && !/^(summary|experience|education|skills|projects|contact)\b/i.test(line))
    .slice(0, 2);
};

const GERUND_FORMS: Record<string, string> = {
  architected: 'architecting', designed: 'designing', built: 'building',
  developed: 'developing', implemented: 'implementing', 'fine-tuned': 'fine-tuning',
  reduced: 'reducing', improved: 'improving', increased: 'increasing',
  created: 'creating', automated: 'automating', optimized: 'optimizing',
  led: 'leading', launched: 'launching', mentored: 'mentoring',
  delivered: 'delivering', deployed: 'deploying', integrated: 'integrating',
  saved: 'saving', managed: 'managing', established: 'establishing',
  migrated: 'migrating', maintained: 'maintaining', drove: 'driving',
  boosted: 'boosting', raised: 'raising', cut: 'cutting', authored: 'authoring'
};

const rewriteBullet = (original: string) => {
  const sentence = original.trim().replace(/[.!?]+$/, '');
  const outcome = sentence.match(/^(.*?),\s*(boosting|increasing|improving|raising|reducing|cutting|saving|accelerating|growing|driving)\s+(.+)$/i);
  if (outcome) {
    const initiative = outcome[1].trim();
    const firstSpace = initiative.indexOf(' ');
    const firstVerb = firstSpace < 0 ? initiative : initiative.slice(0, firstSpace);
    const remainder = firstSpace < 0 ? '' : initiative.slice(firstSpace + 1);
    const gerund = GERUND_FORMS[firstVerb.toLowerCase()];
    const byPhrase = gerund ? gerund + (remainder ? ' ' + remainder : '') : 'delivering ' + initiative;
    const outcomeVerb: Record<string, string> = {
      boosting: 'Improved', increasing: 'Increased', improving: 'Improved',
      raising: 'Raised', reducing: 'Reduced', cutting: 'Cut', saving: 'Saved',
      accelerating: 'Accelerated', growing: 'Grew', driving: 'Drove'
    };
    return outcomeVerb[outcome[2].toLowerCase()] + ' ' + outcome[3].trim() + ' by ' + byPhrase + '.';
  }

  const impactFirst = sentence.match(/^(reduced|improved|increased|saved|raised|cut|grew|drove|delivered)\s+(.+?)\s+(?:using|utilizing|with|through)\s+(.+)$/i);
  if (impactFirst) {
    return impactFirst[1][0].toUpperCase() + impactFirst[1].slice(1) + ' ' + impactFirst[2].trim() + ' by using ' + impactFirst[3].trim() + '.';
  }

  return sentence + '.';
};

const readBody = async (req: any) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : typeof req.body === 'string' ? req.body : '';
  if (!raw && req[Symbol.asyncIterator]) {
    for await (const chunk of req) {
      raw += Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
      if (raw.length > 1000000) throw new Error('Request body is too large.');
    }
  }
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const body = await readBody(req);
    const resume = typeof body.resume === 'string' ? body.resume.trim() : '';
    const jobDesc = typeof body.jobDesc === 'string' ? body.jobDesc.trim() : '';

    if (!resume || !jobDesc) {
      return res.status(400).json({ error: 'Both resume and job description are required.' });
    }
    if (resume.length > 50000 || jobDesc.length > 50000) {
      return res.status(413).json({ error: 'Resume and job description must each be 50,000 characters or less.' });
    }

    const required = SKILL_CATALOG.filter((skill) =>
      skill.aliases.some((alias) => containsAlias(jobDesc, alias))
    );
    const matched = required.filter((skill) =>
      skill.aliases.some((alias) => containsAlias(resume, alias))
    );
    const missing = required.filter((skill) => !matched.includes(skill));
    const matchScore = required.length
      ? Math.round((matched.length / required.length) * 100)
      : 50;

    const sectionNames = ['summary', 'experience', 'education', 'skills', 'projects'];
    const sectionsFound = sectionNames.filter((name) => containsAlias(resume, name)).length;
    const structureScore = sectionsFound / sectionNames.length;
    const atsScore = required.length
      ? Math.round(matchScore * 0.8 + structureScore * 20)
      : Math.round(35 + structureScore * 35);

    const bullets = getBullets(resume);
    const quantifiedBullets = bullets.filter((bullet) =>
      /\d|%|\$/.test(bullet)
    ).length;
    const matchedNames = matched.map((skill) => skill.name);
    const missingNames = missing.map((skill) => skill.name);

    const strengths = [];
    strengths.push(
      required.length
        ? 'Found ' + matched.length + ' of ' + required.length + ' recognized job-skill keywords in both texts.'
        : 'Resume and job description were scanned; add role-specific technical skills for a more useful keyword comparison.'
    );
    if (quantifiedBullets > 0) {
      strengths.push('Found quantified outcomes in ' + quantifiedBullets + ' resume bullet(s).');
    } else {
      strengths.push('Resume section structure was checked for ATS readability.');
    }

    const criticalGaps = [];
    if (missingNames.length > 0) {
      criticalGaps.push('If accurate for your experience, add evidence for: ' + missingNames.slice(0, 5).join(', ') + '.');
    } else if (required.length > 0) {
      criticalGaps.push('The local keyword scan found each recognized job skill; verify that your resume shows concrete examples for them.');
    } else {
      criticalGaps.push('The local keyword catalog did not recognize specific role skills; compare the posting manually and add only skills you can substantiate.');
    }
    if (quantifiedBullets === 0) {
      criticalGaps.push('Add measurable outcomes to experience bullets where you can verify the numbers.');
    } else {
      criticalGaps.push('Keep every metric tied to a result you can explain in an interview.');
    }

    const bulletRewrites = bullets.slice(0, 2).map((original) => ({
      original,
      improved: rewriteBullet(original),
      impactExplanation: /\d|%|\$/.test(original)
        ? 'Reordered the verified result and action for faster recruiter scanning; no new numbers were added.'
        : 'Kept the original claim intact. Add a measurable result only if you can verify it.'
    }));

    const roleMatch = jobDesc.match(/(?:job title|target role|role)\s*:\s*([^\r\n]+)/i);
    const role = roleMatch ? roleMatch[1].trim() : 'target role';
    const executiveSummary = required.length
      ? 'This local keyword scan found ' + matched.length + ' of ' + required.length + ' recognized skills (' + matchScore + '% keyword overlap) for the ' + role + '. Scores reflect keyword and section matching, not a hiring decision.'
      : 'The local scanner completed, but found no recognized skill terms in the job description. Review the posting manually and tailor the resume to its verified requirements.';
    const hiringManagerAdvice = missingNames.length
      ? 'Lead with the skills already demonstrated in your resume. Address missing requirements only with truthful examples, and keep measurable outcomes tied to results you can verify.'
      : 'Lead with your strongest role-specific achievement, explain the measurable result, and connect it to the target role using examples you can verify.';

    return res.status(200).json({
      data: {
        matchScore,
        atsScore,
        matchedSkills: matchedNames,
        missingSkills: missingNames,
        strengths,
        criticalGaps,
        bulletRewrites,
        executiveSummary,
        hiringManagerAdvice
      },
      rawText: 'Local ATS keyword analysis completed.'
    });
  } catch (error: any) {
    const message = error instanceof SyntaxError
      ? 'Request body must be valid JSON.'
      : 'Unable to read the ATS request.';
    return res.status(400).json({ error: message });
  }
}
