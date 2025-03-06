import React from 'react'
import { Link } from 'react-router-dom'

const services = [
    {
        image: 'mutualfunds',
        heading: 'MUTUAL FUNDS',
        text: 'We have different types of mutual funds designed to meet the unique needs of our clients',
        path: '/services/mutual-funds'
    },
    {
        image: 'fixedincome',
        heading: 'FIXED INCOME TRADING',
        text: 'Our expert team is strategically positioned to capitalize on opportunities in the fixed-income market.',
        path: '/services/fixed-income-trading'
    },
    {
        image: 'wealth',
        heading: 'WEALTH MANAGEMENT',
        text: 'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs',
        path: '/services/wealth-management'
    },
    {
        image: 'alternativeinvestments',
        heading: 'ALTERNATIVE ASSETS',
        text: 'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics',
        path: '/services/alternative-investment'

    },
]

const WhatWeDo = () => {
    return (
        <section className='py-[150px] w-full max-w-[1200px] mx-auto'>
            <h1 className='text-5xl font-medium text-primaryBlue font-poppins'>WHAT WE DO</h1>
            <p className='mt-10 text-[22px] text-justify'>PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients. The company also offers wealth management services for high-net-worth individuals, focusing on long-term goals and estate planning. The company is Licensed and regulated by the Securities & Exchange Commission (SEC), and operates as a Funds and Portfolio Manager in Nigeria.</p>

            <div className='grid grid-cols-2 max-w-[900px] mx-auto mt-20 gap-0 gap-y-20'>
                {
                    services.map((item, index) => (
                        <div className='w-full max-w-[400px] mx-auto ' key={index}>
                            <div className='w-full'><img src={`/${item.image}.jpg`} className='w-full  object-cover max-h-[200px]' /></div>
                            <div className='pt-5 px-6 pb-8 bg-primaryBlue text-white'>
                                <h2 className='text-xl font-poppins font-medium'>{item.heading}</h2>
                                <p className='text-xl h-[110px] mt-4'>{item.text}</p>
                                <Link to={item.path}> <button className='mt-10 py-3 px-4 border hover:bg-white hover:text-primaryBlue border-white text-white'>READ MORE</button></Link>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='w-full max-w-max mx-auto mt-20'>
                <h1 className='text-4xl'>TRANSACTIONS</h1>
                <div className='mt-10 grid grid-cols-3 gap-10'>
                    {
                        ['Account opening package', 'Client Update Form', 'Fund Subscription Form', 'Fund Redemption Form'].map((item) => (
                            <div className='bg-primaryBlue w-full p-8 px-6 text-white flex flex-col gap-5'>
                                <p className='text-2xl h-[60px] uppercase font-medium '>{item} </p>
                                <button className='border border-white py-3 px-10 w-fit'>DOWNLOAD HERE</button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default WhatWeDo