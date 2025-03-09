import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'

const WealthManagement = () => {
    return (
        <>
            <Hero
                heading={'Wealth Management'}
                text={'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs,'}
                image='wealth'
                bgImage='wealthbck'
            />

            <div className='py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>
                <SlideIn duration={900} distance={90} direction="left" delay={150}><h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1></SlideIn>
                <SlideIn duration={900} distance={90} direction="right" delay={250}>
                    <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs, by providing them with cutting edge Investment Advisory and Portfolio Management Services premised on sound research and information.</p>
                    <p className='mt-2 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>Basically, our wealth management solutions will deliver tailor made services bespoke to our client’s financial needs, goals and overall objectives.</p>
                </SlideIn>

                <Link to={'/contact'}> <button className='mt-10 py-2 md:py-3 px-6 md:px-10  border hover:bg-primaryBlue hover:text-white border-primaryBlue text-primaryBlue'>CONTACT US</button></Link>

            </div>

        </>
    )
}

export default WealthManagement