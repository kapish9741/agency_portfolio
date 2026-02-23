'use client'
import React from 'react'
import { Users, CircleCheck, TrendingUp, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import BookingButton from './BookingButton'

const plans = [
    {
        name: 'Essential',
        price: '499',
        currency: '$',
        period: '',
        originalPrice: '',
        description: "What's included",
        features: [
            '1-3 page',
            'SEO',
            'Mobile responsive',
            'Client dashboard',
            '2 months support',
            'Logo + branding',
            '3 revisions',
            'Delivery 1-2 weeks',
            'Theme'
        ],
        icon: Users,
    },
    {
        name: 'Growth',
        price: '799',
        currency: '$',
        period: '',
        recommended: true,
        description: "What's included",
        features: [
            'All from Essential pack',
            '3-5 pages',
            'Custom modern ui',
            'Optimization',
            '2 motion graphic reels',
            '10 posts'
        ],
        icon: TrendingUp,
    },
    {
        name: 'Scale',
        price: 'Custom Solutions',
        currency: '',
        period: '',
        originalPrice: '',
        description: "What's included",
        features: [
            'Custom Scope',
            'Dedicated team',
            'Advanced SEO',
            'Unlimited revisions',
            'Priority support',
            'Custom animations'
        ],
        icon: Globe,
    },
]

const PricingTable = () => {
    return (
        <div className='mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4 w-full'>
            <section className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-4 sm:p-6 md:p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1300px] mx-auto font-urbanist">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                        className="relative w-full rounded-2xl p-2 shadow-xl border border-white/10 bg-[#000000]">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                        />
                        {/* Card Header Section */}
                        <div className="bg-[#0B0B0B] relative mb-3 sm:mb-4 rounded-xl border border-white/5 p-4 sm:p-6 md:p-8 overflow-hidden">
                            {/* Top glass gradient */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-48 rounded-[inherit] bg-[#0B0B0B]"
                            />

                            {/* Label & Icon */}
                            <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-between relative z-10">
                                <div className="text-gray-400 flex items-center gap-2 text-sm sm:text-base font-medium">
                                    <plan.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>{plan.name}</span>
                                </div>
                                {plan.recommended && (
                                    <span className="bg-[#3a86ff]/20 text-[#3a86ff] text-xs font-bold px-2.5 py-1 rounded-full border border-[#3a86ff]/30 shadow-[0_0_10px_rgba(59,134,255,0.2)]">
                                        Recommended
                                    </span>
                                )}
                            </div>

                            {/* Pricing */}
                            <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col relative z-10">
                                {plan.originalPrice && (
                                    <span className="text-gray-500 line-through text-lg sm:text-xl font-medium mb-1">
                                        {plan.originalPrice}
                                    </span>
                                )}
                                <div className="flex items-baseline gap-1 sm:gap-2">
                                    {plan.currency && <span className="text-xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">{plan.currency}</span>}
                                    <span className={`font-extrabold tracking-tight text-white ${plan.currency ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-4xl md:text-4xl'}`}>
                                        {plan.price}
                                    </span>
                                </div>
                            </div>


                            <div>
                                <BookingButton />
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-2">
                            <div className='flex items-center gap-2'>
                                <span className="bg-muted-foreground/40 h-px flex-1" />
                                <span className="text-muted-foreground shrink-0 text-xs sm:text-sm">{plan.description}</span>
                                <span className="bg-muted-foreground/40 h-px flex-1" />
                            </div>
                            <ul className="space-y-3 sm:space-y-4 font-medium text-xs sm:text-sm text-gray-300">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 sm:gap-3">
                                        <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}

export default PricingTable