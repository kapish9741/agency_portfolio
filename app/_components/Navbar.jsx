"use client";

import React from 'react'
import MenuButton from './_Navbar/MenuButton';

const Navbar = () => {
    return (
        <nav className="w-full relative z-110">
            <div className='flex items-center justify-between font-urbanist px-6 pt-6 md:px-12 md:pt-10 xl:px-20 xl:pt-13'>
                <div>
                    <p className='text-[#126cfd] text-3xl md:text-4xl xl:text-5xl font-semibold'>Agency.</p>
                </div>
                <div>
                    <MenuButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar