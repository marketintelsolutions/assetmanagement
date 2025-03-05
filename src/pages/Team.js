import React from 'react'
import Hero from '../components/Landing/Hero'
import { Link } from 'react-router-dom'
import { team } from '../utils/data'



const Team = () => {
    return (
        <>
            <Hero
                heading={'BOARD OF DIRECTORS'}
                text={'The Board of Directors for PAC Asset Management Limited meets on a quarterly basis and is responsible for setting the Company’s strategic goals and evaluating overall business performance'}
            />


            <div className='w-full max-w-max mx-auto py-40'>
                <h1 className='text-5xl font-poppins font-medium text-primaryBlue'>BOARD OF DIRECTORS</h1>
                <p className='mt-10 text-[22px]'>Our Board consist of highly accomplished and experienced professionals, providing a diversity of expertise, and understanding of the financial services industry.</p>

                <div className='grid grid-cols-3 mt-10 gap-10'>
                    {
                        team.map((item, index) => (
                            <div className='w-full h-full' key={index}>
                                <div className='w-full'><img src={`/${item.image}.jpg`} className='w-full  object-cover max-h-[200px]' /></div>
                                <div className='pt-5 px-6 pb-8 bg-primaryBlue text-white'>
                                    <h2 className='text-2xl  uppercase text-[#e7e0e0]'>{item.name}</h2>
                                    <p className='h-[250px] text-xl  mt-4'>{item.desc[0]}</p>
                                    <Link to={`/team/${item.slug}`}> <button className='mt-10 py-3 px-10 border hover:bg-white hover:text-primaryBlue border-white text-white'>READ MORE</button></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Team