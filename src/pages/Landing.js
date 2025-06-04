import React from 'react'
import Hero from '../components/Landing/Hero'
import SectionTwo from '../components/Landing/SectionTwo'
import Slider from '../components/Landing/Slider'
import MobileAnimation from '../components/MobileAnimation'
import AppSection from '../components/Landing/AppSection'

const Landing = () => {
    return (
        <div className='overflow-x-hidden'>
            {/* <Hero
                heading='PAC Asset Management'
                text='PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.'
            /> */}
            <Slider />
            <SectionTwo />
            <AppSection />
        </div>
    )
}

export default Landing