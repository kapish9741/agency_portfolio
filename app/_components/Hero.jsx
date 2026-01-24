'use client'
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import { FlowButton } from '@/components/ui/flow-button'
import ShowReel from './_Hero/ShowReel'
import LogoCloud from '@/components/logo-cloud'


const Hero = () => {


  return (
    <section className="mt-28 flex flex-col items-center justify-center gap-12 overflow-x-hidden mb-20">
      {/* Content Wrapper with Padding */}
      <div className='flex flex-col items-center justify-center px-4 gap-12 w-full'>
        <div className='flex items-center justify-center gap-2'>
          <AvatarGroup>
            <Avatar className="border-2 border-white">
              <AvatarImage src="https://framerusercontent.com/images/G5E86VA7DStEga3pPtCu3nwW1qE.png?width=512&height=512" alt="@shadcn" />
            </Avatar>
            <Avatar className="border-2 border-white">
              <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            </Avatar>
            <Avatar className="border-2 border-white">
              <AvatarImage
                src="https://framerusercontent.com/images/I9yoNS4RgoWEeRpJDtgEIoLAd4Y.png?width=512&height=512"
                alt="@evilrabbit"
              />
            </Avatar>
          </AvatarGroup>

          <p className='font-urbanist text-neutral-500 text-[15px] leading-[1.1] tracking-tight font-medium'>Trusted by Founders.</p>
        </div>

        <h1 className='font-urbanist text-black text-6xl max-w-5xl font-semibold text-center leading-[1.1] tracking-tight'>
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
            className="inline-flex items-center align-middle mx-1 md:mx-2">
            <Image
              src="/Hero/1.jpeg"
              alt="Design"
              width={100}
              height={50}
              className="w-24 h-17 object-cover rounded-[34px] shadow-2xl"
            />
          </motion.span>{' '}
          <span className="text-blue-700 font-dancing-script">Designs</span> <br className="hidden md:block" />
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
            className="inline-flex items-center align-middle mx-1 md:mx-2"
          >
            <Image
              src="/Hero/2.jpg"
              alt="Ambitious"
              width={100}
              height={50}
              className="w-24 h-17 object-cover rounded-[34px] shadow-2xl"
            />
          </motion.span>{' '}
          ambitious <span className='text-blue-700 font-dancing-script'>Brands</span> <br className="hidden md:block" />
          <span>building digital </span>
          <span className='text-blue-700 font-dancing-script'>Products.</span>

        </h1>

        <h3 className='font-medium font-urbanist text-neutral-500 text-lg max-w-2xl text-center leading-[1.1] tracking-tight'>
          From MVPs to rebrands, we make it easy for startups to launch, grow, and scale with clean, conversion-focused designs that are fast, clear, and scalable.
        </h3>

        <FlowButton text="View Plans" />
      </div>

      {/* Video Container that expands to full screen */}

      <div>

      <ShowReel/>

      <LogoCloud/>
      </div>
    </section>
  )
}

export default Hero