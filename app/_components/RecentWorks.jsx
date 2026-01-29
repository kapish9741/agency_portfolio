import { motion } from 'framer-motion'
import React from 'react'
import { GlassCarousel } from '@/components/ui/lumina-interactive-list'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'



const RecentWorks = () => {
    return (
        <section className='flex items-center justify-center mt-40 flex-col '>

            {/* <div
                className='flex flex-col items-center justify-center relative z-0 gap-4'>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='font-light font-urbanist text-[#3a86ff] text-3xl'
                >
                    ( <span className='font-dancing-script text-3xl'>curated projects</span> )
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-[13rem] font-semibold tracking-tight leading-none font-urbanist">
                    <span className="bg-[linear-gradient(180deg,#ffffff,#0B0B0B)] bg-clip-text text-transparent">
                        Recent Works
                    </span>
                </motion.h1>
            </div> */}

            <ScrollVelocityContainer className="text-4xl font-medium text-white md:text-[25rem] font-urbanist tracking-tight leading-none">
                <ScrollVelocityRow baseVelocity={5} direction={1} scrollDependent={true}>
                    Recent
                    <span style={{ display: 'inline-block', width: '15vw', height: '7px', backgroundColor: 'white', margin: '0 4vw', verticalAlign: 'middle' }}></span>
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={5} direction={-1} className='text-[#292828] md:-mt-20' scrollDependent={true}>
                    Work
                    <span style={{ display: 'inline-block', width: '15vw', height: '7px', backgroundColor: '#292828', margin: '0 4vw', verticalAlign: 'middle' }}></span>
                </ScrollVelocityRow>
            </ScrollVelocityContainer>


            <div className="w-full relative">
                <GlassCarousel />
            </div>



        </section>
    )
}

export default RecentWorks