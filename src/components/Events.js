import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const EVENTS_DATA = [
  {
    title: 'PRESENTIA',
    description: 'Presented by IT',
    path: '/events/event1',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="14" y2="12" />
      </svg>
    )
  },

  {
    title: 'HACKGENT',
    description: 'Presented by ADS',
    path: '/events/event2',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },

  {
    title: 'CODE CURE',
    description: 'Presented by CSE',
    path: '/events/event3',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="10" y1="20" x2="14" y2="4" />
      </svg>
    )
  },

  {
    title: 'BRAINSTROM X',
    description: 'Presented by CSBS',
    path: '/events/event4',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12c.7.6 1 1.2 1 2h6c0-.8.3-1.4 1-2a7 7 0 0 0-4-12z" />
      </svg>
    )
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 12 }
  }
};

function Events() {
  const navigate = useNavigate();

  return (
    <section id="events" className="events-section">
      {/* INJECTED CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;600&display=swap');

        .events-section {
          padding: 100px 20px;
          max-width: 1200px; 
          margin: 0 auto;
          position: relative;
          z-index: 10;
          font-family: 'Rajdhani', sans-serif;
        }

        /* HEADER STYLES */
        .events-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .gradient-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #fff, #00f2fe, #7f30e7, #fff);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          animation: gradientMove 6s linear infinite;
        }

        .header-underline {
          width: 80px;
          height: 4px;
          background: #00f2fe;
          margin: 20px auto;
          border-radius: 2px;
          box-shadow: 0 0 20px #00f2fe, 0 0 40px rgba(188, 29, 253, 0.5);
        }

        /* GRID LAYOUT */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 40px; 
        }

        /* CARD STYLES */
        .event-card {
          position: relative;
          background: rgba(13, 18, 36, 0.6);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 242, 254, 0.1);
          border-radius: 24px;
          padding: 50px 40px;
          text-align: center;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          group;
        }

        /* Hover Glow Effect */
        .event-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 24px;
          padding: 2px; 
          background: linear-gradient(45deg, transparent, rgba(0, 242, 254, 0.3), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-10px);
          background: rgba(13, 18, 36, 0.8);
          border-color: rgba(0, 242, 254, 0.4);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
                      0 0 30px rgba(0, 242, 254, 0.1);
        }

        .event-card:hover::before {
          opacity: 1;
        }

        /* ICON BOX */
        .icon-box {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          background: rgba(0, 242, 254, 0.05);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f2fe;
          border: 1px solid rgba(0, 242, 254, 0.2);
          transition: all 0.3s ease;
        }

        .icon-box svg {
          width: 40px;
          height: 40px;
          transition: transform 0.3s ease;
        }

        .event-card:hover .icon-box {
          background: #00f2fe;
          color: #000;
          transform: rotate(10deg);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
        }

        .event-card:hover .icon-box svg {
          transform: scale(1.1);
        }

        /* TEXT CONTENT */
        .card-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 15px;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .card-desc {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 40px;
          min-height: 3.5em; /* Ensures buttons align even with different text length */
        }

        /* BUTTON */
        .explore-btn {
          position: relative;
          background: transparent;
          color: #00f2fe;
          padding: 15px 35px;
          border: 1px solid rgba(0, 242, 254, 0.5);
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.3s ease;
          font-family: 'Rajdhani', sans-serif;
        }

        .explore-btn::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: -100%;
          background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.2), transparent);
          transition: 0.5s;
        }

        .explore-btn:hover {
          background: #00f2fe;
          color: #050b14;
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.4);
          border-color: transparent;
        }

        .explore-btn:hover::after {
          left: 100%;
        }

        /* ANIMATIONS */
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: 1fr; gap: 30px; }
          .gradient-heading { font-size: 2.5rem; }
          .event-card { padding: 40px 25px; }
        }
      `}</style>

      {/* HEADER */}
      <div className="events-header">
        <h2 className="gradient-heading">EVENTS</h2>
        <div className="header-underline"></div>
      </div>

      {/* GRID */}
      <motion.div
        className="events-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {EVENTS_DATA.map((event, idx) => (
          <motion.div
            className="event-card"
            key={idx}
            variants={cardVariants}
          >
            <div className="icon-box">
              {event.icon}
            </div>

            <h3 className="card-title">{event.title}</h3>
            <p className="card-desc">{event.description}</p>

            <button
              className="explore-btn"
              onClick={() => navigate(event.path)}
            >
              Explore Details
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Events;