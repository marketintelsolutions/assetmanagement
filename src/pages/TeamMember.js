import React, { useEffect, useState } from 'react'
import Hero from '../components/Landing/Hero'
import { Link, useParams } from 'react-router-dom'
import { team } from '../utils/data'
import MobileAnimation from '../components/MobileAnimation'
import spiralRed from "../utils/animations/spiral_ash.json";
import Button from '../components/ui/Button'

const TeamMember = () => {
    const [teamMember, setTeamMember] = useState()
    const { id } = useParams()

    useEffect(() => {
        setTeamMember(team.find((item) => item.slug === id))
    }, [id])

    return (
        <>
            <Hero
                heading={teamMember?.name}
                image={teamMember?.image}
                text={''}
                bgImage={'teambg'}
            />



            <div className='w-full relative px-6 xl:px-0'>
                <div className=' absolute right-[-20%] top-[10%]'>
                    <MobileAnimation animationData={spiralRed} size={900} />
                </div>
                <div className='relative z-[2] w-full max-w-max mx-auto py-[150px]'>
                    <div>
                        <Link to={-1}> <Button >Back</Button></Link>
                    </div>
                    <h1 className='text-3xl md:text-5xl mt-10 font-medium font-poppins'>
                        {teamMember?.name}
                    </h1>

                    <div className='flex flex-col gap-5 mt-10 '>
                        {
                            teamMember?.desc.map((item, index) => (
                                <p key={index} className='text-base md:text-lg'>{item}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamMember