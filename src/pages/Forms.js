import React from 'react'
import Button from '../components/ui/Button'
import SlideIn from '../components/SlideIn'
import Hero from '../components/Landing/Hero'
import { forms } from '../utils/data'
import { Link } from 'react-router-dom'



const Forms = () => {
    return (
        <>
            <Hero
                heading={'FORMS'}
                text={'Fill the forms below and our team would get back to you'}
                image='forms'
                bgImage={'formsbg'}
            />
            <div className='relative w-full max-w-max mx-auto my-40'>

                <h1 className='text-4xl'>Forms</h1>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {
                        forms.map((item, index) => (
                            <SlideIn duration={900} distance={70} direction="bottom" delay={index * 150}>
                                <div
                                    key={index}
                                    style={{
                                        backgroundImage: `url(/${item.image}.jpg)`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={`max-w-[450px] transform transition-transform duration-500 `}
                                >
                                    <div className='h-full w-full p-10 bg-[#0000005b]  transition-all duration-300 hover:bg-[#00000080]'>
                                        <span><img src={`/${item.icon}.png`} className='w-[80px]' /></span>
                                        <h2 className='text-white mt-[200px] h-[80px] text-[30px]'>{item.heading}</h2>
                                        <Link to={`/insights/forms/${item.slug}`}><Button>View Form</Button></Link>
                                    </div>
                                </div>
                            </SlideIn>
                        ))
                    }
                </div>
            </div>
        </>

    )
}

export default Forms