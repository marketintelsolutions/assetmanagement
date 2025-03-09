import React from 'react'

const FundCalculatorDetails = () => {
    return (
        <section className='py-[150px] px-10 lg:px-5 w-full max-w-max mx-auto '>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-left w-full max-w-[700px] mx-auto'>CALCULATOR</h1>

            <form className='mt-20 w-full max-w-[700px] mx-auto flex flex-col gap-6'>
                <input type="number" name="faceValue" className='px-4 py-3 border w-full rounded-[6px] ' placeholder='Face Value' />
                <input type="number" name="rate" className='px-4 py-3 border w-full rounded-[6px] ' placeholder='Rate' />
                <input type="number" name="tenor" className='px-4 py-3 border w-full rounded-[6px] ' placeholder='Tenor' />
                <button className='bg-primaryBlue text-white py-3 rounded-[6px] mt-4 border border-primaryBlue hover:bg-white hover:text-primaryBlue'>Calculate</button>
            </form>
        </section>
    )
}

export default FundCalculatorDetails