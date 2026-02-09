import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * TextScramble — Matrix/hacker-style text reveal effect.
 * Uses only uppercase latin letters so width stays stable.
 */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const TextScramble = ({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  speed = 25,
  scrambleDuration = 500,
  once = true,
  ...props
}) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-30px' });
  const hasRun = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    if (once && hasRun.current) return;
    hasRun.current = true;

    let frame = 0;
    const totalFrames = Math.ceil(scrambleDuration / speed);
    const chars = text.split('');

    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const resolveUpTo = Math.floor(progress * chars.length);

        const output = chars
          .map((char, i) => {
            if (char === ' ' || char === '&') return char;
            if (i < resolveUpTo) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplay(output);

        if (frame >= totalFrames) {
          clearInterval(intervalRef.current);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, text, delay, speed, scrambleDuration, once]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {display}
    </Tag>
  );
};

export default TextScramble;
