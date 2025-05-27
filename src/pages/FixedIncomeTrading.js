import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";
import Button from '../components/ui/Button'

const FixedIncomeTrading = () => {
    return (
        <>
            <Hero
                heading={'Fixed Income Trading'}
                text={'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.'}
                image='fixedincome'
                bgImage='fixedincomeBak'
            />

            <div className='relative w-full'>
                <div className=' absolute right-[-15%] top-[-0%]'>
                    <MobileAnimation animationData={spiralAsh} size={600} />
                </div>
                <div className='relative py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto'>

                    <SlideIn duration={900} distance={90} direction="left" delay={150}>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl'>WHAT WE DO</h1>
                    </SlideIn>
                    <SlideIn duration={900} distance={90} direction="right" delay={250}>
                        <p className='mt-10 text-base md:text-xl lg:text-2xl max-w-[600px] text-justify'>
                            We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.
                        </p>
                    </SlideIn>

                    <Link to={'/contact'}> <Button>CONTACT US</Button></Link>

                </div>
            </div>

        </>
    )
}

export default FixedIncomeTrading