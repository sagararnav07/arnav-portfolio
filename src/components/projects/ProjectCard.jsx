import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import TechIcon from './TechIcon';

/**
 * Cinematic project card — video plays as full background with glassmorphic overlay
 * Uses IntersectionObserver to only play video when visible (saves bandwidth & battery)
 */
const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const [isPaused, setIsPaused] = useState(false);

  // Lazy-play: only run video when card is visible in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isPaused]);

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <motion.article
      ref={cardRef}
      className={`pcard pcard--${index % 2 === 1 ? 'reverse' : 'normal'}`}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
    >
      {/* ─── Video Background ─── */}
      <div className="pcard__video-side">
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster || ''}
          muted
          loop
          playsInline
          preload="metadata"
          className="pcard__video"
        />
        <div className="pcard__video-overlay" />

        {/* Video play/pause control */}
        <motion.button
          className="pcard__video-control"
          onClick={toggleVideo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPaused ? <FaPlay /> : <FaPause />}
        </motion.button>

        {/* Project number */}
        <span className="pcard__number">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ─── Content Side ─── */}
      <div className="pcard__content">
        <div className="pcard__content-inner">
          {/* Badge */}
          <motion.span
            className="pcard__badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            Featured Project
          </motion.span>

          {/* Title */}
          <motion.h3
            className="pcard__title"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.35 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="pcard__desc"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            className="pcard__tech"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {project.techStack.map((tech, i) => (
              <TechIcon key={tech.name} icon={tech.icon} name={tech.name} color={tech.color} index={i} />
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="pcard__actions"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.6 }}
          >
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pcard__btn pcard__btn--primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt />
                <span>Live Demo</span>
              </motion.a>
            )}
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pcard__btn pcard__btn--ghost"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub />
              <span>Source Code</span>
            </motion.a>
            <motion.button
              className="pcard__btn pcard__btn--read-more"
              whileHover={{ x: 5 }}
              onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            >
              <span>Read More</span>
              <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
