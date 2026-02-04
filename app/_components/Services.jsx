'use client';

import React from 'react';
import ScrollingText from './_Services/ScrollingText';
import { Skiper16 } from '@/components/ui/skiper-ui/skiper16';

const Services = () => {

  return (
    <section className="">
      <div className="hidden md:block">
        <ScrollingText />
      </div>

      <Skiper16 />

    </section>
  );
};

export default Services;