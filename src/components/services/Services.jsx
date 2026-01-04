import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import './services.scss';

const experiences = [
  {
    type: 'work',
    title: 'Digital Specialist Engineer',
    company: 'Infosys',
    location: 'Pune, India',
    period: 'Sep 2025 - Present',
    description: [
      'Architecting and developing scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js (MERN) stack, serving 10,000+ daily active users',
      'Designing and implementing RESTful APIs with comprehensive authentication mechanisms including JWT and OAuth 2.0, ensuring enterprise-grade security standards',
      'Collaborating with cross-functional teams in Agile/Scrum environment to deliver high-quality software solutions within sprint deadlines',
      'Optimizing application performance through code refactoring, lazy loading, and database query optimization, achieving 40% improvement in page load times',
      'Building responsive and accessible user interfaces following WCAG guidelines and modern UI/UX best practices',
      'Implementing CI/CD pipelines using Jenkins and GitHub Actions for automated testing and deployment workflows',
      'Mentoring junior developers on best practices in clean code architecture, design patterns, and code review processes'
    ],
    logo: '/infosys-logo.svg'
  },
  {
    type: 'work',
    title: 'DevOps Intern',
    company: 'Code for GovTech',
    location: 'Open Source Program',
    period: 'Jul 2023 - Aug 2023',
    description: [
      'Contributed to open-source program focused on refactoring components and optimizing code',
      'Strategically optimized product infrastructure on AWS, reducing costs by over 50%',
      'Managed Docker container clusters using Kubernetes with 99.8% uptime',
      'Established Kubernetes cluster monitoring using Prometheus & Grafana'
    ],
    logo: '/code 4 gov tech.png'
  },
  {
    type: 'work',
    title: 'Open Source Contributor',
    company: 'GitHub',
    location: 'Remote',
    period: 'Jul 2023 - Present',
    description: [
      'Actively contributing to open-source repositories with 50+ pull requests merged across multiple projects, enhancing functionality and fixing critical bugs',
      'Collaborating with global developer communities to review code, provide constructive feedback, and maintain high code quality standards',
      'Developing and maintaining comprehensive documentation for open-source projects, improving onboarding experience for new contributors',
      'Implementing new features and performance optimizations resulting in improved application efficiency and user experience',
      'Participating in issue triage and bug resolution, reducing open issues by 30% in contributed repositories'
    ],
    logo: '/Github.png'
  }
];

const education = [
  {
    type: 'education',
    title: 'Bachelor of Technology',
    company: 'KIIT University',
    location: 'Bhubaneswar, India',
    period: '2021 - 2025',
    description: [
      'Computer Science and Engineering',
      'Focus on Software Development and Cloud Computing'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const Services = () => {
  return (
    <div className="experience-section">
      <div className="container">
        <SectionHeader 
          title="Experience"
          subtitle="My professional journey and contributions"
        />

        <div className="experience-layout">
          {/* Work Experience */}
          <div className="experience-column">
            <div className="column-header">
              <FaBriefcase className="column-icon" />
              <h3>Work Experience</h3>
            </div>
            
            <motion.div 
              className="timeline"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item"
                  variants={itemVariants}
                >
                  <div className="timeline-marker">
                    <div className="timeline-dot" />
                    {index < experiences.length - 1 && <div className="timeline-line" />}
                  </div>
                  
                  <motion.div 
                    className="timeline-card"
                    whileHover={{ y: -3 }}
                  >
                    <div className="card-header">
                      {exp.logo && (
                        <img src={exp.logo} alt={exp.company} className="company-logo" />
                      )}
                      <div className="card-info">
                        <h4 className="card-title">{exp.title}</h4>
                        <p className="card-company">{exp.company}</p>
                        <div className="card-meta">
                          <span className="card-period">{exp.period}</span>
                          <span className="card-location">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="card-description">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div className="experience-column">
            <div className="column-header">
              <FaGraduationCap className="column-icon" />
              <h3>Education</h3>
            </div>
            
            <motion.div 
              className="timeline"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item"
                  variants={itemVariants}
                >
                  <div className="timeline-marker">
                    <div className="timeline-dot timeline-dot--education" />
                  </div>
                  
                  <motion.div 
                    className="timeline-card"
                    whileHover={{ y: -3 }}
                  >
                    <div className="card-header">
                      <div className="card-info">
                        <h4 className="card-title">{edu.title}</h4>
                        <p className="card-company">{edu.company}</p>
                        <div className="card-meta">
                          <span className="card-period">{edu.period}</span>
                          <span className="card-location">{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="card-description">
                      {edu.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
