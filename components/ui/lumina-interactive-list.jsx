import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import GlassSurface from '../GlassSurface';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function GlassCarousel() {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        // --- CONFIGURATION ---
        const SLIDER_CONFIG = {
            settings: {
                transitionDuration: 2.5, autoSlideSpeed: 5000, currentEffect: "glass", currentEffectPreset: "Default",
                globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
                glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
                frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
                rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
                plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
                timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4
            },
            effectPresets: {
                glass: { Subtle: { glassRefractionStrength: 0.6, glassChromaticAberration: 0.5, glassBubbleClarity: 1.3, glassEdgeGlow: 0.7, glassLiquidFlow: 0.8 }, Default: { glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0 }, Crystal: { glassRefractionStrength: 1.5, glassChromaticAberration: 1.8, glassBubbleClarity: 0.7, glassEdgeGlow: 1.4, glassLiquidFlow: 0.5 }, Liquid: { glassRefractionStrength: 0.8, glassChromaticAberration: 0.4, glassBubbleClarity: 1.2, glassEdgeGlow: 0.8, glassLiquidFlow: 1.8 } },
                frost: { Light: { frostIntensity: 0.8, frostCrystalSize: 1.3, frostIceCoverage: 0.6, frostTemperature: 0.7, frostTexture: 0.8 }, Default: { frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0 }, Heavy: { frostIntensity: 2.2, frostCrystalSize: 0.7, frostIceCoverage: 1.4, frostTemperature: 1.5, frostTexture: 1.3 }, Arctic: { frostIntensity: 2.8, frostCrystalSize: 0.5, frostIceCoverage: 1.8, frostTemperature: 2.0, frostTexture: 1.6 } },
                ripple: { Gentle: { rippleFrequency: 15.0, rippleAmplitude: 0.05, rippleWaveSpeed: 0.7, rippleRippleCount: 0.8, rippleDecay: 1.2 }, Default: { rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0 }, Strong: { rippleFrequency: 35.0, rippleAmplitude: 0.12, rippleWaveSpeed: 1.4, rippleRippleCount: 1.3, rippleDecay: 0.8 }, Tsunami: { rippleFrequency: 45.0, rippleAmplitude: 0.18, rippleWaveSpeed: 1.8, rippleRippleCount: 1.6, rippleDecay: 0.6 } },
                plasma: { Calm: { plasmaIntensity: 0.8, plasmaSpeed: 0.5, plasmaEnergyIntensity: 0.2, plasmaContrastBoost: 0.1, plasmaTurbulence: 0.6 }, Default: { plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0 }, Storm: { plasmaIntensity: 1.8, plasmaSpeed: 1.3, plasmaEnergyIntensity: 0.7, plasmaContrastBoost: 0.5, plasmaTurbulence: 1.5 }, Nuclear: { plasmaIntensity: 2.5, plasmaSpeed: 1.8, plasmaEnergyIntensity: 1.0, plasmaContrastBoost: 0.8, plasmaTurbulence: 2.0 } },
                timeshift: { Subtle: { timeshiftDistortion: 0.5, timeshiftBlur: 0.6, timeshiftFlow: 0.5, timeshiftChromatic: 0.4, timeshiftTurbulence: 0.6 }, Default: { timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4 }, Intense: { timeshiftDistortion: 2.2, timeshiftBlur: 2.0, timeshiftFlow: 2.0, timeshiftChromatic: 2.2, timeshiftTurbulence: 2.0 }, Dreamlike: { timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5 } }
            }
        };

        const slides = [
            { title: "Ethereal Glow", description: "A soft, radiant light that illuminates the soul.", media: "/projects/1.webp" },
            { title: "Rose Mirage", description: "Lost in a desert of blooming dreams and endless horizons.", media: "/projects/2.webp" },
            { title: "Velvet Mystique", description: "Wrapped in the deep, luxurious embrace of the night.", media: "/projects/3.webp" },
            { title: "Golden Hour", description: "That fleeting moment when the world is dipped in gold.", media: "/projects/4.webp" },
            { title: "Midnight Dreams", description: "Where reality fades and imagination takes flight.", media: "/projects/5.webp" },
        ];

        // --- SHADERS ---
        const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform int uEffectType;
            uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
            uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
            uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage, uFrostTemperature, uFrostTexture;
            uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed, uRippleRippleCount, uRippleDecay;
            uniform float uPlasmaIntensity, uPlasmaSpeed, uPlasmaEnergyIntensity, uPlasmaContrastBoost, uPlasmaTurbulence;
            uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftFlow, uTimeshiftChromatic, uTimeshiftTurbulence;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            
            vec4 glassEffect(vec2 uv, float progress) {
                float time = progress * 5.0 * uSpeedMultiplier;
                vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
                float maxR = length(uResolution) * 0.85; float br = progress * maxR;
                vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
                float d = length(p - c); float nd = d / max(br, 0.001);
                float param = smoothstep(br + 3.0, br - 3.0, d); // Inside circle
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
            // Simplified stubs
            vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

            void main() {
                if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
                else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
                else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
                else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
                else gl_FragColor = timeshiftEffect(vUv, uProgress);
            }
        `;

        // --- GLOBAL STATE (Scoped to Effect) ---
        let shaderMaterial, renderer, scene, camera;
        let slideTextures = [];
        let texturesLoaded = false;

        // Tracking State for Scroll Logic
        let currentSegment = -1;

        const getEffectIndex = (n) => (({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 }))[n] || 0;

        const updateShaderUniforms = () => {
            if (!shaderMaterial) return;
            const s = SLIDER_CONFIG.settings, u = shaderMaterial.uniforms;
            for (const key in s) {
                const uName = 'u' + key.charAt(0).toUpperCase() + key.slice(1);
                if (u[uName]) u[uName].value = s[key];
            }
            u.uEffectType.value = getEffectIndex(s.currentEffect);
        };

        const updateTimelineState = (activeIdx, progress) => {
            const segments = document.querySelectorAll(".timeline-segment .timeline-fill");
            segments.forEach((fill, i) => {
                if (i < activeIdx) {
                    fill.style.width = "100%";
                    fill.style.opacity = 1;
                } else if (i > activeIdx) {
                    fill.style.width = "0%";
                    fill.style.opacity = 1;
                } else {
                    // Current
                    fill.style.width = `${progress * 100}%`;
                    fill.style.opacity = 1;
                }
            });
        };

        const loadImageTexture = (src) => new Promise((resolve, reject) => {
            const l = new THREE.TextureLoader();
            l.load(src, (t) => {
                t.minFilter = t.magFilter = THREE.LinearFilter;
                t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
                resolve(t);
            }, undefined, reject);
        });

        const initRenderer = async () => {
            const canvas = document.querySelector(".webgl-canvas"); if (!canvas) return;
            scene = new THREE.Scene(); camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
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
                    uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 },
                    // Init others defaults
                    uFrostIntensity: { value: 1.0 }, uFrostCrystalSize: { value: 1.0 }, uFrostIceCoverage: { value: 1.0 }, uFrostTemperature: { value: 1.0 }, uFrostTexture: { value: 1.0 },
                    uRippleFrequency: { value: 25.0 }, uRippleAmplitude: { value: 0.08 }, uRippleWaveSpeed: { value: 1.0 }, uRippleRippleCount: { value: 1.0 }, uRippleDecay: { value: 1.0 },
                    uPlasmaIntensity: { value: 1.2 }, uPlasmaSpeed: { value: 0.8 }, uPlasmaEnergyIntensity: { value: 0.4 }, uPlasmaContrastBoost: { value: 0.3 }, uPlasmaTurbulence: { value: 1.0 },
                    uTimeshiftDistortion: { value: 1.6 }, uTimeshiftBlur: { value: 1.5 }, uTimeshiftFlow: { value: 1.4 }, uTimeshiftChromatic: { value: 1.5 }, uTimeshiftTurbulence: { value: 1.4 }
                },
                vertexShader, fragmentShader
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

            for (const s of slides) { try { slideTextures.push(await loadImageTexture(s.media)); } catch { console.warn("Failed texture"); } }

            if (slideTextures.length >= 2) {
                // Initial Setup
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;

                texturesLoaded = true;
                updateShaderUniforms();
                document.querySelector(".slider-wrapper")?.classList.add("loaded");

                updateTimelineState(0, 0);
            }

            const render = () => { if (renderer) { renderer.render(scene, camera); requestAnimationFrame(render); } };
            render();
        };

        const createTimeline = () => {
            const timeline = document.getElementById("sliderTimeline");
            if (!timeline || timeline.children.length > 0) return;
            timeline.innerHTML = "";
            slides.forEach((_, i) => {
                const segment = document.createElement("div");
                segment.className = "timeline-segment";
                const fill = document.createElement("div");
                fill.className = "timeline-fill";
                segment.appendChild(fill);
                // Click to scroll
                segment.addEventListener("click", () => {
                    const totalDist = window.innerHeight * (slides.length);
                    const targetScroll = (i / (slides.length)) * totalDist;
                    const offset = containerRef.current.offsetTop;
                    window.scrollTo({ top: offset + targetScroll, behavior: 'smooth' });
                });
                timeline.appendChild(segment);
            });
        };

        // --- SCROLLTRIGGER SETUP ---
        const initScrollTrigger = () => {
            // Force refresh to ensure accurate layout readings
            ScrollTrigger.refresh();

            const totalSlides = slides.length;
            const scrollDist = () => window.innerHeight * totalSlides;

            ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                end: () => `+=${scrollDist()}`,
                scrub: 0.1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (!texturesLoaded || !shaderMaterial) return;

                    const totalProgress = self.progress; // 0 to 1

                    // Key change: Use totalSlides for segment calculation logic
                    // Segment 0: Static Image 0
                    // Segment 1: Transition 0 -> 1
                    // Segment 2: Transition 1 -> 2
                    // Segment 3: Transition 2 -> 3
                    // Segment 4: Transition 3 -> 4

                    const totalSegments = totalSlides;
                    const rawValue = totalProgress * totalSegments;

                    let segmentIndex = Math.floor(rawValue);
                    if (segmentIndex >= totalSegments) segmentIndex = totalSegments - 1;

                    let localProgress = rawValue - segmentIndex;
                    if (totalProgress >= 1) localProgress = 1;

                    // Update Textures and Uniforms based on Segment Index
                    if (currentSegment !== segmentIndex) {
                        let t1, t2;

                        if (segmentIndex === 0) {
                            // Segment 0: Hold Image 0
                            t1 = slideTextures[0];
                            t2 = slideTextures[0]; // Or slideTextures[1] but we will force progress 0
                        } else {
                            // Segments 1..4: Transitions
                            // Segment 1 -> Transition 0->1
                            // Segment 4 -> Transition 3->4
                            const fromIdx = segmentIndex - 1;
                            const toIdx = segmentIndex;

                            t1 = slideTextures[fromIdx];
                            t2 = slideTextures[toIdx];
                        }

                        if (t1 && t2) {
                            shaderMaterial.uniforms.uTexture1.value = t1;
                            shaderMaterial.uniforms.uTexture2.value = t2;
                            shaderMaterial.uniforms.uTexture1Size.value = t1.userData.size;
                            shaderMaterial.uniforms.uTexture2Size.value = t2.userData.size;
                        }
                        currentSegment = segmentIndex;
                    }

                    // Calculate Shader Progress
                    let shaderProgress;
                    if (segmentIndex === 0) {
                        shaderProgress = 0; // Static
                    } else {
                        shaderProgress = localProgress; // 0 to 1 transition
                    }

                    // Update Uniforms
                    shaderMaterial.uniforms.uProgress.value = shaderProgress;

                    // Update Timeline
                    // Timeline still maps 1:1 to segments, which works well with this logic
                    updateTimelineState(segmentIndex, localProgress);
                }
            });
        };

        // Mouse Tracker - Smooth Logic from ShowReel
        const cursor = cursorRef.current;

        // Initial state: center pivot
        if (cursor) {
            gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
        }

        const moveCursor = (e) => {
            if (cursor) {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 1.2,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        };

        // Initialize
        createTimeline();

        initRenderer().then(() => {
            // Slight delay to allow layout to settle
            setTimeout(initScrollTrigger, 100);
        });

        // Event Listeners
        const onResize = () => {
            if (renderer) {
                renderer.setSize(window.innerWidth, window.innerHeight);
                shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", moveCursor);
            if (renderer) renderer.dispose();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <>
            <main className="slider-wrapper" ref={containerRef}>
                <canvas className="webgl-canvas"></canvas>

                {/* Custom Cursor */}
                <div ref={cursorRef} className="custom-cursor-wrapper">
                    <GlassSurface
                        width={170}
                        height={170}
                        borderRadius={100}
                        displace={0.5}
                        distortionScale={-180}
                        redOffset={0}
                        greenOffset={10}
                        blueOffset={20}
                        brightness={50}
                        opacity={0.93}
                        mixBlendMode="screen"
                        className="flex items-center justify-center cursor-glass-surface"
                    >
                        <span className="cursor-text font-urbanist">VIEW</span>
                    </GlassSurface>
                </div>

                {/* REMOVED: slide-number, slide-total, slide-content, slides-navigation */}

                <div className="slider-timeline" id="sliderTimeline"></div>

                <style jsx>{`
                    .slider-wrapper {
                        position: relative;
                        width: 100%;
                        height: 100vh; /* Force Fullscreen for Pinning */
                        overflow: hidden;
                        z-index: 50; /* High Z-Index */
                        cursor: none;
                    }
                    .custom-cursor-wrapper {
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 99999;
                        pointer-events: none;
                        will-change: transform;
                    }
                    .cursor-text {
                        color: rgba(255,255,255,0.9);
                        font-family: inherit;
                        font-weight: 600;
                        font-size: 14px;
                        pointer-events: none;
                    }
                    :global(.cursor-glass-surface) {
                        pointer-events: none !important;
                    }
                    .slider-timeline {
                        position: absolute;
                        bottom: 40px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 75%;
                        max-width: 900px;
                        height: 4px;
                        display: flex;
                        gap: 8px;
                        z-index: 9999;
                        pointer-events: none;
                    }
                    .webgl-canvas {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 1;
                    }

                    :global(.timeline-segment) {
                        flex: 1;
                        height: 100%;
                        background: rgba(255, 255, 255, 0.25);
                        backdrop-filter: blur(8px);
                        border-radius: 4px;
                        overflow: hidden;
                        cursor: pointer;
                        pointer-events: auto;
                        position: relative;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                        border: 1px solid rgba(255,255,255,0.1);
                    }
                    :global(.timeline-segment:hover) {
                        background: rgba(255, 255, 255, 0.4);
                        height: 6px;
                        transform: translateY(-2px);
                    }
                    :global(.timeline-fill) {
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 0%;
                        background: #fff;
                        box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
                        border-radius: 4px;
                        will-change: width;
                    }
                `}</style>
            </main>
        </>
    );
}
