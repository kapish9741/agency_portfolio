"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: "Our Services",
    src: "/services/img1.jpg",
    type: "intro",
  },
  {
    title: "Website Development",
    description:
      "We design and develop fast, scalable, and conversion-focused websites and web applications. From high-impact landing pages to full-stack platforms, we focus on clean architecture, smooth performance, and user experiences that turn visitors into loyal customers.",
    tags: ["MVP Development", "Landing Page", "Full Stack", "CMS / Admin Dashboards"],
    src: "/services/img1.jpg",
  },
  {
    title: "Brand Design",
    description:
      "We craft strong and memorable brand identities that clearly communicate who you are and what you stand for. From logos to complete visual systems, we build brands that feel consistent, recognizable, and ready to scale across digital and physical touchpoints.",
    tags: ["Brand Identity", "Logo Design", "Visual Language", "Brand Guidelines"],
    src: "/services/img2.jpg",
  },
  {
    title: "Graphic Design",
    description:
      "We create bold, purposeful visual designs that capture attention and communicate your message instantly. Whether it’s digital creatives or print assets, our designs are made to stand out, stay consistent with your brand, and drive engagement across platforms.",
    tags: [
      "Logo Design",
      "Social Media Creatives",
      "Banner Design",
      "Poster Design",
      "YouTube Thumbnails",
    ],
    src: "/services/img3.jpg",
  },
  {
    title: "Video Editing",
    description:
      "We produce engaging video edits that tell stories, build emotion, and keep viewers watching. From short-form content to promotional videos, we focus on pacing, visuals, and sound design to create videos that feel dynamic, polished, and impactful.",
    tags: ["Short-Form Videos", "Long-Form Videos", "Promo Videos", "Motion Graphics"],
    src: "/services/img2.jpg",
  },
];



const CustomCursor = ({ active }) => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Initial state
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

      // Mouse movement
      const moveCursor = (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      // Continuous rotation
      gsap.to(textRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "linear",
      });

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    },
    { scope: cursorRef }
  );

  useEffect(() => {
    if (active) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [active]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none">
      <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden backdrop-blur-md">

        {/* Rotating Text */}
        <div ref={textRef} className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="font-bold text-[11px] uppercase tracking-[0.18em]" fill="black">
              <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                BOOK A CALL • BOOK A CALL •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};


const StickyCard_001 = ({
  i,
  title,
  description,
  tags,
  src,
  type,
  progress,
  range,
  targetScale,
  onCursorEnter,
  onCursorLeave,
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })
  const imageScale = useTransform(cardScrollProgress, [0, 1], [1.3, 1])

  return (
    <div
      ref={container}
      className="h-screen sticky top-0 flex items-center justify-center font-urbanist"
    >
      <motion.div
        style={{ scale }}
        onMouseEnter={() => i > 0 && onCursorEnter()}
        onMouseLeave={() => onCursorLeave()}
        onClick={() => i > 0 && window.open('https://instagram.com', '_blank')}
        className={`
          will-change-transform
          relative flex h-[90vh] w-[95vw] origin-top overflow-hidden
          rounded-[2rem]
          bg-[#141414]
          ${i > 0 ? "cursor-none" : ""}
        `}
      >
        {/* Inner hairline stroke → premium material definition */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10 z-50" />

        {/* Subtle grain → cinematic texture (CSS-only) */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-[0.035] mix-blend-overlay
            bg-[url('/noise.png')]
            z-40
          "
        />

        {type === "intro" ? (
          /* ================= INTRO CARD ================= */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Atmospheric video background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.video
                style={{ scale: imageScale }}
                src="/services/mesh.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-50 block"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Section opener typography */}
            <div className="relative z-10 max-w-5xl px-12 text-center justify-center">
              <h2 className="
                  text-[clamp(4rem,10vw,9rem)]
                  font-medium
                  tracking-[-0.04em]
                  leading-[0.95]
                  text-white">
                Our <span className="font-dancing-script text-[#3] tracking-normal">Services</span>
              </h2>

              <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/50">
                What we do
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Background Video (Left Side) */}
            <div className="absolute top-0 left-0 w-1/2 h-full z-0 overflow-hidden">
              <motion.video
                style={{ scale: imageScale }}
                src="/services/mesh.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-50 block"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* ================= LEFT: CONTENT (Redesigned) ================= */}
            <div className="relative z-10 w-1/2 h-full flex flex-col">

              {/* TOP SECTION: Title & Index */}
              <div className="flex-1 relative flex flex-col justify-center p-12">
                {/* Giant Background Index */}
                <div className="absolute top-6 left-8 text-[12vw] font-black text-white/3 leading-none select-none pointer-events-none font-urbanist tracking-tighter mix-blend-overlay">
                  0{i}
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  <h2 className="text-[4.5vw] font-medium leading-[0.9] tracking-tighter text-white">
                    {title}
                  </h2>
                </div>
              </div>

              {/* BOTTOM SECTION: Splits */}
              <div className="h-[40%] flex w-full">

                {/* Description Column */}
                <div className="flex-1 p-10 border-r border-white/10 flex flex-col gap-4 bg-black/20 backdrop-blur-sm">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                    Overview
                  </span>
                  <p className="text-base text-white/70 leading-relaxed font-light max-w-xs">
                    {description}
                  </p>
                </div>

                {/* Tags/Specs Column */}
                <div className="flex-1 p-10 flex flex-col gap-5 bg-black/20 backdrop-blur-sm">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                    Services
                  </span>
                  <div className="flex flex-col gap-3">
                    {tags?.slice(0, 4).map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <span className="w-4 h-px bg-white/20" />
                        <span className="text-xs text-white/60 font-mono uppercase tracking-wider">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ================= RIGHT: IMAGE ================= */}
            <div className="relative w-1/2 h-full overflow-hidden">
              {/* Contrast mask → ensures text dominance */}
              <div
                className="
                  pointer-events-none absolute inset-0 z-10
                  bg-gradient-to-l
                  from-black/70 via-black/30 to-transparent
                "
              />

              <motion.img
                style={{ scale: imageScale }}
                src={src}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef(null);
  const [cursorActive, setCursorActive] = useState(false);
  const leaveTimeout = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const handleCursorEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setCursorActive(true);
  };

  const handleCursorLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setCursorActive(false);
    }, 100);
  };

  return (
    <ReactLenis root>
      <CustomCursor active={cursorActive} />
      <main
        ref={container}
        className={`relative flex w-full flex-col ${cursorActive ? 'cursor-none' : ''}`}
      >
        {projects.map((project, i) => {
          const targetScale = Math.max(
            0.5,
            1 - (projects.length - i - 1) * 0.1
          );

          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * Visual refinement only — logic untouched.
 *
 * Editorial, cinematic, Awwwards-inspired layout.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
