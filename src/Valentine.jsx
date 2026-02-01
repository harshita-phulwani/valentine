import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ValentinePage = () => {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  
  // Array of dramatic messages for the No button
  const phrases = [
    "No 💔", "Are you sure?", "Really sure??", "Think again!", 
    "Last chance!", "Surely not?", "You're breaking my heart ;(",
    "Give it another thought!", "I'm gonna cry...", "You're being mean!"
  ];

  const handleNoHover = () => {
    // Make the No button jump to a random position, constrained within viewport
    const maxX = window.innerWidth - 120; // Account for button width
    const maxY = window.innerHeight - 80; // Account for button height
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    setNoButtonPos({ x: randomX, y: randomY });
    setNoCount(noCount + 1);
  };

  const yesButtonSize = noCount * 20 + 16; // Grows as they try to hit 'No'

  if (isAccepted) {
    return (
      <div 
        className="flex flex-col items-center justify-center h-screen text-center p-4"
        style={{ backgroundImage: `url('/V-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-white/40 backdrop-blur-md p-16 rounded-3xl shadow-2xl">
          <motion.h1 
            initial={{ scale: 0, rotate: -10 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-8 drop-shadow-lg font-black"
            style={{ 
              fontFamily: "'Comic Relief', cursive", 
              fontSize: '6rem',
              color: '#ef4444',
              letterSpacing: '0.1em'
            }}
          >
            Yay!!! ❤️
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="drop-shadow-lg font-bold"
            style={{ 
              fontFamily: "'Comic Relief', cursive", 
              fontSize: '2.5rem',
              color: '#db2777'
            }}
          >
            I knew you'd say yes!
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('/V-bg.jpg')` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-lg p-14 rounded-3xl shadow-2xl flex flex-col items-center relative z-10 max-w-2xl mx-4"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 text-center drop-shadow-xl font-black text-5xl md:text-6xl"
          style={{ 
            fontFamily: "'Comic Relief', cursive", 
            background: 'linear-gradient(135deg, #ef4444 0%, #db2777 50%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
            animation: 'none'
          }}
        >
          Will you be my Valentine?
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 bg-gradient-to-r from-pink-200/80 to-purple-200/80 px-8 sm:px-12 py-10 rounded-2xl backdrop-blur-lg shadow-lg w-full"
        >
          {/* YES BUTTON */}
          <motion.button
            whileHover={{ scale: 1.12, boxShadow: '0 0 40px rgba(239, 68, 68, 0.7)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsAccepted(true)}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ 
              fontSize: `${yesButtonSize}px`,
              background: 'linear-gradient(135deg, #ef4444 0%, #ffffff 100%)',
              boxShadow: '0 12px 35px rgba(239, 68, 68, 0.35)',
              cursor: 'pointer'
            }}
            className="text-red-600 font-bold py-7 px-14 rounded-full transition-all text-center min-w-max"
          >
            YES! ❤️
          </motion.button>

          {/* DRAMATIC NO BUTTON */}
          <motion.button
            animate={{ x: noButtonPos.x ? noButtonPos.x - window.innerWidth/2 : 0, 
                       y: noButtonPos.y ? noButtonPos.y - window.innerHeight/2 : 0,
                       scale: Math.max(0.4, 1 - (noCount * 0.05)) }}
            onMouseEnter={handleNoHover}
            whileHover={{ boxShadow: '0 0 25px rgba(0, 0, 0, 0.6)' }}
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #000000 100%)',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer'
            }}
            className="text-white font-bold py-7 px-14 rounded-full shadow-2xl pointer-events-auto transition-all text-center min-w-max"
          >
            {phrases[Math.min(noCount, phrases.length - 1)]}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ValentinePage;