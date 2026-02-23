"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../_store/useStore';
import FlowingMenu from '@/components/ui/FlowingMenu';

import { Link000 } from '@/components/ui/skiper-ui/skiper40';


const demoItems = [
    { link: '#home', text: 'Home', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#about', text: 'About', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#work', text: 'Recent Work', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#services', text: 'Services', image: 'https://picsum.photos/600/400?random=4' },
    { link: 'https://cal.com/websual.agency/intro-call', text: 'Contact', image: 'https://picsum.photos/600/400?random=5', target: '_blank' }
];


const MenuPage = () => {
    const { isMenuOpen, setIsMenuOpen } = useStore();

    const handleItemClick = () => {
        setIsMenuOpen(false);
    };

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
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-100 bg-black flex flex-col justify-center items-center overflow-hidden will-change-[clip-path] backface-visibility-hidden"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className='w-full h-fit mt-8 sm:mt-10 md:mt-12 xl:mt-15'>
                <FlowingMenu items={demoItems}
                    speed={5}
                    textColor="#ffffff"
                    bgColor="#000000"
                    marqueeBgColor="#126cfd"
                    marqueeTextColor="#ffffff"
                    borderColor="#ffffff"
                    onItemClick={handleItemClick}
                />
            </div>


            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-8 sm:right-8 xl:bottom-10 xl:right-10 flex gap-6 sm:gap-8 xl:gap-10 text-white font-urbanist text-base sm:text-lg xl:text-xl'>
                <Link000 href="https://www.instagram.com/websual.agency" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a86ff] transition-colors">Instagram</Link000>
                <Link000 href="" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a86ff] transition-colors">LinkedIn</Link000>
            </div>
        </motion.div>

    );
};

export default MenuPage;