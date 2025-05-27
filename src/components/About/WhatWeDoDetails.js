import React from 'react'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import spiralRed from "../../utils/animations/spiral_ash.json";
import MobileAnimation from '../MobileAnimation';
import Button from '../ui/Button';

const services = [
    {
        image: 'mutualfunds',
        heading: 'MUTUAL FUNDS',
        text: 'We have different types of mutual funds designed to meet the unique needs of our clients.',
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
        text: 'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs.',
        path: '/services/wealth-management'
    },
    {
        image: 'alternativeinvestments',
        heading: 'ALTERNATIVE ASSETS',
        text: 'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.',
        path: '/services/alternative-investment'

    },
]



const WhatWeDoDetails = () => {
    return (
        <section className='relative w-full'>
            <div className=' absolute right-[-25%] top-[20%]'>
                <MobileAnimation animationData={spiralRed} size={950} />
            </div>
            <div className='relative z-[2] py-[150px] px-10 lg:px-5 w-full max-w-[1200px] mx-auto'>
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
                                            <Button>Invest Now</Button>
                                        </Link>
                                    </div>
                                </div>
                            </SlideIn>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default WhatWeDoDetails