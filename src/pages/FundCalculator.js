import React from 'react'
import Hero from '../components/Landing/Hero'
import FundCalculatorDetails from '../components/Insights/FundCalculatorDetails'

const FundCalculator = () => {
    return (
        <>
            <Hero
                heading={'Fund Calculator'}
                text={'We offer a calculator that you can use to calculate your Upfront Interest, Discount Value, and Effective Yield.'}
                image={'fundcalc'}
                bgImage={'fundcalcbg'}
            />
            <FundCalculatorDetails />
        </>
    )
}

export default FundCalculator