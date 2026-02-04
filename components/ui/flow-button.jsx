// This is file of your component

// You can use any dependencies from npm; we import them automatically in package.json
'use client';
import { ArrowRight } from 'lucide-react';

export function FlowButton({
  text = "Modern Button",
  ...props
}) {
  return (
    <button
      {...props}
      className="font-urbanist group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-neutral-800 bg-neutral-800 px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 text-[10px] sm:text-[14px] lg:text-[15px] font-semibold text-white cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:rounded-[100px] active:scale-[0.95]">
      {/* Left arrow (arr-2) */}
      <ArrowRight
        className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 left-[-25%] stroke-white fill-none z-9 group-hover:left-3 sm:group-hover:left-4 group-hover:stroke-white transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
      {/* Text */}
      <span
        className="relative z-1 -translate-x-2.5 sm:-translate-x-3 group-hover:translate-x-2.5 sm:group-hover:translate-x-3 transition-all duration-800 ease-out">
        {text}
      </span>
      {/* Circle */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-800 rounded-[50%] opacity-0 group-hover:w-[180px] group-hover:h-[180px] sm:group-hover:w-[200px] sm:group-hover:h-[200px] lg:group-hover:w-[220px] lg:group-hover:h-[220px] group-hover:opacity-100 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
      {/* Right arrow (arr-1) */}
      <ArrowRight
        className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 right-3 sm:right-4 stroke-white fill-none z-9 group-hover:right-[-25%] group-hover:stroke-white transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </button>
  );
}
