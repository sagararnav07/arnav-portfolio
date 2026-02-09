import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated tech stack icon with hover effects
 */
const TechIcon = ({ icon: Icon, name, color, index }) => {
  return (
    <motion.div
      className="tech-icon"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.2, y: -4 }}
      title={name}
    >
      <motion.div
        className="tech-icon__inner"
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.2,
          ease: 'easeInOut',
        }}
      >
        <Icon style={{ color }} />
      </motion.div>
      <span className="tech-icon__label">{name}</span>
    </motion.div>
  );
};

export default TechIcon;
