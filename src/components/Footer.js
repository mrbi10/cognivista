import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer-container">
      <style>{`
        /* IMPORT FONTS (If not already in global css) */
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap');

        .footer-container {
          position: relative;
          background: #050b14;
          padding: 40px 20px 20px;
          color: #94a3b8;
          font-family: 'Rajdhani', sans-serif;
          border-top: 1px solid rgba(0, 242, 254, 0.1);
          overflow: hidden;
        }

        /* GLOWING LINE EFFECT AT TOP */
        .footer-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00f2fe, transparent);
          box-shadow: 0 0 10px #00f2fe;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 5;
        }

        .college-name {
          font-size: 1.1rem;
          color: #fff;
          font-weight: 600;
          letter-spacing: 1px;
          text-align: center;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .copyright {
          font-size: 0.85rem;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .highlight {
          color: #00f2fe;
          font-weight: bold;
        }

        /* SOCIAL LINKS ROW */
        .social-row {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
        }
        
        .social-icon {
          color: #94a3b8;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .social-icon:hover {
          color: #00f2fe;
          transform: translateY(-3px);
          filter: drop-shadow(0 0 5px #00f2fe);
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .social-row { margin-bottom: 0; order: 2; }
          .college-name { text-align: left; }
        }
      `}</style>

      <div className="footer-content">
        {/* LEFT: Branding */}
        <div>
          <h3 className="college-name">MNM Jain Engineering College</h3>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Department of ADS - CSBS - CSE - IT</p>
        </div>

     

        {/* RIGHT: Copyright */}
        <div className="copyright">
          <span>&copy; 2026 <span className="highlight">Cognivista</span></span>
          <span style={{ color: '#334155' }}>|</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};



export default Footer;