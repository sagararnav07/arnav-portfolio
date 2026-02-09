import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor.scss";

const Cursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [text, setText] = useState('');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Smooth spring for outer ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback((e) => {
    dotX.set(e.clientX);
    dotY.set(e.clientY);
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY, dotX, dotY]);

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window) {
      setHidden(true);
      return;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", () => setClicked(true));
    window.addEventListener("mouseup", () => setClicked(false));

    // Track interactive elements
    const addHover = () => setHovered(true);
    const removeHover = () => { setHovered(false); setText(''); };

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, .btn, .social-link, .tech-pill, .doing-card, .project-card, .term-project, .cmd-item, .cmd-trigger, input, textarea, .portfolio-item, .blog-card'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });

      const textEls = document.querySelectorAll('[data-cursor-text]');
      textEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setHovered(true);
          setText(el.dataset.cursorText);
        });
        el.addEventListener('mouseleave', removeHover);
      });
    };

    // Observe DOM for dynamically added elements
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      observer.disconnect();
    };
  }, [onMouseMove]);

  if (hidden) return null;

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        className={`cursor-ring ${hovered ? 'cursor-ring--hover' : ''} ${clicked ? 'cursor-ring--click' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {text && <span className="cursor-ring__text">{text}</span>}
      </motion.div>

      {/* Inner dot — follows instantly */}
      <motion.div
        className={`cursor-dot ${hovered ? 'cursor-dot--hover' : ''}`}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default Cursor;
