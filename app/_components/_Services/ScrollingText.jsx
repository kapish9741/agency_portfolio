'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ScrollingText = () => {
  const container = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    const text = textRef.current

    // Calculate the distance the text needs to move
    // We want it to traverse from slightly entering the right side to fully exiting or reading clearly
    // Standard horizontal scroll: move by (scrollWidth - clientWidth) to reach the end
    // To replicate the "slide through" feel:
    // Start: 0 or offset slightly if needed
    // End: -x

    const getScrollAmount = () => {
      let amount = text.scrollWidth
      return amount
    }

    const scrollAmount = getScrollAmount();

    const tween = gsap.fromTo(text,
      {
        x: scrollAmount / 2
      },
      {
        x: -scrollAmount / 2,
        ease: "none",
      }
    )

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: () => `+=${scrollAmount}`,
      pin: true,
      scrub: 1,
      animation: tween,
      invalidateOnRefresh: true,
      refreshPriority: -1,
    })

  }, { scope: container })

  return (
    <div ref={container} className="w-full flex items-center justify-center overflow-hidden relative z-10 h-screen">
      <h1
        ref={textRef}
        className="text-[12vw] font-urbanist font-medium leading-none tracking-tight text-white whitespace-nowrap">
        Everything you need to build your <span className="text-[#3a86ff] font-dancing-script tracking-normal">digital presence</span><span className="text-[#3a86ff]">.</span>
      </h1>
    </div>
  )
}

export default ScrollingText