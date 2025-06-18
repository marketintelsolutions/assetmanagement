import React from 'react'
import Hero from '../components/Landing/Hero'
import FundManagerDetails from '../components/Insights/FundManagerDetails'

const FundManager = () => {
    return (
        <div className='w-full overflow-hidden'>
            <Hero
                heading={'Fund Manager'}
                text={'As Fund Managers, we publish a detailed monthly report for each fund. This report highlights the fund’s performance for the month and provides our outlook on the fund and the broader macroeconomic environment.'}
                image='fundmanager'
                bgImage='fundmanagerBak'
            />
            <FundManagerDetails />
        </div>
    )
}

export default FundManager