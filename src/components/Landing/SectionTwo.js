import React from 'react'
import { services } from '../../utils/data'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'

const SectionTwo = () => {
    return (
        <section className='py-24 relative'>
            <div className='absolute right-0 top-0'>
                <MobileAnimation />
            </div>
            <div className='bg-[rgba(249,248,248,1)] px-10 lg:px-0 py-10'>
                <div className='w-full max-w-max mx-auto'>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-medium text-primaryBlue">SERVICES</h1>
                    <h2 className='text-[20px]  md:text-[23px] lg:text-[26px] font-light mt-5 md:mt-10'>Providing transformational solutions for Africa’s unique challenges</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-fit mx-auto justify-center gap-14 mt-10  '>
                        {
                            services.map((item, index) => (
                                <SlideIn key={index} duration={900} distance={70} direction="right" delay={index * 150}>
                                    <div className='max-w-[500px] mx-auto bg-white px-8 pt-8 pb-14 shadow-[0px_0px_25px_5px_rgba(0,0,0,0.1)] hover:shadow-[5px_5px_25px_15px_rgba(0,0,0,0.15)]'>
                                        <div className='flex gap-5 items-center'>
                                            <img src={`${item.coloredIcon}.png`} alt={item.coloredIcon} className='max-w-[50px]' />
                                            <h2 className='text-[18px] md:text-[20px] lg:text-2xl font-poppins font-semibold text-secondaryBlue'>{item.heading}</h2>
                                        </div>
                                        <p className='mt-5 lg:h-[130px] text-justify text-[14px] md:text-[16px] lg:text-lg'>{item.text}</p>
                                        <Link to={item.path}>
                                            <button className='mt-5 text-secondaryBlue hover:opacity-50 font-semibold'>Read More</button>
                                        </Link>
                                    </div>
                                </SlideIn>
                            ))
                        }
                    </div>
                </div >
            </div>

            <div className='bg-primaryBlue my-[150px] pt-10 lg:pb-10 text-white'>
                <div className='w-full max-w-max mx-auto flex flex-col md:flex-row justify-center gap-20'>
                    <SlideIn duration={900} distance={70} direction="left" delay={150}>
                        <div className='md:max-w-[500px] px-10 lg:px-0'>
                            <h1 className='uppercase text-3xl font-poppins'>Invest For Your Children Open a Gift Mutual Fund today</h1>
                            <p className='text-lg mt-5'>Money can be a great gift for a loved one. How it will be appreciated, however, depends on how much thought goes into it. A great way to gift money is in the form of an investment.</p>
                            <button className='text-secondaryRed bg-white hover:border-white  border-secondaryRed hover:bg-white hover:text-primaryBlue border mt-10 py-3 px-6 rounded-[6px]'>Invest Now</button>
                        </div>
                    </SlideIn>
                    <SlideIn duration={900} distance={90} direction="right" delay={350}>
                        <div className='md:max-w-[400px]'>
                            <img src="/childreninvest.jpg" alt="building" className='w-full h-full' />
                        </div>
                    </SlideIn>
                </div>
            </div>


            <div className='relative py-12'>
                <div className='zr:hidden lg:flex absolute left-0 top-0 bg-primaryBlue h-full w-[47%] shadow-[0px_0px_20px_9px_rgba(0,0,0,0.15)]'></div>
                <div className='relative z-10 flex flex-col md:flex-row gap-20 max-w-[1100px] mx-auto'>
                    <a target='_blank' href='https://youtu.be/UiYd0bSVzs4' className=' lg:max-w-[700px] shadow-[0px_0px_20px_9px_rgba(0,0,0,0.15)]'>
                        <img src="/video.jpg" alt="video" className='w-full h-full object-cover' />
                    </a>
                    <div className='px-10 lg:px-0'>
                        <SlideIn duration={900} distance={50} direction="bottom" delay={150}>
                            <h2 className='text-primaryBlue text-xl md:text-2xl lg:text-3xl uppercase font-poppins' >Talk to a Financial Advisor</h2>
                        </SlideIn>
                        <SlideIn duration={900} distance={50} direction="bottom" delay={300}>
                            <p className='text-base md:text-lg mt-10'>
                                We believe that investing should not only be easy but that every interaction with us should be a memorable experience.
                                <br /><br />
                                Looking for more information about our products or are you in need of good advice regarding your Personal or corporate investments?
                                <br /><br />
                                Talk to us or schedule a call with us today
                            </p>
                        </SlideIn>
                        <Link to={'/contact'}> <button className='text-primaryBlue border-primaryBlue hover:bg-primaryBlue hover:text-white border mt-10 py-3 px-6 rounded-[6px]'>Contact Us</button></Link>

                    </div>
                </div>
            </div>


        </section>
    )
}

export default SectionTwo