import "./app.scss";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Sidebar from "./components/layout/Sidebar";
import Parallax from "./components/parallax/Parallax";
import Skills from "./components/Skills/Skills";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Blog from "./components/blog/Blog";

const App = () => {
  return (
    <div className="app-container">
      <Cursor />
      <Sidebar />
      
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

        <section id="portfolio">
          <Portfolio />
        </section>

        <section id="blog">
          <Blog />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default App;
