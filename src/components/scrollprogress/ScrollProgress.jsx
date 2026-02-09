import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './scrollProgress.scss';

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollPercent(Math.round(progress * 100));
      scaleX.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleX]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Floating percentage indicator */}
      <motion.div
        className="scroll-progress__indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollPercent > 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 36 36" className="scroll-progress__ring">
          <path
            className="scroll-progress__ring-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="scroll-progress__ring-fill"
            strokeDasharray={`${scrollPercent}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="scroll-progress__value">{scrollPercent}</span>
      </motion.div>
    </>
  );
};

export default ScrollProgress;
