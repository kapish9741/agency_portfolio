const BookCall = () => {
    return (
        <button onClick={() => window.open('https://cal.com/websual.agency/intro-call', '_blank')}
            className="group relative flex items-center justify-between w-[140px] sm:w-[150px] md:w-[160px] hover:w-[150px] sm:hover:w-[160px] md:hover:w-[170px] hover:translate-x-[10px] h-[44px] sm:h-[48px] md:h-[52px] px-4 sm:px-5 rounded-full bg-[#0B0B0B] hover:bg-[#3a86ff] text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden cursor-pointer">
            {/* Text container */}
            <div className="relative h-5 sm:h-6 overflow-hidden">
                <div className="flex flex-col">
                    <span
                        className="h-5 sm:h-6 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-sm sm:text-base font-semibold font-urbanist">
                        Book a Call
                    </span>

                    <span
                        className="h-5 sm:h-6 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-sm sm:text-base font-semibold font-urbanist">
                        Book a Call
                    </span>
                </div>
            </div>

            {/* Arrow circle */}
            <div
                className="absolute right-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
                <span className="text-xs sm:text-sm text-blue-600">→</span>
            </div>
        </button>
    )
}

export default BookCall