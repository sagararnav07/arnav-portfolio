import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaBriefcase, FaCode, FaEnvelope, FaFileAlt, FaBook 
} from 'react-icons/fa';
import './Sidebar.scss';

const navItems = [
  { id: 'about', icon: <FaUser />, label: 'About', href: '#about' },
  { id: 'experience', icon: <FaBriefcase />, label: 'Experience', href: '#experience' },
  { id: 'skills', icon: <FaCode />, label: 'Skills', href: '#skills' },
  { id: 'portfolio', icon: <FaFileAlt />, label: 'Portfolio', href: '#portfolio' },
  { id: 'blog', icon: <FaBook />, label: 'Blog', href: '#blog' },
  { id: 'contact', icon: <FaEnvelope />, label: 'Contact', href: '#contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 738);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      initial={isMobile ? { y: 100, opacity: 0 } : { x: -100, opacity: 0 }}
      animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="sidebar-logo">
        <motion.div 
          className="logo-icon"
          whileHover={{ scale: 1.1 }}
        >
          AS
        </motion.div>
        <span className="logo-text">Arnav</span>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.href}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, item.href)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
            {activeSection === item.id && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Available for work</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
