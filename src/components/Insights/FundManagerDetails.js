import React, { useState, useEffect } from 'react';
import { getFundManagerReports } from '../../firebase/services';
import { FaFilePowerpoint, FaRegFilePdf } from 'react-icons/fa6';
import SlideIn from '../SlideIn';
import MobileAnimation from '../MobileAnimation';
import spiralAsh from "../../utils/animations/spiral_ash.json";
import { BsFiletypePpt } from 'react-icons/bs';

const FundManagerDetails = () => {
    const [fundManagerReports, setFundManagerReports] = useState([]);
    const [activeReport, setActiveReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reports = await getFundManagerReports();
                setFundManagerReports(reports);
                if (reports.length > 0) {
                    setActiveReport(reports[0]);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue"></div>
            </div>
        );
    }

    return (
        <section className='w-full relative'>
            <div className='absolute right-[-15%] top-[20%]'>
                <MobileAnimation animationData={spiralAsh} size={800} />
            </div>
            <div className='w-full max-w-max mx-auto px-6 md:px-10 lg:px-5 py-[150px]'>
                <SlideIn duration={900} distance={90} direction="left" delay={150}>
                    <p className='text-base mb:text-lg md:text-xl lg:text-2xl text-justify'>
                        Fund Managers Report for each fund is published on a monthly basis which included performance of the funds for the month along with the Fund manager outlook on stock and money market and overall macro- economic environment.
                    </p>
                </SlideIn>

                <SlideIn duration={900} distance={120} direction="bottom" delay={200} className='mt-20 flex flex-row md:flex-col'>
                    <div className='bg-gray-50'>
                        <div className='flex flex-col md:flex-row border-t border-r'>
                            {fundManagerReports.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveReport(item)}
                                    className={`cursor-pointer text-xs mb:text-sm md:text-base px-4 lg:px-8 xl:px-10 py-3 border-b md:border-b-[0px] md:border-l ${activeReport?.title === item.title && 'text-white bg-primaryBlue'
                                        }`}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-full max-h-[500px] md:max-h-none overflow-y-scroll flex flex-col gap-10 border py-10 md:py-12 lg:py-14 px-4 md:px-8 lg:px-10'>
                        {activeReport?.items?.map((item, index) => (
                            <div key={index} className='flex pb-5 md:pb-0 border-b md:border-none w-full md:max-w-[70%] items-center justify-between'>
                                <a
                                    target='_blank'
                                    href={item.downloadUrl}
                                    rel="noopener noreferrer"
                                    className='hover:text-primaryBlue text-sm md:text-base'
                                >
                                    {item.title}
                                </a>
                                <span className='zr:hidden mb:flex text-primaryBlue'>
                                    {item.ppt ? <BsFiletypePpt size={30} /> : <FaRegFilePdf size={30} />}
                                </span>
                            </div>
                        ))}
                    </div>
                </SlideIn>
            </div>
        </section>
    );
};

export default FundManagerDetails;