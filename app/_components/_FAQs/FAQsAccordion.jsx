import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQsAccordion = ({ faq, isOpen, onToggle, dir = "left" }) => {

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: dir === "left" ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={onToggle}
            className="bg-black border border-white/10 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] p-4 sm:p-5 md:p-6 cursor-pointer overflow-hidden font-urbanist select-none"
            transition={{
                layout: { duration: 0.5, type: "spring", stiffness: 60, damping: 12 },
                opacity: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                x: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
            }}
        >
            <motion.div layout className="flex justify-between items-center w-full gap-4">
                <h3 className="text-base sm:text-lg font-medium text-white flex-1 leading-snug pr-4">
                    {faq.question}
                </h3>
                <div className="shrink-0 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "circOut" }}>
                        <Plus size={10} className="text-black" />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.04, 0.62, 0.23, 0.98]
                        }}
                        className="text-zinc-400 text-xs sm:text-sm leading-relaxed block">
                        {faq.answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export default FAQsAccordion