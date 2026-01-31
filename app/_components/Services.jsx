'use client';

import React, { useState } from 'react';
import ServiceStack from './_Services/ServiceStack';
import ScrollingText from './_Services/ScrollingText';
import { Skiper16 } from '@/components/ui/skiper-ui/skiper16';


const cards = [
  {
    id: 1,
    image: "/projects/image.png",
    link: "https://www.instagram.com/",
    alt: "Description 1",
  },
  {
    id: 2,
    image: "/projects/image.png",
    link: "https://www.google.com/",
    alt: "Description 2",
  },
  {
    id: 3,
    image: "/projects/image.png",
    link: "https://www.instagram.com/",
    alt: "Description 3",
  },
];


const Services = () => {

  return (
    <section className="">
      <ScrollingText />

      <Skiper16/>

    </section>
  );
};

export default Services;