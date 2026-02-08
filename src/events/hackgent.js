import { memo, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import hackgentimg from "../../src/assets/images/hackgent.png"



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const Event2 = () => {
  const vantaRef = useRef(null);
  const navigate = useNavigate();
  const vantaEffect = useRef(null);
  const posterRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-500, 500], [10, -10]);
  const rotateY = useTransform(springX, [-500, 500], [-10, 10]);


  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e) => {
      const moveX = e.clientX - window.innerWidth / 2;
      const moveY = e.clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);


    const initVanta = () => {
      if (window.VANTA?.NET && window.THREE && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          minHeight: 200,
          scale: 1,
          color: 0x00ffff,
          backgroundColor: 0x020204,
          points: 15,
          maxDistance: 24,
          spacing: 16,
        });
        setIsLoaded(true);
      }
    };
    const timer = setTimeout(initVanta, 150);
    return () => {
      vantaEffect.current?.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="mission-control">
      {/* Cinematic Overlays */}
      <div ref={vantaRef} className="vanta-bg" />
      <div className="vignette" />
      <motion.div
        className="cursor-spotlight"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />

      <AnimatePresence>
        {isLoaded && (
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="interface-layer"
          >
            {/* 1. HUD TOP BAR */}
            <motion.nav variants={itemVariants} className="hud-nav">
              {/* <div className="nav-group">
                <span className="terminal-text">ID: ESC_LOG_77</span>
                <div className="status-badge"><span className="pulse-dot" /> SYSTEM_LIVE</div>
              </div> */}
              {/* <div className="nav-group logo-main">HACKGENT</div> */}
              {/* <div className="nav-group text-right">
                <span className="terminal-text">PORT: 8081</span>
              </div> */}
            </motion.nav>

            {/* 2. MAIN CONTENT GRID */}
            <div className="hero-grid">

              {/* Left Side: The Living Poster */}
              <motion.div
                variants={itemVariants}
                className="poster-wrapper"
                style={{ rotateX, rotateY, perspective: 1000 }}
              >
                <div className="poster-frame" ref={posterRef}>
                  <div className="poster-glitch-layers">
                    <img
                      src={hackgentimg}
                      alt="Event Hero"
                      className="poster-img"
                    />
                    <div className="scanline" />
                    <div className="ui-overlay-elements">
                      <div className="corner-tl" /> <div className="corner-br" />

                    </div>
                  </div>
                </div>
                <div className="poster-shadow" />
              </motion.div>

              {/* Right Side: Mission Intel */}
              <motion.div variants={itemVariants} className="mission-intel">
                <div className="intel-header">
                  <h2 className="intel-title">HACKGENT</h2>
                  <p className="intel-desc">HACKGENT is about pushing boundaries, experimenting boldly, and creating solutions that matter.</p>
                </div>
                {/* ===== ADD THIS BLOCK RIGHT HERE ===== */}
                <div className="intel-event-details">
                  <div className="detail-row">
                    <span className="detail-label">DATE</span>
                    <span className="detail-value">13 <sup>th</sup> Feb 2026</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">TIME</span>
                    <span className="detail-value">10:30 AM – 12:00 PM</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">VENUE</span>
                    <span className="detail-value"> ECE SMART ROOM</span>
                  </div>
                </div>
                {/* ===== END BLOCK ===== */}

                <div className="intel-stats">
                  <a
                    href="tel:9884171286"
                    className="stat-card cursor-pointer no-underline text-inherit"
                  >
                    <span className="label">CONTACT</span>
                    <span className="value text-cyan">
                      9884171286 <br />
                      <span style={{ fontSize: '0.85em', opacity: 0.85 }}>
                        Vijay&nbsp;&nbsp;ADS&nbsp;&nbsp;3<sup>rd</sup>&nbsp;yr
                      </span>
                    </span>
                  </a>
                </div>

                {/* <div className="round-sequence">
                  {["ENCRYPT", "TRACE", "DECODE", "EXPLOIT", "ESCAPE"].map((step, i) => (
                    <div key={step} className="round-node">
                      <span className="node-num">0{i + 1}</span>
                      <span className="node-name">{step}</span>
                      <div className="node-line" />
                    </div>
                  ))}
                </div> */}
              </motion.div>
            </div>

            {/* 3. POWER ACTIONS FOOTER */}
            <motion.footer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="action-bar"
            >
              {/* BACK */}
              <button className="btn-back" onClick={() => navigate(-1)}>
                BACK
              </button>

              <div className="btn-group">
                {/* KNOW MORE (external link) */}
                <button
                  className="btn-secondary-glass"
                  onClick={() =>
                    window.open("/event_pdf_hackgent.pdf", "_blank")
                  }
                >
                  KNOW MORE
                </button>

                {/* REGISTRATION (Google Form) */}
                <button
                  className="btn-primary-emerald"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSc1MpVpAm_CKsNcmI0kRKkY7k31zTK4VpkrVA4HrOH_IvNWVQ/viewform", "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <div className="btn-shine" />
                  INITIALIZE REGISTRATION
                </button>
              </div>
            </motion.footer>

          </motion.main>
        )}
      </AnimatePresence>

      <style jsx>{`
             .mission-control {
          background: #020204;
          min-height: 100vh;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* --- Background & FX --- */
        .vanta-bg { position: fixed; inset: 0; z-index: 1; opacity: 0.6; }
        .vignette {
          position: fixed; inset: 0; z-index: 2;
          background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%);
          pointer-events: none;
        }
        .cursor-spotlight {
          position: fixed; top: 0; left: 0; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%);
          z-index: 3; pointer-events: none;
        }


        @media (hover: none) {
  .cursor-spotlight {
    display: none;
  }
}


        .stat-card {
  text-decoration: none;
  color: inherit;
}

.stat-card:hover,
.stat-card:focus,
.stat-card:active {
  text-decoration: none;
}

@media (max-width: 768px) {
  .interface-layer {
    height: auto;
    padding-bottom: 120px; /* space for buttons */
  }
}


        .interface-layer {
          position: relative; z-index: 10;
          max-width: 1400px; margin: 0 auto;
          padding: 40px;min-height: 100svh;
          display: flex; flex-direction: column;
          justify-content: space-between;
        }

        /* --- HUD Nav --- */
        .hud-nav {
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
          border-bottom: 1px solid rgba(0, 255, 255, 0.1); padding-bottom: 20px;
        }
        .terminal-text { font-family: monospace; color: #444; font-size: 0.7rem; letter-spacing: 2px; }
        .logo-main { font-weight: 900; font-size: 1.5rem; letter-spacing: 8px; color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.3); }
        .status-badge { display: flex; align-items: center; gap: 8px; font-size: 0.6rem; color: #888; }
        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ffff; box-shadow: 0 0 10px #00ffff; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        /* --- Hero Grid --- */
        .hero-grid {
          display: grid; grid-template-columns: 1fr 1fr;gap: clamp(32px, 6vw, 80px); align-items: center;
          padding: 40px 0;
        }

        /* --- The Poster --- */
        .poster-wrapper { position: relative; transform-style: preserve-3d; }
        .poster-frame {
          aspect-ratio: 16/9.3; background: #111; border-radius: 4px;
          padding: 12px; border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 50px 100px rgba(0,0,0,0.8);
          position: relative; overflow: hidden;
        }
        .poster-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.2) contrast(1.1); }
        .scanline {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,255,255,0.05) 50%, transparent);
          background-size: 100% 4px; animation: scan 4s linear infinite;
        }
        @keyframes scan { from { transform: translateY(-100%); } to { transform: translateY(100%); } }

        /* --- Mission Intel --- */
        .intel-title { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -1px; }
        .intel-desc { color: #888; line-height: 1.6; max-width: 500px; margin-bottom: 2rem; }
        .intel-stats { display: flex; gap: 30px; margin-bottom: 3rem; }
        .stat-card { border-left: 2px solid #333; padding-left: 20px; }
        .stat-card .label { display: block; font-size: 0.6rem; color: #ffffff; letter-spacing: 2px; }
        .stat-card .value { font-size: 1.2rem; font-weight: 700; }
        .text-cyan { color: #00ffff; }

        .round-sequence { display: flex; justify-content: space-between; position: relative; }
        .round-node { display: flex; flex-direction: column; gap: 8px; position: relative; z-index: 2; }
        .node-num { font-family: monospace; color: #00ffff; font-size: 0.7rem; }
        .node-name { font-size: 0.6rem; letter-spacing: 1px; color: #555; }
        .node-line { height: 1px; background: rgba(0,255,255,0.1); width: 100%; margin-top: 10px; }
/* --- Event Details Block --- */
.intel-event-details {
  margin-bottom: 2rem;
  border-left: 2px solid rgba(0,255,255,0.25);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-row {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #ffffff;
  font-weight: 800;   /* ← makes DATE bold */
}


.detail-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: #00ffff;
}

        /* --- Footer & Buttons --- */
        .power-footer { display: flex; justify-content: space-between; align-items: center; }
        .action-cluster { display: flex; gap: 20px; }
        
       
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .mission-control { overflow-y: auto; }
          .interface-layer { height: auto; padding: 20px; }
          .intel-title { font-size: 2rem; }
        }

        /* --- Buttons --- */

     .action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
@media (max-width: 768px) {
  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background: rgba(2,2,4,0.9);
    backdrop-filter: blur(10px);
    padding: 12px 16px;
    z-index: 20;

    flex-direction: column;
  }

  .btn-group {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .btn-secondary-glass,
  .btn-primary-emerald {
    width: 100%;
    padding: 16px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .poster-frame {
    padding: 8px;
  }

  .poster-wrapper {
    transform: none !important;
  }
}
.intel-title {
  font-size: clamp(1.8rem, 6vw, 3rem);
}

.btn-group {
  display: flex;
  gap: 20px;
}
.btn-back,
.btn-secondary-glass,
.btn-primary-emerald {
  user-select: none;
}
.btn-back:hover,
.btn-secondary-glass:hover,
.btn-primary-emerald:hover {
  cursor: pointer;
}


.btn-back {
  background: none;
  border: none;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s; background: rgba(255,255,255,0.05);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 20px 40px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-back:hover {
  color: #fff;
  transform: translateX(-5px);
}

.btn-secondary-glass {
  background: rgba(255,255,255,0.05);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 20px 40px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-secondary-glass:hover {
  background: rgba(255,255,255,0.1);
  border-color: #fff;
}

.btn-primary-emerald {
  background: #00ffff;
  color: #000;
  border: none;
  padding: 20px 40px;
  font-weight: 800;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary-emerald:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(0,255,255,0.4);
}

/* external-link arrow */
.btn-secondary-glass::after,
.btn-primary-emerald::after {
  content: "↗";
  margin-left: 8px;
  font-weight: 800;
}
  /* ===== MOBILE FIX PACK ===== */

.mission-control {
  overflow-x: hidden;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .interface-layer {
    padding-bottom: 200px;
  }

  .hero-grid {
    gap: 24px;
    padding: 20px 0;
  }

  .intel-desc {
    max-width: 100%;
  }

  .btn-back,
  .btn-secondary-glass,
  .btn-primary-emerald {
    padding: 14px 16px;
    font-size: 0.9rem;
  }
}


      `}</style>
    </div>
  );
};

export default memo(Event2);