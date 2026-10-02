// All site content lives here. Sources: Hanumant_Jain_Resume.pdf and hanumantj.netlify.app.

export const profile = {
  name: 'Hanumant Jain',
  handle: 'hanumant',
  brand: 'hanumant_jain',
  role: 'Software Developer | Full-Stack Engineer',
  location: 'Pune, Maharashtra, India',
  email: 'hanumantj17@gmail.com',
  github: 'https://github.com/hanumantjain',
  linkedin: 'https://www.linkedin.com/in/hanumant-jain/',
  resume: '/Hanumant_Jain_Resume.pdf',
  status: 'OPEN TO OPPORTUNITIES',
  // ‑ is a non-breaking hyphen so "cloud-native" never splits across lines.
  headline: 'Building scalable web apps & cloud‑native services.',
  summary:
    'Full-stack engineer with 2+ years shipping React, Node.js, TypeScript, Python/FastAPI and AWS systems — from backends serving 5K+ daily requests to CI/CD pipelines that cut deploy time by 40%.',
}

export const heroStats = [
  { value: '2+', unit: 'yrs', label: 'Professional experience' },
  { value: '5K+', unit: '', label: 'Daily requests served' },
  { value: '30', unit: '%', label: 'Faster API responses' },
  { value: '2×', unit: '', label: 'Hackathon winner' },
]

export type Accent = 'primary' | 'secondary' | 'tertiary'

export const pillars: {
  icon: 'cloud' | 'api' | 'gauge' | 'pipeline'
  tag: string
  title: string
  body: string
  metricLabel: string
  metric: string
  accent: Accent
}[] = [
  {
    icon: 'cloud',
    tag: 'AWS',
    title: 'Cloud-Native Services',
    body: 'Serverless and containerised backends on Lambda, ECS, S3, RDS and API Gateway, with CloudWatch monitoring and logging built in.',
    metricLabel: 'DAILY LOAD',
    metric: '5K+ requests',
    accent: 'primary',
  },
  {
    icon: 'api',
    tag: 'REST',
    title: 'APIs & Integrations',
    body: 'RESTful APIs for frontend–backend communication and business workflows, plus 10+ third-party integrations for secure data exchange.',
    metricLabel: 'INTEGRATIONS',
    metric: '10+ APIs',
    accent: 'tertiary',
  },
  {
    icon: 'gauge',
    tag: 'PERF',
    title: 'Performance Tuning',
    body: 'API profiling and bottleneck analysis on the backend; reusable components and rendering optimisation in React on the frontend.',
    metricLabel: 'RESPONSE TIME',
    metric: '−30% avg',
    accent: 'secondary',
  },
  {
    icon: 'pipeline',
    tag: 'CI/CD',
    title: 'Delivery Pipelines',
    body: 'Automated Jenkins and GitHub Actions pipelines supporting bi-weekly production releases with consistent, low-touch deploys.',
    metricLabel: 'DEPLOY TIME',
    metric: '−40%',
    accent: 'primary',
  },
]

export type Category = 'ai' | 'web3' | 'cloud' | 'frontend' | 'mobile'

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'ALL PROJECTS' },
  { id: 'cloud', label: 'CLOUD & FULL-STACK' },
  { id: 'ai', label: 'AI & AGENTS' },
  { id: 'web3', label: 'WEB3 & BLOCKCHAIN' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'mobile', label: 'MOBILE' },
]

