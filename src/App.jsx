import React, { useState, useCallback, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import "./app.scss";
import Preloader from "./components/preloader/Preloader";
import ErrorBoundary from "./components/ErrorBoundary";
import useVisitorTracker from "./hooks/useVisitorTracker";

// Lazy-load heavy components to reduce initial bundle size
const Contact = lazy(() => import("./components/contact/Contact"));
const Cursor = lazy(() => import("./components/cursor/Cursor"));
const Hero = lazy(() => import("./components/hero/Hero"));
const Sidebar = lazy(() => import("./components/layout/Sidebar"));
const Parallax = lazy(() => import("./components/parallax/Parallax"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Projects = lazy(() => import("./components/projects/Projects"));
const Services = lazy(() => import("./components/services/Services"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Terminal = lazy(() => import("./components/terminal/Terminal"));
const CommandPalette = lazy(() => import("./components/commandpalette/CommandPalette"));
const ParticleBackground = lazy(() => import("./components/particles/ParticleBackground"));
const SmoothScroll = lazy(() => import("./components/smoothscroll/SmoothScroll"));
const ScrollProgress = lazy(() => import("./components/scrollprogress/ScrollProgress"));

const App = () => {
  const [loading, setLoading] = useState(true);
  useVisitorTracker();

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Cinematic Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <Suspense fallback={null}>
        {/* Particle constellation background */}
        <ErrorBoundary name="ParticleBackground">
          <ParticleBackground />
        </ErrorBoundary>

        {/* Scroll progress bar + circular indicator */}
        <ErrorBoundary name="ScrollProgress">
          <ScrollProgress />
        </ErrorBoundary>

        <SmoothScroll>
          <div className="app-container">
            <Cursor />
            <Sidebar />
            <CommandPalette />
        
            <main className="main-content">
              <section id="about">
                <ErrorBoundary name="Hero">
                  <Hero />
                </ErrorBoundary>
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
      </Suspense>
    </>
  );
};

export default App;
