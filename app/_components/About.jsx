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

    gsap.set(split.chars, { opacity: 0.2 })

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
      opacity: 1,
      color: '#2563eb',
      stagger: 0.1,
      duration: 0.1,
      ease: 'none'
    })
      .to(split.chars, {
        color: '#000000',
        stagger: 0.1,
        duration: 0.1,
        ease: 'none'
      }, 0.15)
  }, { scope: textRef })

  return (
    <section className='mt-30 flex flex-col items-center justify-center'>
      <p className='font-light font-urbanist text-blue-700 text-3xl'>( <span className='font-dancing-script text-3xl'>namaste</span> )</p>
      <p ref={textRef} className='mt-10 font-urbanist text-black text-5xl max-w-5xl font-semibold text-center leading-[1.1] tracking-tight'>
      We design and build digital products by aligning branding, graphic design, UX/UI, and development into one seamless process. The result is work that feels clear, intuitive, and built to scale without unnecessary complexity.
      </p>

      <ShowReel />
    </section>
  )
}

export default About