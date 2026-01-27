"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../_store/useStore';
import FlowingMenu from '@/components/ui/FlowingMenu';
import Link from 'next/link';
import { Link000 } from '@/components/ui/skiper-ui/skiper40';


const demoItems = [
    { link: '#', text: 'Home', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'About', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Work', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Services', image: 'https://picsum.photos/600/400?random=4' },
    { link: '#', text: 'Contact', image: 'https://picsum.photos/600/400?random=5' }
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

    return (
        <motion.div
            className="fixed inset-0 z-100 bg-black flex flex-col justify-center items-center overflow-hidden"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className='w-full h-fit mt-15'>
                <FlowingMenu items={demoItems}
                    speed={5}
                    textColor="#ffffff"
                    bgColor="#000000"
                    marqueeBgColor="#1e40af"
                    marqueeTextColor="#ffffff"
                    borderColor="#ffffff" />
            </div>


            <div className='absolute bottom-10 right-10 flex gap-10 text-white font-urbanist text-xl'>
                <Link000 href="" className="hover:text-blue-500 transition-colors">Instagram</Link000>
                <Link000 href="" className="hover:text-blue-500 transition-colors">LinkedIn</Link000>
            </div>
        </motion.div>

    );
};

export default MenuPage;