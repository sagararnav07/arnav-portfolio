import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaBriefcase, FaCode, FaProjectDiagram, FaCertificate,
  FaPen, FaEnvelope, FaGithub, FaLinkedin, FaExternalLinkAlt,
  FaSearch, FaKeyboard, FaCogs, FaFileDownload, FaTerminal,
} from 'react-icons/fa';
import './commandPalette.scss';

/* ─── All searchable actions ─── */
const actions = [
  // Navigation
  { id: 'nav-about', label: 'Go to About', section: 'Navigation', icon: FaUser, action: () => scrollTo('about') },
  { id: 'nav-experience', label: 'Go to Experience', section: 'Navigation', icon: FaBriefcase, action: () => scrollTo('experience') },
  { id: 'nav-skills', label: 'Go to Skills', section: 'Navigation', icon: FaCogs, action: () => scrollTo('skills') },
  { id: 'nav-projects', label: 'Go to Featured Projects', section: 'Navigation', icon: FaProjectDiagram, action: () => scrollTo('projects') },
  { id: 'nav-portfolio', label: 'Go to Portfolio', section: 'Navigation', icon: FaCertificate, action: () => scrollTo('portfolio') },
  { id: 'nav-blog', label: 'Go to Blog', section: 'Navigation', icon: FaPen, action: () => scrollTo('blog') },
  { id: 'nav-terminal', label: 'Go to Terminal', section: 'Navigation', icon: FaTerminal, action: () => scrollTo('terminal') },
  { id: 'nav-contact', label: 'Go to Contact', section: 'Navigation', icon: FaEnvelope, action: () => scrollTo('contact') },

  // Projects
  { id: 'proj-jobnest', label: 'Open JobNest', section: 'Projects', icon: FaExternalLinkAlt, action: () => window.open('https://job-nest.dev', '_blank'), keywords: 'job personality matching mern' },
  { id: 'proj-rentiful', label: 'Open Rentiful', section: 'Projects', icon: FaExternalLinkAlt, action: () => window.open('https://rentiful-three.vercel.app', '_blank'), keywords: 'rental property nextjs' },
  { id: 'proj-webchat', label: 'Open Webchat Analyzer', section: 'Projects', icon: FaExternalLinkAlt, action: () => window.open('https://webchatanalyzer.streamlit.app', '_blank'), keywords: 'whatsapp sentiment python' },

  // Quick Actions
  { id: 'act-resume', label: 'Download Resume', section: 'Actions', icon: FaFileDownload, action: () => window.open('https://drive.google.com/drive/folders/1dUvFdaSnas69JPCZcWFSWDk0WNCcvSNH?usp=sharing', '_blank') },
  { id: 'act-github', label: 'Open GitHub Profile', section: 'Actions', icon: FaGithub, action: () => window.open('https://github.com/sagararnav07', '_blank') },
  { id: 'act-linkedin', label: 'Open LinkedIn Profile', section: 'Actions', icon: FaLinkedin, action: () => window.open('https://www.linkedin.com/in/arnav-sagar-88b03a291/', '_blank') },
  { id: 'act-email', label: 'Send Email', section: 'Actions', icon: FaEnvelope, action: () => window.open('mailto:arnav.07.sagar@gmail.com') },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════
   COMMAND PALETTE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Filter actions
  const filtered = query.trim()
    ? actions.filter(a => {
        const search = query.toLowerCase();
        return (
          a.label.toLowerCase().includes(search) ||
          a.section.toLowerCase().includes(search) ||
          (a.keywords && a.keywords.toLowerCase().includes(search))
        );
      })
    : actions;

  // Group by section
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  // Flat list for keyboard navigation
  const flatFiltered = Object.values(grouped).flat();

  // Toggle with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset selected on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected into view
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.cp-item');
    if (items && items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const runAction = useCallback((action) => {
    setIsOpen(false);
    setQuery('');
    // Small delay so modal closes first
    setTimeout(() => action.action(), 100);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % flatFiltered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flatFiltered.length) % flatFiltered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatFiltered[selectedIndex]) {
        runAction(flatFiltered[selectedIndex]);
      }
    }
  };

  // Render a flat index counter for keyboard tracking
  let flatIndex = -1;

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="cp-trigger"
        onClick={() => { setIsOpen(true); setQuery(''); setSelectedIndex(0); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        title="Command Palette (⌘K)"
      >
        <FaSearch />
        <span className="cp-trigger__label">Quick Nav</span>
        <span className="cp-trigger__shortcut">⌘K</span>
      </motion.button>

      {/* Palette modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="cp-modal"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="cp-search">
                <FaSearch className="cp-search__icon" />
                <input
                  ref={inputRef}
                  type="text"
                  className="cp-search__input"
                  placeholder="Search commands, sections, projects..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />
                <div className="cp-search__hint">
                  <kbd>↑↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
                </div>
              </div>

              {/* Results */}
              <div className="cp-results" ref={listRef}>
                {flatFiltered.length === 0 && (
                  <div className="cp-empty">No results found for "{query}"</div>
                )}
                {Object.entries(grouped).map(([section, items]) => (
                  <div key={section} className="cp-group">
                    <div className="cp-group__label">{section}</div>
                    {items.map((item) => {
                      flatIndex++;
                      const idx = flatIndex;
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          className={`cp-item ${idx === selectedIndex ? 'cp-item--active' : ''}`}
                          onClick={() => runAction(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <span className="cp-item__icon"><Icon /></span>
                          <span className="cp-item__label">{item.label}</span>
                          {idx === selectedIndex && (
                            <span className="cp-item__enter">↵</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="cp-footer">
                <FaKeyboard />
                <span>Press <kbd>⌘K</kbd> anywhere to open</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
