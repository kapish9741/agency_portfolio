"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../_store/useStore';

const MenuButton = () => {
    const { isMenuOpen, setIsMenuOpen } = useStore();
    const [isHovered, setIsHovered] = useState(false);

    // Akaru's exact timing
    const transition = { duration: 0.6, ease: [0.76, 0, 0.24, 1] };

    return (
        <div className="flex items-center justify-center font-urbanist">
            {/* Reduced dimensions while maintaining Akaru's proportions */}
            <motion.div
                className={`TheNavigationBurger ${isMenuOpen ? "--isOpen" : "--isShow"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                animate={{
                    width: isMenuOpen ? "3.5rem" : "8rem",
                    backgroundColor: isMenuOpen ? "#0e0e0e" : "#262626"
                }}
                transition={transition}
                style={{
                    height: "3.5rem",
                    borderRadius: "10rem",
                    position: "relative",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <div className="TheNavigationBurger-content" style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                    paddingLeft: "1.8rem"
                }}>
                    <span className="TheNavigationBurger-background" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: -1,
                        backgroundColor: "inherit",
                        borderRadius: "inherit"
                    }}></span>

                    <motion.span
                        className="TheNavigationBurger-label font-urbanist"
                        animate={{
                            clipPath: isMenuOpen ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 0%)",
                            x: isMenuOpen ? -20 : (isHovered ? -10 : 0),
                            opacity: isMenuOpen ? 0 : 1
                        }}
                        transition={transition}
                        style={{
                            color: "white",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            pointerEvents: "none"
                        }}
                    >
                        Menu
                    </motion.span>
                </div>

                <div className="TheNavigationBurger-circleWrap" style={{
                    position: "absolute",
                    right: "0.5rem",
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    pointerEvents: "none"
                }}>
                    {/* The Blue Circle */}
                    <motion.span
                        className="TheNavigationBurger-circle"
                        animate={{
                            scale: isMenuOpen ? 1.5 : (isHovered ? 0.9 : 0.2),
                        }}
                        transition={transition}
                        style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            backgroundColor: "#2563eb",
                            borderRadius: "50%",
                            display: "block"
                        }}
                    ></motion.span>

                    {/* The Hamburger / Cross Lines */}
                    <div className="TheNavigationBurger-lines" style={{
                        position: "absolute",
                        width: "1rem",
                        height: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <motion.span
                            className="TheNavigationBurger-line"
                            animate={{
                                rotate: isMenuOpen ? 45 : 0,
                                // Center origin (0) -> expands to -3 on hover
                                y: isMenuOpen ? 0 : (isHovered ? -3 : 0),
                                scaleX: (isMenuOpen || isHovered) ? 1 : 0.5,
                                opacity: (isMenuOpen || isHovered) ? 1 : 0
                            }}
                            transition={transition}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "1.5px",
                                backgroundColor: "#ffffff"
                            }}
                        ></motion.span>
                        <motion.span
                            className="TheNavigationBurger-line"
                            animate={{
                                rotate: isMenuOpen ? -45 : 0,
                                // Center origin (0) -> expands to 3 on hover
                                y: isMenuOpen ? 0 : (isHovered ? 3 : 0),
                                scaleX: (isMenuOpen || isHovered) ? 1 : 0.5,
                                opacity: (isMenuOpen || isHovered) ? 1 : 0
                            }}
                            transition={transition}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "1.5px",
                                backgroundColor: "#ffffff"
                            }}
                        ></motion.span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MenuButton;
