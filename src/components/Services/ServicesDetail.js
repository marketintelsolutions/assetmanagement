import React, { useState } from 'react'
import { services } from '../../utils/data'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import MobileAnimation from '../MobileAnimation';
import spiralRed from "../../utils/animations/spiral_ash.json";
import Button from '../ui/Button';

const ServicesDetail = () => {
    const [activeItem, setActiveItem] = useState(services[0])
    return (
        <section className=' py-[150px] px-6 md:px-10 lg:px-5 w-full max-w-[1380px] mx-auto'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl text-primaryBlue font-poppins font-medium'>OUR SERVICES</h1>
            <p className='mt-10 text-xl md:text-2xl text-justify'>Easy access to investment opportunities</p>

            <div className=' absolute right-[-25%] top-[160%]'>
                <MobileAnimation animationData={spiralRed} size={900} />
            </div>

            <div className='relative z-[2] flex flex-col lg:flex-row gap-10 mt-20'>
                <div className='flex flex-row flex-wrap h-fit lg:flex-col gap-5 md:gap-8 lg:gap-10'>
                    {
                        services.map((item, index) => (
                            <div onClick={() => setActiveItem(item)} key={index}
                                className={`py-3 md:py-14 px-4 md:px-10 text-base md:text-2xl lg:text-3xl uppercase w-full mb:w-[180px] md:w-[300px] lg:w-[400px] border border-primaryBlue  flex items-center justify-between cursor-pointer ${activeItem.heading === item.heading && 'bg-primaryBlue text-white'} `}>
                                {item.heading}
                                <span className='zr:hidden md:flex'><FaAngleRight /></span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        activeItem?.items ? <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {
                                activeItem.items.map((item, index) => (
                                    <div key={index} className='bg-primaryBlue py-5 md:py-10 lg:py-12 px-6 md:px-8 text-white flex flex-col gap-4 md:gap-8 items-start '>
                                        <img src={`/${item.icon}.png`} alt="balance" />
                                        <h2 className='text-xl text-left w-full md:text-2xl'>{item.heading}</h2>
                                        <div className='flex flex-col gap-4'>
                                            {
                                                item.text.map((textItem, index) =>
                                                    <p key={index} className='text-sm md:text-base '>{textItem}</p>
                                                )}
                                        </div>
                                        <div className='h-full  flex items-end'>
                                            <Link className='' to={'/contact'}>
                                                <Button>CONTACT US</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> :
                            <div className='bg-primaryBlue max-w-[450px] py-5 md:py-10 lg:py-12 px-6 md:px-10 text-white flex flex-col gap-10 items-center '>
                                <img src={`/${activeItem.icon}.png`} alt="balance" />
                                <h2 className='text-2xl'>{activeItem.heading}</h2>
                                <p className='text-center'>{activeItem.text}</p>
                                <Link to={'/contact'}><Button>CONTACT US</Button></Link>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default ServicesDetail