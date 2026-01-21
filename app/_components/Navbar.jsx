import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center justify-between font-urbanist px-34 mt-20'>
                <div>
                    <p className='text-blue-700 text-5xl font-semibold'>Agency.</p>
                </div>
                <div>
                    <p className='text-blue-700 text-2xl font-semibold'>Menu</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar