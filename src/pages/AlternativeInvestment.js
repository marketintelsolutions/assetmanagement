import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'

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

                <div className='py-[150px] w-full max-w-max mx-auto'>
                    <SlideIn duration={900} distance={90} direction="left" delay={150}><h1 className='text-4xl'>WHAT WE DO</h1></SlideIn>
                    <SlideIn duration={900} distance={90} direction="right" delay={250}>
                        <p className='mt-10 text-2xl max-w-[600px] text-justify'>Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.</p>
                        <p className='mt-2 text-2xl max-w-[600px] text-justify'>These products are available to HNIs with medium to long-term investment objectives and a more developed appetite for risk. Qualifying investment start at N100million.</p>

                    </SlideIn>
                    <Link to={'/contact'}> <button className='mt-10 py-3 px-10 border hover:bg-primaryBlue hover:text-white border-primaryBlue text-primaryBlue'>CONTACT US</button></Link>

                </div>

            </></>
    )
}

export default AlternativeInvestment