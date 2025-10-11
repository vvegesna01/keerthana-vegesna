import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEgg() {
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);

  // Detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (bottom && !showMessage) setShowMessage(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showMessage]);

  // Handle click to trigger confetti + rainbow effect
  const handleClick = () => {
    setShowConfetti(true);
    setRainbowMode(true);
    setTimeout(() => setRainbowMode(false), 6000);
  };

  return (
    <>
      {/* Confetti burst */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={900} />}

      {/* Animated rainbow overlay */}
      <AnimatePresence>
        {rainbowMode && (
          <motion.div
            className="fixed inset-0 -z-10 rainbow-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* Clickable Easter egg message */}
      <AnimatePresence>
        {showMessage && !showConfetti && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 text-indigo-800 font-semibold px-6 py-3 rounded-full shadow-lg border border-indigo-300 cursor-pointer text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={handleClick}
          >
            ✨ Click here for a fun surprise! ✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret thank-you message */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white font-semibold text-2xl drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2, duration: 1 }}
          >
            🌈 Thanks for finding the secret! 🌟
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background animation style */}
      <style jsx global>{`
        .rainbow-bg {
          background: linear-gradient(
            270deg,
            #ff6b6b,
            #feca57,
            #1dd1a1,
            #54a0ff,
            #5f27cd
          );
          background-size: 1200% 1200%;
          animation: rainbowShift 8s ease infinite;
        }

        @keyframes rainbowShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
