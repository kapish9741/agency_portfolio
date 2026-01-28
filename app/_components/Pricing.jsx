import React from 'react'
import { motion } from 'framer-motion'
import PricingTable from './_Pricing/PricingTable'
// import { useState } from 'react'
// import { AnimatePresence } from "framer-motion";
// const Pricing = () => {

//   const [idx, setIdx] = useState(0);


//   const [isAnimating, setIsAnimating] = useState(false);
//   const words = ["LAUNCH", "BUILD", "DOMINATE"];

//   const handleClick = () => {
//     if (isAnimating) return;

//     setIsAnimating(true);
//     setIdx((prev) => (prev === words.length - 1 ? 0 : prev + 1));
//   }
//   return (
//     <section className='flex items-center justify-center mt-20 flex-col mb-96'>

//       <div
//         className='flex flex-col items-center justify-center relative z-0 gap-4'>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className='font-light font-urbanist text-blue-700 text-3xl'>
//           ( <span className='font-dancing-script text-3xl'>pricing plan</span> )
//         </motion.p>

//         {/* <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           className="text-[13rem] font-semibold tracking-tight leading-none"
//         >
//           <span className="bg-linear-to-b from-black/20 to-white bg-clip-text text-transparent">
//             Explore Pricing
//           </span>
//         </motion.h1> */}
//       </div>

// <div
//       className="flex items-center justify-center h-screen cursor-pointer select-none"
//       onClick={handleClick}
//     >
//       <AnimatePresence
//         mode="wait"
//         onExitComplete={() => setIsAnimating(false)}
//       >
//         <motion.div
//           key={idx}
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0., opacity: 0 }}
//           transition={{
//             duration: 0.5,
//             ease: [0.22, 1, 0.36, 1], // luxury easing (important)
//           }}
//           className="text-[18rem] font-bold flex items-center justify-center"
//         >
//           {words[idx]}
//         </motion.div>
//       </AnimatePresence>
//     </div>

//     </section>
//   )
// }

// export default Pricing

const Pricing = () => {
  return (
    <section className='flex items-center justify-center mt-20 flex-col'>

      <div
        className='flex flex-col items-center justify-center relative z-0 gap-4'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='font-light font-urbanist text-blue-700 text-3xl'
        >
          ( <span className='font-dancing-script text-3xl'>built for growth</span> )
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-9xl font-semibold tracking-tight leading-none font-urbanist">
          <span className="text-[#262626]">
            Our Pricing
          </span>
        </motion.h1>
      </div>


      <div className="w-full">
        <PricingTable />
      </div>



    </section>
  )
}

export default Pricing