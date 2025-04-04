import React, { useState } from 'react'
import { services } from '../../utils/data'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Button from '../Button';
import MobileAnimation from '../MobileAnimation';
import spiralRed from "../../utils/animations/spiral_lightred.json";

const ServicesDetail = () => {
    const [activeItem, setActiveItem] = useState(services[0])
    return (
        <section className='py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>
            <h1 className='text-5xl text-primaryBlue font-poppins font-medium'>OUR SERVICES</h1>
            <p className='mt-10 text-2xl text-justify'>Easy access to investment opportunities</p>

            <div className=' absolute right-[-25%] top-[160%]'>
                <MobileAnimation animationData={spiralRed} size={900} />
            </div>

            <div className='flex flex-col lg:flex-row gap-10 mt-20'>
                <div className='flex flex-row flex-wrap h-fit lg:flex-col gap-10'>
                    {
                        services.map((item, index) => (
                            <div onClick={() => setActiveItem(item)} key={index}
                                className={`py-6 md:py-14 px-5 md:px-10 text-xl md:text-2xl lg:text-3xl uppercase w-[200px] md:w-[300px] lg:w-[400px] border border-primaryBlue  flex items-center justify-between cursor-pointer ${activeItem.heading === item.heading && 'bg-primaryBlue text-white'} `}>
                                {item.heading}
                                <span className='zr:hidden md:flex'><FaAngleRight /></span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        activeItem?.items ? <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
                            {
                                activeItem.items.map((item, index) => (
                                    <div key={index} className='bg-primaryBlue py-12 px-10 text-white flex flex-col gap-10 items-center '>
                                        <img src={`/${item.icon}.png`} alt="balance" />
                                        <h2 className='text-xl md:text-2xl'>{item.heading}</h2>
                                        <p className='md:h-[220px] text-center'>{item.text}</p>
                                        <Link to={'/contact'}><Button text={'CONTACT US'} /></Link>
                                    </div>
                                ))
                            }
                        </div> :
                            <div className='bg-primaryBlue max-w-[450px] py-12 px-10 text-white flex flex-col gap-10 items-center '>
                                <img src={`/${activeItem.icon}.png`} alt="balance" />
                                <h2 className='text-2xl'>{activeItem.heading}</h2>
                                <p className='text-center'>{activeItem.text}</p>
                                <Link to={'/contact'}><Button text={'CONTACT US'} /></Link>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default ServicesDetail