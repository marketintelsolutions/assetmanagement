import React, { useState } from 'react'
import { fundManagerReports } from '../../utils/data'
import { FaRegFilePdf } from 'react-icons/fa6'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'
import spiralAsh from "../../utils/animations/spiral_ash.json";

const FundManagerDetails = () => {
    const [activeReport, setActiveReport] = useState(fundManagerReports[0])

    return (
        <section className='w-full relative'>
            <div className=' absolute right-[-15%] top-[20%]'>
                <MobileAnimation animationData={spiralAsh} size={800} />
            </div>
            <div className='w-full max-w-max mx-auto px-10 lg:px-5 py-[150px]'>
                <SlideIn duration={900} distance={90} direction="left" delay={150}>
                    <p className='text-lg md:text-xl lg:text-2xl text-justify'>Fund Managers Report for each fund is published on a monthly basis which included performance of the funds for the month along with the Fund manager outlook on stock and money market and overall macro- economic environment.
                    </p>
                </SlideIn>

                <SlideIn duration={900} distance={120} direction="bottom" delay={200}>
                    <div className='bg-gray-50'>
                        <div className='mt-20 flex border-t border-r'>
                            {
                                fundManagerReports.map((item, index) => (
                                    <div onClick={() => setActiveReport(item)} key={index} className={`cursor-pointer text-xs mb:text-sm md:text-base px-4 md:px-8 lg:px-10 py-3 border-l ${activeReport.title === item.title && 'text-white bg-primaryBlue'}`}>{item.title}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 border py-10 md:py-12 lg:py-14 px-4 md:px-8 lg:px-10'>
                        {
                            activeReport.items.map((item, index) => (
                                <div key={index} className='flex md:max-w-[70%] items-center justify-between'>
                                    <a target='_blank' href={`/pdf/${item.file}.pdf`} className='hover:text-primaryBlue text-sm md:text-base'>
                                        {item.title}
                                    </a>
                                    <span className='text-primaryBlue'><FaRegFilePdf size={30} /></span>
                                </div>
                            ))
                        }
                    </div>
                </SlideIn>

            </div>
        </section>
    )
}

export default FundManagerDetails