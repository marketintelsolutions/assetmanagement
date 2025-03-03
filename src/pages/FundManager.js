import React from 'react'
import Hero from '../components/Landing/Hero'
import FundManagerDetails from '../components/Insights/FundManagerDetails'

const FundManager = () => {
    return (
        <>
            <Hero
                heading={'Fund Manager'}
                text={'Fund Managers Report for each fund is published on a monthly basis which included performance of the funds for the month along with the Fund manager outlook on stock and money market and overall macro- economic environment.'}
            />
            <FundManagerDetails />
        </>
    )
}

export default FundManager