"use client";
import React, { useContext, useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

export const wrap = (min, max, v) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ScrollVelocityContext = React.createContext(null)

export function ScrollVelocityContainer({
  children,
  className,
  ...props
}) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  );
}

export function ScrollVelocityRow({
  scrollDependent = false, // new prop
  ...props
}) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext)
  if (sharedVelocityFactor) {
    return (<ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} scrollDependent={scrollDependent} />);
  }
  return <ScrollVelocityRowLocal {...props} scrollDependent={scrollDependent} />;
}

function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  scrollDependent = false, // new prop
  direction = 1,
  className,
  velocityFactor,
  ...props
}) {
  const containerRef = useRef(null)
  const blockRef = useRef(null)
  const [numCopies, setNumCopies] = useState(1)

  const baseX = useMotionValue(0)
  const baseDirectionRef = useRef(direction >= 0 ? 1 : -1)
  const currentDirectionRef = useRef(direction >= 0 ? 1 : -1)
  const unitWidth = useMotionValue(0)

  const isInViewRef = useRef(true)
  const isPageVisibleRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const block = blockRef.current
    if (!container || !block) return

    const updateSizes = () => {
      const cw = container.offsetWidth || 0
      const bw = block.scrollWidth || 0
      unitWidth.set(bw)
      const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1
      setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies))
    }

    updateSizes()

    const ro = new ResizeObserver(updateSizes)
    ro.observe(container)
    ro.observe(block)

    const io = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting
    })
    io.observe(container)

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    })
    handleVisibility()

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handlePRM = () => {
      prefersReducedMotionRef.current = mq.matches
    }
    mq.addEventListener("change", handlePRM)
    handlePRM()

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      mq.removeEventListener("change", handlePRM)
    };
  }, [children, unitWidth])

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1
    const offset = Number(v) || 0
    return `${-wrap(0, width, offset)}px`;
  })

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return
    const dt = delta / 1000
    const vf = velocityFactor.get()
    const absVf = Math.min(5, Math.abs(vf))

    // If scrollDependent is true, speed is purely based on scroll velocity (absVf).
    // Otherwise, it's base speed (1) + scroll boost (absVf).
    const speedMultiplier = prefersReducedMotionRef.current
      ? (scrollDependent ? 0 : 1)
      : (scrollDependent ? absVf : 1 + absVf)

    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection
    }

    const bw = unitWidth.get() || 0
    if (bw <= 0) return
    const pixelsPerSecond = (bw * baseVelocity) / 100

    // If scrollDependent is true and we aren't scrolling (absVf ~ 0), speedMultiplier is 0, so no movement.
    const moveBy =
      currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}>
      <motion.div
        className="inline-flex transform-gpu items-center will-change-transform select-none"
        style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0}
            className="inline-flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollVelocityRowLocal(props) {
  const { scrollY } = useScroll()
  const localVelocity = useVelocity(scrollY)
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })
  return (<ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />);
}
