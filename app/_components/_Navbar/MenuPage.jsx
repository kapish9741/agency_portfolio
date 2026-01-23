"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../_store/useStore';

const menuLinks = [
    { title: "Work", href: "#" },
    { title: "Studio", href: "#" },
    { title: "News", href: "#" },
    { title: "Contact", href: "#" },
];

const MenuPage = () => {
    const { isMenuOpen, setIsMenuOpen } = useStore();

    const overlayVariants = {
        initial: {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        animate: {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        exit: {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    const linkVariants = {
        initial: {
            y: 100,
            rotate: 7,
            opacity: 0
        },
        animate: (i) => ({
            y: 0,
            rotate: 0,
            opacity: 1,
            transition: {
                delay: 0.5 + i * 0.1,
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        }),
        exit: (i) => ({
            y: 50,
            rotate: 3,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }
        })
    };

    return (
        <motion.div
            className="fixed inset-0 z-100 bg-[#0D0E13] flex flex-col justify-center items-center overflow-hidden"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="flex flex-col items-center gap-4">
                {menuLinks.map((link, i) => (
                    <div key={link.title} className="overflow-hidden py-2">
                        <motion.a
                            href={link.href}
                            className="text-white text-7xl md:text-9xl font-urbanist font-bold uppercase block leading-tight"
                            custom={i}
                            variants={linkVariants}
                        >
                            {link.title}
                        </motion.a>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white/50 font-urbanist uppercase text-sm tracking-widest">
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                </div>
                <div>
                    © 2024 Agency
                </div>
            </div>
        </motion.div>
    );
};

export default MenuPage;