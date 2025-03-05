import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'

const WealthManagement = () => {
    return (
        <>
            <Hero
                heading={'Wealth Management'}
                text={'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs,'}
            />

            <div className='py-[150px] w-full max-w-max mx-auto'>
                <h1 className='text-4xl'>WHAT WE DO</h1>
                <p className='mt-10 text-2xl max-w-[600px] text-justify'>Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs, by providing them with cutting edge Investment Advisory and Portfolio Management Services premised on sound research and information.</p>
                <p className='mt-2 text-2xl max-w-[600px] text-justify'>Basically, our wealth management solutions will deliver tailor made services bespoke to our client’s financial needs, goals and overall objectives.</p>

                <Link to={'/contact'}> <button className='mt-10 py-3 px-10 border hover:bg-primaryBlue hover:text-white border-primaryBlue text-primaryBlue'>CONTACT US</button></Link>

            </div>

        </>
    )
}

export default WealthManagement