import React, { ReactElement, useState } from "react";

const slides = [
  {
    image: 'relax',
    heading: 'Relax While Your Investments Grow from a Seed to a Forest',
    text: 'Just as a seed develops, your investments with us can yield returns and create a source of passive income, allowing you to benefit financially even while you focus on other aspects of life.',
  },
  {
    image: 'slide2',
    heading: 'Your Innovative Investment Manager',
    text: 'At PAC Asset Management, we combine creativity with strategic insight to optimize investment portfolios. We leverage market analysis and trend identification, making bold yet calculated decisions that can significantly impact the performance of investments.',
  },
  {
    image: 'slide3',
    heading: 'Helping you secure your future today',
    text: 'We are positioned to provide you with innovative investment management services, delivering diversified investment opportunities from different sectors of the economy.',
  },
]



const Hero = ({ heading, text, image = 'building', bgImage = 'construction' }) => {
  const [activeSlide, setActiveSlide] = useState(slides[0])

  return (
    <section className="h-[95vh] relative w-full bg-white">
      <div className="w-full h-full max-w-[90%] mx-auto" style={{ backgroundImage: `url(/${bgImage}.jpg)`, backgroundSize: 'cover' }}>
        <div className="bg-[#0000007e] relative h-full w-full flex pt-20 gap-20 items-center justify-end">
          <div className="absolute -bottom-[62px] -left-5 w-full max-w-[42%]  ">
            <img src={`/${image}.jpg`} alt="building" className="w-full object-cover h-[800px] " />
          </div>
          <div className="w-full max-w-[53%] text-primaryBlue bg-white px-8 py-8">
            <h1 className="text-3xl font-poppins font-medium  ">{heading}</h1>
            <p className="text-base font-light mt-5">{text}</p>
          </div>
        </div>
        <div className="w-[550px] h-[140px] absolute -bottom-[62px] right-0 opacity-95 bg-primarygray">
        </div>
      </div>
    </section>
  );
};

export default Hero;
