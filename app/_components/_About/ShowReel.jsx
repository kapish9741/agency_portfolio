'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ShowReel = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Default to true since we autoplay
  const videoRef = useRef(null) // For the thumbnail video (optional usage)
  const fullscreenVideoRef = useRef(null) // For the fullscreen video

  // Refs for custom cursor
  const cursorRef = useRef(null)
  const cursorTextRef = useRef(null)
  const containerRef = useRef(null) // Ref for the main container to track mouse movement

  // GSAP for custom cursor
  useGSAP(() => {
    const cursor = cursorRef.current
    const cursorText = cursorTextRef.current

    // Initial state: hidden
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto"
      })
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, { scope: containerRef })

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
    handleMouseLeaveThumbnail(); // Ensure cursor hides
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

  // Combined mouse enter/leave handlers for thumbnail
  const handleMouseEnterThumbnail = () => {
    setIsHovered(true)
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    gsap.to(cursorTextRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeaveThumbnail = () => {
    setIsHovered(false)
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
  }

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
    <section ref={containerRef} className='w-full flex justify-center'>
      <div className="relative w-full max-w-[1400px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">

        {/* Background Text - Hidden on mobile, visible from md up */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-between lg:px-32 xl:px-108 pointer-events-none select-none z-0">
          <motion.div
            initial={{ x: 0 }}
            whileInView={{ x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span
              className="font-urbanist text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#3a3939] tracking-tight inline-block"
              animate={{ x: isHovered ? -25 : 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              Play
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            whileInView={{ x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span
              className="font-urbanist text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#3a3939] tracking-tight inline-block"
              animate={{ x: isHovered ? 25 : 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              Reel
            </motion.span>
          </motion.div>
        </div>

        {/* Thumbnail Container */}
        <div
          className="relative z-10 w-[85%] h-[180px] sm:w-56 sm:h-40 md:w-72 md:h-48 lg:w-80 lg:h-56 cursor-none group"
          onClick={handleOpen}
          onMouseEnter={handleMouseEnterThumbnail}
          onMouseLeave={handleMouseLeaveThumbnail}
        >

          {/* Thumbnail Video Card */}
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative transition-transform duration-500">
            <video
              src="/Hero/Intro.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
            />
            <div className="absolute inset-0 flex items-center justify-between bg-black/10 group-hover:bg-transparent transition-colors px-3 sm:px-4 md:px-6 pointer-events-none">
              <p className='font-urbanist text-sm sm:text-base md:text-lg font-light text-white'>Websual.</p>
              <p className='font-urbanist text-sm sm:text-base md:text-lg font-light text-white'>00:21</p>
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN OVERLAY (Fixed) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
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
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/80 transition-all z-20 cursor-pointer"
                onClick={handleClose}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>

              {/* Custom Play/Pause Button (Bottom Right) - Styled per reference with Smooth Width Animation */}
              <motion.button
                layout
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-[30px] md:right-[30px] z-20 bg-white text-black border-none rounded-[10px] sm:rounded-[12px] px-3 sm:px-[15px] py-1.5 sm:py-[6px] text-[0.8rem] sm:text-[0.9rem] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 hover:bg-[#f0f0f0] active:bg-[#e0e0e0] overflow-hidden whitespace-nowrap"
                onClick={togglePlay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
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

      {/* Custom Cursor - Hidden on touch devices via pointer-events-none */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none z-[9999] hidden sm:flex items-center justify-center bg-white"
      >
        <span
          ref={cursorTextRef}
          className="text-black text-[10px] sm:text-xs font-medium tracking-wide uppercase font-urbanist"
        >
          View
        </span>
      </div>
    </section>
  )
}

export default ShowReel