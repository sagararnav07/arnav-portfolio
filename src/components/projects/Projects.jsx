import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiSocketdotio,
  SiLeaflet,
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiReact,
  SiVite,
  SiMongodb,
  SiNodedotjs,
  SiDocker,
  SiFramer,
  SiPython,
  SiStreamlit,
  SiPlotly,
  SiPandas,
} from 'react-icons/si';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import './projects.scss';

/**
 * Project data — each entry drives a ProjectCard
 */
const projects = [
  {
    id: 'jobnest',
    title: 'JobNest',
    description:
      'AI-powered personality-based job matching platform. Candidates take a Big Five (OCEAN) assessment and get matched to employers based on personality compatibility — going beyond traditional keyword-based hiring.',
    video: '/Jobnest.mp4',
    liveLink: 'https://job-nest.dev',
    githubLink: 'https://github.com/sagararnav07/JobNest',
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#ffffff' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#ffffff' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Framer', icon: SiFramer, color: '#BB4BFF' },
    ],
  },
  {
    id: 'rentiful',
    title: 'Rentiful',
    description:
      'Full-stack rental property management platform connecting tenants with property managers. Features interactive map search with PostGIS, real-time messaging, lease management, and role-based dashboards.',
    video: '/Rentiful.mp4',
    liveLink: 'https://rentiful-three.vercel.app',
    githubLink: 'https://github.com/sagararnav07/Rentiful',
    techStack: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
      { name: 'Express', icon: SiExpress, color: '#ffffff' },
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#ffffff' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Leaflet', icon: SiLeaflet, color: '#199900' },
    ],
  },
  {
    id: 'webchat-analyzer',
    title: 'Webchat Analyzer',
    description:
      'AI-powered WhatsApp chat sentiment analyzer with real-time NLP classification, interactive Plotly dashboards, emoji analytics, activity heatmaps, and an integrated Groq-powered AI chat assistant.',
    video: '/webchatanalyzer.mp4',
    liveLink: 'https://webchatanalyzer.streamlit.app/',
    githubLink: 'https://github.com/sagararnav07/Whatsapp_chat_sentiment_analysis',
    techStack: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
      { name: 'Plotly', icon: SiPlotly, color: '#3F4F75' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-section">
      <div className="container">
        <SectionHeader
          title="Featured Projects"
          subtitle="Production-grade applications built with modern technologies"
        />

        <div className="projects__showcase">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDetail
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
