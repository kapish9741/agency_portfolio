import { motion } from 'framer-motion'
import React from 'react'
import { GlassCarousel } from '@/components/ui/lumina-interactive-list'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'



const RecentWorks = () => {
    return (
        <section className='flex items-center justify-center mt-30 flex-col '>

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