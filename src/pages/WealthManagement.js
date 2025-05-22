import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";
import { services } from '../utils/data'
import Button from '../components/Button'


const WealthManagement = () => {
    const wealthManagement = services.find((item) => item.heading === 'Wealth Management')

    return (
        <>
            <Hero
                heading={'Wealth Management'}
                text={'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs.'}
                image='wealth'
                bgImage='wealthbck'
            />

            <div className='w-full relative'>
                <div className=' absolute right-[-15%] top-[-0%]'>
                    <MobileAnimation animationData={spiralAsh} size={600} />
                </div>
                <div className=' py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>
                    <SlideIn duration={900} distance={90} direction="left" delay={150}><h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1></SlideIn>
                    <SlideIn duration={900} distance={90} direction="right" delay={250}>
                        <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[900px] text-justify'>Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs, by providing them with cutting edge Investment Advisory and Portfolio Management Services premised on sound research and information.</p>
                        <p className='mt-2 text-base md:text-xl lg:text-2xl max-w-[900px] text-justify'>Basically, our wealth management solutions will deliver tailor made services bespoke to our client’s financial needs, goals and overall objectives.</p>
                    </SlideIn>

                    <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-5'>

                        {
                            wealthManagement.items.map((item, index) => (
                                <SlideIn duration={900} distance={90} direction="right" delay={index * 150}>
                                    <div className='bg-primaryBlue h-full py-6 md:py-12 px-5 md:px-7 text-white flex flex-col gap-5 md:gap-10 items-center '>
                                        <div className='w-full max-w-[50px] md:max-w-[70px] lg:max-w-[100px]'>
                                            <img src={`/${item.icon}.png`} alt="balance" className='w-full' />
                                        </div>
                                        <h2 className='text-[22px]'>{item.heading}</h2>
                                        <div className='flex flex-col gap-4'>
                                            {
                                                item.text.map((textItem, index) =>
                                                    <p key={index} className='text-justify'>{textItem}</p>
                                                )}
                                        </div>
                                        <div className='h-full  flex items-end'>
                                            <Link className='' to={'/contact'}>
                                                <Button text={'CONTACT US'} />
                                            </Link>
                                        </div>
                                    </div>
                                </SlideIn>
                            ))
                        }
                    </div>
                </div>

                <div className='w-full max-w-[1200px] mx-auto flex gap-14 mb-24 items-start'>

                    <div className='w-full max-w-[30%]'>
                        <h2 className='text-4xl font-medium text-primaryBlue font-poppins'>OUR SERVICES</h2>
                        <div className=' flex flex-col gap-6 mt-10 '>
                            {
                                wealthManagement.services.map((item, index) => (
                                    <p className='text-lg flex items-center gap-2'>
                                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                        {item.text}</p>
                                ))
                            }


                        </div>
                    </div>
                    <div className='w-full h-[450px] object-cover relative '><div className='absolute top-0 left-0 w-full h-full bg-[#0000008e]'></div><img src="/corevalue.jpg" alt="corevalue" className='w-full h-full' /></div>
                </div>
            </div>

        </>
    )
}

export default WealthManagement