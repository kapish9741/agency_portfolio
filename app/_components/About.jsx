import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'
import ShowReel from './_About/ShowReel'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const textRef = useRef(null)

  useGSAP(() => {
    const split = new SplitType(textRef.current, { types: 'chars' })

    gsap.set(split.chars, { color: 'rgba(255, 255, 255, 0.2)', opacity: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
        markers: false
      }
    })

    tl.to(split.chars, {
      color: '#3a86ff',
      stagger: 0.1,
      duration: 0.1,
      ease: 'none'
    })
      .to(split.chars, {
        color: '#ffffff',
        stagger: 0.1,
        duration: 0.1,
        ease: 'none'
      }, 0.15)
  }, { scope: textRef })

  return (
    <section className='mt-30 flex flex-col items-center justify-center'>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='font-light font-urbanist text-[#3a86ff] text-3xl'>
        ( <span className='font-dancing-script text-3xl'>namaste</span> )
      </motion.p>
      <p ref={textRef} className='mt-10 font-urbanist text-white text-5xl max-w-5xl font-semibold text-center leading-[1.1] tracking-tight'>
        We design and build digital products by aligning branding, graphic design, UX/UI, and development into one seamless process. The result is work that feels clear, intuitive, and built to scale without unnecessary complexity.
      </p>

      <div className="relative w-full max-w-[1400px] flex justify-center mt-10">

        <ShowReel />

        <div className="absolute -bottom-4 right-100 hidden md:flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 31 32"
            fill="none"
            className="w-15 h-15 text-[#3a86ff] mb-2">
            <path
              d="M-1.3266e-06 0.812487L1.24998 0.603613L1.62857 -0.000167918C1.45886 1.95803 4.50712 2.87186 5.21207 4.73215C5.42421 5.2935 4.76822 5.38815 4.56913 5.21191C4.52018 5.16948 4.33088 4.48411 3.92945 4.0631C3.5835 3.7041 2.02674 1.96782 1.63183 2.28114C2.1377 7.34635 3.34526 11.9905 5.93334 16.3998C11.2009 25.3846 20.7308 30.3095 30.9689 31.1385C15.8484 31.7782 2.73822 19.0694 1.29894 4.23934C0.443857 4.58202 1.35768 7.3594 -1.04856e-06 7.17337L-1.32646e-06 0.815748L-1.3266e-06 0.812487Z"
              fill="currentColor"
            />
          </svg>
          <p className='font-dancing-script text-[#3a86ff] text-xl -mt-1 rotate-[-5deg] ml-6'>See what we do!</p>
        </div>
      </div>
    </section>
  )
}

export default About