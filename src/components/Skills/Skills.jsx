import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaPython, FaLinux 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiMongodb, SiKubernetes, 
  SiTerraform, SiGrafana, SiPrometheus, SiExpress, SiPostgresql,
  SiRedis, SiJenkins, SiGooglecloud, SiNginx
} from 'react-icons/si';
import SectionHeader from '../ui/SectionHeader';
import './Skills.scss';

const skillCategories = [
  {
    title: "Frontend",
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    ]
  },
  {
    title: "Backend",
    description: "Creating scalable server-side applications",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Express.js", icon: <SiExpress />, color: "#ffffff" },
      { name: "Python", icon: <FaPython />, color: "#3776AB" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    ]
  },
  {
    title: "DevOps",
    description: "Automating deployment and infrastructure",
    skills: [
      { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
      { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
      { name: "Terraform", icon: <SiTerraform />, color: "#7B42BC" },
      { name: "Jenkins", icon: <SiJenkins />, color: "#D24939" },
    ]
  },
  {
    title: "Cloud",
    description: "Deploying and managing cloud infrastructure",
    skills: [
      { name: "AWS", icon: <FaAws />, color: "#FF9900" },
      { name: "GCP", icon: <SiGooglecloud />, color: "#4285F4" },
      { name: "Linux", icon: <FaLinux />, color: "#FCC624" },
      { name: "Nginx", icon: <SiNginx />, color: "#009639" },
    ]
  },
  {
    title: "Databases",
    description: "Managing and optimizing data storage",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
    ]
  },
  {
    title: "Monitoring",
    description: "Observability and performance tracking",
    skills: [
      { name: "Grafana", icon: <SiGrafana />, color: "#F46800" },
      { name: "Prometheus", icon: <SiPrometheus />, color: "#E6522C" },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
    ]
  }
];

const dailyTools = [
  { name: "Grafana", icon: <SiGrafana />, color: "#F46800" },
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
  { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
  { name: "K8s", icon: <SiKubernetes />, color: "#326CE5" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { name: "Terraform", icon: <SiTerraform />, color: "#7B42BC" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const Skills = () => {
  return (
    <div className="skills">
      <div className="container">
        <SectionHeader 
          title="Skills & Technologies"
          subtitle="Technologies I use to build modern, scalable applications"
        />

        <motion.div 
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="skill-card__header">
                <h3 className="skill-card__title">{category.title}</h3>
                <p className="skill-card__description">{category.description}</p>
              </div>
              
              <div className="skill-card__skills">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    className="skill-item"
                    whileHover={{ scale: 1.05 }}
                    style={{ '--skill-color': skill.color }}
                  >
                    <span className="skill-item__icon">{skill.icon}</span>
                    <span className="skill-item__name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools I Use Daily - Scrolling Section */}
        <motion.div 
          className="daily-tools"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="daily-tools__title">Tools I Use Daily</h3>
          <div className="daily-tools__track-wrapper">
            <div className="daily-tools__track">
              {[...dailyTools, ...dailyTools, ...dailyTools].map((tool, index) => (
                <div 
                  key={index} 
                  className="daily-tools__card"
                  style={{ '--tool-color': tool.color }}
                >
                  <span className="daily-tools__icon">{tool.icon}</span>
                  <span className="daily-tools__name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
