import React from 'react'
import Hero from '../components/Landing/Hero'

const AlternativeInvestment = () => {
    return (
        <>
            <>
                <Hero
                    heading={'Alternative Investment'}
                    text={'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.'}
                />

                <div className='py-[150px] w-full max-w-max mx-auto'>
                    <h1 className='text-4xl'>WHAT WE DO</h1>
                    <p className='mt-10 text-2xl max-w-[600px] text-justify'>Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.</p>
                    <p className='mt-2 text-2xl max-w-[600px] text-justify'>These products are available to HNIs with medium to long-term investment objectives and a more developed appetite for risk. Qualifying investment start at N100million.</p>

                    <button className='mt-10 py-3 px-4 border hover:bg-secondaryRed hover:text-white border-secondaryRed text-secondaryRed'>CONTACT US</button>

                </div>

            </></>
    )
}

export default AlternativeInvestment