export type Project = {
  name: string
  kind: string
  description: string
  highlights?: string[]
  tech: string[]
  categories: Category[]
  github?: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'GalleryAI',
    kind: 'Full-Stack Social Media Platform',
    description:
      'AI-powered image platform with generation, editing and search — a scalable social media app built on React, FastAPI and a serverless AWS backend.',
    highlights: [
      '1,000+ users and 10,000+ media uploads',
      '~40% faster via optimisation and CloudFront distribution',
      'FastAPI on Lambda + API Gateway, CloudWatch logging',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS Lambda', 'API Gateway', 'CloudFront', 'Jenkins'],
    categories: ['cloud', 'ai'],
    github: 'https://github.com/hanumantjain/social-hub',
    demo: 'https://galleryai.hanumantjain.tech/',
    featured: true,
  },
  {
    name: 'AgentBounty',
    kind: 'AI & Blockchain Agent',
    description:
      'Autonomous Node.js agent that discovers on-chain bounties, decides what it can afford, pays for live data and submits answers on-chain.',
    highlights: [
      'Spending limits resolved via ENSv2',
      'Pays for live blockchain data over Hedera x402',
      'Dual-verified OpenAI verdicts on Graph subgraph data',
    ],
    tech: ['Node.js', 'OpenAI', 'Hedera x402', 'ENSv2', 'The Graph'],
    categories: ['ai', 'web3'],
    github: 'https://github.com/hanumantjain/agent-bounty',
    demo: 'https://agent-bounty-khaki.vercel.app',
    featured: true,
  },
  {
    name: 'KatanBot',
    kind: 'Agentic DeFi Assistant',
    description:
      'Agentic AI assistant for the Katana DeFi network with MPC-secured wallet access, live on-chain insights, and NFT discovery.',
    tech: ['Python', 'React', 'MCP', 'OpenAI API', 'OpenSea API', 'Katana DeFi', 'Tailwind CSS'],
    categories: ['ai', 'web3'],
    github: 'https://github.com/hanumantjain/katanbot',
    demo: 'https://katabot.netlify.app/',
    featured: true,
  },
  {
    name: 'MedCompass',
    kind: 'Healthcare Automation',
    description:
      'Automated post-discharge follow-up system delivering personalised voice outreach and reducing manual healthcare workloads.',
    tech: ['React', 'Twilio Voice API', 'MongoDB Atlas', 'REST APIs'],
    categories: ['cloud', 'ai'],
    github: 'https://github.com/hanumantjain/medcompass',
    demo: 'https://devpost.com/software/medcompass',
  },
  {
    name: 'Green Shoes',
    kind: 'E-commerce Storefront',
    description:
      'Responsive sneaker storefront with advanced filtering, authentication, and a Redux-powered cart experience.',
    tech: ['React', 'Node.js', 'TypeScript', 'Redux', 'PostgreSQL'],
    categories: ['cloud', 'frontend'],
    github: 'https://github.com/hanumantjain/green-shoes',
    demo: 'https://green-shoes.vercel.app',
  },
  {
    name: 'Decentrix',
    kind: 'Web3 Marketplace',
    description:
      'E-commerce marketplace focused on ethical shopping, with frictionless Web3 integrations and secure payments.',
    tech: ['Next.js', 'Solidity', 'WorldCoin', 'Moralis', 'Biconomy', 'MetaMask'],
    categories: ['web3'],
    github: 'https://github.com/hanumantjain/decentrix',
    demo: 'https://decentrix-fe-hanumant-jains-projects.vercel.app',
  },
  {
    name: "The Funder's Hub",
    kind: 'Blockchain Funding Platform',
    description:
      'Blockchain-powered funding platform that builds a secure, transparent ecosystem for founders and investors through smart contracts.',
    tech: ['React', 'Solidity', 'Truffle', 'Ethereum'],
    categories: ['web3'],
    github: 'https://github.com/hanumantjain/thefundershub',
    demo: 'https://thefundershub.netlify.app',
  },
  {
    name: 'Web3Verse',
    kind: 'Decentralised Social Network',
    description:
      'Decentralised social media platform designed to give users data ownership, privacy, and transparent governance.',
    tech: ['React', 'Solidity', 'Ethereum', 'MetaMask'],
    categories: ['web3'],
    github: 'https://github.com/hanumantjain/web3verse',
    demo: 'https://web3verse.netlify.app',
  },
  {
    name: 'WallCraft Architect',
    kind: 'Studio Portfolio Site',
    description:
      'High-impact architecture studio portfolio featuring modular layouts, project highlights, and immersive imagery.',
    tech: ['React', 'Tailwind CSS'],
    categories: ['frontend'],
    github: 'https://github.com/hanumantjain/wallcraft-architect',
    demo: 'https://wallcreaftarchitects.netlify.app',
  },
  {
    name: 'Tic Tac Toe',
    kind: 'Browser Game',
    description: 'Interactive two-player tic tac toe with a responsive UI and TypeScript-powered game logic.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    categories: ['frontend'],
    github: 'https://github.com/hanumantjain/tic-tac-toe',
    demo: 'https://tic-tac-toe-hanumant.netlify.app',
  },
  {
    name: 'Inspire Health Care',
    kind: 'Android App',
    description:
      'Android application connecting doctors and patients through real-time records and secure communication channels.',
    tech: ['Java', 'Android Studio', 'Firebase', 'XML', 'Novel COVID API'],
    categories: ['mobile'],
    github: 'https://github.com/hanumantjain/e-healthcareproject',
  },
]

