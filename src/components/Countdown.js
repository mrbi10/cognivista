import React, { useState, useEffect } from 'react';

function pad(num) {
  return String(num).padStart(2, '0');
}

function getTargetDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 1, 13);

  if (target < now) {
    target = new Date(now.getFullYear() + 1, 1, 13);
  }

  return target;
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const Countdown = () => {
  const targetDate = getTargetDate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-wrapper">
      {/* --- INJECTED CSS --- */}
      <style>{`
        /* Import Font to ensure it works standalone */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

        .countdown-wrapper {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin: 2rem 0 0 0;
          padding: 0 10px;
        }

        .unit-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
        }

        /* The Number Box - Retaining #18182f and #00fff7 */
        .digit-box {
          background: rgba(24, 24, 47, 0.9); /* Slightly transparent #18182f */
          color: #00fff7;
          font-family: 'Poppins', monospace;
          font-weight: 800;
          font-size: 2.7rem;
          
          /* Sizing & Spacing */
          padding: 0.8rem 1.4rem;
          border-radius: 16px;
          margin-bottom: 0.5rem;
          
          /* Enhanced Visuals: Glass & Glow */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 247, 0.2); /* Subtle Cyan Border */
          
          /* Original Shadow + Glow Enhancement */
          box-shadow: 0 4px 20px rgba(0, 255, 247, 0.15), 
                      inset 0 0 15px rgba(0, 0, 0, 0.3);
          
          text-shadow: 0 0 10px rgba(0, 255, 247, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Interactive Hover Effect */
        .digit-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 255, 247, 0.4);
          border-color: rgba(0, 255, 247, 0.6);
        }

        /* The Text Label */
        .unit-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          color: #fff;
          letter-spacing: 1.5px;
          font-weight: 500;
          text-transform: uppercase;
          opacity: 0.8;
        }

        /* Responsive Mobile Tweak */
        @media (max-width: 600px) {
          .countdown-wrapper {
            gap: 1rem;
          }
          .digit-box {
            font-size: 1.5rem;
            padding: 0.5rem 0.8rem;
            border-radius: 10px;
          }
          .unit-container {
            min-width: 50px;
          }
          .unit-label {
            font-size: 0.75rem;
          }
        }
      `}</style>

      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="unit-container">
          <div className="digit-box">
            {pad(timeLeft[unit])}
          </div>
          <span className="unit-label">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;