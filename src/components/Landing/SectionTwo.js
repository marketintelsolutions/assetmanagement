import React from 'react'
import { services } from '../../utils/data'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'
import spiralRed from "../../utils/animations/spiral_ash.json";
import Button from '../ui/Button'
import Services from './Services'

const SectionTwo = () => {
    return (
        <section className='py-24 relative'>
            <div className=' absolute right-[-25%] top-[20%]'>
                <MobileAnimation animationData={spiralRed} size={900} />
            </div>
            <Services />

            <div className='bg-primaryBlue relative z-[2] my-[150px] pt-10 lg:pb-10 text-white'>
                <div className='w-full max-w-max mx-auto flex flex-col md:flex-row justify-center gap-20'>
                    <SlideIn duration={900} distance={70} direction="left" delay={150}>
                        <div className='md:max-w-[500px] px-10 lg:px-0'>
                            <h1 className='uppercase text-3xl font-poppins'>INVEST FOR YOUR CHILDREN'S FUTURE: OPEN A GIFT MUTUAL FUND TODAY</h1>
                            <p className='text-lg mt-5'>Money can be a great gift for a loved one. How it will be appreciated, however, depends on how much thought goes into it. A great way to gift money is in the form of an investment.</p>
                            <Button>Invest Now</Button>
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
                                Talk to us or schedule a call with us today.
                            </p>
                        </SlideIn>
                        <Link to={'/contact'}>
                            <button className='text-white bg-secondaryRed border  border-secondaryRed hover:bg-white hover:text-secondaryRed  mt-10 py-3 px-6 rounded-[6px]'>Contact Us</button>
                        </Link>

                    </div>
                </div>
            </div>


        </section>
    )
}

export default SectionTwo