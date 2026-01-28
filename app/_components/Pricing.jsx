import React from 'react'
import { motion } from 'framer-motion'
import PricingTable from './_Pricing/PricingTable'
import PricingDemo from '@/components/demo'

const Pricing = () => {
  return (
    <section className='flex items-center justify-center mt-20 flex-col'>

      <div className='flex flex-col justify-center relative z-0 gap-4'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='font-light font-urbanist text-blue-700 text-3xl'>
          ( <span className='font-dancing-script text-3xl'>built for growth</span> )
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-[13rem] font-semibold tracking-tight leading-none font-urbanist">
          <span className="bg-linear-to-b from-black/20 to-white bg-clip-text text-transparent">
            Our Pricing
          </span>
        </motion.h1>
      </div>


      <div className="w-full">
        <PricingTable />
      </div>

      <PricingDemo/>



    </section>
  )
}

export default Pricing