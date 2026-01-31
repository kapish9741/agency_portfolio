"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

const projects = [
  {
    title: "Our Services",
    src: "/services/img1.jpg",
    type: "intro",
  },
  {
    title: "Website Development",
    description:
      "We build fast, scalable websites and applications that convert visitors into customers.",
    tags: ["MVP Development", "Landing Page", "Full Stack", "CMS / Admin Dashboards"],
    src: "/services/img1.jpg",
  },
  {
    title: "Brand Design",
    description:
      "We create distinctive brand identities that leave a lasting impression.",
    tags: ["Brand Identity", "Logo Design", "Visual Language", "Brand Guidelines"],
    src: "/services/img2.jpg",
  },
  {
    title: "Graphic Design",
    description:
      "We design bold visuals that capture attention and drive engagement.",
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
      "We craft compelling video edits that tell stories and keep viewers hooked.",
    tags: ["Short-Form Videos", "Long-Form Videos", "Promo Videos", "Motion Graphics"],
    src: "/services/img2.jpg",
  },
];

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
        className="
          will-change-transform
          relative flex h-[90vh] w-[95vw] origin-top overflow-hidden
          rounded-[2rem]
          bg-[#141414]
        "
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
            <div className="relative z-10 max-w-5xl px-12 text-center">
              <h2
                className="
                  text-[clamp(4rem,10vw,9rem)]
                  font-medium
                  tracking-[-0.04em]
                  leading-[0.95]
                  text-white
                "
              >
                {title}
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
            <div className="relative z-10 w-1/2 h-full flex flex-col border-r border-white/5">

              {/* TOP SECTION: Title & Index */}
              <div className="flex-1 relative flex flex-col justify-end p-12 pb-16 border-b border-white/10">
                {/* Giant Background Index */}
                <div className="absolute top-6 left-8 text-[12vw] font-black text-white/[0.03] leading-none select-none pointer-events-none font-urbanist tracking-tighter mix-blend-overlay">
                  0{i}
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  <h2 className="text-[4.5vw] font-medium leading-[0.9] tracking-tighter text-white uppercase">
                    {title}
                  </h2>
                </div>
              </div>

              {/* BOTTOM SECTION: Splits */}
              <div className="h-[40%] flex w-full">

                {/* Description Column */}
                <div className="flex-1 p-10 border-r border-white/10 flex flex-col gap-4 bg-black/20 backdrop-blur-sm">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                    Brief
                  </span>
                  <p className="text-base text-white/70 leading-relaxed font-light max-w-xs">
                    {description}
                  </p>
                </div>

                {/* Tags/Specs Column */}
                <div className="flex-1 p-10 flex flex-col gap-5 bg-black/20 backdrop-blur-sm">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                    Scope
                  </span>
                  <div className="flex flex-col gap-3">
                    {tags?.slice(0, 4).map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <span className="w-4 h-px bg-white/20 group-hover:bg-white/60 transition-colors" />
                        <span className="text-xs text-white/60 font-mono uppercase tracking-wider group-hover:text-white transition-colors">
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main ref={container} className="relative flex w-full flex-col">
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
