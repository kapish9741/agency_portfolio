'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import styles from './_Loader/Loader.module.css';
import { useStore } from '../_store/useStore';

const Loader = () => {
    const { setIntroOut, setIsLoading, introOut } = useStore();
    const progressRef = useRef(null);
    const fullNameRef = useRef(null);
    const shortNameRef = useRef(null);
    const root = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (!introOut) {
                const tl = gsap.timeline();

                // 1. Initial percentage animation
                tl.to(progressRef.current, {
                    duration: 5,
                    ease: 'power2.inOut',
                    innerText: 100,
                    roundProps: 'innerText',
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        if (progressRef.current) {
                            progressRef.current.innerText = Math.round(this.targets()[0].innerText) + '%';
                        }
                    }
                });

                // 2. Hide Nav and Split Text
                tl.add(() => {
                    gsap.to('nav', { autoAlpha: 0, duration: 0.3 });

                    const splittedFull = new SplitType(fullNameRef.current, { types: 'lines', tagName: 'span' });
                    splittedFull.lines.forEach(line => {
                        gsap.to(line, { ease: 'power4.inOut', top: '-12vw', duration: 1 });
                    });

                    gsap.to(shortNameRef.current, { opacity: 1, duration: 0.1 });
                    const splittedShort = new SplitType(shortNameRef.current, { types: 'lines', tagName: 'span' });
                    splittedShort.lines.forEach(line => {
                        gsap.to(line, { ease: 'power4.inOut', top: '0px', duration: 1, delay: 0.1 });
                    });

                    const splittedProgress = new SplitType(progressRef.current, { types: 'lines', tagName: 'span' });
                    splittedProgress.lines.forEach(line => {
                        gsap.to(line, { ease: 'power4.inOut', top: '-12vw', duration: 1 });
                    });
                });

                // 3. Prepare main content (off-screen)
                gsap.set('#main-content', {
                    xPercent: 100,
                    scale: 0.9,
                    opacity: 1,
                    border: '2px solid #EDF1EC',
                    borderRadius: '1.3888888889vw',
                    transformOrigin: 'center center', // Changed to center
                    overflow: 'hidden',
                    force3D: true,
                    willChange: 'transform, border-radius'
                });

                gsap.set(root.current, {
                    transformOrigin: 'center center', // Changed to center
                    overflow: 'hidden',
                    willChange: 'transform'
                });

                // 4. Scale down Loader
                tl.to(root.current, {
                    scale: 0.9,
                    borderRadius: '1.3888888889vw',
                    ease: 'power2.inOut',
                    duration: 0.6,
                    force3D: true
                }, '+=0.8');

                // 5. Slide Out Loader & Slide In Content (Simultaneous)
                tl.to(root.current, {
                    xPercent: -100,
                    ease: 'power3.inOut',
                    duration: 0.9,
                    force3D: true
                }, '+=0.3');

                tl.to('#main-content', {
                    xPercent: 0,
                    ease: 'power3.inOut',
                    duration: 0.9,
                    force3D: true
                }, '<');

                // 6. Scale up Content (Zoom In)
                // Use a slightly softer ease for more premium feel
                tl.to('#main-content', {
                    scale: 1,
                    borderRadius: 0,
                    borderWidth: 0,
                    ease: 'power2.out', // Optimized ease for scaling
                    duration: 0.7,
                    force3D: true,
                    clearProps: 'willChange'
                }, '+=0.1');

                // 7. Show Nav and Finalize
                tl.to('nav', {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: 'power2.inOut'
                }, '<');

                tl.add(() => {
                    gsap.set('#main-content-wrapper', { height: 'auto', overflow: 'visible' });
                    setIntroOut(true);
                    setIsLoading(false);
                });
            }
        });

        return () => ctx.revert();
    }, [introOut, setIntroOut, setIsLoading]);

    if (introOut) return null;

    return (
        <div id="loader" ref={root} className={styles.root}>
            <div className={styles.innerContainer}>
                <div className={styles.fullNameContainer}>
                    <h2 ref={fullNameRef} className={styles.fullName}>
                        Pixlyne Studios
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
