import React from 'react';
import { motion } from 'framer-motion';
import './Card.scss';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  variant = 'default', // default, gradient, outlined
  padding = 'normal', // small, normal, large
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      className={`card card--${variant} card--${padding} ${hover ? 'card--hover' : ''} ${className}`}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
