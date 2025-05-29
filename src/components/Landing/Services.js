import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import SlideIn from '../SlideIn'

const Services = () => {
    return (
        <div className=' bg-[rgba(249,248,248,1)] px-6 md:px-10 lg:px-0 py-10'>
            <div className='w-full max-w-max mx-auto'>
                <h1 className="relative z-[2] text-3xl md:text-4xl w-full flex items-center justify-between lg:text-5xl font-poppins font-medium text-primaryBlue">
                    <span>SERVICES</span>
                    <Link to={'/services'}>
                        <button className='text-secondaryRed text-base bg-white hover:border-white  border-secondaryRed hover:bg-secondaryRed hover:text-white border  py-3 px-6 rounded-full'>Read More</button>
                    </Link>
                </h1>
                <h2 className='text-[20px]  md:text-[23px] lg:text-[26px] font-light mt-5 md:mt-10'>Providing transformational solutions for Africa’s unique challenges.</h2>
                <div className='relative w-full  md:w-[90%] lg:h-[664px] mt-10 md:mt-20 lg:mt-56 max-w-max mx-auto flex flex-wrap lg:flex-nowrap gap-4'>
                    <div className='w-full  h-full'>
                        <div className='flex flex-wrap md:flex-nowrap gap-4'>
                            <SlideIn duration={900} distance={70} direction="bottom" delay={150} className='w-full md:max-w-[468px]'>
                                <div className="w-full  h-[297px] bg-[#666666] py-[34px] px-6 md:px-[33px] " >
                                    <h3 className="text-white text-2xl font-bold font-['Lato'] tracking-tight">Fixed Income Trading</h3>
                                    <p className=" h-[112px] mt-[18px] mb-[25px] text-white text-base font-normal font-sans leading-normal">We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.</p>
                                    <Link to={'/services/fixed-income-trading'} >
                                        <button className="md:w-[173px] gap-2 h-[51px] px-5 md:px-[30px] text-white hover:text-secondaryRed py-[15px] bg-secondaryRed hover:bg-white border border-secondaryRed rounded-full items-center inline-flex justify-between">
                                            <span className="text-center text-sm md:text-base font-normal font-sans leading-tight tracking-tight">Read More </span>
                                            <span className=''><FaArrowRightLong /></span>
                                        </button>
                                    </Link>
                                </div>
                            </SlideIn>
                            <SlideIn duration={900} distance={70} direction="bottom" delay={200} className='w-full md:max-w-[468px]'>
                                <div className="w-full  h-[297px] bg-[#666666] py-[34px] px-6 md:px-[33px] " >
                                    <h3 className="text-white text-2xl font-bold font-['Lato'] tracking-tight">Alternative Investment</h3>
                                    <p className=" h-[112px] mt-[18px] mb-[25px] text-white text-base font-normal font-sans leading-normal">Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.</p>
                                    <Link to={'/services/alternative-investment'} >
                                        <button className="md:w-[173px] gap-2 h-[51px] px-5 md:px-[30px] text-white hover:text-secondaryRed py-[15px] bg-secondaryRed hover:bg-white border border-secondaryRed rounded-full items-center inline-flex justify-between">
                                            <span className="text-center text-sm md:text-base font-normal font-sans leading-tight tracking-tight">Read More </span>
                                            <span className=''><FaArrowRightLong /></span>
                                        </button>
                                    </Link>
                                </div>
                            </SlideIn>
                        </div>
                        <SlideIn duration={900} distance={70} direction="left" delay={300} className='w-full   h-full max-h-[351px]  mt-4 '>
                            <div className='w-full   h-full  ' style={{ backgroundImage: `url(/managerbigbg.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <div className='w-full h-full py-[49px]  bg-[#00000079] px-4 md:pr-[33px] flex flex-col gap-5 justify-center md:items-end'>
                                    <h1 className='md:w-[391px] text-white text-3xl md:text-4xl font-bold'>Wealth Management</h1>

                                    <p className="md:w-[391px] text-white text-lg md:text-xl font-normal font-sans leading-normal">
                                        Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs.
                                    </p>
                                    <div className='w-[391px]'>
                                        <Link to={'/services/wealth-management'} >
                                            <button className="md:w-[173px] gap-2 h-[51px] px-5 md:px-[30px] text-white hover:text-secondaryRed py-[15px] bg-secondaryRed hover:bg-white border border-secondaryRed rounded-full items-center inline-flex justify-between">
                                                <span className="text-center text-sm md:text-base font-normal font-sans leading-tight tracking-tight">Read More </span>
                                                <span className=''><FaArrowRightLong /></span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SlideIn>
                    </div>
                    <SlideIn duration={900} distance={70} direction="right" delay={350} className='w-full lg:w-[468px] h-full '>
                        <div className="h-full px-6 bg-primaryBlue  p-[49px] flex gap-11 items-center justify-end flex-col " >
                            <div className='flex flex-col gap-11'>
                                <h1 className='text-white text-3xl md:text-4xl font-bold'>Mutual Funds</h1>
                                <p className="min-h-[110px] text-white text-lg md:text-xl font-normal font-sans leading-normal">Our mutual funds are registered with the Securities and Exchange Commission and tailored to meet diverse investor goals, allowing you to build a well-balanced portfolio across various asset classes.</p>
                                <Link to={'/services/mutual-funds'} >
                                    <button className="md:w-[173px] gap-2 h-[51px] px-5 md:px-[30px] text-white hover:text-secondaryRed py-[15px] bg-secondaryRed hover:bg-white border border-secondaryRed rounded-full items-center inline-flex justify-between">
                                        <span className="text-center text-sm md:text-base font-normal font-sans leading-tight tracking-tight">Read More </span>
                                        <span className=''><FaArrowRightLong /></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SlideIn>
                    <div className='zr:hidden lg:flex absolute lg:-right-[80px] xl:-right-[132px] -top-[285px] '>
                        <img src="/motherchildtwo.png" alt="motherchildtwo" className='w-full lg:max-w-[300px] xl:max-w-[405px]' />
                    </div>
                </div>
            </div >
        </div>

    )
}

export default Services