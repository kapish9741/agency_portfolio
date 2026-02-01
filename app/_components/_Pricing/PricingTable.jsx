import React from 'react'
import { Check, Users, Zap, Shield, CircleCheck, TrendingUp, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const plans = [
    {
        name: 'Essential',
        price: '1500',
        period: '',
        originalPrice: '',
        description: 'Perfect for individuals',
        features: ['All Pro Plan Features',
            'Dedicated Account Manager',
            'Custom Integrations',
            'Advanced Security Features',
            'Team Collaboration Tools',
            'Onboarding and Training',
            'Unlimited Users',
            'API Access with Higher Limits',
            'Advanced Audit Logs'],
        icon: Users,
    },
    {
        name: 'Growth',
        price: '1900',
        period: '/month',
        originalPrice: '$29',
        description: 'Best for small teams',
        features: ['All Pro Plan Features',
            'Dedicated Account Manager',
            'Custom Integrations',
            'Advanced Security Features',
            'Team Collaboration Tools',
            'Onboarding and Training',
            'Unlimited Users',
            'API Access with Higher Limits',
            'Advanced Audit Logs'],
        icon: TrendingUp,
    },
    {
        name: 'Scale',
        price: '2700',
        period: '',
        originalPrice: '',
        description: 'For large organizations',
        features: ['All Pro Plan Features',
            'Dedicated Account Manager',
            'Custom Integrations',
            'Advanced Security Features',
            'Team Collaboration Tools',
            'Onboarding and Training',
            'Unlimited Users',
            'API Access with Higher Limits',
            'Advanced Audit Logs'],
        icon: Globe,
    },
]

const PricingTable = () => {
    return (
        <div className='mt-10 px-4 w-full'>
            <section className="grid gap-10 p-8 md:grid-cols-3 max-w-[1300px] mx-auto font-urbanist">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                        className="relative w-full rounded-2xl p-2 shadow-xl border border-white/10 bg-[#000000]">
                        {/* Card Header Section */}
                        <div className="bg-[#0B0B0B] relative mb-4 rounded-xl border border-white/5 p-8 overflow-hidden">
                            {/* Top glass gradient */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-48 rounded-[inherit]"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%)',
                                }}
                            />

                            {/* Label & Icon */}
                            <div className="mb-8 flex items-center justify-between relative z-10">
                                <div className="text-gray-400 flex items-center gap-2 text-base font-medium">
                                    <plan.icon className="w-5 h-5" />
                                    <span>{plan.name}</span>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="mb-8 flex items-baseline gap-2 relative z-10">
                                <span className="text-5xl font-bold tracking-tight text-white">$</span>
                                <span className="text-5xl font-extrabold tracking-tight text-white">{plan.price}</span>
                            </div>

                            {/* Action Button */}
                            <Button className="w-full relative z-10 rounded-lg h-11 px-4 py-2 font-semibold text-white cursor-pointer text-lg bg-gradient-to-b from-blue-600 to-blue-700 shadow-[0_10px_25px_rgba(59,134,255,0.3)] group overflow-hidden">
                                <div className="relative overflow-hidden h-7 flex flex-col items-center justify-start">
                                    <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] h-full flex items-center">
                                        Book a Call
                                    </span>
                                    <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] h-full flex items-center">
                                        Book a Call
                                    </span>
                                </div>
                            </Button>
                        </div>

                        {/* Features List */}
                        <div className="space-y-6 px-6 pb-6 pt-2">
                            <div className='flex items-center gap-2'>
                                <span className="bg-muted-foreground/40 h-px flex-1" />
                                <span className="text-muted-foreground shrink-0">{plan.description}</span>
                                <span className="bg-muted-foreground/40 h-px flex-1" />
                            </div>
                            <ul className="space-y-4 font-medium text-sm text-gray-300">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CircleCheck className="w-5 h-5 text-white shrink-0" />
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