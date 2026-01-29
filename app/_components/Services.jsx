'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCarousel } from '@/components/ui/lumina-interactive-list';
import { StickyCard002 } from '@/components/ui/skiper-ui/skiper17';


const cards = [
    {
        id: 1,
        image: "/projects/image.png",
        link: "https://www.instagram.com/",
        alt: "Description 1",
    },
    {
        id: 2,
        image: "/projects/image.png",
        link: "https://www.google.com/",
        alt: "Description 2",
    },
    {
        id: 3,
        image: "/projects/image.png",
        link: "https://www.instagram.com/",
        alt: "Description 3",
    },
];


const Services = () => {

  return (
    <section className="relative w-full flex flex-col items-center overflow-clip mb-96 mt-24">

      <div className='flex flex-col gap-4 w-full max-w-[1400px] items-start px-20'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='font-light font-urbanist text-[#3a86ff] text-3xl'>
          ( <span className='font-dancing-script text-3xl'>what we do</span> )
        </motion.p>

        <p className='font-urbanist text-[13rem] font-semibold text-white'>Our Services</p>
        {/* <div className='md:right-15 top-30 flex flex-col items-end justify-end gap-3'>
          <p className='font-dancing-script text-[#3a86ff] text-xl rotate-[-5deg]'>How we add value!</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 31 32"
            fill="none"
            className="w-15 h-15 text-[#3a86ff] mb-2 rotate-230">
            <path
              d="M-1.3266e-06 0.812487L1.24998 0.603613L1.62857 -0.000167918C1.45886 1.95803 4.50712 2.87186 5.21207 4.73215C5.42421 5.2935 4.76822 5.38815 4.56913 5.21191C4.52018 5.16948 4.33088 4.48411 3.92945 4.0631C3.5835 3.7041 2.02674 1.96782 1.63183 2.28114C2.1377 7.34635 3.34526 11.9905 5.93334 16.3998C11.2009 25.3846 20.7308 30.3095 30.9689 31.1385C15.8484 31.7782 2.73822 19.0694 1.29894 4.23934C0.443857 4.58202 1.35768 7.3594 -1.04856e-06 7.17337L-1.32646e-06 0.815748L-1.3266e-06 0.812487Z"
              fill="currentColor" />
          </svg>
        </div> */}
      </div>

      <div className='h-screen w-full relative z-10'>
        <StickyCard002 cards={cards} />
      </div>

    </section>
  );
};

export default Services;