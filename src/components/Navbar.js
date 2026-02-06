import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';




const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (label, id) => {
    setActive(label);
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* INJECTED CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;800&display=swap');

        /* NAVBAR CONTAINER */
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 5%;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Rajdhani', sans-serif;
          background: transparent;
        }

        /* SCROLLED STATE (Glassmorphism) */
        .navbar-container.scrolled {
          padding: 15px 5%;
          background: rgba(5, 11, 20, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(0, 242, 254, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* LOGO */
        .nav-logo {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          z-index: 1002;
        }
        
        .nav-logo span {
          color: #00f2fe;
          text-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
        }

        /* DESKTOP LINKS */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 40px;
          align-items: center;
        }

        .nav-item {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-size: 1.1rem;
          position: relative;
          transition: color 0.3s ease;
          cursor: pointer;
          letter-spacing: 0.5px;
        }

        .nav-item:hover, .nav-item.active {
          color: #00f2fe;
          text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
        }

        /* Animated Underline */
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: #00f2fe;
          transition: width 0.3s ease;
          box-shadow: 0 0 10px #00f2fe;
        }

        .nav-item:hover::after, .nav-item.active::after {
          width: 100%;
        }

        /* HAMBURGER BUTTON */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 22px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1002;
        }

        .bar {
          width: 100%;
          height: 3px;
          background: #00f2fe;
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
          transform-origin: left;
          box-shadow: 0 0 5px rgba(0, 242, 254, 0.5);
        }

        /* Hamburger Animation State */
        .hamburger.open .bar:nth-child(1) {
          transform: rotate(45deg) translate(0px, -2px);
        }
        .hamburger.open .bar:nth-child(2) {
          opacity: 0;
          transform: translateX(10px);
        }
        .hamburger.open .bar:nth-child(3) {
          transform: rotate(-45deg) translate(0px, 2px);
        }

        /* MOBILE MENU OVERLAY */
        @media (max-width: 768px) {
          .hamburger { display: flex; }

          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            background: rgba(6, 11, 25, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 50px;
            transform: translateY(-100%);
            transition: transform 0.4s cubic-bezier(0.45, 0, 0.55, 1);
            z-index: 1001; /* Behind logo/hamburger */
          }

          .nav-links.menu-open {
            transform: translateY(0);
          }

          .nav-item {
            font-size: 2rem;
            font-weight: 700;
          }
        }
      `}</style>

      <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>

        {/* LOGO */}
        <div className="nav-logo" onClick={() => handleNavClick('Home', '#home')}>
          Cognivista<span>’26</span>
        </div>

        {/* LINKS */}
        <ul className={`nav-links ${menuOpen ? 'menu-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`nav-item ${active === item.label ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.label, item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

      </nav>
    </>
  );
}

export default Navbar;