import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown'; // Assuming you have this component

const Hero = () => {
  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* INJECTED CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;500;700&display=swap');

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* Fallback background if particles don't load */
          background: transparent; 
          padding: 0 20px;
        }

        /* VIGNETTE OVERLAY 
           Keeps center transparent for particles, darkens edges for focus */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(5, 11, 20, 0) 0%, rgba(5, 11, 20, 0.8) 80%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* SUBTITLE: LET'S VIBE */
        .hero-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #00f2fe;
          text-transform: uppercase;
          letter-spacing: 6px;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
          animation: spacingBreathing 4s ease-in-out infinite alternate;
        }

        /* TITLE: COGNIVISTA */
        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 10vw, 6.5rem); /* Responsive giant text */
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: 2px;
          
          /* Gradient Text */
          background: linear-gradient(90deg,  #fff, #00f2fe, #7f30e7, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          
          /* Glow & Animation */
          filter: drop-shadow(0 0 20px rgba(0, 242, 254, 0.4));
          animation: shineMove 6s linear infinite;
        }

        /* DESCRIPTION */
        .hero-desc {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          color: #cbd5e1;
          max-width: 600px;
          margin-bottom: 3rem;
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        /* COUNTDOWN WRAPPER */
        .countdown-wrapper {
          margin-bottom: 5rem;
          padding: 20px;
          border-radius: 20px;
        }

        /* BUTTON GROUP */
        .cta-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        /* SHARED BUTTON STYLES */
        .btn {
          position: relative;
          padding: 16px 40px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* PRIMARY BUTTON (Register) */
        .btn-primary {
          background: transparent;
          color: #fff;
          border: 1px solid #00f2fe;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.2), inset 0 0 10px rgba(0, 242, 254, 0.1);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.4), transparent);
          transition: 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          background: #00f2fe;
          color: #000;
          box-shadow: 0 0 40px rgba(0, 242, 254, 0.6);
          transform: translateY(-3px);
        }

        /* SECONDARY BUTTON (Contact) */
        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #fff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        /* ANIMATIONS */
        @keyframes shineMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes spacingBreathing {
          0% { letter-spacing: 6px; opacity: 0.8; }
          100% { letter-spacing: 10px; opacity: 1; text-shadow: 0 0 20px #00f2fe; }
        }

        /* MOBILE TWEAKS */
        @media (max-width: 768px) {
          .hero-subtitle { letter-spacing: 3px; font-size: 1rem; }
          .hero-desc { font-size: 1rem; padding: 0 10px; }
          .cta-group { flex-direction: column; width: 100%; max-width: 300px; }
          .btn { width: 100%; }
        }
      `}</style>

      {/* Dark Vignette Overlay */}
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Subtitle */}
        <motion.h2 variants={itemVariants} className="hero-subtitle">
          LET’S VIBE WITH US
        </motion.h2>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          COGNIVISTA'26
        </motion.h1>

        {/* Description */}
        <motion.h4 variants={itemVariants} className="hero-desc">
         NATIONAL LEVEL TECH SYMPOSIUM <br className="hidden-mobile" />
         
        </motion.h4>

        {/* Countdown */}
        <motion.div variants={itemVariants} className="countdown-wrapper">
          <Countdown targetDate={new Date('2026-03-01T09:00:00')} />
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="cta-group">
          <button
            className="btn btn-primary"
            onClick={() => alert('Registration Portal Opening Soon!')}
          >
            Register Now
          </button>

          <a href="#contact" className="btn btn-secondary">
            Contact Us
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}

export default Hero;