import React from 'react'
import Hero from '../components/Landing/Hero'
import SectionTwo from '../components/Landing/SectionTwo'
import Slider from '../components/Landing/Slider'
import MobileAnimation from '../components/MobileAnimation'

const Landing = () => {
    return (
        <div>
            {/* <Hero
                heading='PAC Asset Management'
                text='PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.'
            /> */}
            <Slider />
            <SectionTwo />
        </div>
    )
}

export default Landing