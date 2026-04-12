/**
 * Projects Data
 * ─────────────────────────────────────────────────────────────────────────────
 * To ADD a project: copy an object, increment id, fill all fields.
 * To EDIT: change values here — UI renders dynamically.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ⚡ AFTER DEPLOYMENT — update project id:4 links:
 *   github: "https://github.com/Akshat-Aggarwal21/akshat-portfolio"
 *   demo:   "https://akshat-portfolio.vercel.app"
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projects = [
  {
    id: 1,
    title: "AI Weather Prediction",
    subtitle: "Spatial Intelligence System",
    description:
      "Tackled the challenge of reliable weather forecasting by analyzing 15+ years of spatial and temporal data. Evaluated GRU, LSTM, and CNN-LSTM architectures, selecting the optimal model via error trend analysis.",
    tech: ["Python", "TensorFlow", "GRU", "LSTM", "CNN-LSTM", "NumPy", "Matplotlib"],
    category: "Machine Learning",
    period: "Jan 2025 – Apr 2025",
    highlights: [
      "15+ years of spatial data analyzed",
      "3 deep learning architectures evaluated",
      "Interactive visualizations built",
      "Optimal model via error trend analysis",
    ],
    color: "#c8ff00",
    featured: true,
    github: "https://github.com/Akshat-Aggarwal21",
    demo: null,
    modal: {
      problem:
        "Weather forecasting in data-sparse regions suffers from high prediction variance due to poor model-architecture fit. Existing off-the-shelf models fail to account for spatial correlation across grid points over long temporal windows.",
      approach:
        "Built a full preprocessing pipeline to clean and normalize 15+ years of multi-variable spatial data (temperature, humidity, pressure, wind). Implemented and benchmarked GRU, LSTM, and CNN-LSTM under identical conditions. Used MAE/RMSE error-trend analysis to select the most consistent architecture. Designed interactive visualizations so non-technical stakeholders could interpret output without domain expertise.",
      results: [
        "Reduced forecast variability by selecting CNN-LSTM as optimal architecture",
        "Processed 15+ years of multi-variable spatial datasets",
        "3 architectures benchmarked under identical training conditions",
        "Interactive output dashboard for non-technical users",
        "Modular pipeline — swap model architecture in one config change",
      ],
      architecture:
        "CNN-LSTM: Convolutional layers extract local spatial features per time step; LSTM layers model temporal dependencies across the sequence. This hybrid outperformed pure-sequence models on spatial weather data.",
      learnings:
        "Spatial data requires architectural inductive bias — pure sequence models underfit the spatial correlation structure. The CNN-LSTM hybrid matched the data geometry better than vanilla LSTM or GRU.",
    },
  },
  {
    id: 2,
    title: "Sign Language Interpreter",
    subtitle: "Real-Time Accessibility Tool",
    description:
      "Built a real-time sign-to-speech and speech-to-sign system to bridge the communication gap for the hearing impaired. Achieved 98% validation accuracy at ~25 FPS through iterative augmentation and refinement.",
    tech: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "NumPy"],
    category: "Computer Vision",
    period: "Aug 2023 – Oct 2023",
    highlights: [
      "98% validation accuracy",
      "Real-time at ~25 FPS",
      "~5,000 gesture samples augmented",
      "Bidirectional sign ↔ speech",
    ],
    color: "#ff4d4d",
    featured: true,
    github: "https://github.com/Akshat-Aggarwal21",
    demo: null,
    modal: {
      problem:
        "Real-time sign language recognition is constrained by class imbalance in gesture datasets and the latency requirements of live inference. Most existing tools are offline or require specialized hardware.",
      approach:
        "Collected and augmented ~5,000 gesture samples using rotation, flipping, and brightness jitter to resolve class imbalance. Used MediaPipe for hand landmark extraction as preprocessing, feeding normalized keypoints into a TensorFlow classifier — eliminating raw pixel input for faster, more robust inference. Validated end-to-end through live testing sessions.",
      results: [
        "98% validation accuracy on test set",
        "~25 FPS real-time inference on standard hardware",
        "~5,000 samples cleaned and augmented",
        "Bidirectional: sign-to-speech AND speech-to-sign",
        "Runs without specialized hardware",
      ],
      architecture:
        "MediaPipe extracts 21 hand landmarks per frame → keypoints normalized and flattened → fed into a dense TensorFlow classifier. Landmark-based input is rotation/scale invariant and ~100× smaller than raw pixel input, enabling 25 FPS on CPU.",
      learnings:
        "Switching from raw image input to landmark keypoints was the single biggest performance unlock — it solved inference speed and training data efficiency simultaneously.",
    },
  },
  {
    id: 3,
    title: "Music Recommendation Engine",
    subtitle: "Mood-Aware Personalization",
    description:
      "Developed a sentiment-driven recommendation system that personalizes music suggestions based on user mood signals. Outperformed baseline approaches in user interaction tests through iterative feature engineering.",
    tech: ["Python", "Scikit-learn", "Pandas", "NLTK", "NumPy"],
    category: "Machine Learning",
    period: "Jun 2022 – Jul 2022",
    highlights: [
      "Sentiment-driven recommendations",
      "Outperformed baseline engagement",
      "Feature engineering from scratch",
      "Iterative evaluation pipeline",
    ],
    color: "#a78bfa",
    featured: false,
    github: "https://github.com/Akshat-Aggarwal21",
    demo: null,
    modal: {
      problem:
        "Generic music recommendations ignore the user's current emotional state, leading to mismatched suggestions and low engagement. Most systems rely purely on listening history rather than real-time mood signals.",
      approach:
        "Built a sentiment extraction pipeline on user text input using NLTK. Mapped sentiment scores to a mood vector space, then used cosine similarity on TF-IDF feature matrices to retrieve semantically aligned tracks. Ran evaluation cycles comparing engagement proxies against a popularity-baseline recommender.",
      results: [
        "Outperformed popularity-baseline in user interaction tests",
        "End-to-end sentiment-to-mood mapping pipeline",
        "TF-IDF + cosine similarity retrieval system",
        "Modular: swap sentiment model without changing retrieval logic",
        "Iterative evaluation framework built from scratch",
      ],
      architecture:
        "NLTK sentiment analysis → mood vector → TF-IDF feature matrix over track metadata → cosine similarity ranking. Clean separation between mood extraction and retrieval layers.",
      learnings:
        "Feature engineering quality mattered more than model complexity. A clean TF-IDF representation with good sentiment features outperformed more complex models with noisy inputs.",
    },
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    subtitle: "Personal Brand Platform",
    description:
      "Designed and built a personal portfolio from scratch — a fully interactive, production-grade platform with AI assistant, 3D parallax, project intelligence system, and local analytics engine.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "JavaScript", "CSS3"],
    category: "Full Stack",
    period: "2025",
    highlights: [
      "AI chatbot with intent matching",
      "3D parallax & magnetic cursor",
      "Project search & filter system",
      "Local analytics with DevPanel",
    ],
    color: "#38bdf8",
    featured: true,
    github: "https://github.com/Akshat-Aggarwal21/My-Portfolio",
    demo: "https://akshat-portfolio.vercel.app",
    modal: {
      problem:
        "Most developer portfolios are static, generic, and forgettable — they list skills and projects but fail to communicate personality, depth, or engineering quality. A portfolio should itself be a demonstration of skill.",
      approach:
        "Built a full Next.js App Router application with Tailwind CSS and Framer Motion. Architected all content in structured data files so the UI never hardcodes anything. Added a locally-run AI assistant with intent matching, a project detail modal system, 3D card tilt and mouse parallax using custom RAF-based hooks, and a localStorage analytics engine with a hidden DevPanel.",
      results: [
        "AI assistant with 9 intent categories and free-text input",
        "Project search + filter system with live results count",
        "Click-to-expand project modals with full case study detail",
        "3D tilt on cards + mouse parallax on hero rings and orbs",
        "Local analytics: session count, section views, project clicks",
        "Hidden DevPanel via Ctrl+Shift+D for stats",
        "Active section indicator in navbar with Framer Motion",
        "Magnetic cursor with context-aware labels (VIEW/OPEN/CLICK)",
      ],
      architecture:
        "Next.js 14 App Router → page.js assembles section components → each section reads from /data/*.js files. Utils layer (analytics, aiAssistant, cursor, parallax) is completely decoupled from UI. Custom hooks (useAnalytics, useTilt, useMouseParallax) wrap all side effects cleanly.",
      learnings:
        "Architecture decisions made early — separating data, UI, and utility layers — made every subsequent feature trivial to add. The portfolio is now a scalable platform, not just a static page.",
    },
  },
  {
    id: 5,
    title: "SchoolOS",
    subtitle: "AI School Growth Platform",
    description:
      "Built a full-stack AI-powered operating system for schools — enabling autonomous social media content generation, competitive benchmarking, admission funnel tracking, and reputation management across multiple school accounts.",
    tech: ["React", "Vite", "Tailwind CSS", "Recharts", "React Router", "JavaScript"],
    category: "Full Stack",
    period: "2025",
    highlights: [
      "Autonomous AI content generation",
      "Multi-school super admin panel",
      "Competitive benchmarking engine",
      "Admission funnel + CRM tracking",
    ],
    color: "#6366f1",
    featured: true,
    github: "https://github.com/Akshat-Aggarwal21/schoolos",
    demo: null,
    modal: {
      problem:
        "Schools and coaching institutes struggle with consistent social media presence, admission marketing, and reputation management — lacking both the time and expertise to run data-driven growth strategies. Most EdTech tools are generic and not built for the specific workflows of school administrators.",
      approach:
        "Designed and built a full React SPA with role-based authentication (School Admin + Super Admin roles). School Admins get a 9-module dashboard covering content creation, campaign management, analytics, competitive intelligence, digital identity, reputation monitoring, calendar, and admissions. Super Admins get a cross-school intelligence layer with MRR tracking, onboarding management, and fleet-level analytics. All data flows from a structured mock data layer simulating real multi-school scenarios.",
      results: [
        "9 fully functional school admin modules built",
        "Dual role system: School Admin + Super Admin",
        "AI content generator with 6 contexts and 5 tone options",
        "Competitive benchmarking against nearby schools",
        "Admission funnel tracking with revenue attribution",
        "Reputation management with AI-drafted review replies",
        "Multi-phase campaign builder with autonomous post scheduling",
        "Cross-school intelligence dashboard for platform operators",
      ],
      architecture:
        "React 18 + Vite SPA → React Router v6 for role-based routing → AuthContext for session management → 9 page components under /school and 5 under /superadmin → shared UI component library (StatCard, AIInsight, ProgressBar, MiniBarChart) → Recharts for data visualisation → mockData.js as the data layer simulating a real backend.",
      learnings:
        "Building a multi-tenant SaaS dashboard taught the value of a strong shared component library early — the same StatCard, AIInsight, and ProgressBar components power every page. The role-based routing pattern also proved critical for keeping admin and school views cleanly separated.",
    },
  }
];
