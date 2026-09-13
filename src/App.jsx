import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ProjectFilterProvider } from './context/ProjectFilterContext';
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
import CaseStudyPage from './components/CaseStudyPage';

function HomePage() {
  return (
    <ProjectFilterProvider>
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
    </ProjectFilterProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LiquidBackground />
        <SplashScreen />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
        </Routes>
        <Footer />
        <AIChat />
      </BrowserRouter>
      <Analytics />
    </ErrorBoundary>
  );
}
