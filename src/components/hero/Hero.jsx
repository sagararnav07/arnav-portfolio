import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFileDownload, FaCloud, FaCode, FaCubes } from 'react-icons/fa';
import { SiHashnode, SiLeetcode, SiGeeksforgeeks, SiKubernetes } from 'react-icons/si';
import AvatarModel from './AvatarModel';
import './hero.scss';

const socialLinks = [
  { icon: <FaGithub />, href: 'https://github.com/sagararnav07', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/arnav-sagar-88b03a291/', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: 'https://x.com/arnav_sagar07', label: 'Twitter' },
  { icon: <SiHashnode />, href: 'https://hashnode.com/@Arnav07', label: 'Hashnode' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Arnav_07/', label: 'LeetCode' },
  { icon: <SiGeeksforgeeks />, href: 'https://www.geeksforgeeks.org/user/arnav07n1nj/', label: 'GeeksforGeeks' },
];

const techStack = ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Terraform'];

const whatImDoing = [
  {
    icon: <SiKubernetes />,
    title: 'DevOps',
    description: 'I enjoy to improve the speed and quality of delivery, automate and achieve CI/CD'
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Engineer',
    description: "I enjoy design, secure and maintenance of an organization's cloud-based infrastructure and application"
  },
  {
    icon: <FaCubes />,
    title: 'Web 3',
    description: 'I explore decentralized applications, blockchain technology, and smart contract development'
  },
  {
    icon: <FaCode />,
    title: 'Software Development',
    description: 'I enjoy building full-stack applications using MERN Stack for personal and professional purposes'
  }
];

const Hero = () => {
  return (
    <div className="hero">
      {/* Scrolling Background Text */}
      <div className="hero__sliding-text">
        <div className="hero__sliding-text-track">
          <span>DEVELOPMENT</span>
          <span>DEVOPS</span>
          <span>CLOUD</span>
          <span>DEVELOPMENT</span>
          <span>DEVOPS</span>
          <span>CLOUD</span>
          <span>DEVELOPMENT</span>
          <span>DEVOPS</span>
          <span>CLOUD</span>
        </div>
      </div>

      <div className="hero__container">
        {/* Left Content */}
        <motion.div 
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="hero__greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hero__wave">👋</span>
            <span>Hello, I'm</span>
          </motion.div>

          <motion.div 
            className="hero__name-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="hero__profile-image">
              <img src="/public.png" alt="Arnav Sagar" />
            </div>
            <h1 className="hero__name">
              Arnav <span className="text-gradient">Sagar</span>
            </h1>
          </motion.div>

          <motion.div 
            className="hero__title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="hero__role">Full Stack Developer</span>
            <span className="hero__divider">•</span>
            <span className="hero__role">DevOps Engineer</span>
            <span className="hero__divider">•</span>
            <span className="hero__role">Cloud Enthusiast</span>
          </motion.div>

          <motion.p 
            className="hero__bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Digital Specialist Engineer at Infosys, passionate about building scalable 
            full-stack applications and cloud infrastructure. MERN Stack Developer 
            with expertise in AWS, Docker, Kubernetes, and CI/CD automation.
          </motion.p>

          {/* Tech Stack Pills */}
          <motion.div 
            className="hero__tech"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {techStack.map((tech, index) => (
              <motion.span 
                key={tech}
                className="tech-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a 
              href="#contact" 
              className="btn btn--primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
            <motion.a 
              href="https://drive.google.com/drive/folders/1dUvFdaSnas69JPCZcWFSWDk0WNCcvSNH?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileDownload />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="hero__social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ y: -3, color: '#8b5cf6' }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - 3D Avatar & Stats */}
        <motion.div 
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hero__3d-avatar">
            <Suspense fallback={
              <div className="avatar-loading">
                <div className="avatar-loading__spinner"></div>
              </div>
            }>
              <AvatarModel />
            </Suspense>
          </div>

          {/* Stats Cards */}
          <motion.div 
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="stat-card">
              <span className="stat-value">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">2+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">5+</span>
              <span className="stat-label">Certifications</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* What I'm Doing Section */}
      <motion.div 
        className="what-im-doing"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <h2 className="what-im-doing__title">What I'm Doing</h2>
        <div className="what-im-doing__grid">
          {whatImDoing.map((item, index) => (
            <motion.div
              key={item.title}
              className="doing-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.3)' }}
            >
              <div className="doing-card__icon">
                {item.icon}
              </div>
              <h3 className="doing-card__title">{item.title}</h3>
              <p className="doing-card__description">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-line" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
