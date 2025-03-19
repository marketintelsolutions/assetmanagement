import React from 'react'
import { Link } from 'react-router-dom'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'
import spiralAsh from "../../utils/animations/spiral_ash.json";
import Button from '../Button';

const mutualfunds = [
    {
        icon: 'balance',
        heading: 'PACAM BALANCED FUND',
        text: 'This Fund invests in a combination of equities and fixed income instruments giving you a chance to maximize the benefits across these asset classes. The Fund allocation model emphasizes diversification and stability of investment using fixed income asset class to balance out the volatility of equity investments whilst maximizing benefits of both asset classes.'
    },
    {
        icon: 'equity',
        heading: 'PACAM Equity Fund',
        text: 'PACAM Equity Fund is a pure equity fund that invests your money predominantly in a portfolio of Nigerian companies, using a rigorous research-based system. The fund provides long-term capital preservation by investing at least 75% of the fund’s assets in a diversified portfolio of high-quality companies listed on the Nigerian Stock Exchange. To manage liquidity, the fund may also invest up to 23% in short-term money market instruments.'
    },
    {
        icon: 'fixed',
        heading: 'PACAM Fixed Income Fund',
        text: 'PACAM Fixed Income Fund invests in Fixed Income instruments such as FGN Bonds, Sub National Bonds, Corporate Bonds and other investment grade ﬁxed income instruments giving investors opportunity to invest in secure and high yielding Bonds offered by Federal and State Governments of Nigeria and large Corporates.'
    },
    {
        icon: 'market',
        heading: 'PACAM Money Market Fund',
        text: 'The PACAM Money Market Fund invests in high-quality short-term Money Market securities such as Treasury Bills, Bank Placements, Commercial Papers, and other money market instruments.'
    },
    {
        icon: 'euro',
        heading: 'PACAM Eurobond Fund',
        text: 'This Fund invests in Fixed Income instruments such as FGN Bonds, Sub National Bonds, Corporate Bonds, and other investment grade Fixed income instruments giving investor’s opportunity to Invest in secure and high yielding Bonds offered by Federal and State Governments of Nigeria and large Corporates.'
    },
]

const MutualFundDetails = () => {
    return (
        <section className='w-full relative'>
            <div className='z-[2] absolute right-[-20%] bottom-[-0%]'>
                <MobileAnimation animationData={spiralAsh} size={800} />
            </div>
            <section className='py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14'>

                    {
                        mutualfunds.map((item, index) => (
                            <SlideIn duration={900} distance={90} direction="right" delay={index * 150}>
                                <div className='bg-primaryBlue py-6 md:py-12 px-5 md:px-10 text-white flex flex-col gap-5 md:gap-10 items-center '>
                                    <div className='w-full max-w-[50px] md:max-w-[70px] lg:max-w-[100px]'>
                                        <img src={`/${item.icon}.png`} alt="balance" className='w-full' />
                                    </div>
                                    <h2 className='text-[22px]'>{item.heading}</h2>
                                    <p className='lg:h-[230px] text-center'>{item.text}</p>
                                    <Link to={'/contact'}>
                                        <Button text={'CONTACT US'} />
                                    </Link>
                                </div>
                            </SlideIn>
                        ))
                    }
                </div>
            </section>
        </section>
    )
}

export default MutualFundDetails