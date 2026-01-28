'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as PricingCard from '@/components/ui/pricing-card';
import {
    CheckCircle2,

    Users,
} from 'lucide-react';


function Default() {
    const handleClick = () => {
        alert(`Selected ${plan} plan!`);
    };

    const features = [
        'Up to 3 projects',
        'Basic templates',
        'Community support',
        '1GB storage',
    ];

    return (
        <PricingCard.Card>
            <PricingCard.Header>
                <PricingCard.PlanName>
                    <div className="flex items-center gap-2">
                        <Users className="h-6 w-6" aria-hidden="true" />
                        <span className="text-3xl font-bold text-foreground">Essential</span>
                    </div>
                </PricingCard.PlanName>
                <PricingCard.Description className="text-base my-4">
                    Everything you need to get started, done right.
                </PricingCard.Description>
                <PricingCard.Price>
                    <PricingCard.MainPrice>$10</PricingCard.MainPrice>
                    <span className="text-muted-foreground self-end mb-2">/month</span>
                </PricingCard.Price>
            </PricingCard.Header>
            <PricingCard.Body>
                <PricingCard.Separator className="my-6">What's Included?</PricingCard.Separator>
                <PricingCard.List>
                    {features.map((item) => (
                        <PricingCard.ListItem key={item}>
                            <span className="mt-0.5">
                                <CheckCircle2
                                    className="h-4 w-4 text-green-500"
                                    aria-hidden="true"
                                />
                            </span>
                            <span>{item}</span>
                        </PricingCard.ListItem>
                    ))}
                </PricingCard.List>

                <Button
                    className={cn(
                        'w-full font-semibold text-white mt-8',
                        'bg-gradient-to-b from-orange-500 to-orange-600 shadow-[0_10px_25px_rgba(255,115,0,0.3)]',
                    )}
                    onClick={() => handleClick('Starter')}
                >
                    Get Started
                </Button>
            </PricingCard.Body>
        </PricingCard.Card>
    );
}


export default function PricingDemo() {
    return (
        <main
            className={cn(
                'relative min-h-svh w-full overflow-hidden',
                'flex items-center justify-center p-4',)}>

            <Default />
        </main>
    );
}
