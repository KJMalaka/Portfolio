import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

export default function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Skills />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </ErrorBoundary>
  );
}
