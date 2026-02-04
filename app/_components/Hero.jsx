'use client'
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import { FlowButton } from '@/components/ui/flow-button'
import LogoCloud from '@/components/logo-cloud'


const Hero = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1])

  return (
    <section className="hero-section mt-12 sm:mt-16 md:mt-20 lg:mt-28 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 overflow-x-hidden mb-5 px-3 sm:px-4">
      {/* Content Wrapper with Padding */}
      <div className='flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl'>
        <div className='flex items-center justify-center gap-1.5 sm:gap-2'>
          <AvatarGroup>
            <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src="https://framerusercontent.com/images/G5E86VA7DStEga3pPtCu3nwW1qE.png?width=512&height=512" alt="@shadcn" />
            </Avatar>
            <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            </Avatar>
            <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage
                src="https://framerusercontent.com/images/I9yoNS4RgoWEeRpJDtgEIoLAd4Y.png?width=512&height=512"
                alt="@evilrabbit"
              />
            </Avatar>
          </AvatarGroup>

          <p className='font-urbanist text-neutral-500 text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-[1.1] tracking-tight font-medium'>Trusted by Founders.</p>
        </div>

        <h1
          className='font-urbanist text-black text-[22px] sm:text-[28px] md:text-4xl lg:text-5xl xl:text-6xl max-w-[320px] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl font-semibold text-center leading-[1.15] sm:leading-[1.1] tracking-tight relative z-10 px-1'
        >
          Effortless{' '}
          <motion.span
            initial={{ x: 4, y: 4 }}
            animate={{ x: -4, y: -4 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="inline-flex items-center align-middle mx-0.5 sm:mx-1 md:mx-2">
            <Image
              src="/Hero/1.jpeg"
              alt="Design"
              width={100}
              height={50}
              priority={true}
              className="w-10 h-7 sm:w-12 sm:h-9 md:w-16 md:h-11 lg:w-20 lg:h-14 xl:w-24 xl:h-17 object-cover rounded-[14px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[28px] xl:rounded-[34px] shadow-2xl"
            />
          </motion.span>{' '}
          <span className="text-[#126cfd] font-dancing-script">Designs</span> <br className="hidden md:block" />
          for{' '}
          <motion.span
            initial={{ x: 4, y: 4 }}
            animate={{ x: -4, y: -4 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="inline-flex items-center align-middle mx-0.5 sm:mx-1 md:mx-2"
          >
            <Image
              src="/Hero/2.jpg"
              alt="Ambitious"
              width={100}
              height={50}
              priority={true}
              className="w-10 h-7 sm:w-12 sm:h-9 md:w-16 md:h-11 lg:w-20 lg:h-14 xl:w-24 xl:h-17 object-cover rounded-[14px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[28px] xl:rounded-[34px] shadow-2xl"
            />
          </motion.span>{' '}
          ambitious <span className='text-[#126cfd] font-dancing-script'>Brands</span> <br className="hidden md:block" />
          <span>building digital </span>
          <span className='text-[#126cfd] font-dancing-script'>Products.</span>

        </h1>

        <h3 className='font-medium font-urbanist text-neutral-500 text-xs sm:text-sm md:text-base lg:text-lg max-w-[300px] sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center leading-[1.4] sm:leading-[1.3] md:leading-[1.2] lg:leading-[1.1] tracking-tight'>
          From MVPs to rebrands, we make it easy for startups to launch, grow, and scale with clean, conversion-focused designs that are fast, clear, and scalable.
        </h3>

        <FlowButton text="View Plans" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} />
      </div>

      {/* Video Container that expands to full screen */}

      <div className="relative w-full sm:w-[94vw] md:w-[96vw] max-w-[1550px] mx-auto flex flex-col items-center">

        <div className="w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-5" ref={containerRef}>
          <motion.div style={{ scale }} className="w-full h-full">
            <Image src="/Hero/1.jpeg" alt='hero' width={1400} height={200} priority className="w-full h-full object-cover" />
          </motion.div>
        </div>
        <LogoCloud />
      </div>
    </section>
  )
}

export default Hero