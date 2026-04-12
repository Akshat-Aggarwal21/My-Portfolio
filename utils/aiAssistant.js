/**
 * AI Assistant Logic
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulates an intelligent conversational assistant about Akshat.
 * All responses are locally computed — no API calls.
 *
 * To ADD responses: add entries to INTENTS array below.
 * Each intent has:
 *   keywords   – words that trigger this intent
 *   responses  – array of reply strings (one is randomly picked for variety)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const INTENTS = [
  {
    id: 'projects',
    keywords: ['project', 'built', 'made', 'created', 'work', 'portfolio', 'applications'],
    responses: [
      "Akshat has shipped 3 production-ready ML projects: an AI Weather Predictor (CNN-LSTM on 15+ years of spatial data), a real-time Sign Language Interpreter (98% accuracy at 25 FPS), and a Mood-Based Music Recommendation Engine. He also built SchoolOS — a full-stack AI growth operating system for schools with 9 admin modules, dual role system, and autonomous content generation. Each one is fully documented with problem → approach → results.",
      "His standout projects are the Sign Language Interpreter (98% accuracy, 25 FPS) and SchoolOS — a full-stack SaaS dashboard for schools with AI content generation, competitive benchmarking, and admission tracking. He also built — 98% validation accuracy, 25 FPS real-time inference, built with TensorFlow + OpenCV + MediaPipe. The weather prediction system is his most recent, benchmarking GRU vs LSTM vs CNN-LSTM across 15 years of spatial data.",
    ],
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'stack', 'know', 'language', 'framework', 'tools', 'experience with', 'proficient'],
    responses: [
      "Core stack: Python (92%), Scikit-learn, TensorFlow, Pandas, NumPy. For data: Power BI, SQL/MySQL. For vision: OpenCV, MediaPipe. He's also comfortable with Git, REST APIs, and DSA fundamentals.",
      "His strongest technical axis is Python + TensorFlow + Scikit-learn for ML systems, Pandas/NumPy for data pipelines, and OpenCV for computer vision. He's built end-to-end systems from data cleaning through deployment.",
    ],
  },
  {
    id: 'hire',
    keywords: ['hire', 'why', 'should', 'good fit', 'recommend', 'reason', 'stand out', 'different', 'unique', 'value'],
    responses: [
      "Three reasons: (1) He thinks in systems, not just models — every project has clean architecture and measurable results. (2) He's shipped real-world AI with proven metrics — 98% accuracy, 25 FPS inference. (3) He's a fast learner who tackles unfamiliar domains (weather forecasting, sign language, recommendation systems) and gets results.",
      "Akshat stands out because he goes from problem → architecture → implementation → evaluation → iteration in one shot. He doesn't just train models; he builds the full pipeline. And he communicates results clearly — dashboards, visualizations, and impact metrics.",
    ],
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'when', 'start', 'join', 'notice', 'free', 'open'],
    responses: [
      "Akshat completes his B.E. in Computer Science from Chandigarh University in June 2025. He's actively looking for full-time ML Engineering or Data Science roles and available for immediate discussions and interviews.",
      "He's available from June 2025 and open to discussing opportunities now. Reach him directly at 212004akshat@gmail.com or +91 8813028966.",
    ],
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'city', 'country', 'based', 'relocation', 'remote', 'relocate', 'move'],
    responses: [
      "Based in Chandigarh, India. Open to relocation anywhere in India and to remote-first roles globally.",
      "Chandigarh, India — but very open to relocating for the right opportunity. Also comfortable with remote or hybrid setups.",
    ],
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'university', 'college', 'study', 'gpa', 'cgpa', 'graduated', 'qualification'],
    responses: [
      "B.E. Computer Science from Chandigarh University (2021–2025), with a focus on ML and AI systems. Complemented by 4 industry certifications: Deloitte Data Analytics IoT, Internet of Things (NPTEL), Quantum Mechanics (NPTEL), and Probability & Statistics (NPTEL).",
    ],
  },
  {
    id: 'experience',
    keywords: ['experience', 'job', 'intern', 'work', 'company', 'nippon', 'professional', 'role', 'position'],
    responses: [
      "He completed a 5-month R&D Internship at Nippon Data (May–September 2024), where he analyzed structured datasets across 5+ CRM platforms, synthesized qualitative and quantitative findings into prioritized recommendations, and standardized validation workflows to improve cross-team alignment.",
    ],
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'phone', 'connect', 'talk', 'message', 'linkedin', 'github'],
    responses: [
      "Best way to reach Akshat: Email → 212004akshat@gmail.com | Phone → +91 8813028966 | GitHub → github.com/Akshat-Aggarwal21. He typically responds within 24 hours.",
    ],
  },
  {
    id: 'ml_detail',
    keywords: ['machine learning', 'deep learning', 'neural', 'model', 'tensorflow', 'sklearn', 'scikit', 'lstm', 'gru', 'cnn'],
    responses: [
      "He's worked with LSTM, GRU, and CNN-LSTM for time-series forecasting; dense classifiers for real-time gesture recognition; and cosine similarity + TF-IDF for recommendation. Tools: TensorFlow, Scikit-learn, OpenCV, MediaPipe, NumPy, Pandas.",
    ],
  },
]

const FALLBACKS = [
  "Great question! I don't have a specific answer for that, but you can reach Akshat directly at 212004akshat@gmail.com — he's very responsive.",
  "I'm not sure about that specific detail, but feel free to connect with Akshat directly at 212004akshat@gmail.com for a full conversation.",
  "That's outside what I can answer right now. Try asking about his projects, skills, availability, or why you should hire him!",
]

// ─── Core Matching ────────────────────────────────────────────────────────────

function tokenise(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
}

function score(intent, tokens) {
  return tokens.filter(t => intent.keywords.some(k => k.includes(t) || t.includes(k))).length
}

export function getAIResponse(userInput) {
  const tokens = tokenise(userInput)
  if (tokens.length === 0) return pick(FALLBACKS)

  const scored = INTENTS.map(intent => ({ intent, score: score(intent, tokens) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) return pick(FALLBACKS)
  return pick(scored[0].intent.responses)
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── Preset Quick Questions ───────────────────────────────────────────────────
// Shown as quick-tap chips in the chat UI

export const QUICK_QUESTIONS = [
  "What projects has Akshat built?",
  "Why should I hire him?",
  "What are his strongest skills?",
  "Is he available now?",
  "How do I contact him?",
]
