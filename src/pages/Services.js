import React from 'react'
import Hero from '../components/Landing/Hero'
import ServicesDetail from '../components/Services/ServicesDetail'

const Services = () => {
    return (
        <>
            <Hero
                heading={'Services'}
                text={'We have different types of services designed to meet the unique needs of our clients.'}
                bgImage='fixedincomeBak'
                image='services'
            />
            <ServicesDetail />
        </>
    )
}

export default Services