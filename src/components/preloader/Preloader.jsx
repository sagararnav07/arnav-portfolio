import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './preloader.scss';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → reveal → done

  useEffect(() => {
    // Simulate loading progress
    const duration = 2200;
    const steps = 60;
    const increment = 100 / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment + Math.random() * 2;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => setPhase('reveal'), 300);
        setTimeout(() => {
          setPhase('done');
          onComplete?.();
        }, 1400);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background grid */}
          <div className="preloader__grid" />

          {/* Floating orbs */}
          <div className="preloader__orbs">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="preloader__orb"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                  x: [0, (i % 2 ? 30 : -30), 0],
                  y: [0, (i % 3 ? -20 : 20), 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                }}
              />
            ))}
          </div>

          {/* Center content */}
          <div className="preloader__center">
            {/* Logo / initials */}
            <motion.div
              className="preloader__logo"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={
                phase === 'reveal'
                  ? { opacity: 1, scale: [1, 1.2, 50], rotateY: 0 }
                  : { opacity: 1, scale: 1, rotateY: 0 }
              }
              transition={
                phase === 'reveal'
                  ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.8, ease: 'easeOut' }
              }
            >
              <span className="preloader__initials">AS</span>
              <motion.div
                className="preloader__logo-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="preloader__logo-ring preloader__logo-ring--reverse"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Name reveal */}
            <motion.div
              className="preloader__name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'reveal' ? 0 : 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="preloader__first">Arnav</span>
              <span className="preloader__last">Sagar</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'reveal' ? 0 : 0.5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Full Stack Developer & DevOps Engineer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="preloader__progress"
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: phase === 'reveal' ? 0 : 1,
                width: '200px',
              }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="preloader__progress-track">
                <motion.div
                  className="preloader__progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="preloader__progress-text">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>

          {/* Bottom scan line */}
          <motion.div
            className="preloader__scanline"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
