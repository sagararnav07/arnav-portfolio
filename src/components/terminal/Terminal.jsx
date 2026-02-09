import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import './terminal.scss';

/* ─── ASCII art for neofetch ─── */
const NEOFETCH = [
  '                 ╭──────────────────────╮',
  '   █████╗ ███████╗  │  Arnav Sagar         │',
  '  ██╔══██╗██╔════╝  │  ──────────────────── │',
  '  ███████║███████╗  │  Role: Full Stack Dev │',
  '  ██╔══██║╚════██║  │  Company: Infosys     │',
  '  ██║  ██║███████║  │  Location: India      │',
  '  ╚═╝  ╚═╝╚══════╝  │  OS: macOS Sequoia    │',
  '                 │  Editor: VS Code      │',
  '                 │  Terminal: zsh        │',
  '                 │  Languages: 6+        │',
  '                 │  Coffee: ∞            │',
  '                 ╰──────────────────────╯',
];

/* ─── Command definitions ─── */
const COMMANDS = {
  help: () => ({
    type: 'table',
    lines: [
      { cmd: 'about', desc: 'Learn about me' },
      { cmd: 'skills', desc: 'View my tech stack' },
      { cmd: 'experience', desc: 'Work experience timeline' },
      { cmd: 'projects', desc: 'Featured projects' },
      { cmd: 'education', desc: 'Educational background' },
      { cmd: 'contact', desc: 'Get my contact info' },
      { cmd: 'socials', desc: 'Social media links' },
      { cmd: 'neofetch', desc: 'System info (the cool way)' },
      { cmd: 'clear', desc: 'Clear the terminal' },
      { cmd: 'history', desc: 'Command history' },
      { cmd: 'whoami', desc: 'Who am I?' },
      { cmd: 'date', desc: 'Current date' },
      { cmd: 'ls', desc: 'List portfolio sections' },
      { cmd: 'cat resume', desc: 'Open resume' },
      { cmd: 'sudo hire-me', desc: '😏' },
    ],
  }),

  about: () => ({
    type: 'text',
    lines: [
      '',
      '  👋  Hey there! I\'m Arnav Sagar',
      '',
      '  Digital Specialist Engineer at Infosys, passionate about',
      '  building scalable full-stack applications and cloud',
      '  infrastructure. MERN stack developer with expertise in',
      '  AWS, Docker, Kubernetes, and CI/CD automation.',
      '',
      '  I specialize in turning complex problems into elegant,',
      '  performant solutions. When I\'m not coding, I\'m either',
      '  contributing to open source or exploring Web3.',
      '',
    ],
  }),

  skills: () => ({
    type: 'skills',
    categories: [
      {
        name: '⚡ Frontend',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
      },
      {
        name: '🔧 Backend',
        items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'Socket.IO'],
      },
      {
        name: '🗄️ Database',
        items: ['MongoDB', 'PostgreSQL', 'Prisma', 'Redis', 'PostGIS'],
      },
      {
        name: '☁️ DevOps & Cloud',
        items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions'],
      },
    ],
  }),

  experience: () => ({
    type: 'timeline',
    items: [
      {
        period: 'Sep 2025 – Present',
        role: 'Digital Specialist Engineer',
        company: 'Infosys',
        highlights: ['MERN stack apps serving 10k+ DAU', 'CI/CD with Jenkins & GitHub Actions', '40% page load improvement'],
      },
      {
        period: 'Jul 2023 – Aug 2023',
        role: 'DevOps Intern',
        company: 'Code for GovTech',
        highlights: ['50%+ AWS cost reduction', 'K8s clusters – 99.8% uptime', 'Prometheus & Grafana monitoring'],
      },
      {
        period: 'Jul 2023 – Present',
        role: 'Open Source Contributor',
        company: 'GitHub',
        highlights: ['50+ merged PRs', 'Reduced open issues by 30%', 'Global dev community collaboration'],
      },
    ],
  }),

  projects: () => ({
    type: 'projects',
    items: [
      { name: 'JobNest', tech: 'React · MongoDB · Socket.IO', desc: 'AI personality-based job matching', url: 'https://job-nest.dev' },
      { name: 'Rentiful', tech: 'Next.js · PostgreSQL · PostGIS', desc: 'Rental property management platform', url: 'https://rentiful-three.vercel.app' },
      { name: 'Webchat Analyzer', tech: 'Python · Streamlit · Plotly', desc: 'WhatsApp sentiment analysis', url: 'https://webchatanalyzer.streamlit.app' },
    ],
  }),

  education: () => ({
    type: 'text',
    lines: [
      '',
      '  🎓  Bachelor of Technology',
      '      Computer Science & Engineering',
      '      KIIT University, Bhubaneswar',
      '      2021 – 2025',
      '',
      '      Focus: Software Development & Cloud Computing',
      '',
    ],
  }),

  contact: () => ({
    type: 'contact',
    lines: [
      { icon: '📧', label: 'Email', value: 'arnav.07.sagar@gmail.com' },
      { icon: '📍', label: 'Location', value: 'Bhubaneswar, India' },
      { icon: '📱', label: 'Phone', value: '+91 6200739433' },
    ],
  }),

  socials: () => ({
    type: 'links',
    items: [
      { label: 'GitHub', url: 'github.com/sagararnav07' },
      { label: 'LinkedIn', url: 'linkedin.com/in/arnav-sagar-88b03a291' },
      { label: 'Twitter', url: 'x.com/arnav_sagar07' },
      { label: 'Hashnode', url: 'hashnode.com/@Arnav07' },
      { label: 'LeetCode', url: 'leetcode.com/u/Arnav_07' },
    ],
  }),

  neofetch: () => ({
    type: 'neofetch',
    lines: NEOFETCH,
  }),

  whoami: () => ({
    type: 'text',
    lines: ['', '  arnav-sagar — Full Stack Developer & DevOps Engineer', ''],
  }),

  date: () => ({
    type: 'text',
    lines: ['', `  ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, ''],
  }),

  ls: () => ({
    type: 'ls',
    items: ['about/', 'experience/', 'skills/', 'projects/', 'portfolio/', 'blog/', 'contact/'],
  }),

  'cat resume': () => ({
    type: 'action',
    message: '  📄 Opening resume in a new tab...',
    action: () => window.open('https://drive.google.com/drive/folders/1dUvFdaSnas69JPCZcWFSWDk0WNCcvSNH?usp=sharing', '_blank'),
  }),

  'sudo hire-me': () => ({
    type: 'text',
    lines: [
      '',
      '  ✅ Permission granted!',
      '',
      '  🚀 Deploying Arnav Sagar to your team...',
      '  ████████████████████████████ 100%',
      '',
      '  📧 Contact: arnav.07.sagar@gmail.com',
      '  🤝 Let\'s build something amazing together!',
      '',
    ],
  }),
};

/* ─── Output renderers ─── */
const renderOutput = (output, cmdIndex) => {
  if (!output) return null;

  switch (output.type) {
    case 'text':
      return (
        <div className="term-output term-output--text">
          {output.lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="term-line"
            >
              {line}
            </motion.div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="term-output term-output--table">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="term-table-header">
            {'  Available commands:'}
          </motion.div>
          {output.lines.map((row, i) => (
            <motion.div
              key={i}
              className="term-table-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.03 }}
            >
              <span className="term-cmd-name">{row.cmd}</span>
              <span className="term-cmd-desc">{row.desc}</span>
            </motion.div>
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="term-output term-output--skills">
          {output.categories.map((cat, ci) => (
            <motion.div
              key={ci}
              className="term-skill-category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <div className="term-skill-title">{cat.name}</div>
              <div className="term-skill-items">
                {cat.items.map((item, ii) => (
                  <motion.span
                    key={ii}
                    className="term-skill-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: ci * 0.1 + ii * 0.04 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <div className="term-output term-output--timeline">
          {output.items.map((item, i) => (
            <motion.div
              key={i}
              className="term-timeline-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="term-timeline-dot" />
              <div className="term-timeline-content">
                <div className="term-timeline-period">{item.period}</div>
                <div className="term-timeline-role">{item.role}</div>
                <div className="term-timeline-company">{item.company}</div>
                {item.highlights.map((h, hi) => (
                  <motion.div
                    key={hi}
                    className="term-timeline-highlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.1 + hi * 0.05 }}
                  >
                    › {h}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="term-output term-output--projects">
          {output.items.map((p, i) => (
            <motion.a
              key={i}
              className="term-project"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ x: 4 }}
            >
              <div className="term-project-name">{p.name}</div>
              <div className="term-project-desc">{p.desc}</div>
              <div className="term-project-tech">{p.tech}</div>
            </motion.a>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="term-output term-output--contact">
          {output.lines.map((c, i) => (
            <motion.div
              key={i}
              className="term-contact-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="term-contact-icon">{c.icon}</span>
              <span className="term-contact-label">{c.label}</span>
              <span className="term-contact-value">{c.value}</span>
            </motion.div>
          ))}
        </div>
      );

    case 'links':
      return (
        <div className="term-output term-output--links">
          {output.items.map((link, i) => (
            <motion.a
              key={i}
              className="term-link"
              href={`https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <span className="term-link-label">{link.label}</span>
              <span className="term-link-url">{link.url}</span>
            </motion.a>
          ))}
        </div>
      );

    case 'neofetch':
      return (
        <div className="term-output term-output--neofetch">
          {output.lines.map((line, i) => (
            <motion.div
              key={i}
              className="term-neofetch-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      );

    case 'ls':
      return (
        <div className="term-output term-output--ls">
          {output.items.map((item, i) => (
            <motion.span
              key={i}
              className="term-ls-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      );

    case 'action':
      if (output.action) output.action();
      return (
        <motion.div
          className="term-output term-output--text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="term-line">{output.message}</div>
        </motion.div>
      );

    default:
      return null;
  }
};

/* ═══════════════════════════════════════════════════════════════
   MAIN TERMINAL COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Terminal = () => {
  const [history, setHistory] = useState([
    { cmd: null, output: { type: 'text', lines: ['', '  Welcome to Arnav\'s portfolio terminal! Type "help" to see available commands.', ''] } }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  const allCommands = Object.keys(COMMANDS);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-complete suggestions
  useEffect(() => {
    if (input.length > 0) {
      const matches = allCommands.filter(cmd => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase());
      setSuggestions(matches.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const executeCommand = useCallback((rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'history') {
      const output = {
        type: 'text',
        lines: ['', ...cmdHistory.map((c, i) => `  ${i + 1}  ${c}`), ''],
      };
      setHistory(prev => [...prev, { cmd: rawCmd, output }]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      setHistory(prev => [...prev, { cmd: rawCmd, output: handler() }]);
    } else {
      setHistory(prev => [...prev, {
        cmd: rawCmd,
        output: {
          type: 'text',
          lines: [`  zsh: command not found: ${cmd}`, '  Type "help" for available commands.'],
        }
      }]);
    }

    setCmdHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);
  }, [cmdHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setInput('');
      setSuggestions([]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-section">
      <div className="container">
        <SectionHeader
          title="Terminal"
          subtitle="Explore my portfolio the hacker way — type 'help' to begin"
        />

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={focusInput}
        >
          {/* Title bar */}
          <div className="terminal__titlebar">
            <div className="terminal__dots">
              <span className="terminal__dot terminal__dot--red" />
              <span className="terminal__dot terminal__dot--yellow" />
              <span className="terminal__dot terminal__dot--green" />
            </div>
            <div className="terminal__title">arnav@portfolio ~ zsh</div>
            <div className="terminal__dots" style={{ visibility: 'hidden' }}>
              <span className="terminal__dot" />
              <span className="terminal__dot" />
              <span className="terminal__dot" />
            </div>
          </div>

          {/* Terminal body */}
          <div className="terminal__body" ref={scrollRef}>
            <AnimatePresence>
              {history.map((entry, i) => (
                <div key={i} className="terminal__entry">
                  {entry.cmd !== null && (
                    <div className="terminal__prompt-line">
                      <span className="terminal__prompt-user">arnav</span>
                      <span className="terminal__prompt-at">@</span>
                      <span className="terminal__prompt-host">portfolio</span>
                      <span className="terminal__prompt-sep">:</span>
                      <span className="terminal__prompt-path">~</span>
                      <span className="terminal__prompt-dollar">$</span>
                      <span className="terminal__prompt-cmd">{entry.cmd}</span>
                    </div>
                  )}
                  {renderOutput(entry.output, i)}
                </div>
              ))}
            </AnimatePresence>

            {/* Active prompt */}
            <div className="terminal__input-line">
              <span className="terminal__prompt-user">arnav</span>
              <span className="terminal__prompt-at">@</span>
              <span className="terminal__prompt-host">portfolio</span>
              <span className="terminal__prompt-sep">:</span>
              <span className="terminal__prompt-path">~</span>
              <span className="terminal__prompt-dollar">$</span>
              <div className="terminal__input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal__input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                />
                {/* Ghost autocomplete */}
                {suggestions.length > 0 && (
                  <span className="terminal__ghost">
                    {suggestions[0].slice(input.length)}
                  </span>
                )}
              </div>
            </div>

            {/* Tab hint */}
            {suggestions.length > 0 && (
              <motion.div
                className="terminal__suggestions"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {suggestions.map((s, i) => (
                  <span
                    key={i}
                    className="terminal__suggestion"
                    onClick={() => { setInput(s); setSuggestions([]); focusInput(); }}
                  >
                    {s}
                  </span>
                ))}
                <span className="terminal__tab-hint">TAB to complete</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terminal;
