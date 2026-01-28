import React, { useState, useEffect } from 'react';
import { Check, X, Info } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const PricingTable = () => {
    const [plans] = useState([
        {
            name: 'Essential',
            description: 'Everything you need to get started, done right.',
            price: '₹361',
            period: 'per month',
            highlighted: false,
            features: [
                { name: 'Free .com domain', icon: 'gift' },
                { name: 'Connect your own domain', icon: 'link' },
                { name: 'AI-powered design tools', icon: 'sparkles' },
                { name: 'Fast and secure hosting', icon: 'zap' },
                { name: 'Built-in SEO', icon: 'search' },
            ],
            buttonText: 'Start with Basic',
        },
        {
            name: 'Growth',
            description: 'Built to scale performance, design, and conversions.',
            price: '₹1,084',
            period: 'per month',
            highlighted: true,
            features: [
                { name: 'Everything from Basic, plus:', type: 'header' },
                { name: 'Staging and instant rollback', icon: 'refresh' },
                { name: 'Roles and permissions', icon: 'users' },
                { name: 'Relational CMS', icon: 'database' },
                { name: 'Site redirects', icon: 'arrow-up-right' },
                { name: 'Multiple locales (add-on)', icon: 'globe' },
            ],
            buttonText: 'Start with Pro',
        },
        {
            name: 'Scale',
            description: 'Designed for brands operating at scale.',
            price: '₹3,612',
            period: 'per month, plus usage',
            highlighted: false,
            features: [
                { name: 'Everything from Pro, plus:', type: 'header' },
                { name: 'Custom locale regions', icon: 'map-pin' },
                { name: 'Events and funnels', icon: 'bar-chart' },
                { name: 'Priority support', icon: 'headphones' },
                { name: 'Premium CDN', icon: 'server' },
                { name: 'Flexible limits', icon: 'sliders' },
                { name: 'A/B testing (add-on)', icon: 'flask' },
                { name: 'Custom proxy setup (add-on)', icon: 'cloud' },
            ],
            buttonText: 'Start with Scale',
            annualOnly: true,
        },
    ]);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'gift': return <span className="mr-3">🎁</span>; // Fallback or use Lucide if specific icon not perfectly matched, but let's stick to Lucide for consistency if possible, or emojis if specific icons are missing
            case 'link': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link mr-3 w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
            case 'sparkles': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles mr-3 w-4 h-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>;
            case 'zap': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap mr-3 w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
            case 'search': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-3 w-4 h-4"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
            case 'refresh': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw mr-3 w-4 h-4"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>;
            case 'users': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users mr-3 w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
            case 'database': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database mr-3 w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>;
            case 'arrow-up-right': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right mr-3 w-4 h-4"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
            case 'globe': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe mr-3 w-4 h-4"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
            case 'map-pin': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-3 w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
            case 'bar-chart': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2 mr-3 w-4 h-4"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg>;
            case 'headphones': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones mr-3 w-4 h-4"><path d="M3 14v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" /><path d="M15 14v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2Z" /><path d="M21 14V8a9 9 0 0 0-18 0v6" /></svg>;
            case 'server': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server mr-3 w-4 h-4"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>;
            case 'sliders': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal mr-3 w-4 h-4"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" /></svg>;
            case 'flask': return <span className="bg-zinc-700 text-xs rounded-full h-4 w-4 flex items-center justify-center mr-3 font-bold text-white">A</span>;
            case 'cloud': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud mr-3 w-4 h-4"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" /></svg>;
            default: return <Check className="mr-3 w-4 h-4 text-zinc-500" />;
        }
    };

    // 3D Carousel Logic
    // CARD_WIDTH must match the w-[380px] or similar we'll set on cards
    // GAP is clear distance between cards in 3D space
    const CARD_WIDTH = 400;
    const DRAG_FACTOR = 0.5; // Sensitivity

    // We assume 3 cards for this specific design
    const x = useMotionValue(0);

    const Card = ({ plan, index }) => {
        // Calculate offset for each card based on its index
        // Center card (index 1) is at 0
        // Left card (index 0) is at -CARD_WIDTH
        // Right card (index 2) is at +CARD_WIDTH

        // We want the whole system to move. 
        // x represents the "scroll position" of the carousel.
        // When x = 0, index 1 is center.
        // When x = CARD_WIDTH, index 0 is center.
        // When x = -CARD_WIDTH, index 2 is center.

        // Adjusted index logic for centering:
        // We shift x so that 0 means "start"
        // Let's stick to: Center (Growth) is the default focus.

        const myOffset = (index - 1) * CARD_WIDTH; // 0 -> -400, 1 -> 0, 2 -> 400

        // Transform the global x into a local position for this card
        const position = useTransform(x, (currentX) => {
            const rawPos = currentX + myOffset;
            const totalWidth = plans.length * CARD_WIDTH;
            // Calculate wrapped position centered around 0
            // The formula ensures the value stays within [-totalWidth/2, totalWidth/2]
            const wrappedPos = ((rawPos + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
            return wrappedPos;
        });

        // 3D Transforms based on position relative to center (0)
        const scale = useTransform(position, [-CARD_WIDTH, 0, CARD_WIDTH], [0.85, 1, 0.85]);
        const rotateY = useTransform(position, [-CARD_WIDTH, 0, CARD_WIDTH], [30, 0, -30]); // Rotate inwards to face center
        const zIndex = useTransform(position, [-CARD_WIDTH, 0, CARD_WIDTH], [1, 10, 1]);
        const opacity = useTransform(position, [-CARD_WIDTH * 1.5, -CARD_WIDTH, 0, CARD_WIDTH, CARD_WIDTH * 1.5], [0, 1, 1, 1, 0]);
        // Also add X translation to separate them visualy
        // We actually want the position value to drive the 'x' style directly?
        // No, 'position' IS the 'x' value but we want them to overlap or gap nicely.
        // Since we are absolute positioning them in center, 'x' style will move them.

        return (
            <motion.div
                style={{
                    x: position,
                    scale,
                    rotateY,
                    zIndex,
                    opacity,
                    // Center the card absolutely
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-200px', // Half of width
                }}
                className={`flex flex-col rounded-3xl p-8 w-[400px] h-[650px] shadow-xl shrink-0 cursor-grab active:cursor-grabbing ${plan.highlighted
                    ? 'bg-blue-800 border border-blue-900 shadow-2xl shadow-blue-900/40' // Enhanced Pro card shadow
                    : 'bg-white/90 border border-zinc-200 backdrop-blur-sm'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className={`text-3xl font-medium mb-2 ${plan.highlighted ? 'text-white' : 'text-zinc-900'}`}>{plan.name}</h3>
                        <p className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-zinc-500'}`}>
                            {plan.description}
                        </p>
                    </div>

                    {/* Annual Label Only */}
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-semibold tracking-wider ${plan.highlighted ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {plan.annualOnly ? 'ANNUAL ONLY' : 'ANNUAL'}
                        </span>
                    </div>
                </div>

                {/* Separator */}
                <div className={`h-px w-full my-6 ${plan.highlighted ? 'bg-blue-800' : 'bg-zinc-100'}`}></div>

                {/* Price */}
                <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-bold tracking-tight ${plan.highlighted ? 'text-white' : 'text-zinc-900'}`}>{plan.price}</span>
                        <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-zinc-500'}`}>
                            {plan.period}
                        </span>
                    </div>
                </div>

                {/* Features */}
                <div className="flex-1 mb-8 overflow-y-auto custom-scrollbar"> {/* Added overflow handling just in case */}
                    <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                            <li
                                key={i}
                                className={`flex items-start text-sm ${feature.type === 'header'
                                    ? `pt-2 pb-1 ${plan.highlighted ? 'text-blue-200' : 'text-zinc-900 font-medium'}`
                                    : plan.highlighted ? 'text-zinc-300 font-light' : 'text-zinc-600'
                                    }`}
                            >
                                {feature.type !== 'header' && (
                                    <span className={plan.highlighted ? 'text-white' : 'text-zinc-900'}>
                                        {getIcon(feature.icon)}
                                    </span>
                                )}
                                {feature.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Button */}
                <button
                    className={`w-full py-4 rounded-full font-medium transition-transform active:scale-[0.98] mt-auto ${plan.highlighted
                        ? 'bg-[#0080ff] text-white hover:bg-blue-500'
                        : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm'
                        }`}
                >
                    {plan.buttonText}
                </button>
            </motion.div>
        );
    }

    return (
        <div className="w-full h-[800px] flex items-center justify-center overflow-hidden perspective-[1000px] relative">
            <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2 z-10">
                <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase font-medium tracking-wide">
                    Drag to Explore
                </div>
            </div>

            {/* Draggable Area - Wraps existing state logic */}
            <motion.div
                className="relative w-full h-full flex items-center justify-center perspective-[1200px]"
                // We don't drag THIS div physically, we just use it to capture drag gestures 
                // and update the 'x' motion value manually?
                // Or we can just use drag="x" and apply the x style to nothing?
                style={{ cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
            >
                {/* Invisible Drag Proxy to Drive the Animation */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: -100000, right: 100000 }} // Effectively infinite
                    dragElastic={0.05} // Add some resistance at extreme edges if we hit them, but we won't.
                    style={{ x, opacity: 0, width: '100%', height: '100%', position: 'absolute', zIndex: 100 }}
                    dragTransition={{
                        power: 0.3, // Inertia strength
                        timeConstant: 200, // Duration of inertial slide
                        modifyTarget: (target) => {
                            // Snap to nearest card (400px intervals)
                            return Math.round(target / CARD_WIDTH) * CARD_WIDTH;
                        }
                    }}
                />

                {/* Render Cards */}
                {plans.map((plan, index) => (
                    <Card key={index} plan={plan} index={index} />
                ))}

            </motion.div>
        </div>
    );
};

export default PricingTable;