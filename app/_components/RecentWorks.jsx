import { motion } from 'framer-motion'
import { StickyCard002 } from '@/components/ui/skiper-ui/skiper17'
import React from 'react'

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

const RecentWorks = () => {
    return (
        <section className='flex items-center justify-center mt-40 flex-col '>

            <div
                className='flex flex-col items-center justify-center relative z-0 gap-4'>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='font-light font-urbanist text-blue-700 text-3xl'
                >
                    ( <span className='font-dancing-script text-3xl'>curated projects</span> )
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-[13rem] font-semibold tracking-tight leading-none"
                >
                    <span className="bg-linear-to-b from-black/20 to-white bg-clip-text text-transparent">
                        Recent Works
                    </span>
                </motion.h1>
            </div>



            <div className='h-screen w-full relative z-10 -mt-18'>
                <StickyCard002 cards={cards} />
            </div>

        </section>
    )
}

export default RecentWorks