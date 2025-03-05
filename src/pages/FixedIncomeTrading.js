import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'

const FixedIncomeTrading = () => {
    return (
        <>
            <Hero
                heading={'Fixed Income Trading'}
                text={'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.'}
                image='fixedincome'
                bgImage='fixedincomeBak'
            />

            <div className='py-[150px] w-full max-w-max mx-auto'>
                <h1 className='text-4xl'>WHAT WE DO</h1>
                <p className='mt-10 text-2xl max-w-[600px] text-justify'>We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.</p>

                <Link to={'/contact'}> <button className='mt-10 py-3 px-10 border hover:bg-primaryBlue hover:text-white border-primaryBlue text-primaryBlue'>CONTACT US</button></Link>

            </div>

        </>
    )
}

export default FixedIncomeTrading