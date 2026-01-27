"use client";;
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName
}) => {
  const container = useRef(null);
  const imageRefs = useRef([]);
  // Cursor refs
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  // Track active link
  const activeLink = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const imageElements = imageRefs.current;
    const totalCards = imageElements.length;

    if (!imageElements[0]) return;

    gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

    for (let i = 1; i < totalCards; i++) {
      if (!imageElements[i]) continue;
      gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky-cards",
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 1)}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentImage = imageElements[i];
      const nextImage = imageElements[i + 1];
      const position = i;
      if (!currentImage || !nextImage) continue;

      scrollTimeline.to(currentImage, {
        scale: 0.7,
        rotation: 5,
        duration: 1,
        ease: "none",
      }, position);

      scrollTimeline.to(nextImage, {
        y: "0%",
        duration: 1,
        ease: "none",
      }, position);
    }

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    if (container.current) {
      resizeObserver.observe(container.current);
    }

    // Cursor animation setup
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    let cleanup = () => {
      resizeObserver.disconnect();
      scrollTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    if (cursor && cursorText) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

      const moveHandler = (e) => {
        // Smooth cursor follow (Lenis-like feel)
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", moveHandler);

      const baseCleanup = cleanup;
      cleanup = () => {
        window.removeEventListener("mousemove", moveHandler);
        baseCleanup();
      };
    }

    return cleanup;
  }, { scope: container });

  // Mouse interaction handlers
  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe((link, label) => {
    activeLink.current = link;
    if (cursorTextRef.current) cursorTextRef.current.innerText = label || "View";

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  const onLeave = contextSafe(() => {
    activeLink.current = null;
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  });

  const onClick = () => {
    if (activeLink.current) {
      window.open(activeLink.current, "_blank");
    }
  };

  //   return (
  //     <div className={cn("relative h-full w-full", className)} ref={container}>
  //       <div
  //         className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-8">
  //         <div
  //           className={cn(
  //             "relative h-[90%] w-full overflow-hidden rounded-lg max-w-9xl",
  //             containerClassName
  //           )}>
  //           {cards.map((card, i) => (
  //             <img
  //               key={card.id}
  //               src={card.image}
  //               alt={card.alt || ""}
  //               className={cn("rounded-4xl absolute h-full w-full object-cover", imageClassName)}
  //               ref={(el) => {
  //                 imageRefs.current[i] = el;
  //               }} />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={cn("relative h-screen w-full", className)} ref={container}>
      <div className="sticky-cards relative flex h-screen w-full items-center justify-center overflow-hidden p-3 lg:p-8">
        <div
          className={cn(
            "relative  h-[95vh] w-[96vw] max-w-md overflow-hidden rounded-lg sm:max-w-xl md:max-w-7xl lg:max-w-full",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              className={cn(
                "rounded-4xl absolute h-full w-full object-cover will-change-transform cursor-none",
                imageClassName
              )}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              onMouseEnter={() => onEnter(card.link, card.label)}
              onMouseLeave={onLeave}
              onClick={onClick}
            />
          ))}
        </div>
      </div>

      {/* Custom Cursor Elements */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 flex h-24 w-24 items-center justify-center rounded-full bg-white text-center pointer-events-none"
      >
        <span ref={cursorTextRef} className="relative z-10 text-black text-xs font-medium tracking-wide uppercase font-urbanist">View</span>
      </div>
    </div >
  );
};

// Example usage component with default data
const Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: "/images/lummi/img14.png",
      link: "https://example.com/project1",
      label: "View Case Study"
    },
    {
      id: 2,
      image: "/images/lummi/img15.png",
      link: "https://example.com/project2",
      label: "Open Project"
    },
    {
      id: 3,
      image: "/images/lummi/img29.png",
      link: "https://example.com/project3",
      label: "View Details"
    },
    {
      id: 4,
      image: "/images/lummi/img21.png",
      link: "https://example.com/project4",
      label: "Discover"
    },
    {
      id: 5,
      image: "/images/lummi/img27.png",
      link: "https://example.com/project5",
      label: "Explore"
    },
  ];

  return (
    <ReactLenis root>
      <div className="h-full w-full">
        <StickyCard002 cards={defaultCards} />
      </div>
    </ReactLenis>
  );
};

export { Skiper17, StickyCard002 };