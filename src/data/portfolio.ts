export type ProjectStatus = "LIVE SITE" | "PROJECT" | "CONCEPT";

export type Project = {
  number: string;
  name: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  details: string;
  contribution: string;
  stack: string[];
  highlights: string[];
  theme: "sentbale" | "kwe" | "jyotish" | "silvertrace" | "hpcm" | "carvista" | "drug";
  image: string;
  mark: string;
  artLabel: string;
  liveUrl: string;
  filter: "Commerce" | "Platforms" | "Concepts" | "AI & ML";
};

export const profile = {
  name: "Keshav Sharma",
  role: "Full-Stack Developer",
  secondaryRole: "Creative Technologist · AI/ML Enthusiast",
  location: "Mathura, India",
  email: "Keshavsharmacs11@gmail.com",
  githubUrl: "https://github.com/keshavsharmacs11/keshav-portfolio-cs",
  resumeUrl: "/resume/Keshav-Sharma-Resume.pdf",
  opportunities: "Open to entry-level software developer roles and project collaborations.",
  introduction:
    "I build React and Next.js web applications, connected product workflows and Python-based machine-learning projects.",
  about:
    "I build across the full stack—from responsive interfaces and application logic to Python-based machine-learning experiments. I focus on clear experiences, reliable functionality and thoughtful details.",
  education: {
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "GLA University, Mathura",
    period: "2023–2026",
    coursework: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Software Development",
      "Programming Logic",
      "Problem Solving",
    ],
  },
};

