import React, { useState } from 'react'
import { careers, services } from '../../utils/data'
import { FaAngleRight } from "react-icons/fa6";
import SlideIn from '../SlideIn';
import MobileAnimation from '../MobileAnimation';
import spiralAsh from "../../utils/animations/spiral_ash.json";

const CareerDetail = () => {
    const [activeItem, setActiveItem] = useState(careers[0])
    return (
        <section className='w-full relative'>
            <div className=' absolute right-[-25%] top-[20%]'>
                <MobileAnimation animationData={spiralAsh} size={800} />
            </div>
            <div className=' py-[150px] px-6 md:px-10 lg:px-5 w-full max-w-max mx-auto'>
                <SlideIn duration={900} distance={90} direction="left" delay={150}>
                    <p className='mt-0 text-lg md:text-xl text-justify'>At PAC Asset Management, we continuously seek top talent who thrive on challenges, we are always looking for top talent who embrace challenges, offering opportunities that foster personal growth and career fulfilment. Together, we deliver transformational investment solutions tailored to meet the needs of our investors.</p>

                </SlideIn>
                <div className='flex flex-col lg:flex-row gap-10 mt-20'>
                    <SlideIn duration={900} distance={90} direction="left" delay={150}>
                        <div className='flex flex-wrap justify-center flex-row lg:flex-col gap-5 md:gap-10'>
                            {
                                careers.map((item, index) => (
                                    <div onClick={() => setActiveItem(item)} key={index}
                                        className={`py-3 md:py-14 px-4 md:px-10 text-base md:text-2xl lg:text-3xl uppercase w-full mb:w-[180px] md:w-[300px] lg:w-[400px] border border-primaryBlue  flex items-center justify-between cursor-pointer ${activeItem.heading === item.heading && 'bg-primaryBlue text-white'} `}>
                                        {item.heading}
                                        <span className='zr:hidden md:flex'><FaAngleRight /></span>
                                    </div>
                                ))
                            }
                        </div>
                    </SlideIn>

                    <SlideIn duration={900} distance={90} direction="right" delay={250}>
                        <div>
                            {
                                <div className='w-full lg:max-w-[700px]'>
                                    <div className='w-full h-[200px] md:h-[400px]'>
                                        <img src={`/${activeItem.image}.jpg`} alt={activeItem.heading} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex flex-col gap-5 p-5 md:p-10 bg-primaryBlue text-white'>
                                        {
                                            activeItem.text.map((item, index) => (
                                                <p key={index} className='text-base md:text-lg' >{item}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </SlideIn>
                </div>

            </div>
        </section>
    )
}

export default CareerDetail