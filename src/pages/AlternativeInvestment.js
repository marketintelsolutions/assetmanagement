import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";
import Button from '../components/ui/Button'
import { services } from '../utils/data'

const AlternativeInvestment = () => {
    const alternative = services.find((item) => item.heading === 'Alternative Investment')

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
                    <div className='absolute right-[-15%] top-[-0%]'>
                        <MobileAnimation animationData={spiralAsh} size={600} />
                    </div>
                    <div className=' py-[150px] px-6 md:px-10 lg:px-5 w-full max-w-max mx-auto'>
                        <SlideIn duration={900} distance={90} direction="left" delay={150}><h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1></SlideIn>
                        <SlideIn duration={900} distance={90} direction="right" delay={250}>
                            <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.</p>
                            <p className='mt-2 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>These products are available to HNIs with medium to long-term investment objectives and a more developed appetite for risk. Qualifying investment start at N100million.</p>

                        </SlideIn>

                        <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1100px] mx-auto gap-12 lg:gap-5'>

                            {
                                alternative.funds.map((item, index) => (
                                    <SlideIn duration={900} distance={90} direction="right" delay={index * 150}>
                                        <div className='bg-primaryBlue h-full py-6 md:pt-12 pb-24 px-5 md:px-7 text-white flex flex-col gap-5 md:gap-10 items-start '>
                                            <div className='w-full max-w-[50px] md:max-w-[70px] lg:max-w-[100px]'>
                                                <img src={`/${item.icon}.png`} alt="balance" className='w-full' />
                                            </div>
                                            <h2 className='text-[22px]'>{item.heading}</h2>
                                            <div className='flex flex-col gap-4'>
                                                {
                                                    item.text.map((textItem, index) =>
                                                        <p key={index} className=''>{textItem}</p>
                                                    )}
                                            </div>
                                            {/* <div className='h-full  flex items-end'>
                                                <Link className='' to={'/contact'}>
                                                    <Button text={'CONTACT US'} />
                                                </Link>
                                            </div> */}
                                        </div>
                                    </SlideIn>
                                ))
                            }
                        </div>

                        <Link to={'/contact'}> <Button>CONTACT US</Button></Link>


                    </div>
                </div>

            </></>
    )
}

export default AlternativeInvestment