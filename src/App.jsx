import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import "./app.scss";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Sidebar from "./components/layout/Sidebar";
import Parallax from "./components/parallax/Parallax";
import Skills from "./components/Skills/Skills";
import Portfolio from "./components/portfolio/Portfolio";
import Projects from "./components/projects/Projects";
import Services from "./components/services/Services";
import Blog from "./components/blog/Blog";
import Terminal from "./components/terminal/Terminal";
import CommandPalette from "./components/commandpalette/CommandPalette";
import Preloader from "./components/preloader/Preloader";
import ParticleBackground from "./components/particles/ParticleBackground";
import SmoothScroll from "./components/smoothscroll/SmoothScroll";
import ScrollProgress from "./components/scrollprogress/ScrollProgress";

const App = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Cinematic Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Particle constellation background */}
      <ParticleBackground />

      {/* Scroll progress bar + circular indicator */}
      <ScrollProgress />

      <SmoothScroll>
        <div className="app-container">
          <Cursor />
          <Sidebar />
          <CommandPalette />
      
      <main className="main-content">
        <section id="about">
          <Hero />
        </section>

        <section className="parallax-section">
          <Parallax type="services" />
        </section>

        <section id="experience">
          <Services />
        </section>

        <section className="parallax-section">
          <Parallax type="portfolio" />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="portfolio">
          <Portfolio />
        </section>

        <section id="blog">
          <Blog />
        </section>

        <section id="terminal" className="terminal-section">
          <Terminal />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
    </SmoothScroll>
    </>
  );
};

export default App;
