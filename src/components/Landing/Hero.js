import React, { ReactElement, useState } from "react";

const slides = [
  {
    image: 'building',
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
]



const Hero = ({ heading, text, image = 'building', bgImage = 'construction' }) => {

  return (
    <section className="h-[95vh] relative w-full bg-white">
      <div className="w-full h-full lg:max-w-[90%] mx-auto" style={{ backgroundImage: `url(/${bgImage}.jpg)`, backgroundSize: 'cover' }}>
        <div className="bg-[#0000007e] relative h-full w-full flex md:pt-20 md:gap-20 items-end lg:items-center justify-end">
          <div className="absolute h-full lg:bottom-[-62px] md:bottom-auto lg:-left-5 -left-0 w-full lg:w-fit md:max-w-[42%]  ">
            <img src={`/${image}.jpg`} alt="building" className="w-full object-cover h-full md:h-[800px] " />
          </div>
          <div className="relative z-[3] w-full max-w-[80%] h-[40%] lg:h-fit lg:max-w-[53%] text-primaryBlue bg-white px-8 py-8">
            <h1 className="text-3xl font-poppins font-medium  ">{heading}</h1>
            <p className="text-base font-light mt-5">{text}</p>
          </div>
        </div>
        <div className="w-[70%] lg:w-[550px] h-[140px] z-[2] absolute -bottom-[62px] right-0 opacity-95 bg-primarygray"></div>
      </div>
    </section>
  );
};

export default Hero;
