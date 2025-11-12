export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

interface RawProject {
  id: string;
  name: string;
  description: string;
  tools: string;
  website: string;
  github?: string;
}

const rawProjects: RawProject[] = [
  {
    id: "0",
    name: "Inspire Health Care",
    description:
      "Android application that connects doctors and patients using real-time records and secure communication channels.",
    tools: "Android Studio, Java, Google Firebase, XML, Noble Covid API",
    website: "https://github.com/hanumantjain/e-healthcareproject",
    github: "https://github.com/hanumantjain/e-healthcareproject",
  },
  {
    id: "1",
    name: "The Funder's Hub",
    description:
      "Blockchain-powered funding platform that builds a secure and transparent ecosystem for founders and investors through smart contracts.",
    tools: "React, Solidity, Truffle IDE, Ethereum",
    website: "https://thefundershub.netlify.app",
    github: "https://github.com/hanumantjain/thefundershub",
  },
  {
    id: "2",
    name: "Decentrix",
    description:
      "E-commerce marketplace that focuses on ethical shopping experiences with frictionless Web3 integrations and secure payments.",
    tools: "NextJS, Solidity, WorldCoin, Moralis, Biconomy, Metamask",
    website: "https://decentrix-fe-hanumant-jains-projects.vercel.app",
    github: "https://github.com/hanumantjain/decentrix",
  },
  {
    id: "3",
    name: "Web3Verse",
    description:
      "Decentralised social media platform designed to empower users with data ownership, privacy, and transparent governance.",
    tools: "ReactJS, Solidity, Ethereum, Metamask",
    website: "https://web3verse.netlify.app",
    github: "https://github.com/hanumantjain/web3verse",
  },
  {
    id: "4",
    name: "Portfolio",
    description:
      "Personal portfolio showcasing design systems, interactive sections, and performance-optimised case studies.",
    tools: "ReactJS, TailwindCSS, ParticleJS",
    website: "https://hanumantjain.co",
    github: "https://github.com/hanumantjain/portfolio",
  },
  {
    id: "5",
    name: "Tic Tac Toe",
    description: "Interactive two-player tic tac toe experience with responsive UI and TypeScript powered game logic.",
    tools: "ReactJS, TypeScript, TailwindCSS",
    website: "https://tic-tac-toe-hanumant.netlify.app",
    github: "https://github.com/hanumantjain/tic-tac-toe",
  },
  {
    id: "6",
    name: "WallCraft Architect",
    description: "High-impact architect portfolio featuring modular layouts, project highlights, and immersive imagery.",
    tools: "React, TailwindCSS",
    website: "https://wallcreaftarchitects.netlify.app",
    github: "https://github.com/hanumantjain/wallcraft-architect",
  },
  {
    id: "7",
    name: "Green Shoes",
    description:
      "Responsive e-commerce sneaker storefront with advanced filtering, authentication, and Redux-powered cart experience.",
    tools: "React.js, Node.js, TypeScript, Redux, PostgreSQL",
    website: "https://green-shoes.vercel.app",
    github: "https://github.com/hanumantjain/green-shoes",
  },
  {
    id: "8",
    name: "MedCompass",
    description:
      "Automated post-discharge follow-up system delivering personalised voice outreach and reducing manual healthcare workloads.",
    tools: "Twilio Voice API, MongoDB Atlas, React, REST APIs, Git",
    website: "https://devpost.com/software/medcompass",
    github: "https://github.com/hanumantjain/medcompass",
  },
  {
    id: "9",
    name: "KatanBot",
    description:
      "Agentic AI assistant for the Katana DeFi network with MPC-secured wallet access, live on-chain insights, and NFT discovery.",
    tools: "Katana DeFi, MCP, OpenAI API, OpenSea API, Dynamic Authentication, Python, React, TailwindCSS",
    website: "https://katabot.netlify.app/",
    github: "https://github.com/hanumantjain/katanbot",
  },
  {
    id: "10",
    name: "GalleryAI",
    description:
      "AI-powered image gallery with image generation, image editing, and image search capabilities.",
    tools: "AWS, S3, CloudFront, API Gateway, Amazon RDS, Jenkins,Lambda, React, TypeScript, TailwindCSS",
    website: "https://galleryai.hanumantjain.tech/",
    github: "https://github.com/hanumantjain/social-hub",
  },
];

const splitTools = (tools: string): string[] =>
  tools
    .split(",")
    .map((tool) => tool.trim().replace(/\.$/, ""))
    .filter(Boolean);

export const projects: Project[] = [...rawProjects]
  .sort((a, b) => Number.parseInt(b.id, 10) - Number.parseInt(a.id, 10))
  .map(({ tools, website, ...rest }) => ({
    name: rest.name,
    description: rest.description,
    tech: splitTools(tools),
    github: rest.github,
    demo: website,
  }));
