import React, { useState } from 'react'
import { services } from '../../utils/data'
import { FaAngleRight } from "react-icons/fa6";

const ServicesDetail = () => {
    const [activeItem, setActiveItem] = useState(services[0])
    return (
        <section className='py-[150px] w-full max-w-max mx-auto'>
            <h1 className='text-4xl'>OUR SERVICES</h1>
            <p className='mt-10 text-2xl text-justify'>Easy access to investment opportunities</p>

            <div className='flex gap-10 mt-20'>
                <div className='flex flex-col gap-10'>
                    {
                        services.map((item, index) => (
                            <div onClick={() => setActiveItem(item)} key={index}
                                className={`py-14 px-10 text-3xl uppercase w-[400px] border border-primaryBlue  flex items-center justify-between cursor-pointer ${activeItem.heading === item.heading && 'bg-black text-white'} `}>
                                {item.heading}
                                <span><FaAngleRight /></span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        activeItem?.items ? <div className='grid grid-cols-2 gap-14'>
                            {
                                activeItem.items.map((item, index) => (
                                    <div key={index} className='bg-black py-12 px-10 text-white flex flex-col gap-10 items-center '>
                                        <img src={`/${item.icon}.png`} alt="balance" />
                                        <h2 className='text-2xl'>{item.heading}</h2>
                                        <p className='h-[220px] text-center'>{item.text}</p>
                                        <button className='mt-10 py-3 px-4 border hover:bg-secondaryRed hover:text-white border-secondaryRed text-secondaryRed'>CONTACT US</button>
                                    </div>
                                ))
                            }
                        </div> : <div className=' w-full max-w-max mx-auto'>
                            <p className=' text-2xl max-w-[600px] text-justify'>{activeItem.text}</p>

                            <button className='mt-10 py-3 px-4 border hover:bg-secondaryRed hover:text-white border-secondaryRed text-secondaryRed'>CONTACT US</button>

                        </div>
                    }
                </div>
            </div>

        </section>
    )
}

export default ServicesDetail