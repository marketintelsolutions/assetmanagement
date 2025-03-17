import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";

const AlternativeInvestment = () => {

    return (
        <>
            <>
                <Hero
                    heading={'Alternative Investment'}
                    text={'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.'}
                    image='alternativeinvestments'
                    bgImage='building2'
                />

                <div className='w-full relative'>
                    <div className='z-[2] absolute right-[-15%] top-[-0%]'>
                        <MobileAnimation animationData={spiralAsh} size={600} />
                    </div>
                    <div className=' py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>
                        <SlideIn duration={900} distance={90} direction="left" delay={150}><h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1></SlideIn>
                        <SlideIn duration={900} distance={90} direction="right" delay={250}>
                            <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.</p>
                            <p className='mt-2 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>These products are available to HNIs with medium to long-term investment objectives and a more developed appetite for risk. Qualifying investment start at N100million.</p>

                        </SlideIn>
                        <Link to={'/contact'}>  <button className='text-secondaryRed mt-10 text-base bg-white hover:border-white  border-secondaryRed hover:bg-primaryBlue hover:text-white border  py-3 px-6 rounded-[6px]'>CONTACT US</button></Link>

                    </div>
                </div>

            </></>
    )
}

export default AlternativeInvestment