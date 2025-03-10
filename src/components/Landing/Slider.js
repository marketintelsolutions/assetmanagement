import React, { useState, useEffect } from "react";

const slides = [
    {
        image: 'relax',
        heading: 'Relax While Your Investments Grow from a Seed to a Forest',
        text: 'Just as a seed develops, your investments with us can yield returns and create a source of passive income, allowing you to benefit financially even while you focus on other aspects of life.',
    },
    {
        image: 'building',
        heading: 'Your Innovative Investment Manager',
        text: 'At PAC Asset Management, we combine creativity with strategic insight to optimize investment portfolios. We leverage market analysis and trend identification, making bold yet calculated decisions that can significantly impact the performance of investments.',
    },
    {
        image: 'building',
        heading: 'Helping you secure your future today',
        text: 'We are positioned to provide you with innovative investment management services, delivering diversified investment opportunities from different sectors of the economy.',
    },
];

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto transition effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Function to handle manual navigation
    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    };

    const prevSlide = () => {
        setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
    };

    return (
        <section className="h-[95lvh] relative w-full max-w-[100%] bg-white">
            <div className="w-full  mx-auto h-full lg:px-20 ">
                {/* Container for all slides */}
                <div
                    className="w-full    h-full flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`w-full relative flex-shrink-0 ${activeIndex === index ? "flex" : "opacity-0"} `}
                            style={{ backgroundImage: `url(/relaxbg.jpg)`, backgroundSize: 'cover' }}
                        >
                            <div className="bg-[#0000007e] relative  h-full w-full flex lg:pt-20 gap-20 items-end lg:items-center justify-end">
                                <div className="absolute z-[1]  lg:-bottom-[62px] h-full lg:-left-5 w-full lg:max-w-[42%] transition-opacity duration-500">
                                    <img src={`/${slide.image}.jpg`} alt="building" className="w-full h-full object-cover" />
                                </div>
                                <div className="relative z-[2] w-full max-w-[90%] h-[40%] lg:h-fit lg:max-w-[53%] text-primaryBlue bg-white px-8 py-8">
                                    <h1 className="text-2xl font-poppins font-medium">{slide.heading}</h1>
                                    <p className="text-base font-light mt-5">{slide.text}</p>
                                </div>
                            </div>
                            <div className="w-full max-w-[95%] lg:max-w-[550px] h-[140px] absolute -bottom-[62px] right-0 opacity-95 bg-primarygray flex items-center justify-center">
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-[140px] absolute -bottom-[100px] right-0 opacity-95 flex items-center justify-center">
                {/* Control buttons */}
                <div className="flex items-center justify-center gap-3 w-[80%]">
                    <button
                        onClick={prevSlide}
                        className="bg-primaryBlue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Slide indicators */}
                    <div className="flex space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-primaryBlue" : "bg-gray-400"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="bg-primaryBlue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Slider;