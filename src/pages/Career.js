import React from 'react'
import Hero from '../components/Landing/Hero'
import CareerDetails from '../components/Career/CareerDetails'

const Career = () => {
    return (
        <>
            <Hero
                heading={'Career'}
                text={'Together, we deliver transformational investment solutions tailored to meet the needs of our investors.'}
                image={'career'}
                bgImage={'careerbg'}
            />
            <CareerDetails />
        </>
    )
}

export default Career