export const experience = [
  {
    company: 'IBM',
    role: 'Software Developer',
    period: 'Jun 2025 — Oct 2026',
    location: 'Pune, Maharashtra',
    summary:
      'Built and maintained scalable backend services and React frontends on AWS, owning performance, CI/CD and production reliability.',
    metrics: [
      { label: 'API_RESPONSE_TIME', value: '−30%', note: 'API profiling and application-level optimisation.' },
      { label: 'DEPLOY_TIME', value: '−40%', note: 'Automated Jenkins CI/CD for bi-weekly releases.' },
    ],
    points: [
      'Node.js, TypeScript and AWS Lambda services supporting 5K+ daily requests.',
      'Reusable React components that improved frontend load performance by ~25%.',
      'Integrated Lambda, ECS, S3, RDS, API Gateway and CloudWatch for scalable infra and monitoring.',
    ],
    tech: ['Node.js', 'TypeScript', 'React', 'AWS Lambda', 'ECS', 'RDS', 'Jenkins', 'CloudWatch'],
    accent: 'primary' as Accent,
  },
  {
    company: 'George Washington University',
    role: 'Student Project Assistant III',
    period: 'Mar 2025 — May 2025',
    location: 'Washington, DC',
    summary:
      'Developed full-stack web applications for enterprise-oriented use cases with a focus on maintainable, modular architecture.',
    metrics: [
      { label: 'PERFORMANCE', value: '+20%', note: 'Optimised frontend–backend interactions.' },
      { label: 'CONCURRENCY', value: '500+', note: 'Concurrent users supported.' },
    ],
    points: [
      'React, TypeScript and REST API applications built from modular components.',
      'Automated deploys with GitHub Actions for consistent, low-effort releases.',
      'Logging and monitoring for proactive troubleshooting of runtime issues.',
    ],
    tech: ['React', 'TypeScript', 'REST APIs', 'GitHub Actions'],
    accent: 'secondary' as Accent,
  },
  {
    company: 'Accenture',
    role: 'Software Developer',
    period: 'Aug 2022 — Aug 2023',
    location: 'Pune, Maharashtra',
    summary:
      'Built backend modules and API integration workflows for enterprise applications in an Agile/Scrum team.',
    metrics: [
      { label: 'MANUAL_EFFORT', value: '−30%+', note: 'Automated repetitive business workflows.' },
      { label: 'PROD_ISSUES', value: '50+', note: 'Resolved via debugging and root-cause analysis.' },
    ],
    points: [
      'Integrated 10+ third-party APIs for secure, reliable data exchange.',
      'Improved stability by finding and fixing performance and functional issues.',
    ],
    tech: ['Backend APIs', 'API Integration', 'SQL', 'Agile / Scrum'],
    accent: 'tertiary' as Accent,
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'LANGUAGES', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { group: 'FRONTEND', items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'Responsive Web'] },
  { group: 'BACKEND', items: ['Node.js', 'FastAPI', 'REST APIs', 'Microservices', 'Third-Party APIs'] },
  {
    group: 'AWS_&_CLOUD',
    items: ['Lambda', 'ECS', 'S3', 'RDS', 'API Gateway', 'CloudFront', 'CloudWatch'],
  },
  { group: 'DEVOPS_&_TOOLS', items: ['Docker', 'Jenkins', 'GitHub Actions', 'Git', 'Linux', 'CI/CD'] },
  { group: 'DATABASES', items: ['PostgreSQL', 'MySQL'] },
  { group: 'AI_&_WEB3', items: ['OpenAI', 'AI Agents', 'MCP', 'Solidity', 'Ethereum', 'The Graph'] },
  { group: 'PRACTICES', items: ['Agile', 'Scrum', 'Code Review', 'SDLC', 'Monitoring & Logging'] },
]

export const education = [
  {
    school: 'The George Washington University',
    degree: 'M.S. in Computer Science',
    period: 'Aug 2023 — May 2025',
    location: 'Washington, DC',
  },
  {
    school: 'Savitribai Phule Pune University',
    degree: 'B.E. in Computer Engineering',
    period: 'Aug 2018 — Aug 2022',
    location: 'Pune, India',
  },
]

export const achievements = [
  { title: 'Winner — Katana Forge Dev Track', event: 'ETHGlobal ETHNewYork 2025' },
  { title: 'Winner — Entrepreneur Category', event: 'HackPSU 2025' },
]
