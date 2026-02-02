const BookCall = () => {
    return (
        <button onClick={() => window.open('https://cal.com/abhishek-patel-ujjhlo/quick-chat?overlayCalendar=true', '_blank')}
            className="group relative flex items-center justify-between w-[160px] hover:w-[170px] hover:translate-x-[10px] h-[52px] px-5 rounded-full bg-[#0B0B0B] hover:bg-[#3a86ff] text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden cursor-pointer">
            {/* Text container */}
            <div className="relative h-6 overflow-hidden">
                <div className="flex flex-col">
                    <span
                        className="h-6 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-base font-semibold font-urbanist">
                        Book a Call
                    </span>

                    <span
                        className="h-6 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-base font-semibold font-urbanist">
                        Book a Call
                    </span>
                </div>
            </div>

            {/* Arrow circle */}
            <div
                className="absolute right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
                <span className="text-sm text-blue-600">→</span>
            </div>
        </button>
    )
}

export default BookCall