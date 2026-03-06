import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCertificate, FaAward, FaCheckCircle } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import './portfolio.scss';

const portfolioItems = [
  // Certifications
  {
    id: 1,
    type: 'certification',
    title: "HackerRank Problem Solving (Basic)",
    description: "Certified in fundamental problem solving skills including data structures, algorithms, and logical thinking.",
    image: "/hackerrank-cert.png",
    issuer: "HackerRank",
    date: "Aug 2023",
    verifyLink: "https://www.hackerrank.com/certificates/a8b1cbae3fef",
  },
  {
    id: 2,
    type: 'certification',
    title: "HackerRank Problem Solving (Intermediate)",
    description: "Certified in intermediate problem solving skills including HashMaps, stacks, queues, and optimal algorithm design.",
    image: "/hackerrank-intermediate-cert.png",
    issuer: "HackerRank",
    date: "2023",
    verifyLink: "https://www.hackerrank.com/certificates/9515d1245b24",
  },
  
  {
    id: 6,
    type: 'certification',
    title: "HackerRank React (Basic)",
    description: "Certified in React fundamentals including routing, rendering elements, state management, and form validation.",
    image: "/react-cert.png",
    issuer: "HackerRank",
    date: "2023",
    verifyLink: "https://www.hackerrank.com/skills-verification/react_basic",
  },
  // Badges
  {
    id: 7,
    type: 'badge',
    title: "GitHub Arctic Code Vault",
    description: "Contributed code to the 2020 GitHub Archive Program.",
    image: "/Github.png",
    issuer: "GitHub",
  },
];

const tabs = [
  { id: 'all', label: 'All', icon: null },
  { id: 'certification', label: 'Certifications', icon: <FaCertificate /> },
  { id: 'badge', label: 'Badges', icon: <FaAward /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === activeTab);

  const getTypeLabel = (type) => {
    const labels = {
      project: 'Project',
      certification: 'Certification',
      badge: 'Badge'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      project: '#8b5cf6',
      certification: '#10b981',
      badge: '#f59e0b'
    };
    return colors[type] || '#8b5cf6';
  };

  return (
    <div className="portfolio-section">
      <div className="container">
        <SectionHeader 
          title="Portfolio"
          subtitle="My projects, certifications, and achievements"
        />

        {/* Filter Tabs */}
        <div className="portfolio__tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  className="tab-indicator"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          className="portfolio__grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article 
                key={item.id}
                className="portfolio-card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
                layout
              >
                {/* Type Badge */}
                <span 
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(item.type) }}
                >
                  {getTypeLabel(item.type)}
                </span>

                <div className="portfolio-card__image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-card__overlay">
                    {item.github && (
                      <a 
                        href={item.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                        title="View Source"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                        title="View"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>

                <div className="portfolio-card__content">
                  <h3 className="portfolio-card__title">{item.title}</h3>
                  
                  {item.issuer && (
                    <p className="portfolio-card__issuer">
                      {item.issuer} {item.date && `• ${item.date}`}
                    </p>
                  )}
                  
                  <p className="portfolio-card__description">{item.description}</p>
                  
                  {item.tags && (
                    <div className="portfolio-card__tags">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  {item.verifyLink && (
                    <a 
                      href={item.verifyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="verify-btn"
                    >
                      <FaCheckCircle />
                      <span>Verify Credentials</span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Link */}
        <motion.div 
          className="github-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a 
            href="https://github.com/sagararnav07" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
