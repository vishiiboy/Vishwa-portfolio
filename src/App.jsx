import React, { useEffect, useState } from 'react';
import './App.css';

// Import hero images explicitly so Vite hashes them correctly for production
import heroImg from './assets/images/hero.jpeg';
import hero2Img from './assets/images/hero2.jpeg';

// Import all images in the directory and directly get their default export (the URL string)
const imageModules = import.meta.glob('./assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' });

// Convert to an array, filtering out the hero images
const allImages = Object.keys(imageModules)
  .filter(key => !key.toLowerCase().includes('hero.'))
  .map((key, index) => ({
    id: index,
    src: imageModules[key] || '',
    title: `Selected Look ${index + 1}`
  }));

// Sort array alphabetically by filename so photos from the same shoot group together safely
const sortedGallery = [...allImages].sort((a, b) => (a.src || '').localeCompare(b.src || ''));

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The gallery items are now dynamically loaded and sorted from the images folder
  const galleryItems = sortedGallery;

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled-nav' : ''}`}>
        <div className="container">
          <div className="logo">PORTFOLIO</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#portfolio">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-split">
        <div className="hero-text-side">
          <span className="accent-text">Welcome to my portfolio</span>
          <h1 className="hero-title">VISHWA</h1>
          <p className="hero-subtitle">Freelance Model | 3rd Year IT Undergraduate</p>
        </div>
        <div className="hero-image-side">
          <div className="image-stack">
            <img src={hero2Img} alt="Vishwa Modeling" className="hero-portrait back-img" />
            <img src={heroImg} alt="Vishwa" className="hero-portrait front-img" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <div className="container">
          <h2 className="about-title">The Intersection of Tech & Style</h2>
          <p className="about-text">
            I am a 3rd year IT undergraduate at the <span className="highlight">Faculty of IT, University of Moratuwa</span>, but my passion extends beyond code. I specialize in freelance modeling, bringing the same precision and creativity from my studies into every photoshoot. Welcome to my visual diary.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section portfolio">
        <div className="container">
          <h2 className="portfolio-title">Selected Works</h2>
          <div className="masonry-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="grid-item">
                <img src={item.src} alt={item.title} loading="lazy" onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.target.src = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80`;
                }} />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <div className="container">
          <h2 className="about-title" style={{ fontSize: '2.5rem' }}>Let's Create Together</h2>
          <div className="social-links">
            <a href="https://www.instagram.com/vishiiboy._?igsi=ZG50Nm93YTUxNXZk&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:vishwa99prb@gmail.com">Email Me</a>
            <a href="https://www.linkedin.com/in/vishwa-prabodhana-76a065432?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} Vishwa. Designed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
