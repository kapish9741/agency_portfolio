"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import { Link000 } from '@/components/ui/skiper-ui/skiper40'
import BookCall from './_Footer/BookCall'
import { motion, useInView } from 'framer-motion'

const Footer = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.3, once: true })

    return (
        <div ref={containerRef} className='relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]' style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className='fixed bottom-0 h-[450px] sm:h-[550px] md:h-[600px] lg:h-[650px] w-full'>
                <div className='relative h-full w-full'>
                    {/* Background Video */}
                    <video
                        src="/services/mesh.mp4"
                        autoPlay
                        loop
                        muted
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />

                    {/* Content Overlay */}
                    <div className='relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10'>


                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                            className='flex flex-col items-center gap-2 sm:gap-3 md:gap-4'>

                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.9] font-medium font-urbanist tracking-tight text-center'>
                                Let's build something <span className='font-dancing-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-normal leading-0'>better!</span>
                            </h1>

                            {/* Subheading */}
                            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/50 mb-6 sm:mb-8 md:mb-10 text-center max-w-lg font-urbanist'>
                                Tell us about your idea. We'll take care of the rest.
                            </p>
                        </motion.div>

                        {/* Actions */}
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14 md:mb-20'>
                            <BookCall />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className='absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 w-full px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6 text-sm sm:text-base text-white/60 font-medium font-urbanist'>

                        <Link href="mailto:hello@agency.design" className='flex items-center gap-2 hover:text-white transition-colors cursor-pointer z-10'>
                            <span>info@websual.agency</span>
                        </Link>
                        <div className='flex gap-4 sm:gap-6 md:gap-8 z-10'>
                            <Link000 href="https://www.instagram.com/websual.agency" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a86ff] transition-colors">Instagram</Link000>
                            <Link000 href="" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a86ff] transition-colors">LinkedIn</Link000>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer