import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    background: {
      color: { value: "#020617" }, // Ultra-dark navy/black for depth
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { 
          enable: true, 
          mode: ["grab", "bubble"] // Combines connecting lines with particle growth
        },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.4,
          opacity: 0.8,
        },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: "#00f2fe" },
      links: {
        color: "#00f2fe",
        distance: 150,
        enable: true,
        opacity: 0.15, // Subtle lines stay professional
        width: 1,
      },
      move: {
        enable: true,
        speed: { min: 0.5, max: 1.5 },
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" }, // Particles stay within view
      },
      number: { 
        density: { enable: true, area: 1000 }, 
        value: 100 
      },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 1, sync: false } // Creates a "twinkling" effect
      },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  return init ? <Particles id="tsparticles" options={options} /> : null;
};

export default ParticlesBackground;