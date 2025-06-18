import React from 'react'
import Hero from '../components/Landing/Hero'
import CareerDetails from '../components/Career/CareerDetails'

const Career = () => {
    return (
        <div className='w-full relative overflow-hidden'>
            <Hero
                heading={'Career'}
                text={'We are always searching for exceptional talents and skills that will drive innovation, excellence, and sustainable growth across our organisation.'}
                image={'career'}
                bgImage={'careerbg'}
            />
            <CareerDetails />
        </div>
    )
}

export default Career