export const skillGroups = [
  {
    number: "01",
    title: "Programming",
    items: ["Python", "Java", "JavaScript (ES6+)"],
  },
  {
    number: "02",
    title: "Frontend & Web",
    items: ["React.js", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    number: "03",
    title: "Full-stack & Integration",
    items: ["REST APIs", "MongoDB", "Mongoose", "Razorpay"],
  },
  {
    number: "04",
    title: "AI / ML & Data",
    items: ["Machine Learning", "Feature Engineering", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
  },
  {
    number: "05",
    title: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Jupyter Notebook"],
  },
];

export const projects: Project[] = [
  {
    number: "01",
    name: "SENTBALE",
    category: "E-commerce · Brand experience",
    status: "LIVE SITE",
    summary: "A fragrance storefront with collection browsing, product discovery and a guided gift-building experience.",
    details:
      "The live SENTBALE storefront brings together fragrance-family discovery, product collections, product details, a multi-step gift builder, brand storytelling and a journal. The presentation is built around a premium fragrance identity and a clear path from browsing to purchase.",
    contribution: "Frontend development, responsive interface implementation and storefront integration.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    highlights: [
      "Fragrance families and product collection discovery",
      "Gift builder and shopping journey",
      "Brand story, journal and newsletter sections",
    ],
    theme: "sentbale",
    image: "/images/projects/sentbale.webp",
    mark: "S.",
    artLabel: "FRAGRANCE / COMMERCE / STORY",
    liveUrl: "https://sentbaleperfumes.com/",
    filter: "Commerce",
  },
  {
    number: "02",
    name: "KURUKSHETRA WOMEN ENTREPRENEURS",
    category: "Community · Digital platform",
    status: "LIVE SITE",
    summary: "A digital home for women entrepreneurs in Kurukshetra, bringing community stories, events and member connections together.",
    details:
      "The live KWE website introduces the community, highlights the She Leads Kurukshetra summit, shares member spotlights, presents sponsors and partners, and gives visitors clear routes to register, nominate and join the community.",
    contribution: "Frontend development, responsive design and reusable page/component implementation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    highlights: [
      "Event announcement and registration journeys",
      "Member spotlights and sponsor presentation",
      "Community story and join/contact pathways",
    ],
    theme: "kwe",
    image: "/images/projects/kwe.svg",
    mark: "KWE",
    artLabel: "COMMUNITY / EVENTS / CONNECTION",
    liveUrl: "https://kwe-website.vercel.app/",
    filter: "Platforms",
  },
  {
    number: "03",
    name: "AKSHAANSHH JYOTISH",
    category: "Full-stack · Consultation platform",
    status: "LIVE SITE",
    summary: "A consultation-first platform for astrology, numerology and tarot guidance, with service discovery and online booking journeys.",
    details:
      "The live experience presents personalized astrology, numerology and tarot services, explains the consultation process and guides visitors from choosing a service to selecting an available slot and connecting with a consultant. The underlying project also includes consultant availability management, booking validation and Razorpay payment integration.",
    contribution: "Full-stack development across consultation flows, availability management, booking validation and payment integration.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Razorpay"],
    highlights: [
      "Service discovery for astrology, numerology and tarot",
      "Consultant availability and booking workflows",
      "Server-side booking validation and online payments",
    ],
    theme: "jyotish",
    image: "/images/projects/jyotish.svg",
    mark: "AJ.",
    artLabel: "CONSULTATION / BOOKING / PAYMENTS",
    liveUrl: "https://akshaanshhjyotish.com/",
    filter: "Platforms",
  },
  {
    number: "04",
    name: "CAR VISTA",
    category: "Full-stack · Comparison platform",
    status: "PROJECT",
    summary: "A React-based car comparison application that helps users search, compare and evaluate vehicles side by side.",
    details:
      "Car Vista is a full-stack car comparison project. Users can compare multiple vehicles across pricing, mileage, specifications and features. The application also includes login/sign-up authentication, a feedback module and a responsive component-based interface.",
    contribution: "Full-stack implementation of comparison logic, authentication, feedback and responsive UI.",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3"],
    highlights: [
      "Side-by-side comparison across vehicle specifications",
      "Login/sign-up authentication and feedback module",
      "Responsive interface for desktop and mobile",
    ],
    theme: "carvista",
    image: "/images/projects/carvista.svg",
    mark: "CV.",
    artLabel: "COMPARE / EVALUATE / CHOOSE",
    liveUrl: "",
    filter: "Platforms",
  },
  {
    number: "05",
    name: "DRUG INTERACTION PREDICTION SYSTEM",
    category: "AI / ML · Predictive modeling",
    status: "PROJECT",
    summary: "A Python machine-learning prototype that analyzes medicine combinations and flags potential interactions from dataset features.",
    details:
      "This project uses Python and machine-learning techniques to analyze combinations of user-entered medicines. The workflow includes medical-dataset preprocessing and feature engineering to support interaction detection across multiple combinations. It is an academic prototype and is not validated for clinical or medication decisions.",
    contribution: "Dataset preprocessing, feature engineering and prediction-pipeline development.",
    stack: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    highlights: [
      "Medical dataset handling and preprocessing",
      "Feature engineering for interaction detection",
      "Analysis of multiple medicine combinations",
    ],
    theme: "drug",
    image: "/images/projects/drug-interaction.svg",
    mark: "DI.",
    artLabel: "DATA / FEATURES / PREDICTION",
    liveUrl: "",
    filter: "AI & ML",
  },
  {
    number: "06",
    name: "IMAGE COMPRESSION MODEL",
    category: "AI / ML · Image optimization",
    status: "PROJECT",
    summary: "A machine-learning image-compression model focused on reducing file size while preserving visual quality.",
    details:
      "The project explores machine-learning techniques for image compression. It applies feature extraction and dimensionality-reduction techniques to balance compression efficiency with output quality, with a reusable processing pipeline for image datasets.",
    contribution: "Model development, feature processing and compression-pipeline experimentation.",
    stack: ["Python", "NumPy", "Machine Learning"],
    highlights: [
      "Feature extraction and dimensionality reduction",
      "Compression-efficiency and visual-quality trade-offs",
      "Reusable image-dataset processing workflow",
    ],
    theme: "hpcm",
    image: "/images/projects/hpcm.svg",
    mark: "IC.",
    artLabel: "IMAGE / QUALITY / EFFICIENCY",
    liveUrl: "",
    filter: "AI & ML",
  },
  {
    number: "07",
    name: "SILVERTRACE",
    category: "Brand concept · Frontend experience",
    status: "CONCEPT",
    summary: "A contemporary jewellery storefront concept focused on product-led storytelling and a restrained visual identity.",
    details:
      "SILVERTRACE is a frontend and brand-experience concept for a contemporary jewellery label. The direction explores clean product presentation, minimal styling and responsive storefront layouts. A public live URL is not available yet.",
    contribution: "Frontend architecture, responsive interface implementation and visual exploration.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Minimal brand-led visual direction",
      "Product-focused presentation",
      "Responsive storefront component system",
    ],
    theme: "silvertrace",
    image: "/images/projects/silvertrace.svg",
    mark: "ST.",
    artLabel: "FORM / DETAIL / IDENTITY",
    liveUrl: "",
    filter: "Concepts",
  },
];
