import React from 'react'
import { motion } from 'framer-motion'
import FAQsAccordion from './_FAQs/FAQsAccordion'

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We specialize in web development, brand design, and digital experiences from landing pages and MVPs to full-scale websites and visual identities."
  },
  {
    question: "Can you redesign an existing website or brand?",
    answer: "Yes. We frequently revamp outdated websites and rebrand businesses, improving usability, visuals, and conversions without losing identity."
  },
  {
    question: "How long does it take to design a website?",
    answer: "Most websites take 2-4 weeks to design, depending on the scope and complexity. Smaller projects can be completed in 1-1.5 weeks. If you have a larger project or need an accelerated timeline, we can discuss priorities and adjust the schedule accordingly."
  },
  {
    question: "What platforms do you build on?",
    answer: "We develop fully custom websites using React.js and Next.js, powered by Express.js or Next.js server APIs, tailored to your project’s requirements and fully customizable to fit your exact needs."
  },
  {
    question: "What is your design and development process?",
    answer: "Our process is simple: Discover → Design → Build → Test → Launch. You stay involved at every step, with regular updates and reviews."
  },
  {
    question: "Do you offer post-launch support or maintenance?",
    answer: "Yes, we offer maintenance and support services to keep your website running smoothly."
  }
]

const FAQs = () => {
  const [col1Open, setCol1Open] = React.useState(null);
  const [col2Open, setCol2Open] = React.useState(null);

  return (
    <section className='flex items-center justify-center flex-col mb-12 sm:mb-16 md:mb-20 lg:mb-25 px-4 sm:px-6 md:px-8 mt-20 sm:mt-28 md:mt-32 lg:mt-40'>
      <div className='flex flex-col justify-center relative z-0 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 lg:mb-16'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='font-light font-urbanist text-[#3a86ff] text-xl sm:text-2xl md:text-3xl'>
          ( <span className='font-dancing-script text-xl sm:text-2xl md:text-3xl'>FAQs</span> )
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none font-urbanist text-center">
          <span className="text-white">
            Your Questions Answered
          </span>
        </motion.h1>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-3 sm:gap-4 items-start">
        <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-1/2">
          {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
            <FAQsAccordion
              key={index}
              faq={faq}
              isOpen={col1Open === index}
              onToggle={() => setCol1Open(col1Open === index ? null : index)}
              dir="left"
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-1/2">
          {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
            <FAQsAccordion
              key={index + Math.ceil(faqs.length / 2)}
              faq={faq}
              isOpen={col2Open === index}
              onToggle={() => setCol2Open(col2Open === index ? null : index)}
              dir="right"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQs