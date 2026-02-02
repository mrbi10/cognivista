/**
 * COGNIVISTA 2026 - MAIN APPLICATION ENTRY POINT
 * * A high-performance, interactive React application featuring:
 * - Framer Motion for cinematic transitions
 * - Custom Physics-based animations
 * - Responsive Glassmorphism Design
 * - Dynamic Theme Engine
 * * @author Cognivista Tech Team
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link
} from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  useInView
} from 'framer-motion';

// --- USER EVENT IMPORTS ---
// Ensure these files exist in your src/events/ folder
import Event1 from './events/Event1';
import Event2 from './events/Event2';
import Event3 from './events/Event3';
import Event4 from './events/Event4';

// =============================================================================
// 1. GLOBAL STYLES & ASSETS (Icons, Fonts, Reset)
// =============================================================================

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>,
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>,
  Moon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  ChevronDown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800;900&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

    :root {
      /* --- COLOR PALETTE --- */
      --color-brand: #6366f1;
      --color-brand-glow: rgba(99, 102, 241, 0.5);
      
      /* Light Theme */
      --bg-light: #ffffff;
      --surface-light: #f8fafc;
      --text-light: #0f172a;
      --text-muted-light: #64748b;
      --border-light: #e2e8f0;

      /* Dark Theme */
      --bg-dark: #020617;
      --surface-dark: #0f172a;
      --text-dark: #f8fafc;
      --text-muted-dark: #94a3b8;
      --border-dark: #1e293b;

      /* Spacing */
      --container-width: 1280px;
      --nav-height: 80px;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html { 
      scroll-behavior: smooth; 
      font-size: 16px;
    }

    body {
      font-family: 'Inter', sans-serif;
      transition: background-color 0.4s ease, color 0.4s ease;
      overflow-x: hidden;
      width: 100vw;
    }

    h1, h2, h3, h4, h5 { font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
    
    a { text-decoration: none; color: inherit; }
    button { font-family: inherit; }

    /* --- UTILITIES --- */
    .glass {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }

    /* Selection */
    ::selection { background: var(--color-brand); color: white; }
  `}</style>
);

// =============================================================================
// 2. THEME & CONTEXT ENGINE
// =============================================================================

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const colors = theme === 'dark' ? {
    bg: 'var(--bg-dark)',
    surface: 'var(--surface-dark)',
    text: 'var(--text-dark)',
    muted: 'var(--text-muted-dark)',
    border: 'var(--border-dark)',
    brand: 'var(--color-brand)',
    glow: 'var(--color-brand-glow)'
  } : {
    bg: 'var(--bg-light)',
    surface: 'var(--surface-light)',
    text: 'var(--text-light)',
    muted: 'var(--text-muted-light)',
    border: 'var(--border-light)',
    brand: 'var(--color-brand)',
    glow: 'var(--color-brand-glow)'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div
        className="app-root"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          minHeight: '100vh',
          transition: 'background-color 0.4s ease'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// =============================================================================
// 3. UI PRIMITIVES (High-End Components)
// =============================================================================

// --- Magnetic Button ---
// Attracts cursor when hovering nearby
const MagneticButton = ({ children, onClick, variant = 'primary', className, style }) => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.25);
    y.set((clientY - centerY) * 0.25);
  };

  const reset = () => { x.set(0); y.set(0); };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={ref}
      style={{
        x, y,
        position: 'relative',
        padding: '16px 32px',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        border: isPrimary ? 'none' : `1px solid ${colors.border}`,
        background: isPrimary ? colors.brand : 'transparent',
        color: isPrimary ? '#ffffff' : colors.text,
        overflow: 'hidden',
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {children}
      </motion.div>
      {/* Ripple Effect Background for Hover */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, background: isPrimary ? 'rgba(255,255,255,0.1)' : colors.surface,
          zIndex: 0, opacity: 0
        }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  );
};

// --- 3D Tilt Card ---
// Uses transforms to tilt based on mouse position relative to center
const TiltCard = ({ children, onClick, className }) => {
  const { colors, theme } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <motion.div
      style={{ perspective: 1200, height: '100%' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          background: theme === 'dark'
            ? 'linear-gradient(145deg, #1e293b, #0f172a)'
            : 'linear-gradient(145deg, #ffffff, #f1f5f9)',
          border: `1px solid ${colors.border}`,
          borderRadius: '24px',
          padding: '2rem',
          height: '100%',
          cursor: 'pointer',
          boxShadow: theme === 'dark' ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
        }}
        whileHover={{ scale: 1.02, boxShadow: `0 20px 40px -10px ${colors.brand}40` }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- Custom Cursor ---
// A trailing circle that follows the mouse
const CustomCursor = () => {
  const { colors } = useTheme();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed', left: 0, top: 0, width: 20, height: 20,
        borderRadius: '50%', border: `2px solid ${colors.brand}`,
        x: cursorXSpring, y: cursorYSpring, pointerEvents: 'none', zIndex: 9999,
      }}
    />
  );
};

// =============================================================================
// 4. SECTION COMPONENTS
// =============================================================================

// --- NAVIGATION BAR ---
const Navbar = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    // { name: 'Organisers', href: '#organisers' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 'var(--nav-height)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5%',
          borderBottom: scrolled ? `1px solid ${colors.border}` : '1px solid transparent',
          backgroundColor: scrolled ? (theme === 'dark' ? 'rgba(2,6,23,0.7)' : 'rgba(255,255,255,0.7)') : 'transparent',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNavClick('#home')}
          style={{ fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ width: 24, height: 24, background: `linear-gradient(135deg, ${colors.brand}, #a855f7)`, borderRadius: '6px' }}
          />
          Cognivista
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'none', md: { display: 'flex' } }} className="desktop-menu">
          {/* Note: In a real CSS-in-JS, we'd use media queries. For inline, we'll assume desktop or use JS responsive checks. 
                For this demo, I will render both and hide via simple style hack for simplicity or just render standard.
            */}
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <a
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                style={{ cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem', position: 'relative', overflow: 'hidden' }}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
            {/* <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text }}>
              {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            </button> */}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text, display: 'block' }}>
            {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
          </button> */}
          <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer' }}>
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'fixed', top: 'var(--nav-height)', left: 0, right: 0,
              background: colors.surface, borderBottom: `1px solid ${colors.border}`,
              padding: '2rem', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '1.5rem'
            }}
          >
            {navLinks.map(link => (
              <a key={link.name} onClick={() => handleNavClick(link.href)} style={{ fontSize: '1.2rem', fontWeight: 600 }}>{link.name}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- HERO SECTION ---
const Hero = () => {
  const { colors , theme } = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date('2026-02-13T09:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '80px'
    }}>
      {/* Dynamic Background Mesh */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw',
            background: `radial-gradient(circle, ${colors.brand} 0%, transparent 70%)`, filter: 'blur(80px)'
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          style={{
            position: 'absolute', bottom: '10%', right: '10%', width: '35vw', height: '35vw',
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', filter: 'blur(80px)'
          }}
        />
      </div>

      <motion.div style={{ y: y1, textAlign: 'center', zIndex: 1, maxWidth: '900px', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            display: 'inline-block', padding: '8px 16px', borderRadius: '20px',
            background: `${colors.brand}20`, color: colors.brand, fontWeight: 600, marginBottom: '1.5rem',
            border: `1px solid ${colors.brand}40`
          }}
        >
          🚀 LET'S VIBE WITH US
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em',

            background:
              theme === 'dark'
                ? 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)'
                : `linear-gradient(90deg, ${colors.text}, ${colors.muted})`,

            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',

            textShadow:
              theme === 'dark'
                ? '0 0 40px rgba(99,102,241,0.45)'
                : 'none',

            marginBottom: '1rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Cognivista
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ fontSize: '1.25rem', color: colors.muted, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}
        >
          Experience the future of technology and innovation. Join us for a spectacle of mind-bending events.
        </motion.p>

        {/* Countdown Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          {Object.entries(timeLeft).map(([unit, val], i) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (i * 0.1) }}
              className="glass"
              style={{
                padding: '1.5rem 0', borderRadius: '16px', border: `1px solid ${colors.border}`,
                background: `linear-gradient(180deg, ${colors.surface}, ${colors.bg})`
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: colors.brand, lineHeight: 1 }}>{String(val).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: colors.muted, marginTop: '5px' }}>{unit}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <MagneticButton onClick={() => alert("Registration Portal Opening Soon!")}>Register Now</MagneticButton>
          <MagneticButton variant="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact Us</MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- EVENTS SECTION ---
const Events = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "Hackathon", desc: "48 hours of code.", path: "/events/event1", icon: "💻" },
    { id: 2, title: "Robo Wars", desc: "Metal crushes metal.", path: "/events/event2", icon: "🤖" },
    { id: 3, title: "Design Derby", desc: "UI/UX Showdown.", path: "/events/event3", icon: "🎨" },
    { id: 4, title: "Tech Quiz", desc: "Test your knowledge.", path: "/events/event4", icon: "🧠" },
  ];

  return (
    <section id="events" style={{ padding: '120px 20px', maxWidth: 'var(--container-width)', margin: '0 auto' }}>
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}
        >
          Our <span style={{ color: colors.brand }}>Events</span>
        </motion.h2>
        <p style={{ color: colors.muted, fontSize: '1.1rem' }}>Challenge yourself in our flagship competitions.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {events.map((evt, i) => (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <TiltCard onClick={() => navigate(evt.path)}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{evt.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{evt.title}</h3>
              <p style={{ color: colors.muted, lineHeight: 1.6, marginBottom: '2rem' }}>{evt.desc}</p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: colors.brand, fontWeight: 600, fontSize: '0.9rem'
              }}>
                View Details <Icons.ArrowRight />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- CONTACT SECTION (Remastered) ---
const Contact = () => {
  const { colors, theme } = useTheme();

  return (
    <section id="contact" style={{ padding: '100px 20px', maxWidth: 'var(--container-width)', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Contact <span style={{ color: colors.brand }}>Us</span></h2>
        <p style={{ color: colors.muted }}>Get in touch with the team.</p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        padding: '1rem',
        borderRadius: '32px',
        border: `1px solid ${colors.border}`
      }}>
        {/* Left Side - Info */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
          {[
            { label: 'Instagram', value: '@cognivista', link: 'https://www.instagram.com/cognivista', icon: <Icons.Instagram /> },
            { label: 'Email', value: 'Cognivista@gmail.com', link: 'mailto:Cognivista@gmail.com', icon: <Icons.Mail /> },
            { label: 'Location', value: 'Misrimal Navajee Munoth Jain Engineering College', link: 'https://maps.app.goo.gl/bp9h2miEB6k4Utvj6', icon: <Icons.MapPin /> }
          ].map((item, idx) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10, backgroundColor: colors.surface }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.5rem', borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                textDecoration: 'none', color: colors.text,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: colors.brand, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: colors.muted, textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right Side - Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          style={{
            height: '100%', minHeight: '400px',
            borderRadius: '24px', overflow: 'hidden',
            border: `1px solid ${colors.border}`,
            position: 'relative'
          }}
        >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.396214987577!2d80.24366557507605!3d12.946479487366583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1d6d688541%3A0x7e55411e7ce87f81!2sMisrimal%20Navajee%20Munoth%20Jain%20Engineering%20College!5e0!3m2!1sen!2sin!4v1770041238308!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0, filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none', transition: 'filter 0.5s' }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">

          </iframe>

          <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: colors.surface, padding: '10px 20px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            📍 Chennai, India
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- ORGANISERS SECTION (Placeholder for completeness) ---
const Organisers = () => {
  const { colors } = useTheme();
  return (
    <section id="organisers" style={{ padding: '80px 20px', textAlign: 'center', background: colors.surface }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Meet the <span style={{ color: colors.brand }}>Team</span></h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ width: '150px', height: '150px', borderRadius: '50%', background: colors.border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.muted }}>
            Member {i}
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FOOTER ---
const Footer = () => {
  const { colors } = useTheme();
  return (
    <footer style={{
      padding: '3rem 2rem',
      borderTop: `1px solid ${colors.border}`,
      textAlign: 'center',
      background: colors.surface
    }}>
      <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '1rem' }}>Cognivista.</div>
      <p style={{ color: colors.muted }}>&copy; 2026 MNMJEC. All Rights Reserved.</p>
    </footer>
  );
};

// =============================================================================
// 5. MAIN APP COMPOSITION
// =============================================================================

function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />
      <Events />
      {/* <Organisers /> */}
      <Contact />
    </motion.div>
  );
}

// Wrapper for Event Pages to ensure layout consistency
const EventLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <CustomCursor /> {/* Premium Touch */}

      <Router>
        <div className="app-container" style={{ position: 'relative' }}>
          <Navbar />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* LINKING YOUR FILES HERE
                  We wrap them to provide animation and spacing 
                */}
              <Route path="/events/event1" element={<EventLayout><Event1 /></EventLayout>} />
              <Route path="/events/event2" element={<EventLayout><Event2 /></EventLayout>} />
              <Route path="/events/event3" element={<EventLayout><Event3 /></EventLayout>} />
              <Route path="/events/event4" element={<EventLayout><Event4 /></EventLayout>} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;