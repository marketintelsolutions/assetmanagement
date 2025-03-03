import React, { useState } from 'react'
import { fundManagerReports } from '../../utils/data'
import { FaRegFilePdf } from 'react-icons/fa6'

const FundManagerDetails = () => {
    const [activeReport, setActiveReport] = useState(fundManagerReports[0])

    return (
        <div className='w-full max-w-max mx-auto py-[150px]'>
            <p className=' text-2xl text-justify'>Fund Managers Report for each fund is published on a monthly basis which included performance of the funds for the month along with the Fund manager outlook on stock and money market and overall macro- economic environment.
            </p>

            <div className='bg-gray-50'>
                <div className='mt-20 flex border-t border-r'>
                    {
                        fundManagerReports.map((item, index) => (
                            <div onClick={() => setActiveReport(item)} key={index} className={`cursor-pointer px-10 py-3 border-l ${activeReport.title === item.title && 'text-white bg-primaryBlue'}`}>{item.title}</div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-10 border py-14 px-10'>
                {
                    activeReport.items.map((item, index) => (
                        <div className='flex max-w-[70%] items-center justify-between'>
                            <a target='_blank' href={`/pdf/${item.file}.pdf`} className='hover:text-primaryBlue'>
                                {item.title}
                            </a>
                            <span className='text-primaryBlue'><FaRegFilePdf size={30} /></span>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FundManagerDetails