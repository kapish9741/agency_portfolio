import React from "react";

const AvailabilityBadge = () => {
    return (
        <div className="relative flex justify-center pointer-events-auto">
            <div className="relative flex items-center justify-center w-[280px] sm:w-[300px] md:w-[320px] xl:w-[342px] aspect-[342/36] xl:aspect-auto xl:h-[36px]">
                <svg
                    className="absolute inset-0 w-full h-full drop-shadow-sm"
                    viewBox="0 0 342 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M 5.456 0 C -54.232 0 396.772 0 336.428 0 
               C 276.084 0 312.723 36 253.697 36 
               C 194.671 36 108.098 36 89.438 36 
               C 27.285 36 65.144 0 5.456 0 Z"
                        fill="#262626"
                    />
                </svg>

                <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 px-2">
                    <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-blue-500 shadow-[0_0_8px_rgba(97,197,84,0.6)]"></span>
                    </div>
                    <span className="text-white text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] font-medium tracking-wide font-urbanist whitespace-nowrap">
                        Available for New Projects
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityBadge;
