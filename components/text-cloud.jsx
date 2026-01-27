import React from 'react'
import { TextInfiniteSlider } from './ui/text-infinte-slider'

const TextCloud = () => {
    return (
        <section className="py-30">
            <div className="mx-auto max-w-8xl">
                <div className='relative w-full font-dancing-script'>
                    <TextInfiniteSlider speedOnHover={20} speed={60} gap={112}>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Website Development</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Brand Design</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Graphic Design</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Video Editing</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Website Development</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Brand Design</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Graphic Design</p>
                        </div>
                        <div className="flex py-4">
                            <p className='font-medium text-blue-700 text-9xl tracking-tight'>Video Editing</p>
                        </div>

                    </TextInfiniteSlider>
                </div>
            </div>
        </section>
    )
}

export default TextCloud