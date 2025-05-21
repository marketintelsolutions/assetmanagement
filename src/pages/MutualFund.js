import React from 'react'
import Hero from '../components/Landing/Hero'
import MutualFundDetails from '../components/MutualFund/MutualFundDetails'

const MutualFund = () => {
    return (
        <>
            <Hero
                heading={'Mutual Fund'}
                text={'We have different types of mutual funds designed to meet the unique needs of our clients.'}
                image={'mutualfunds'}
                bgImage={'mutualfundsbak'}
            />
            <MutualFundDetails />
        </>
    )
}

export default MutualFund