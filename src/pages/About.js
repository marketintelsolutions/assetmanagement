import React from 'react'
import Hero from '../components/Landing/Hero'
import AboutDetails from '../components/About/AboutDetails'


const About = () => {

    return (
        <>
            <Hero
                heading={'About Us'}
                text={'We are a member company of PanAfrican Capital Holdings, a Proprietary Investment Company with diverse interests in Investment Banking, Asset Management, Securities Trading, Private Equity, Registrar Services, Hospitality, and Agribusiness.'}
                image={'aboutmain'}
                bgImage={'aboutmainbg'}
            />
            <AboutDetails />
        </>
    )
}

export default About