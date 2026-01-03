import React from "react";
import { motion } from "framer-motion";
import './Skills.scss';
import { 
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaPython, FaLinux, FaDatabase 
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiMongodb, SiKubernetes, 
  SiTerraform, SiGrafana, SiPrometheus, SiNginx, SiExpress, SiPostgresql,
  SiRedis, SiJenkins, SiGooglecloud
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    icon: <FaReact />,
    color: "#61DAFB",
    skills: [
      { name: "React.js", icon: <FaReact />, level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, level: 85 },
      { name: "TypeScript", icon: <SiTypescript />, level: 80 },
      { name: "JavaScript", icon: <SiJavascript />, level: 95 },
    ]
  },
  {
    title: "Backend",
    icon: <FaNodeJs />,
    color: "#68A063",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, level: 90 },
      { name: "Express.js", icon: <SiExpress />, level: 85 },
      { name: "Python", icon: <FaPython />, level: 75 },
      { name: "MongoDB", icon: <SiMongodb />, level: 85 },
    ]
  },
  {
    title: "DevOps",
    icon: <FaDocker />,
    color: "#2496ED",
    skills: [
      { name: "Docker", icon: <FaDocker />, level: 90 },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 80 },
      { name: "Terraform", icon: <SiTerraform />, level: 75 },
      { name: "Jenkins", icon: <SiJenkins />, level: 70 },
    ]
  },
  {
    title: "Cloud & Tools",
    icon: <FaAws />,
    color: "#FF9900",
    skills: [
      { name: "AWS", icon: <FaAws />, level: 85 },
      { name: "GCP", icon: <SiGooglecloud />, level: 70 },
      { name: "Git", icon: <FaGitAlt />, level: 95 },
      { name: "Linux", icon: <FaLinux />, level: 85 },
    ]
  },
  {
    title: "Monitoring",
    icon: <SiGrafana />,
    color: "#F46800",
    skills: [
      { name: "Grafana", icon: <SiGrafana />, level: 80 },
      { name: "Prometheus", icon: <SiPrometheus />, level: 75 },
      { name: "Nginx", icon: <SiNginx />, level: 70 },
      { name: "Redis", icon: <SiRedis />, level: 65 },
    ]
  },
  {
    title: "Databases",
    icon: <FaDatabase />,
    color: "#336791",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, level: 85 },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 75 },
      { name: "Redis", icon: <SiRedis />, level: 70 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const skillBarVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.3
    }
  })
};

const Skills = () => {
  return (
    <div className="skills-section">
      <motion.div 
        className="skills-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div className="skills-header" variants={cardVariants}>
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            WHAT I WORK WITH
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Tech Stack & Skills
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <motion.div className="skills-grid" variants={containerVariants}>
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${category.color}20`
              }}
            >
              <div className="card-header" style={{ borderColor: category.color }}>
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex} 
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <div className="skill-info">
                      <span className="skill-icon" style={{ color: category.color }}>
                        {skill.icon}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        style={{ backgroundColor: category.color }}
                        variants={skillBarVariants}
                        custom={skill.level}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="tools-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="tools-title">Tools I Use Daily</h3>
          <div className="tools-marquee">
            <motion.div 
              className="tools-track"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="tools-set">
                  <div className="tool-item"><FaReact /><span>React</span></div>
                  <div className="tool-item"><SiNextdotjs /><span>Next.js</span></div>
                  <div className="tool-item"><FaNodeJs /><span>Node.js</span></div>
                  <div className="tool-item"><FaDocker /><span>Docker</span></div>
                  <div className="tool-item"><SiKubernetes /><span>K8s</span></div>
                  <div className="tool-item"><FaAws /><span>AWS</span></div>
                  <div className="tool-item"><SiTerraform /><span>Terraform</span></div>
                  <div className="tool-item"><FaGitAlt /><span>Git</span></div>
                  <div className="tool-item"><SiMongodb /><span>MongoDB</span></div>
                  <div className="tool-item"><SiGrafana /><span>Grafana</span></div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
