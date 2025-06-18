import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";
import Button from '../components/ui/Button'

const FixedIncomeTrading = () => {
    return (
        <>
            <Hero
                heading={'Fixed Income Trading'}
                text={'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.'}
                image='fixedincome'
                bgImage='fixedincomeBak'
            />

            <div className='relative w-full'>
                <div className=' absolute right-[-15%] top-[-0%]'>
                    <MobileAnimation animationData={spiralAsh} size={600} />
                </div>
                <div className='relative pt-[150px] pb-24 px-10 lg:px-5 w-full max-w-max mx-auto'>

                    <SlideIn duration={900} distance={90} direction="left" delay={150}>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1>
                    </SlideIn>
                    <SlideIn duration={900} distance={90} direction="right" delay={250}>
                        <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>
                            We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.
                        </p>
                    </SlideIn>

                    <Link to={'/contact'}> <Button>CONTACT US</Button></Link>

                </div>
            </div>

            <div className='max-w-max mx-auto flex flex-wrap md:flex-nowrap gap-6 mb-40 items-start'>

                <div className='w-full md:max-w-[30%]'>
                    <h2 className='text-2xl md:text-3xl font-medium text-primaryBlue font-poppins'>We assist your clients in the purchase of</h2>

                    <div className=' grid grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:flex flex-col gap-3 md:gap-5 mt-10 '>
                        <p className='text-base md:text-lg flex items-center gap-2'>
                            <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                            Commercial Papers</p>
                        <p className='text-lg flex items-center gap-2'>
                            <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                            Treasure Bills</p>
                        <p className='text-lg flex items-center gap-2'>
                            <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                            Bonds (Government/Corporate Bonds, Eurobonds, etc.)</p>
                        <p className='text-lg flex items-center gap-2'>
                            <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                            Fixed Income Placements.</p>

                    </div>
                </div>
                <SlideIn duration={900} distance={70} direction="left" delay={150} className='w-full'>
                    <div className='w-full h-[300px] md:h-[400px] object-cover relative '><div className='absolute top-0 left-0 w-full h-full bg-[#0000008e]'></div><img src="/corevalue.jpg" alt="corevalue" className='w-full h-full' /></div>

                </SlideIn>
            </div>

        </>
    )
}

export default FixedIncomeTrading