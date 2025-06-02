import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { categorizedFaqData } from '../../utils/data';

const FaqDetails = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Money Market Fund");

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setActiveIndex(null); // Reset active accordion when changing category
    };

    const categories = Object.keys(categorizedFaqData);

    return (
        <div className="relative z-10 w-full bg-[#929295] text-white py-20 my-40">
            <div className="w-full max-w-[1000px] mx-auto px-4">
                <h2 className="text-2xl md:text-3xl mb-4 text-primaryBlue font-bold font-poppins tracking-[4px]">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="text-xs md:text-base text-primaryBlue font-light mb-10">Find answers to common questions about our investment funds and services.</p>

                {/* Category tabs */}
                <div className=" grid grid-cols-2 md:flex flex-wrap mb-8  border-gray-700">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 text-left md:text-center font-semibold mr-2 mb-2 text-sm  transition-colors ${activeCategory === category
                                ? 'bg-primaryBlue text-white'
                                : 'bg-transparent text-black hover:text-white hover:bg-gray-700 border-b border-black'
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Active category title */}
                <h3 className="text-xl md:text-2xl mb-6 text-primaryBlue font-medium">{activeCategory}</h3>

                {/* FAQ accordion for active category */}
                <div className="space-y-4">
                    {categorizedFaqData[activeCategory].map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-700"
                        >
                            <button
                                className="w-full flex justify-between items-center py-5 px-4 hover:bg-primaryOrange transition-colors"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="text-left text-primaryBlue text-base md:text-lg font-light">{item.question}</span>
                                <IoIosArrowDown
                                    className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                    size={20}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index
                                    ? 'max-h-[300px] opacity-100'
                                    : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="px-4 pb-5 text-sm md:text-base font-light leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqDetails;