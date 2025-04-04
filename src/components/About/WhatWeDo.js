import React from 'react'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import spiralRed from "../../utils/animations/spiral_lightred.json";
import MobileAnimation from '../MobileAnimation';
import Button from '../Button';

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

const transactions = [
    {
        heading: 'Account opening package',
        icon: 'package',
        image: 'account_opening',
    },
    {
        heading: 'Client Update Form',
        icon: 'client',
        image: 'clientform',
    },
    {
        heading: 'Fund Subscription Form',
        icon: 'subscription',
        image: 'fundsub',
    },
    {
        heading: 'Fund Redemption Form',
        icon: 'form',
        image: 'redemption',
    },
]

const WhatWeDo = () => {
    return (
        <section className='relative w-full'>
            <div className=' absolute right-[-25%] top-[20%]'>
                <MobileAnimation animationData={spiralRed} size={950} />
            </div>
            <div className='py-[150px] px-10 lg:px-5 w-full max-w-[1200px] mx-auto'>
                <SlideIn duration={900} distance={70} direction="left" delay={150}>
                    <h1 className='text-4xl font-medium text-primaryBlue font-poppins'>WHAT WE DO</h1>
                </SlideIn>
                <SlideIn duration={900} distance={70} direction="left" delay={250}>
                    <p className='mt-10 text-base md:text-[20px] lg:text-lg text-justify'>PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients. The company also offers wealth management services for high-net-worth individuals, focusing on long-term goals and estate planning. The company is Licensed and regulated by the Securities & Exchange Commission (SEC), and operates as a Funds and Portfolio Manager in Nigeria.</p>
                </SlideIn>


                <div className=' grid grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto mt-20 gap-x-5 gap-y-5 md:gap-y-20'>
                    {
                        services.map((item, index) => (
                            <SlideIn duration={900} distance={70} direction="right" delay={index * 150}>
                                <div className='w-full md:max-w-[400px] mx-auto ' key={index}>
                                    <div className='w-full'><img src={`/${item.image}.jpg`} className='w-full  object-cover max-h-[200px]' /></div>
                                    <div className='pt-5 px-6 pb-8 bg-primaryBlue text-white'>
                                        <h2 className='text-xl font-poppins font-medium'>{item.heading}</h2>
                                        <p className='text-xl md:h-[120px] mt-4'>{item.text}</p>
                                        <Link to={item.path}>
                                            <button className='text-secondaryRed bg-white hover:border-transparent  border-secondaryRed  hover:text-primaryBlue border mt-10 py-3 px-6 rounded-[6px]'>Invest Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </SlideIn>
                        ))
                    }
                </div>


                <div className='relative w-full max-w-max mx-auto mt-20'>
                    
                    <h1 className='text-4xl'>Downloads</h1>
                    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            transactions.map((item, index) => (
                                <SlideIn duration={900} distance={70} direction="bottom" delay={index * 150}>
                                    <div
                                        key={index}
                                        style={{
                                            backgroundImage: `url(/${item.image}.jpg)`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={`max-w-[450px] transform transition-transform duration-500 `}
                                    >
                                        <div className='h-full w-full p-10 bg-[#0000005b] backdrop-blur-[2px] transition-all duration-300 hover:bg-[#00000080]'>
                                            <span><img src={`/${item.icon}.png`} className='w-[80px]' /></span>
                                            <h2 className='text-white mt-[200px] h-[80px] text-[30px]'>{item.heading}</h2>
                                            <Button text={'Download Here'} />
                                        </div>
                                    </div>
                                </SlideIn>
                            ))
                        }
                    </div>
                </div>

            </div>
        </section>
    )
}

export default WhatWeDo