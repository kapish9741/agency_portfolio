'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styles from './_Loader/Loader.module.css';
import { useStore } from '../_store/useStore';

gsap.registerPlugin(ScrollTrigger);

const Loader = () => {
  const { setIntroOut, setIsLoading, introOut } = useStore();

  const progressRef = useRef(null);
  const fullNameRef = useRef(null);
  const shortNameRef = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    if (introOut) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* 1. Loading percentage */
      tl.to(progressRef.current, {
        duration: 5,
        ease: 'power2.inOut',
        innerText: 100,
        roundProps: 'innerText',
        snap: { innerText: 1 },
        onUpdate() {
          if (progressRef.current) {
            progressRef.current.innerText =
              Math.round(this.targets()[0].innerText) + '%';
          }
        }
      });

      /* 2. Split text animations */
      tl.add(() => {
        // ✅ FIX: scoped selector
        gsap.to('.loader-root nav', { autoAlpha: 0, duration: 0.3 });

        const full = new SplitType(fullNameRef.current, {
          types: 'lines',
          tagName: 'span'
        });
        full.lines.forEach(line =>
          gsap.to(line, { top: '-12vw', duration: 1, ease: 'power4.inOut' })
        );

        gsap.set(shortNameRef.current, { opacity: 1 });
        const short = new SplitType(shortNameRef.current, {
          types: 'lines',
          tagName: 'span'
        });
        short.lines.forEach(line =>
          gsap.to(line, { top: 0, duration: 1, delay: 0.1, ease: 'power4.inOut' })
        );

        const progress = new SplitType(progressRef.current, {
          types: 'lines',
          tagName: 'span'
        });
        progress.lines.forEach(line =>
          gsap.to(line, { top: '-12vw', duration: 1, ease: 'power4.inOut' })
        );
      });

      /* 3. Prepare main content wrapper */
      gsap.set('#main-content-wrapper', {
        position: 'fixed',
        inset: 0,
        xPercent: 100,
        scale: 0.9,
        height: '100vh',
        overflow: 'hidden',
        border: '2px solid #EDF1EC',
        borderRadius: '1.3888888889vw',
        transformOrigin: 'center center',
        force3D: true,
        willChange: 'transform, border-radius'
      });



      gsap.set(root.current, {
        transformOrigin: 'center center',
        overflow: 'hidden',
        willChange: 'transform'
      });

      /* 4. Scale loader down */
      tl.to(root.current, {
        scale: 0.9,
        borderRadius: '1.3888888889vw',
        duration: 0.6,
        ease: 'power2.inOut'
      }, '+=0.8');

      /* 5. Slide loader out & wrapper in */
      tl.to(root.current, {
        xPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut'
      }, '+=0.3');

      tl.to('#main-content-wrapper', {
        xPercent: 0,
        duration: 0.9,
        ease: 'power3.inOut'
      }, '<');

      /* 6. SCALE WRAPPER TO FULLSCREEN (MISSING BEFORE) */
      tl.to('#main-content-wrapper', {
        scale: 1,
        borderRadius: 0,
        borderWidth: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '+=0.1');

      /* 7. FINALIZE (ONLY ONCE) */
      tl.add(() => {
        gsap.set('#main-content-wrapper', {
          position: 'relative',
          inset: 'auto',
          height: 'auto',
          overflow: 'visible'
        });



        window.dispatchEvent(new Event('resize'));
        ScrollTrigger.refresh();

        setIntroOut(true);
        setIsLoading(false);
      });

      /* ✅ FIX: scoped nav show */
      tl.to('.loader-root nav', {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '<');
    });

    return () => ctx.revert();
  }, [introOut, setIntroOut, setIsLoading]);

  if (introOut) return null;

  return (
    <div id="loader" ref={root} className={`${styles.root} loader-root`}>
      <div className={styles.innerContainer}>
        <div className={styles.fullNameContainer}>
          <h2 ref={fullNameRef} className={styles.fullName}>
            Websual
          </h2>
        </div>

        <div className={styles.shortNameContainer}>
          <h2 ref={shortNameRef} className={styles.shortName}>
            Blending Creativity & Code
          </h2>
        </div>

        <div className={styles.progressContainer}>
          <h1 ref={progressRef} className={styles.progress}>
            0%
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
