import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import TextCloud from '@/components/text-cloud';

const ServiceItem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

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

  const isManualScroll = useRef(false);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (isManualScroll.current) return;

    // Map scroll progress (0 to 1) to service index (0 to 3)
    const newActiveTab = Math.max(0, Math.min(
      Math.floor(latest * services.length),
      services.length - 1
    ));
    if (newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
    }
  });

  const handleTabClick = (index) => {
    if (!containerRef.current) return;

    isManualScroll.current = true;
    setActiveTab(index);

    // Calculate the absolute top position of the container relative to the document
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;

    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    // Target progress for this index
    // We aim for the middle of the segment
    const targetProgress = (index / services.length) + (0.5 / services.length);

    const targetScrollY = absoluteTop + (scrollableDistance * targetProgress);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  return (
    <div ref={containerRef} className="relative h-[600vh] z-50">

      <div className="sticky top-0 h-screen flex flex-col items-center px-20 overflow-hidden">


        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[13rem] font-semibold tracking-tight leading-none font-urbanist">
            <span className="bg-[linear-gradient(180deg,#ffffff,#0B0B0B)] bg-clip-text text-transparent cursor-events-none">
              Our Services
            </span>
          </motion.h1>
        </div>


        <div className='flex w-full  items-center justify-between z-20 border-t border-gray-300 -mt-12 bg-[#0B0B0B] pt-10 px-20'>
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex items-center gap-2 cursor-pointer `}>
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
          <div className='absolute inset-0 flex items-center justify-center z-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]'>
            <TextCloud />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[600px] h-[400px] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 z-10">
            <AnimatePresence mode="popLayout">
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
          className="flex flex-col items-center w-full mt-15 gap-3">
          <div className="z-10 text-center max-w-4xl min-h-[60px] flex items-center justify-center">
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

          <div className="z-10 flex flex-wrap gap-5 justify-center items-center max-w-2xl min-h-[40px]">
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
      </div>
    </div>
  )
}

export default ServiceItem