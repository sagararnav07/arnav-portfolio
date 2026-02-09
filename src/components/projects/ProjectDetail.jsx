import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaTimes, FaServer, FaDatabase, FaShieldAlt,
  FaComments, FaPalette, FaBrain, FaChartBar, FaRobot, FaSmile, FaClock,
  FaSearch, FaMoon, FaUsers, FaMapMarkerAlt, FaFileAlt, FaCreditCard,
  FaHome, FaLock, FaCode, FaArrowDown, FaPlay, FaLayerGroup,
  FaEnvelope, FaFilter, FaListAlt, FaChartLine, FaThLarge, FaCloudUploadAlt
} from 'react-icons/fa';
import {
  SiNextdotjs, SiExpress, SiPostgresql, SiPrisma, SiSocketdotio, SiLeaflet,
  SiTailwindcss, SiRedux, SiTypescript, SiReact, SiVite, SiMongodb, SiNodedotjs,
  SiDocker, SiFramer, SiPython, SiStreamlit, SiPlotly, SiPandas,
} from 'react-icons/si';
import './projectDetail.scss';

/* ═══════════════════════════════════════════════════════════════
   PROJECT README DATA
   ═══════════════════════════════════════════════════════════════ */
const projectDetails = {
  jobnest: {
    tagline: 'Revolutionizing hiring through personality science',
    longDescription: 'JobNest is a production-grade job portal where candidates take a Big Five (OCEAN) personality assessment and get matched to employers based on personality compatibility — going beyond traditional keyword-based hiring.',
    highlight: 'Most job portals match on skills alone. JobNest scores candidates on Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism — then uses a weighted algorithm (50% personality tags, 25% job preferences, 25% skills) to surface the best human-fit matches.',
    overview: [
      'JobNest is a full-stack MERN application that reimagines the hiring process. Traditional job portals rely on keyword matching against resumes — a process that often misses the most important factor in successful placements: cultural and personality fit. JobNest solves this by integrating a scientifically validated Big Five (OCEAN) personality assessment directly into the candidate onboarding flow.',
      'When a jobseeker signs up, they complete a 50-question Likert-scale personality assessment covering Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. The system processes their responses (including reverse-scored questions for accuracy), generates personality tags, and produces a downloadable PDF report with career recommendations via PDFKit.',
      'On the employer side, managers define their company culture through personality preference tags and job-specific requirements. The platform\'s matching engine then runs a 3-factor weighted algorithm — combining 50% personality compatibility, 25% job preference alignment, and 25% technical skills overlap — to surface the best human-fit matches, ranked by score.',
      'The platform also features Socket.IO-powered real-time messaging with typing indicators and online presence, a 5-provider email failover chain (Elastic Email → Brevo → Mailjet → Resend → SMTP) for bulletproof notifications, Clerk SSO authentication, and dual role-based dashboards with animated stat counters and a complete application status pipeline.',
    ],
    howItWorks: {
      title: 'The Matching Algorithm',
      description: 'JobNest uses a 3-factor weighted algorithm to compute compatibility scores between candidates and job postings:',
      formula: 'Match Score = (Tag Match × 0.50) + (Preference Match × 0.25) + (Skill Match × 0.25)',
      steps: [
        { title: 'Personality Tag Match (50%)', desc: 'Compares the overlap between the jobseeker\'s OCEAN-derived personality tags and the employer\'s defined culture tags. Higher overlap = stronger cultural fit.' },
        { title: 'Job Preference Match (25%)', desc: 'Evaluates work-style alignment — factors like Day Shift vs Night Shift, Remote vs On-site, Hybrid availability, and preferred work environment.' },
        { title: 'Skill Match (25%)', desc: 'Calculates the intersection between the candidate\'s technical skills and the job requirements. Uses set-based overlap scoring.' },
        { title: 'Ranked Results', desc: 'All jobs are sorted by match score (highest first), ensuring the best personality-fit opportunities surface at the top of the jobseeker\'s feed.' },
      ],
    },
    oceanModel: [
      { trait: 'O — Openness', desc: 'Creativity, curiosity, imagination', career: 'Design, Research, Innovation roles' },
      { trait: 'C — Conscientiousness', desc: 'Organization, discipline, reliability', career: 'Management, Finance, Operations' },
      { trait: 'E — Extraversion', desc: 'Social energy, assertiveness, enthusiasm', career: 'Sales, Marketing, Leadership' },
      { trait: 'A — Agreeableness', desc: 'Cooperation, empathy, teamwork', career: 'HR, Customer Service, Healthcare' },
      { trait: 'N — Neuroticism', desc: 'Emotional sensitivity, attention to detail', career: 'Support roles, Detail-oriented work' },
    ],
    apiHighlights: [
      { method: 'POST', endpoint: '/api/v1/quiz/submit', desc: 'Submit OCEAN assessment answers' },
      { method: 'GET', endpoint: '/api/v1/jobSeeker/jobs', desc: 'Get personality-matched jobs' },
      { method: 'POST', endpoint: '/api/v1/applications/apply/:jobId', desc: 'Apply for a job' },
      { method: 'PUT', endpoint: '/api/v1/applications/:id/status', desc: 'Update application status' },
      { method: 'POST', endpoint: '/api/v1/messages/send', desc: 'Send real-time message' },
      { method: 'POST', endpoint: '/api/v1/auth/clerk/sync', desc: 'Sync Clerk SSO user' },
    ],
    challenges: [
      'Designing a personality assessment engine that handles reverse-scored questions and maps trait scores to actionable career tags required deep research into psychometric testing methodology.',
      'Building a 5-provider email failover system that gracefully cascades through providers on failure while maintaining consistent HTML templates and delivery guarantees.',
      'Implementing real-time messaging with Socket.IO that handles connection drops, reconnection, typing indicators with debounce logic, and unread message counts across multiple concurrent chat windows.',
      'Integrating Clerk SSO with a custom JWT backend — syncing user sessions between Clerk\'s authentication layer and the Express backend required custom webhook handlers and middleware orchestration.',
    ],
    color: '#61DAFB',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    stats: [
      { label: 'Algorithm', value: '3-Factor', icon: FaBrain },
      { label: 'Email Failover', value: '5 Providers', icon: FaEnvelope },
      { label: 'Real-Time', value: 'Socket.IO', icon: FaComments },
      { label: 'Auth', value: 'Clerk SSO', icon: FaShieldAlt },
    ],
    sections: [
      {
        title: 'Personality-Based Matching',
        subtitle: 'Core Feature',
        icon: FaBrain,
        items: [
          'Big Five (OCEAN) personality assessment with Likert scale scoring',
          'Reverse-scored question handling for accuracy',
          'Weighted match algorithm — 50% personality, 25% preferences, 25% skills',
          'Auto-generated personality tags for both jobseekers and employers',
          'PDF assessment report with career recommendations via PDFKit',
          'Interactive results dashboard with Recharts (Pie + Radar charts)',
        ],
      },
      {
        title: 'Authentication & Security',
        icon: FaShieldAlt,
        items: [
          'Clerk SSO integration (Google, GitHub, email/password)',
          'JWT-based session management with backend sync',
          'Role-based access control (Jobseeker vs. Employer)',
          'Protected route guards with optimistic loading from localStorage',
          'CAPTCHA verification and OTP email verification',
          'bcrypt password hashing (salt rounds: 11)',
        ],
      },
      {
        title: 'Real-Time Messaging',
        icon: FaComments,
        items: [
          'Socket.IO powered bi-directional chat',
          'Online/offline status indicators with green pulse',
          'Live typing indicators (debounced)',
          'Unread message count badges',
          'Conversation management (clear chat, delete conversations)',
          'Responsive split-pane layout (sidebar + chat window)',
        ],
      },
      {
        title: 'Jobseeker Features',
        icon: FaUsers,
        items: [
          'Personalized dashboard with matched job count and quick stats',
          'AI-matched job discovery with multi-filter system',
          'List/Grid view toggle for job browsing',
          'One-click job applications with cover letter support',
          'Application tracking with color-coded status pipeline',
          'Resume & cover letter file uploads via Multer',
        ],
      },
      {
        title: 'Employer Features',
        icon: FaChartBar,
        items: [
          'Command center dashboard with animated stat counters',
          'Full job CRUD (create, edit, delete postings)',
          'Interactive skills tag input with Enter-to-add',
          'Applicant review with detailed modal views',
          'Status pipeline management (Applied → Interview → Hired/Rejected)',
          'Email notifications on status changes',
        ],
      },
      {
        title: 'Email System',
        icon: FaEnvelope,
        items: [
          '5-provider failover: Elastic Email → Brevo → Mailjet → Resend → SMTP',
          'Transaction-safe: tries next provider on failure',
          'Welcome emails, application confirmations, status updates',
          'HTML templates with dynamic content injection',
        ],
      },
    ],
    architecture: {
      frontend: ['React 18', 'Vite 7', 'Tailwind CSS 4', 'DaisyUI 5', 'Framer Motion', 'Recharts', 'Clerk SDK'],
      backend: ['Node.js', 'Express 5', 'MongoDB', 'Mongoose 8', 'Socket.IO 4', 'Multer', 'PDFKit'],
      devops: ['Docker', 'Docker Compose', 'Render', 'Vercel', 'Nodemon'],
    },
    fullTechStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB', category: 'Frontend' },
      { name: 'Vite', icon: SiVite, color: '#646CFF', category: 'Frontend' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
      { name: 'Framer', icon: SiFramer, color: '#BB4BFF', category: 'Frontend' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'Backend' },
      { name: 'Express', icon: SiExpress, color: '#ffffff', category: 'Backend' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#ffffff', category: 'Real-Time' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'DevOps' },
    ],
  },

  rentiful: {
    tagline: 'Where tenants find homes, managers find tenants',
    longDescription: 'Rentiful is a modern rental property marketplace that connects tenants looking for homes with property managers listing them. Built with Next.js 16, Express, PostgreSQL + PostGIS, Prisma ORM, and Socket.IO for real-time messaging.',
    highlight: 'Features an advanced search page with Leaflet-powered interactive maps and geolocation support, role-based dashboards, automatic lease generation on approval, payment tracking, and a full real-time messaging system.',
    overview: [
      'Rentiful is a full-stack rental property management platform that serves two distinct user types: tenants searching for rental homes and property managers listing and managing them. The application is built on a modern TypeScript stack — Next.js 16 with App Router on the frontend and Express with Prisma ORM on the backend, backed by PostgreSQL with the PostGIS geospatial extension.',
      'The centerpiece of the tenant experience is an interactive property search page powered by Leaflet maps. Tenants can browse property markers on the map, use geolocation to auto-detect their position (via Nominatim reverse geocoding), and apply advanced filters including location, price range, bedrooms, bathrooms, property type, square footage, and amenities. The backend uses PostGIS geospatial queries for proximity-based search, ensuring tenants find relevant properties near their desired location.',
      'Property managers get a full management dashboard where they can create listings with multiple photo uploads, define amenities and highlights, set pricing, and track the entire application-to-lease lifecycle. When a manager approves a tenant\'s application, the system automatically generates a lease with start/end dates, rent amount, and deposit — then tracks payments through their full lifecycle (pending, paid, partially paid, overdue).',
      'Both sides communicate through a rich real-time messaging system built with Socket.IO. Chat features include typing indicators with automatic timeout, read receipts progressing through Sent → Delivered → Read states, online presence tracking with green/offline dots, conversation rooms tied to specific properties, and a responsive split-pane interface. The frontend state is managed with Redux Toolkit and RTK Query for efficient API data fetching and caching.',
    ],
    howItWorks: {
      title: 'Application & Lease Flow',
      description: 'Rentiful automates the entire rental lifecycle from property discovery to payment tracking:',
      steps: [
        { title: 'Property Discovery', desc: 'Tenants search using the Leaflet map with PostGIS proximity queries, filter by preferences, and save favorites for later review.' },
        { title: 'Application Submission', desc: 'Tenants submit rental applications with personal details and a message to the manager. Applications enter a "Pending" state.' },
        { title: 'Manager Review', desc: 'Property managers review applications in their dashboard, seeing tenant details, and can approve or deny each application.' },
        { title: 'Automatic Lease Generation', desc: 'When an application is approved, the system automatically creates a Lease record with configurable start/end dates, monthly rent, and security deposit.' },
        { title: 'Payment Tracking', desc: 'Lease payments are tracked through their lifecycle — pending, paid, partially paid, or overdue — with visibility for both tenants and managers.' },
      ],
    },
    dbSchema: [
      { model: 'Manager', desc: 'Property managers with cognitoId, email, hashed password' },
      { model: 'Tenant', desc: 'Renters with favorites, applications, leases' },
      { model: 'Property', desc: 'Rental listings with amenities, highlights, photos, pricing' },
      { model: 'Location', desc: 'Addresses with PostGIS geography(Point, 4326) coordinates' },
      { model: 'Application', desc: 'Tenant applications — Pending / Approved / Denied states' },
      { model: 'Lease', desc: 'Active leases with rent, deposit, start/end dates' },
      { model: 'Payment', desc: 'Payment records — Pending / Paid / PartiallyPaid / Overdue' },
      { model: 'Conversation', desc: 'Chat threads between a tenant and manager (per property)' },
      { model: 'Message', desc: 'Individual messages with status: Sent / Delivered / Read' },
    ],
    apiHighlights: [
      { method: 'GET', endpoint: '/properties', desc: 'List properties with geospatial filters' },
      { method: 'POST', endpoint: '/properties', desc: 'Create property with multi-photo upload' },
      { method: 'POST', endpoint: '/applications', desc: 'Submit rental application' },
      { method: 'PUT', endpoint: '/applications/:id/status', desc: 'Approve/deny application (auto-lease)' },
      { method: 'GET', endpoint: '/messages/conversations', desc: 'Get all chat conversations' },
      { method: 'POST', endpoint: '/messages/send', desc: 'Send real-time message' },
    ],
    challenges: [
      'Integrating PostGIS geospatial queries with Prisma ORM required raw SQL for proximity-based search since Prisma does not natively support PostGIS geography types — coordinates needed WKT-to-GeoJSON conversion via @terraformer/wkt.',
      'Building the real-time messaging system with Socket.IO including typing indicators, read receipts (Sent→Delivered→Read state machine), and online presence tracking — all while keeping the UI performant with optimistic updates.',
      'Designing the automatic lease generation flow to be transaction-safe — when an application is approved, the system atomically creates a Lease record and updates the Application status within a single Prisma transaction to prevent orphaned records.',
      'Implementing role-based access control across both the Next.js frontend (route guards, conditional UI) and Express backend (JWT middleware with role extraction) while keeping the auth flow seamless for both Tenant and Manager user types.',
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    stats: [
      { label: 'Database', value: 'PostGIS', icon: FaDatabase },
      { label: 'Auth', value: 'JWT + RBAC', icon: FaShieldAlt },
      { label: 'Real-Time', value: 'Socket.IO', icon: FaComments },
      { label: 'Maps', value: 'Leaflet', icon: FaMapMarkerAlt },
    ],
    sections: [
      {
        title: 'Property Search & Maps',
        subtitle: 'Core Feature',
        icon: FaMapMarkerAlt,
        items: [
          'Interactive Leaflet map with property markers',
          'Geolocation detection — auto-detect user location (Nominatim)',
          'Advanced filtering: location, price range, beds, baths, type, amenities',
          'Proximity-based search using PostGIS geospatial queries',
          'Save/remove favorite properties',
        ],
      },
      {
        title: 'Property Management',
        icon: FaHome,
        items: [
          'Create properties with multiple photo uploads (Multer)',
          'Define amenities, highlights, property type, pricing, beds/baths',
          'View and manage all listed properties',
          'Delete properties with cascade handling',
          'Track applications and lease status per property',
        ],
      },
      {
        title: 'Applications & Leases',
        icon: FaFileAlt,
        items: [
          'Tenants submit rental applications with personal details and messages',
          'Managers approve or deny applications',
          'Automatic lease creation when an application is approved',
          'Lease tracking with start/end dates, rent, and deposit',
          'Payment tracking (pending, paid, partially paid, overdue)',
        ],
      },
      {
        title: 'Real-Time Messaging',
        icon: FaComments,
        items: [
          'Socket.IO powered full-featured chat system',
          'Real-time delivery with optimistic UI updates',
          'Typing indicators with automatic timeout',
          'Read receipts (Sent → Delivered → Read)',
          'Online presence tracking with green/offline dots',
          'Conversation rooms tied to specific properties',
        ],
      },
      {
        title: 'Security & Performance',
        icon: FaLock,
        items: [
          'Helmet headers, CORS whitelist, rate limiting',
          'Input sanitization, SQL injection prevention via Prisma',
          'bcrypt password hashing (12 rounds)',
          'Graceful shutdown with PM2 integration',
          'Dark/Light theme with system preference detection',
        ],
      },
    ],
    architecture: {
      frontend: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Redux Toolkit', 'Leaflet'],
      backend: ['Express', 'TypeScript', 'Prisma ORM', 'PostgreSQL + PostGIS', 'Socket.IO', 'JWT', 'Multer'],
      devops: ['Railway', 'PM2', 'Helmet', 'Rate Limiting'],
    },
    fullTechStack: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'Frontend' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Frontend' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC', category: 'State' },
      { name: 'Express', icon: SiExpress, color: '#ffffff', category: 'Backend' },
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748', category: 'ORM' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'Database' },
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#ffffff', category: 'Real-Time' },
      { name: 'Leaflet', icon: SiLeaflet, color: '#199900', category: 'Maps' },
    ],
  },

  'webchat-analyzer': {
    tagline: 'Decode the emotions behind every conversation',
    longDescription: 'A powerful AI-enhanced WhatsApp chat analyzer that performs real-time sentiment classification using TextBlob NLP. Presents results via interactive Plotly dashboards, tracks emoji analytics, generates activity heatmaps, and includes an integrated Groq Llama 3.3 70B-powered AI chat assistant.',
    highlight: 'Upload any WhatsApp chat export and instantly get sentiment analysis, emoji breakdowns, activity heatmaps, and the ability to ask an AI questions about your conversations.',
    overview: [
      'Webchat Analyzer is a Python-based data analytics application built with Streamlit that lets you upload any WhatsApp chat export and instantly uncover hidden patterns in your conversations. The app parses the exported .txt file, extracts structured data (timestamps, senders, messages), and runs a full NLP analysis pipeline using TextBlob for sentiment classification.',
      'Each message is classified into Positive, Neutral, or Negative sentiment categories based on polarity scoring. The results are presented through interactive Plotly dashboards that show per-user sentiment breakdowns, sentiment trends over time, polarity vs subjectivity scatter plots, and comparative analysis across all participants in the chat.',
      'Beyond sentiment, the app performs deep emoji analytics — extracting top emojis per user, frequency distributions, and preference patterns. Activity analysis reveals 24-hour usage heatmaps, weekly activity patterns, response time analysis, chat streaks and gaps, and first-message initiator tracking.',
      'The standout feature is an integrated AI chat assistant powered by Groq\'s Llama 3.3 70B model. After uploading chat data, users can ask natural language questions about their conversations — "Who sends the most positive messages?", "What\'s our most active day?", "Summarize our conversation patterns" — and get context-aware, streaming AI responses.',
    ],
    howItWorks: {
      title: 'Analysis Pipeline',
      description: 'From chat export to actionable insights in seconds:',
      steps: [
        { title: 'Upload & Parse', desc: 'The user uploads a WhatsApp chat export (.txt). The parser uses regex to extract timestamp, sender name, and message content from each line, handling multi-line messages and system notifications.' },
        { title: 'Sentiment Classification', desc: 'Each message is processed through TextBlob\'s NLP engine, which computes polarity (-1 to +1) and subjectivity (0 to 1) scores. Messages are classified as Positive (>0.05), Negative (<-0.05), or Neutral.' },
        { title: 'Emoji & Activity Extraction', desc: 'The app extracts all emojis using Unicode regex, computes frequency distributions per user, and builds 24-hour/weekly activity matrices from timestamp data.' },
        { title: 'Interactive Visualization', desc: 'Results are rendered as interactive Plotly charts — pie charts for sentiment distribution, line charts for trends, heatmaps for activity, bar charts for emoji rankings, and word clouds for common terms.' },
        { title: 'AI-Powered Q&A', desc: 'Chat context is fed to Groq\'s Llama 3.3 70B model via API. Users ask natural language questions and get streaming responses that reference actual data from their uploaded conversations.' },
      ],
    },
    challenges: [
      'Parsing WhatsApp exports reliably across different phone formats (iOS vs Android), date formats, and languages — the regex parser needed to handle edge cases like multi-line messages, media placeholders, and system notifications.',
      'Optimizing TextBlob sentiment analysis for large chat files (10,000+ messages) to maintain responsive UI — implemented batch processing with a Streamlit progress bar and caching via @st.cache_data.',
      'Integrating Groq\'s Llama 3.3 70B API with streaming output into Streamlit\'s reactive framework — required custom streaming handlers to display AI responses token-by-token in real-time.',
      'Designing the dark-themed UI with gradient accents and responsive charts — Plotly\'s default themes don\'t match dark UIs, so custom color palettes and transparent backgrounds were configured for every chart type.',
    ],
    color: '#FF4B4B',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    stats: [
      { label: 'AI Model', value: 'Llama 3.3', icon: FaBrain },
      { label: 'NLP Engine', value: 'TextBlob', icon: FaCode },
      { label: 'Visualizations', value: 'Plotly', icon: FaChartBar },
      { label: 'Framework', value: 'Streamlit', icon: FaPalette },
    ],
    sections: [
      {
        title: 'Sentiment Analysis',
        subtitle: 'Core Feature',
        icon: FaBrain,
        items: [
          'Real-time NLP classification — Positive, Neutral, Negative',
          'Per-user sentiment breakdown with interactive charts',
          'Sentiment trends over time with timeline visualization',
          'Polarity and subjectivity scoring per message',
        ],
      },
      {
        title: 'AI Chat Assistant',
        icon: FaRobot,
        items: [
          'Groq Llama 3.3 70B powered natural language Q&A',
          'Ask questions about your chat data in plain English',
          'Context-aware responses based on uploaded conversations',
          'Streaming responses with real-time output',
        ],
      },
      {
        title: 'Emoji & Activity Analytics',
        icon: FaSmile,
        items: [
          'Top emojis per user with frequency charts',
          'Emoji preference analysis across conversations',
          '24-hour activity tracking and weekly heatmaps',
          'Response time analysis and night owl detection',
        ],
      },
      {
        title: 'Deep Dive Analytics',
        icon: FaSearch,
        items: [
          'Word clouds and common word frequency analysis',
          'Chat streaks and conversation gap detection',
          'First-message initiator analysis',
          'Dark theme UI with gradient accents and responsive design',
        ],
      },
    ],
    architecture: {
      frontend: ['Streamlit', 'Plotly', 'Matplotlib', 'WordCloud'],
      backend: ['Python', 'TextBlob', 'Pandas', 'Groq API'],
      devops: ['Streamlit Cloud', 'Heroku'],
    },
    fullTechStack: [
      { name: 'Python', icon: SiPython, color: '#3776AB', category: 'Language' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B', category: 'Framework' },
      { name: 'Plotly', icon: SiPlotly, color: '#3F4F75', category: 'Visualization' },
      { name: 'Pandas', icon: SiPandas, color: '#150458', category: 'Data' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* Stat card */
const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      className="pd-stat"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.5, type: 'spring' }}
      whileHover={{ y: -4, scale: 1.03 }}
    >
      <div className="pd-stat__icon"><Icon /></div>
      <div className="pd-stat__value">{stat.value}</div>
      <div className="pd-stat__label">{stat.label}</div>
    </motion.div>
  );
};

/* README feature section */
const ReadmeSection = ({ section, index }) => {
  const Icon = section.icon;
  return (
    <motion.div
      className="pd-readme-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="pd-readme-section__header">
        <div className="pd-readme-section__icon"><Icon /></div>
        <div>
          <h3>{section.title}</h3>
          {section.subtitle && <span className="pd-readme-section__badge">{section.subtitle}</span>}
        </div>
      </div>
      <ul className="pd-readme-section__list">
        {section.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 + i * 0.04 }}
          >
            <span className="pd-readme-section__bullet" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

/* Architecture layer */
const ArchLayer = ({ title, items, color, index }) => (
  <motion.div
    className="pd-arch__layer"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 + index * 0.12, duration: 0.4 }}
  >
    <div className="pd-arch__label" style={{ color }}>{title}</div>
    <div className="pd-arch__items">
      {items.map((item, i) => (
        <motion.span
          key={item}
          className="pd-arch__tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + index * 0.12 + i * 0.04 }}
          whileHover={{ scale: 1.08, y: -2 }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

/* Tech stack grid */
const TechGrid = ({ techStack }) => (
  <div className="pd-techgrid">
    {techStack.map((tech, i) => {
      const Icon = tech.icon;
      return (
        <motion.div
          key={tech.name}
          className="pd-techgrid__item"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.06, type: 'spring', stiffness: 200 }}
          whileHover={{ y: -6, scale: 1.08 }}
        >
          <div className="pd-techgrid__icon" style={{ borderColor: `${tech.color}33` }}>
            <Icon style={{ color: tech.color }} />
          </div>
          <span className="pd-techgrid__name">{tech.name}</span>
          <span className="pd-techgrid__cat">{tech.category}</span>
        </motion.div>
      );
    })}
  </div>
);

/* How It Works — step-by-step flow */
const HowItWorks = ({ data }) => (
  <motion.div
    className="pd-howitworks"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <p className="pd-howitworks__desc">{data.description}</p>
    {data.formula && (
      <div className="pd-howitworks__formula">
        <code>{data.formula}</code>
      </div>
    )}
    <div className="pd-howitworks__steps">
      {data.steps.map((step, i) => (
        <motion.div
          key={step.title}
          className="pd-howitworks__step"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55 + i * 0.08 }}
        >
          <div className="pd-howitworks__step-num">{i + 1}</div>
          <div className="pd-howitworks__step-body">
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* API Endpoints table */
const ApiTable = ({ endpoints }) => (
  <motion.div
    className="pd-api"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="pd-api__table">
      <div className="pd-api__header">
        <span>Method</span>
        <span>Endpoint</span>
        <span>Description</span>
      </div>
      {endpoints.map((ep, i) => (
        <motion.div
          key={ep.endpoint}
          className="pd-api__row"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 + i * 0.04 }}
        >
          <span className={`pd-api__method pd-api__method--${ep.method.toLowerCase()}`}>{ep.method}</span>
          <code className="pd-api__endpoint">{ep.endpoint}</code>
          <span className="pd-api__desc">{ep.desc}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* Challenges section */
const ChallengesSection = ({ challenges }) => (
  <motion.div
    className="pd-challenges"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    {challenges.map((challenge, i) => (
      <motion.div
        key={i}
        className="pd-challenges__item"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75 + i * 0.08 }}
      >
        <div className="pd-challenges__num">{i + 1}</div>
        <p>{challenge}</p>
      </motion.div>
    ))}
  </motion.div>
);

/* OCEAN Model table (JobNest-specific) */
const OceanTable = ({ traits }) => (
  <motion.div
    className="pd-ocean"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.55 }}
  >
    <div className="pd-ocean__grid">
      {traits.map((t, i) => (
        <motion.div
          key={t.trait}
          className="pd-ocean__card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.06 }}
          whileHover={{ y: -3 }}
        >
          <div className="pd-ocean__trait">{t.trait}</div>
          <p className="pd-ocean__desc">{t.desc}</p>
          <span className="pd-ocean__career">{t.career}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* Database Schema table (Rentiful-specific) */
const DbSchemaTable = ({ models }) => (
  <motion.div
    className="pd-dbschema"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.55 }}
  >
    {models.map((m, i) => (
      <motion.div
        key={m.model}
        className="pd-dbschema__row"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 + i * 0.04 }}
      >
        <span className="pd-dbschema__model">{m.model}</span>
        <span className="pd-dbschema__desc">{m.desc}</span>
      </motion.div>
    ))}
  </motion.div>
);

/* Table of contents */
const TableOfContents = ({ detail }) => {
  const tocItems = [
    { label: 'About', icon: FaFileAlt },
    { label: 'Overview', icon: FaListAlt },
    ...(detail.howItWorks ? [{ label: detail.howItWorks.title, icon: FaLayerGroup }] : []),
    ...(detail.oceanModel ? [{ label: 'OCEAN Model', icon: FaBrain }] : []),
    { label: 'Key Features', icon: FaCode },
    ...(detail.apiHighlights ? [{ label: 'API Endpoints', icon: FaServer }] : []),
    ...(detail.dbSchema ? [{ label: 'Database Schema', icon: FaDatabase }] : []),
    { label: 'Tech Stack', icon: FaThLarge },
    { label: 'Architecture', icon: FaLayerGroup },
    ...(detail.challenges ? [{ label: 'Challenges', icon: FaChartLine }] : []),
  ];

  return (
    <motion.nav
      className="pd-toc"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h4 className="pd-toc__title">Table of Contents</h4>
      {tocItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className="pd-toc__item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.04 }}
          >
            <Icon className="pd-toc__icon" />
            <span>{item.label}</span>
          </motion.div>
        );
      })}
    </motion.nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const ProjectDetail = ({ project, isOpen, onClose }) => {
  const detail = projectDetails[project?.id];
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!detail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="pd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            className="pd-modal"
            data-lenis-prevent
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ─── Close Button ─── */}
            <motion.button
              className="pd-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>

            {/* ═══ HERO — Full-width video background ═══ */}
            <section className="pd-hero">
              <div className="pd-hero__video-bg">
                <video
                  src={project.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="pd-hero__video"
                />
                <div className="pd-hero__video-darken" />
              </div>

              <div className="pd-hero__content">
                <motion.span
                  className="pd-hero__badge"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Featured Project
                </motion.span>

                <motion.h1
                  className="pd-hero__title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {project.title}
                </motion.h1>

                <motion.p
                  className="pd-hero__tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {detail.tagline}
                </motion.p>

                <motion.div
                  className="pd-hero__actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-btn pd-btn--primary"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn pd-btn--ghost"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaGithub />
                    <span>Source Code</span>
                  </motion.a>
                </motion.div>

                <motion.div
                  className="pd-hero__scroll-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowDown />
                  </motion.div>
                  <span>Scroll to explore</span>
                </motion.div>
              </div>
            </section>

            {/* ═══ STATS BAR ═══ */}
            <section className="pd-stats">
              {detail.stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </section>

            {/* ═══ README BODY ═══ */}
            <div className="pd-readme">
              {/* Sidebar TOC */}
              <aside className="pd-readme__sidebar">
                <TableOfContents detail={detail} />
              </aside>

              {/* Main content */}
              <div className="pd-readme__body">
                {/* ─── About ─── */}
                <motion.div
                  className="pd-readme__about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2>About</h2>
                  <p className="pd-readme__desc">{detail.longDescription}</p>
                  <blockquote className="pd-readme__highlight">
                    <p>{detail.highlight}</p>
                  </blockquote>
                </motion.div>

                {/* ─── Detailed Overview ─── */}
                {detail.overview && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.42 }}
                    >
                      Overview
                    </motion.h2>
                    <motion.div
                      className="pd-readme__overview"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.44 }}
                    >
                      {detail.overview.map((para, i) => (
                        <motion.p
                          key={i}
                          className="pd-readme__para"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.46 + i * 0.06 }}
                        >
                          {para}
                        </motion.p>
                      ))}
                    </motion.div>
                  </>
                )}

                {/* ─── How It Works ─── */}
                {detail.howItWorks && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.48 }}
                    >
                      {detail.howItWorks.title}
                    </motion.h2>
                    <HowItWorks data={detail.howItWorks} />
                  </>
                )}

                {/* ─── OCEAN Model (JobNest only) ─── */}
                {detail.oceanModel && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.52 }}
                    >
                      OCEAN Personality Model
                    </motion.h2>
                    <OceanTable traits={detail.oceanModel} />
                  </>
                )}

                {/* ─── Key Features ─── */}
                <motion.h2
                  className="pd-readme__heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  Key Features
                </motion.h2>
                {detail.sections.map((section, i) => (
                  <ReadmeSection key={section.title} section={section} index={i} />
                ))}

                {/* ─── API Endpoints ─── */}
                {detail.apiHighlights && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      API Endpoints
                    </motion.h2>
                    <ApiTable endpoints={detail.apiHighlights} />
                  </>
                )}

                {/* ─── Database Schema (Rentiful only) ─── */}
                {detail.dbSchema && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.62 }}
                    >
                      Database Schema
                    </motion.h2>
                    <DbSchemaTable models={detail.dbSchema} />
                  </>
                )}

                {/* ─── Tech Stack ─── */}
                <motion.h2
                  className="pd-readme__heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Tech Stack
                </motion.h2>
                <TechGrid techStack={detail.fullTechStack} />

                {/* ─── Architecture ─── */}
                <motion.h2
                  className="pd-readme__heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Architecture
                </motion.h2>
                <div className="pd-arch">
                  <ArchLayer title="Frontend" items={detail.architecture.frontend} color="#61DAFB" index={0} />
                  <div className="pd-arch__connector">
                    <motion.div className="pd-arch__line" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1, duration: 0.4 }} />
                  </div>
                  <ArchLayer title="Backend" items={detail.architecture.backend} color="#68D391" index={1} />
                  <div className="pd-arch__connector">
                    <motion.div className="pd-arch__line" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
                  </div>
                  <ArchLayer title="DevOps" items={detail.architecture.devops} color="#F6AD55" index={2} />
                </div>

                {/* ─── Challenges ─── */}
                {detail.challenges && (
                  <>
                    <motion.h2
                      className="pd-readme__heading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.85 }}
                    >
                      Engineering Challenges
                    </motion.h2>
                    <ChallengesSection challenges={detail.challenges} />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;
