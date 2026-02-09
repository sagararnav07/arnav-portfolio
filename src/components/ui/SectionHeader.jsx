import React from 'react';
import { motion } from 'framer-motion';
import TextScramble from '../textscramble/TextScramble';
import './SectionHeader.scss';

const SectionHeader = ({ title, subtitle, align = 'left' }) => {
  return (
    <motion.div 
      className={`section-header section-header--${align}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">
        <TextScramble text={title} as="span" speed={25} scrambleDuration={800} />
        <motion.span 
          className="title-underline"
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;
