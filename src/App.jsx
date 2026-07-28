import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from './components/ErrorBoundary';
import LiquidBackground from './components/LiquidBackground';
import SplashScreen from './components/SplashScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

export default function App() {
  return (
    <ErrorBoundary>
      <LiquidBackground />
      <SplashScreen />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AIChat />
      <Analytics />
    </ErrorBoundary>
  );
}

