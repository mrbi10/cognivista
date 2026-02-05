import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground'; // Assuming this exists in your project

const Contact = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div id="contact" className="page-wrapper">
      {/* Injecting CSS directly here for a single-file "100x working" solution */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;500;700&display=swap');

        /* RESET & BASE */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        /* GLASS CARD CONTAINER */
        .glass-card {
          display: flex;
          width: 100%;
          max-width: 1100px;
          min-height: 600px;
          background: rgba(13, 18, 36, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 242, 254, 0.15);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
                      0 0 30px rgba(0, 242, 254, 0.1);
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        /* LAYOUT COLUMNS */
        .left-section {
          flex: 1;
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .right-section {
          flex: 1.2; /* Map takes slightly more space */
          position: relative;
          min-height: 400px;
        }

        /* TEXT STYLES */
        .gradient-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 15px;
          background: linear-gradient(90deg, #fff, #00f2fe, #7f30e7, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 5s linear infinite;
        }

        .subtitle {
          color: #94a3b8;
          font-size: 1.2rem;
          margin-bottom: 50px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* CONTACT ITEMS */
  .contact-item {
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;

  align-items: start;

  padding: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);

  transition: background 0.3s ease, border-color 0.3s ease;
}


@media (max-width: 900px) {
  .contact-list {
    grid-template-columns: 1fr;
  }
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


@media (max-width: 900px) {
  .contact-list {
    grid-template-columns: 1fr;
  }
}


      .contact-item:hover {
  background: rgba(0, 242, 254, 0.05);
  border-color: rgba(0, 242, 254, 0.3);
}


      

        .icon-box {
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #00f2fe;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }

        .item-details h4 {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          color: #7c3aed;
          letter-spacing: 2px;
          margin-bottom: 4px;
        }

        .item-details p {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
        }

        /* MAP STYLES */
        .map-frame {
          width: 100%;
          height: 100%;
          border: none;
          filter: grayscale(0%) invert(10%);
        }
        
        /* Map Overlay Gradient to blend edges */
        .map-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, rgba(13, 18, 36, 1) 0%, rgba(13, 18, 36, 0) 20%);
          pointer-events: none;
        }

        /* DECORATIVE ELEMENTS */
        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: #7c3aed;
          filter: blur(120px);
          opacity: 0.2;
          z-index: -1;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .glass-card { flex-direction: column-reverse; height: auto; }
          .left-section { padding: 40px 30px; }
          .right-section { height: 300px; flex: none; }
          .map-overlay { background: linear-gradient(0deg, rgba(13, 18, 36, 1) 0%, rgba(13, 18, 36, 0) 20%); }
          .gradient-title { font-size: 2.5rem; }
        }
      `}</style>

      {/* Background Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ParticlesBackground />
      </div>

      <motion.div
        className="glass-card"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT SIDE: INFORMATION */}
        <div className="left-section">
          {/* Decorative Glow */}
          <div className="glow-orb" style={{ top: '-50px', left: '-50px' }}></div>

          <motion.div variants={itemVariants}>
            <h2 className="gradient-title">GET IN TOUCH</h2>
            <p className="subtitle">Ready to engineer the future? Connect with the Cognivista team.</p>
          </motion.div>

          <motion.div
            className="contact-list"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.25 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ContactItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
              label="SOCIAL FEED"
              value="cognivista_26"
              link="https://instagram.com/cognivista_26"
            />

            <ContactItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
              label="COMMUNICATION LINK"
              value="Cognivista26@gmail.com"
              link="mailto:Cognivista26@gmail.com"
            />

            <ContactItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}
              label="BASE COORDINATES"
              value="MNM Jain Engineering College"
              link="https://maps.app.goo.gl/UdywxCqyEbzV5aiY6"
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: MAP */}
        <div className="right-section">
          {/* The gradient overlay makes the map fade into the card on the left side */}
          <div className="map-overlay"></div>

          <iframe
            title="MNM Jain Engineering College Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3961334244113!2d80.24366021053544!3d12.94648471537598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1d6d688541%3A0x7e55411e7ce87f81!2sMisrimal%20Navajee%20Munoth%20Jain%20Engineering%20College!5e0!3m2!1sen!2sin!4v1770110479892!5m2!1sen!2sin"
            className="map-frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>

        </div>
      </motion.div>
    </div>
  );
};

// Helper Component for List Items with Motion
const ContactItem = ({ icon, label, value, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-item"
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
      style={{ textDecoration: "none" }}
    >
      <div className="icon-box">{icon}</div>
      <div className="item-details">
        <h4>{label}</h4>
        <p>{value}</p>
      </div>
    </motion.a>
  );
};


export default Contact;