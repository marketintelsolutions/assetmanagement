import React from 'react'
import Hero from '../components/Landing/Hero'
import WhatWeDo from '../components/About/WhatWeDo'

const About = () => {

    return (
        <>
            <Hero
                heading={'About Us'}
                text={'We are an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.'}
                // image={'building1'}
                bgImage={'building1'}
            />
            <WhatWeDo />
        </>
    )
}

export default About