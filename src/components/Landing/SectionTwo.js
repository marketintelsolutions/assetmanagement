import React from 'react'
import { services } from '../../utils/data'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'
import spiralRed from "../../utils/animations/spiral_lightred.json";

const SectionTwo = () => {
    return (
        <section className='py-24 relative'>
            <div className=' absolute right-[-25%] top-[20%]'>
                <MobileAnimation animationData={spiralRed} size={900} />
            </div>
            {/* <div className='absolute left-0 bottom-0'>
                <MobileAnimation animationData={spiralRed} />
            </div> */}
            <div className=' bg-[rgba(249,248,248,1)] px-10 lg:px-0 py-10'>

                <div className='w-full max-w-max mx-auto'>
                    <h1 className="relative z-[2] text-3xl md:text-4xl w-full flex items-center justify-between lg:text-5xl font-poppins font-medium text-primaryBlue">
                        <span>SERVICES</span>
                        <Link to={'/services'}>
                            <button className='text-secondaryRed text-base bg-white hover:border-white  border-secondaryRed hover:bg-primaryBlue hover:text-white border  py-3 px-6 rounded-[6px]'>Read More</button>
                        </Link>
                    </h1>
                    <h2 className='text-[20px]  md:text-[23px] lg:text-[26px] font-light mt-5 md:mt-10'>Providing transformational solutions for Africa’s unique challenges</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-fit mx-auto justify-center gap-14 mt-10  '>
                        {
                            services.map((item, index) => (
                                <SlideIn key={index} duration={900} distance={70} direction="right" delay={index * 150}>
                                    <div
                                        key={index}
                                        style={{
                                            backgroundImage: `url(/${item.image}.jpg)`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={`max-w-[450px] transform transition-transform duration-500 `}
                                    >
                                        <div className='h-full w-full p-10 bg-[#0000005b] backdrop-blur-[2px] transition-all duration-300 hover:bg-[#00000080]'>
                                            <span><img src={`/${item.icon}.png`} /></span>
                                            <h2 className='text-white mt-[200px] text-[30px] font-bold'>{item.heading}</h2>
                                            <p className='text-base h-[100px] font-extralight mt-4 text-white'>{item.text}</p>
                                        </div>
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
                            <button className='text-white bg-secondaryRed   border-secondaryRed hover:bg-white hover:text-primaryBlue  mt-10 py-3 px-6 rounded-[6px]'>Invest Now</button>
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
                <div className='absolute right-0 bottom-0'>
                    <MobileAnimation animationData={spiralRed} size={400} />
                </div>
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
                        <Link to={'/contact'}>
                            <button className='text-white bg-secondaryRed border border-secondaryRed  border-secondaryRed hover:bg-white hover:text-secondaryRed  mt-10 py-3 px-6 rounded-[6px]'>Contact Us</button>
                        </Link>

                    </div>
                </div>
            </div>


        </section>
    )
}

export default SectionTwo