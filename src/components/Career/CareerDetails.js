import React, { useState } from 'react'
import { careers, services } from '../../utils/data'
import { FaAngleRight } from "react-icons/fa6";

const CareerDetail = () => {
    const [activeItem, setActiveItem] = useState(careers[0])
    return (
        <section className='py-[150px] w-full max-w-max mx-auto'>
            <p className='mt-0 text-2xl text-justify'>At PAC Asset Management, we continuously seek top talent who thrive on challenges, we are always looking for top talent who embrace challenges, offering opportunities that foster personal growth and career fulfilment. Together, we deliver transformational investment solutions tailored to meet the needs of our investors.</p>

            <div className='flex gap-10 mt-20'>
                <div className='flex flex-col gap-10'>
                    {
                        careers.map((item, index) => (
                            <div onClick={() => setActiveItem(item)} key={index}
                                className={`py-14 px-10 text-3xl uppercase w-[400px] border border-primaryBlue  flex items-center justify-between cursor-pointer ${activeItem.heading === item.heading && 'bg-primaryBlue text-white'} `}>
                                {item.heading}
                                <span><FaAngleRight /></span>
                            </div>
                        ))
                    }
                </div>

                <div>
                    {
                        <div className='w-full max-w-[700px]'>
                            <div className='w-full  h-[400px]'>
                                <img src={`/${activeItem.image}.jpg`} alt={activeItem.heading} className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col gap-5 p-10 bg-primaryBlue text-white'>
                                {
                                    activeItem.text.map((item, index) => (
                                        <p key={index} className='text-lg' >{item}</p>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>

        </section>
    )
}

export default CareerDetail