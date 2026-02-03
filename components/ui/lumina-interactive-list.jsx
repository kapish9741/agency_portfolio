import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import GlassSurface from '../GlassSurface';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function GlassCarousel() {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);

    const slides = [
        { title: "Ethereal Glow", description: "Radiant Light", media: "/projects/1.webp", link: "https://google.com" },
        { title: "Rose Mirage", description: "Desert Dreams", media: "/projects/2.webp", link: "https://awwwards.com" },
        { title: "Velvet Mystique", description: "Deep Embrace", media: "/projects/3.webp", link: "https://threejs.org" },
        { title: "Golden Hour", description: "Fleeting Gold", media: "/projects/4.webp", link: "https://gsap.com" },
        { title: "Midnight Dreams", description: "Imagination Flight", media: "/projects/5.webp", link: "https://react.dev" },
    ];

    const [activeSegment, setActiveSegment] = useState(0);
    const [segmentProgress, setSegmentProgress] = useState(0);

    const handleCanvasClick = () => {
        const currentLink = slides[activeSegment]?.link;
        if (currentLink) {
            window.open(currentLink, '_blank');
        }
    };

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        // --- SHADER & CONFIG ---
        const SLIDER_CONFIG = {
            settings: {
                transitionDuration: 2.5, autoSlideSpeed: 5000, currentEffect: "glass",
                globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0,
                glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
            }
        };

        const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform int uEffectType;
            uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
            uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            
            vec4 glassEffect(vec2 uv, float progress) {
                float time = progress * 5.0 * uSpeedMultiplier;
                vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
                float maxR = length(uResolution) * 0.85; float br = progress * maxR;
                vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
                float d = length(p - c); float nd = d / max(br, 0.001);
                float param = smoothstep(br + 3.0, br - 3.0, d);
                vec4 img;
                if (param > 0.0) {
                     float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                     vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                     vec2 distUV = uv2 - dir * ro;
                     distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                     float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                     img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                     if (uGlassEdgeGlow > 0.0) {
                        float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                        img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                     }
                } else { img = texture2D(uTexture2, uv2); }
                vec4 oldImg = texture2D(uTexture1, uv1);
                if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
                return mix(oldImg, img, param);
            }

            void main() {
                gl_FragColor = glassEffect(vUv, uProgress);
            }
        `;

        let shaderMaterial, renderer, scene, camera;
        let slideTextures = [];
        let currentSegment = -1;

        let ctx = gsap.context(() => {
            const cursor = cursorRef.current;
            if (cursor) {
                gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 0 });
                window.addEventListener("mousemove", (e) => {
                    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 1.2, ease: "power3.out", overwrite: "auto" });
                });
            }
        }, wrapperRef);

        const loadImageTexture = (src) => new Promise((resolve, reject) => {
            const l = new THREE.TextureLoader();
            l.load(src, (t) => {
                t.minFilter = t.magFilter = THREE.LinearFilter;
                t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
                resolve(t);
            }, undefined, reject);
        });

        const initRenderer = async () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTexture1Size: { value: new THREE.Vector2(1, 1) }, uTexture2Size: { value: new THREE.Vector2(1, 1) },
                    uEffectType: { value: 0 },
                    uGlobalIntensity: { value: 1.0 }, uSpeedMultiplier: { value: 1.0 }, uDistortionStrength: { value: 1.0 }, uColorEnhancement: { value: 1.0 },
                    uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 }
                },
                vertexShader, fragmentShader
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

            for (const s of slides) { try { slideTextures.push(await loadImageTexture(s.media)); } catch { console.warn("Failed texture"); } }

            if (slideTextures.length >= 2) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                document.querySelector(".canvas-container")?.classList.add("loaded");
            }

            const render = () => { if (renderer) { renderer.render(scene, camera); requestAnimationFrame(render); } };
            render();
        };

        const initScrollTrigger = () => {
            if (ctx.reverted) return;

            ctx.add(() => {
                ScrollTrigger.refresh();
                const TRANSITION_PHASE = 0.15;
                const SLIDES_PHASE = 1 - (TRANSITION_PHASE * 2);
                const totalDistance = window.innerHeight * (slides.length + 2);

                const updateLogic = (self) => {
                    if (!shaderMaterial || !containerRef.current) return;

                    const p = self.progress;
                    let webglProgress = 0;
                    let scale = 0.85;
                    let borderRadius = 40;

                    // PHASE 1: ENTRY
                    if (p < TRANSITION_PHASE) {
                        const localP = p / TRANSITION_PHASE;
                        scale = 0.85 + (0.15 * localP);
                        borderRadius = 40 * (1 - localP);
                        webglProgress = 0;
                    }
                    // PHASE 3: EXIT
                    else if (p > (1 - TRANSITION_PHASE)) {
                        const localP = (p - (1 - TRANSITION_PHASE)) / TRANSITION_PHASE;
                        scale = 1.0 - (0.15 * localP);
                        borderRadius = 40 * localP;
                        webglProgress = 1;
                    }
                    // PHASE 2: SLIDES
                    else {
                        scale = 1.0;
                        borderRadius = 0;
                        webglProgress = (p - TRANSITION_PHASE) / SLIDES_PHASE;
                    }

                    containerRef.current.style.transform = `scale(${scale})`;
                    containerRef.current.style.borderRadius = `${borderRadius}px`;

                    const totalSegments = slides.length;
                    const rawValue = webglProgress * totalSegments;
                    let segmentIndex = Math.floor(rawValue);
                    if (segmentIndex >= totalSegments) segmentIndex = totalSegments - 1;

                    let localProgress = rawValue - segmentIndex;
                    if (webglProgress >= 1) localProgress = 1;
                    if (webglProgress <= 0) localProgress = 0;

                    if (currentSegment !== segmentIndex) {
                        let t1, t2;
                        if (segmentIndex === 0) {
                            t1 = slideTextures[0]; t2 = slideTextures[0];
                        } else {
                            const fromIdx = segmentIndex - 1; const toIdx = segmentIndex;
                            t1 = slideTextures[fromIdx]; t2 = slideTextures[toIdx];
                        }
                        if (t1 && t2) {
                            shaderMaterial.uniforms.uTexture1.value = t1;
                            shaderMaterial.uniforms.uTexture2.value = t2;
                            shaderMaterial.uniforms.uTexture1Size.value = t1.userData.size;
                            shaderMaterial.uniforms.uTexture2Size.value = t2.userData.size;
                        }
                        currentSegment = segmentIndex;
                    }

                    let shaderProgress = (segmentIndex === 0) ? 0 : localProgress;
                    shaderMaterial.uniforms.uProgress.value = shaderProgress;
                    setActiveSegment(segmentIndex);
                    setSegmentProgress(localProgress);
                };

                const trigger = ScrollTrigger.create({
                    trigger: wrapperRef.current,
                    pin: true,
                    start: "top top",
                    end: () => `+=${totalDistance}`,
                    scrub: 0.1,
                    invalidateOnRefresh: true,
                    onUpdate: updateLogic
                });

                updateLogic(trigger);
            });
        };

        initRenderer().then(() => {
            if (!ctx.reverted) initScrollTrigger();
        });

        const onResize = () => {
            if (renderer) {
                renderer.setSize(window.innerWidth, window.innerHeight);
                shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            if (renderer) renderer.dispose();
            ctx.revert();
        };
    }, []);

    const handleTimelineClick = (index) => {
        const totalDistance = window.innerHeight * (slides.length + 2);
        const targetScroll = (index / slides.length) * totalDistance;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    return (
        <section className="scroll-wrapper" ref={wrapperRef}>
            <div
                className="canvas-container"
                ref={containerRef}
                onMouseEnter={() => {
                    if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={() => {
                    if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: "power2.out" });
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="webgl-canvas"
                    onClick={handleCanvasClick}
                ></canvas>

                <div className="overlay-ui">
                    <div className="slide-info">
                        <div className="slide-text-wrapper">
                            {slides.map((slide, i) => (
                                <div
                                    key={i}
                                    className={`slide-text-item ${i === activeSegment ? 'active' : ''}`}
                                >
                                    <h2 className="slide-title font-urbanist font-medium">{slide.title}</h2>
                                    <p className="slide-desc font-urbanist font-light">{slide.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="slider-timeline">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                className={`timeline-segment ${i === activeSegment ? 'active-seg' : ''}`}
                                onClick={() => handleTimelineClick(i)}
                            >
                                <div
                                    className="timeline-fill"
                                    style={{
                                        width: i < activeSegment ? "100%" : (i === activeSegment ? `${segmentProgress * 100}%` : "0%"),
                                        opacity: 1
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={cursorRef} className="custom-cursor-wrapper">
                <GlassSurface
                    width={180} height={180} borderRadius={100} displace={0.5} distortionScale={-180}
                    redOffset={0} greenOffset={10} blueOffset={20} brightness={50} opacity={0.93}
                    mixBlendMode="screen" className="flex items-center justify-center cursor-glass-surface"
                >
                    <span className="cursor-text font-urbanist">VIEW</span>
                </GlassSurface>
            </div>

            <style jsx>{`
                .scroll-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    /* KEY CHANGE: Hide system cursor globally on this component */
                    /* cursor: none; REMOVED to allow system cursor outside canvas */
                }
                .canvas-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-origin: center center;
                    overflow: hidden;
                    will-change: transform, border-radius;
                    transform: scale(0.85);
                    border-radius: 40px;
                    cursor: none; /* Hide system cursor ONLY inside the canvas container */
                }
                .webgl-canvas {
                    display: block;
                    width: 100%;
                    height: 100%;
                    /* KEY CHANGE: Hide cursor on canvas (removes pointer hand) */
                    cursor: none;
                }

                .overlay-ui {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: 10;
                }

                .slide-info {
                    position: absolute;
                    top: 60px; 
                    left: 5vw;
                    color: white;
                    z-index: 12;
                    pointer-events: none;
                }
                
                .slide-text-wrapper {
                    position: relative;
                    height: 80px;
                    width: 500px;
                }
                .slide-text-item {
                    position: absolute;
                    top: 0; left: 0;
                    opacity: 0;
                    transform: translateY(20px);
                    filter: blur(10px);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .slide-text-item.active {
                    opacity: 1;
                    transform: translateY(0);
                    filter: blur(0px);
                }
                .slide-title {
                    font-size: 4rem;
                    line-height: 1;
                    margin: 0;
                    letter-spacing: -1px;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                .slide-desc {
                    font-size: 1rem;
                    opacity: 0.8;
                    letter-spacing: 1px;
                    margin-top: 0.5rem;
                    text-transform: uppercase;
                }

                .slider-timeline {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 85%;
                    max-width: 1400px;
                    height: 20px;
                    display: flex;
                    gap: 6px;
                    z-index: 20;
                    pointer-events: auto;
                }
                .timeline-segment {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    /* KEY CHANGE: Hide cursor on timeline (removes pointer hand) */
                    cursor: none;
                    position: relative;
                    transition: opacity 0.3s;
                }
                .timeline-segment:hover {
                    opacity: 1;
                }
                .timeline-segment::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                }
                .timeline-fill {
                    position: relative;
                    height: 2px;
                    background: #fff;
                    border-radius: 2px;
                    box-shadow: 0 0 10px rgba(255,255,255,0.8);
                    z-index: 2;
                    will-change: width;
                }
                .timeline-segment.active-seg .timeline-fill {
                    height: 3px;
                }

                .custom-cursor-wrapper {
                    position: fixed;
                    top: 0; left: 0;
                    z-index: 99999;
                    pointer-events: none;
                    will-change: transform;
                }
                .cursor-text {
                    color: rgba(255,255,255,0.9);
                    font-family: inherit; font-weight: 600; font-size: 12px; pointer-events: none;
                    letter-spacing: 1px;
                }
                :global(.cursor-glass-surface) { pointer-events: none !important; }

                @media (max-width: 768px) {
                    .slide-title { font-size: 2.5rem; }
                    .slider-timeline { width: 90%; bottom: 30px; }
                    .slide-info { left: 20px; top: 80px; } 
                }
            `}</style>
        </section>
    );
}