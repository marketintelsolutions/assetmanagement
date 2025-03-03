import React from 'react'
import Hero from '../components/Landing/Hero'

const FixedIncomeTrading = () => {
    return (
        <>
            <Hero
                heading={'Fixed Income Trading'}
                text={'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.'}
            />

            <div className='py-[150px] w-full max-w-max mx-auto'>
                <h1 className='text-4xl'>WHAT WE DO</h1>
                <p className='mt-10 text-2xl max-w-[600px] text-justify'>We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.</p>

                <button className='mt-10 py-3 px-4 border hover:bg-secondaryRed hover:text-white border-secondaryRed text-secondaryRed'>CONTACT US</button>

            </div>

        </>
    )
}

export default FixedIncomeTrading