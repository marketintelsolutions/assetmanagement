import React, { useEffect, useState } from 'react'
import Hero from '../components/Landing/Hero'
import { useParams } from 'react-router-dom'
import { team } from '../utils/data'

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
                text={''}
            />

            <div className='w-full max-w-max mx-auto py-[150px]'>
                <h1 className='text-5xl font-medium font-poppins'>
                    {teamMember?.name}
                </h1>

                <div className='flex flex-col gap-5 mt-10 '>
                    {
                        teamMember?.desc.map((item, index) => (
                            <p key={index} className='text-lg'>{item}</p>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TeamMember