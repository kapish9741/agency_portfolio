import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import TextCloud from '@/components/text-cloud';

const ServiceItem = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: "01",
      title: "Website Development",
      src: "/services/img1.jpg",
      description: "We build fast, scalable websites and applications that convert.",
      tags: ["MVP Development", "Landing Page", "Full Stack", "CMS / Admin Dashboards"]
    },
    {
      id: "02",
      title: "Brand Design",
      src: "/services/img2.jpg",
      description: "We create distinctive brand identities that leave a lasting impression.",
      tags: ["Brand Identity", "Logo Design", "Visual Language", "Brand Guidelines"]
    },
    {
      id: "03",
      title: "Graphic Design",
      src: "/services/img3.jpg",
      description: "We design bold visuals that capture attention and drive engagement.",
      tags: ["Logo Design", "Social Media Creatives", "Banner Design", "Poster Design", "YouTube Thumbnails"]
    },
    {
      id: "04",
      title: "Video Editing",
      src: "/services/img1.jpg",
      description: "We craft compelling video edits that tell stories and keep viewers hooked.",
      tags: ["Short-Form Videos", "Long-Form Videos", "Promo Videos", "Motion Graphics"]
    }
  ];


  return (
    <div className="-mt-12 flex flex-col justify-between items-center border-t border-gray-300 px-20 z-50 relative bg-[#ededed]">
      <div className='flex w-full items-center justify-between'>
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`mt-7 flex items-center gap-2 cursor-pointer`}>
            <div className="w-2 h-2 flex items-center justify-center">
              {activeTab === index && (
                <motion.div
                  layoutId="active-service-dot"
                  className="w-2 h-2 rounded-full bg-blue-700"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <div className="relative">
              <span className="text-sm md:text-base font-urbanist font-medium invisible">
                {service.title}
              </span>
              <span className={`absolute left-0 top-0 text-sm md:text-base font-urbanist transition-all duration-300 ${activeTab === index ? "text-blue-700 font-medium" : "text-black"
                }`}>
                {service.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full flex flex-col items-center justify-center mt-20">
        <div className='absolute inset-0 flex items-center justify-center z-0 pointer-events-none'>
          <TextCloud />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[600px] h-[400px] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 z-10">
          <AnimatePresence>
            <motion.img
              key={activeTab}
              src={services[activeTab].src}
              alt={services[activeTab].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5 mt-10 w-full">
        <div className="z-10 text-center max-w-lg min-h-[60px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg font-urbanist text-gray-700 font-medium"
            >
              {services[activeTab].description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="z-10 flex flex-wrap gap-5 justify-center items-center max-w-2xl min-h-[40px] mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    ease: [0.33, 1, 0.68, 1],
                    duration: 0.8,
                    staggerChildren: 0.12
                  }
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.2 }
                }
              }}
              className="flex flex-wrap gap-2 justify-center">
              {services[activeTab].tags.map((tag, index) => (
                <motion.span key={index}
                  variants={{
                    hidden: { opacity: 0, y: 8, scale: 0.96 },
                    visible: {
                      opacity: 1, y: 0,
                      scale: 1,
                      transition: { duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }
                    }
                  }}
                  className="px-4 py-1.5 bg-[#4a4a4a] text-white rounded-full text-sm font-urbanist font-medium tracking-wide border-[3px] border-[#5a5a5a] ring-1 ring-white/20"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div >
  )
}

export default ServiceItem