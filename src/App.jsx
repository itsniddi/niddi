import { useCallback, useState } from 'react';
import About from './components/About.jsx';
import Background from './components/Background.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import LegalModal from './components/LegalModal.jsx';
import Navbar from './components/Navbar.jsx';
import Socials from './components/Socials.jsx';
import YouTubeSection from './components/YouTubeSection.jsx';

export default function App() {
  const [legal, setLegal] = useState(null);
  const closeLegal = useCallback(() => setLegal(null), []);

  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Socials />
        <YouTubeSection />
        {/* <Contact onOpenLegal={setLegal} /> */}
      </main>
      <Footer onOpenLegal={setLegal} />
      <LegalModal docKey={legal} onClose={closeLegal} />
    </>
  );
}
