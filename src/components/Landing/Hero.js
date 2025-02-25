import React, { ReactElement } from "react";
import clsx from "clsx";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext,
  ButtonPlay,
} from "pure-react-carousel";

const slides = [
  {
    title: 'PAC Asset Management',
    body: 'PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.',
    image: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner image',
    },
    cta: {
      url: '/about',
      title: 'About',
    },
    backgroundImage: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner bg',
    }
  },
  {
    title: 'PAC Asset Management',
    body: 'PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.',
    image: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner image',
    },
    cta: {
      url: '/about',
      title: 'About',
    },
    backgroundImage: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner bg',
    }
  },
  {
    title: 'PAC Asset Management',
    body: 'PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.',
    image: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner image',
    },
    cta: {
      url: '/about',
      title: 'About',
    },
    backgroundImage: {
      url: 'https://eu-images.contentstack.com/v3/assets/bltacf39601912ccb86/blte4a02cf8bdbdea0a/614068d86db99f25817e5cc3/IMG_2196.JPG?auto=webp&width=1200&quality=80',
      description: 'banner bg',
    }
  },
]



const Hero = ({ heading, text }) => {
  const primaryColor = '#062644';

  const hasMoreThanOneSlide = true;

  return (
    <section className="h-[95vh] relative w-full bg-primaryBlue">
      <div className="w-full h-full max-w-[90%] mx-auto" style={{ backgroundImage: `url(/construction.jpg)`, backgroundSize: 'cover' }}>
        <div className="bg-[#00000041] relative h-full w-full flex pt-20 gap-20 items-center justify-end">
          <div className="absolute -bottom-[62px] -left-5 w-full max-w-[42%]  ">
            <img src="/building.jpg" alt="building" className="w-full object-cover" />
          </div>
          <div className="w-full max-w-[53%] text-white bg-primaryBlue px-14 py-20">
            <h1 className="text-3xl font-light">{heading}</h1>
            <p className="text-xl font-light mt-5">{text}</p>
          </div>
        </div>
        <div className="w-[550px] h-[140px] absolute -bottom-[62px] right-0 opacity-95 bg-primarygray">
        </div>
      </div>
    </section>
  );
};

export default Hero;
