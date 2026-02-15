import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 738;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: isMobile ? 30 : 60,
    particles: {
      number: {
        value: isMobile ? 20 : 60,
        density: { enable: true, width: 1920, height: 1080 },
      },
      color: {
        value: ['#8b5cf6', '#06b6d4', '#10b981'],
      },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
      links: {
        enable: true,
        distance: isMobile ? 120 : 150,
        color: '#8b5cf6',
        opacity: 0.08,
        width: 1,
        triangles: {
          enable: !isMobile,
          opacity: 0.02,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.25,
            color: '#06b6d4',
          },
        },
        push: {
          quantity: isMobile ? 1 : 3,
        },
      },
    },
    detectRetina: true,
    background: { color: 'transparent' },
  }), []);

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
