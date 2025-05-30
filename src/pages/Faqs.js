import React from 'react'
import Hero from '../components/Landing/Hero'
import FaqDetails from '../components/Faq/FaqDetails'

const Faqs = () => {
    return (
        <>
            <Hero
                heading={'Freqently Asked Questions'}
                text={'Get answers to questions you might have.'}
                image='FAQ'
                bgImage='FAQbg'
            />
            <FaqDetails />
        </>
    )
}

export default Faqs