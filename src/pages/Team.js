import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import { team } from '../utils/data'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralRed from "../utils/animations/spiral_lightred.json";
import Button from '../components/ui/Button'



const Team = () => {
    return (
        <>
            <Hero
                heading={'BOARD OF DIRECTORS'}
                text={'The Board of Directors for PAC Asset Management Limited meets on a quarterly basis and is responsible for setting the Company’s strategic goals and evaluating overall business performance.'}
                image='teambg'
                bgImage={'about2'}
            />


            <div className='w-full relative'>
                <div className=' absolute right-[-20%] top-[30%]'>
                    <MobileAnimation animationData={spiralRed} size={900} />
                </div>
                <div className=' w-full max-w-max mx-auto px-10 lg:px-5 py-40'>

                    <SlideIn duration={900} distance={70} direction="left" delay={150}>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-poppins font-medium text-primaryBlue'>BOARD OF DIRECTORS</h1>
                    </SlideIn>
                    <SlideIn duration={900} distance={70} direction="left" delay={250}> <p className='mt-10 text-base md:text-base lg:text-lg'>Our Board consist of highly accomplished and experienced professionals, providing a diversity of expertise, and understanding of the financial services industry.</p></SlideIn>

                    <div className='relative w-full'>

                        <div className=' grid grid-cols-1 md:grid-cols-2 md:max-w-[70%] mx-auto mt-20 gap-10'>

                            {
                                team.map((item, index) => (
                                    <SlideIn duration={900} distance={90} direction="right" delay={index * 150}>
                                        <div className='w-full h-full' key={index}>
                                            <div className='w-full'><img src={`/${item.image}.jpg`} className='w-full  object-cover max-h-[450px]' /></div>
                                            <div className='pt-5 px-6 pb-8 bg-primaryBlue text-white'>
                                                <h2 className='text-2xl  uppercase text-[#e7e0e0]'>{item.name}</h2>
                                                <p className=' text-xl  mt-4'>{item.desc[0].slice(0, 130)}...</p>
                                                <Link to={`/team/${item.slug}`}>
                                                    <Button>READ MORE</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </SlideIn>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team