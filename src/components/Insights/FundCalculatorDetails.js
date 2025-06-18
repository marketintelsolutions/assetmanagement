import React, { useState } from 'react'
import MobileAnimation from '../MobileAnimation'
import spiralAsh from "../../utils/animations/spiral_ash.json";



const FundCalculatorDetails = () => {
    const [formData, setFormData] = useState({
        faceValue: '',
        rate: '',
        tenor: ''
    })

    const [results, setResults] = useState({
        upfrontInterest: 0,
        grossInterest: 0,
        discountValue: 0
    })

    const [showResults, setShowResults] = useState(false)
    const [errors, setErrors] = useState({})
    const [showErrors, setShowErrors] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        const newErrors = {}
        const faceValue = parseFloat(formData.faceValue)
        const rate = parseFloat(formData.rate)
        const tenor = parseFloat(formData.tenor)

        if (!formData.faceValue || isNaN(faceValue) || faceValue <= 0) {
            newErrors.faceValue = 'Face value must be a positive number'
        }

        if (!formData.rate || isNaN(rate) || rate <= 0) {
            newErrors.rate = 'Rate must be a positive number'
        }

        if (!formData.tenor || isNaN(tenor) || tenor <= 0) {
            newErrors.tenor = 'Tenor must be a positive number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            setShowErrors(true)
            setShowResults(false)
            return
        }

        setShowErrors(false)

        const faceValue = parseFloat(formData.faceValue) || 0
        const rate = parseFloat(formData.rate) || 0
        const tenor = parseFloat(formData.tenor) || 0

        // Calculate upfront interest: face value × rate × tenor / 365
        const upfrontInterest = (faceValue * rate * tenor) / 365

        // Gross interest = upfront interest
        const grossInterest = upfrontInterest

        // Discount value: face value - gross interest
        const discountValue = faceValue - grossInterest

        setResults({
            upfrontInterest,
            grossInterest,
            discountValue
        })

        setShowResults(true)
    }

    return (
        <section className='w-full relative'>
            <div className='z-[2] absolute right-[-15%] top-[-0%]'>
                <MobileAnimation animationData={spiralAsh} size={600} />
            </div>
            <div className='relative z-[2] py-[150px] px-6 md:px-10 lg:px-5 w-full max-w-max mx-auto '>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-left w-full max-w-[700px] mx-auto'>CALCULATOR</h1>

                <div className='mt-20 w-full max-w-[700px] mx-auto flex flex-col gap-6'>
                    <div>
                        <input
                            type="number"
                            name="faceValue"
                            value={formData.faceValue}
                            onChange={handleInputChange}
                            className={`px-4 py-3 border w-full rounded-[6px] ${showErrors && errors.faceValue ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder='Face Value'
                            step="0.01"
                        />
                        {showErrors && errors.faceValue && (
                            <p className='text-red-500 text-sm mt-1'>{errors.faceValue}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="rate"
                            value={formData.rate}
                            onChange={handleInputChange}
                            className={`px-4 py-3 border w-full rounded-[6px] ${showErrors && errors.rate ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder='Rate'
                            step="0.01"
                        />
                        {showErrors && errors.rate && (
                            <p className='text-red-500 text-sm mt-1'>{errors.rate}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="tenor"
                            value={formData.tenor}
                            onChange={handleInputChange}
                            className={`px-4 py-3 border w-full rounded-[6px] ${showErrors && errors.tenor ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder='Tenor'
                            step="0.01"
                        />
                        {showErrors && errors.tenor && (
                            <p className='text-red-500 text-sm mt-1'>{errors.tenor}</p>
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className='bg-blue-600 text-white py-3 rounded-[6px] mt-4 border border-blue-600 hover:bg-white hover:text-blue-600 transition-colors'
                    >
                        Calculate
                    </button>
                </div>

                {showResults && (
                    <div className='mt-12 w-full max-w-[700px] mx-auto p-6 border rounded-[6px] bg-gray-50'>
                        <h2 className='text-xl font-semibold mb-4'>Calculation Results</h2>
                        <div className='space-y-3'>
                            <div className='flex justify-between items-center py-2 border-b'>
                                <span className='font-medium'>Upfront Interest:</span>
                                <span className='text-lg font-semibold text-blue-600'>
                                    {results.upfrontInterest.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            </div>
                            {/* <div className='flex justify-between items-center py-2 border-b'>
                                <span className='font-medium'>Gross Interest:</span>
                                <span className='text-lg font-semibold text-blue-600'>
                                    {results.grossInterest.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            </div> */}
                            <div className='flex justify-between items-center py-2'>
                                <span className='font-medium'>Discount Value:</span>
                                <span className='text-lg font-semibold text-green-600'>
                                    {results.discountValue.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default FundCalculatorDetails