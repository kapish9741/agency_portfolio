'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ShowReel = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Default to true since we autoplay
  const videoRef = useRef(null) // For the thumbnail video (optional usage)
  const fullscreenVideoRef = useRef(null) // For the fullscreen video

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose()
      }
    }

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isExpanded])

  const handleOpen = () => {
    setIsExpanded(true)
    setIsPlaying(true) // Reset to playing when opened
  }

  const handleClose = () => {
    setIsExpanded(false)
    setIsPlaying(false) // Stop playing state
  }

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent click from bubbling if needed
    if (fullscreenVideoRef.current) {
      if (isPlaying) {
        fullscreenVideoRef.current.pause();
      } else {
        fullscreenVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const modalVariants = {
    initial: {
      clipPath: 'inset(50% 0 50% 0)',
    },
    animate: {
      clipPath: 'inset(0% 0 0% 0)',
      transition: {
        duration: 1.25,
        ease: [0.25, 1, 0.5, 1],
      }
    },
    exit: {
      clipPath: 'inset(50% 0 50% 0)',
      transition: {
        duration: 0.9,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  }

  const contentVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  return (
    <section className=' w-full flex justify-center'>
      <div className="relative w-full max-w-[1400px] h-[500px] flex items-center justify-center">

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-between px-72 pointer-events-none select-none z-0">
          <motion.span
            className="font-urbanist text-5xl md:text-9xl font-light text-neutral-400 tracking-tighter"
            animate={{ x: isHovered ? -25 : 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            Play
          </motion.span>

          <motion.span
            className="font-urbanist text-5xl md:text-9xl font-light text-neutral-400 tracking-tighter"
            animate={{ x: isHovered ? 25 : 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            Reel
          </motion.span>
        </div>

        {/* Thumbnail Container */}
        <div
          className="relative z-10 w-48 h-32 md:w-80 md:h-56 cursor-pointer group"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Thumbnail Video Card */}
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative bg-gray-100 transition-transform duration-500">
            <video
              src="/Hero/Intro.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
            />
            <div className="absolute inset-0 flex items-center justify-between bg-black/10 group-hover:bg-transparent transition-colors px-6">
              <p className='font-urbanist text-lg font-light text-white'>Agency.</p>
              <p className='font-urbanist text-lg font-light text-white'>00:21</p>
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN OVERLAY (Fixed) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Video Wrapper */}
            <motion.div
              className="relative w-full h-full"
              variants={contentVariants}
            >
              {/* Fullscreen Video - No default controls */}
              <video
                ref={fullscreenVideoRef}
                src="/Hero/Intro.mp4"
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                // onClick={togglePlay} // Optional: Click video to toggle
                onEnded={() => setIsPlaying(false)}
              />

              {/* Close Button (Top Right) */}
              <motion.button
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/80 transition-all z-20 cursor-pointer"
                onClick={handleClose}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>

              {/* Custom Play/Pause Button (Bottom Right) - Styled per reference with Smooth Width Animation */}
              <motion.button
                layout
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-[30px] right-[30px] z-20 bg-white text-black border-none rounded-[12px] px-[15px] py-[8px] text-[0.8rem] font-medium cursor-pointer flex items-center gap-2 hover:bg-[#f0f0f0] active:bg-[#e0e0e0] overflow-hidden whitespace-nowrap"
                onClick={togglePlay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-2">
                  {isPlaying ? (
                    <>
                      <svg width="10" height="12" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 14V0H4V14H0ZM8 14V0H12V14H8Z" />
                      </svg>
                      <span className="font-urbanist font-semibold">Pause</span>
                    </>
                  ) : (
                    <>
                      <svg width="10" height="12" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 13.5V0.5L11.5 7L1.5 13.5Z" />
                      </svg>
                      <span className="font-urbanist font-semibold">Play</span>
                    </>
                  )}
                </div>
              </motion.button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ShowReel