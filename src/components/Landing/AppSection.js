import React from 'react'
import { BsSendCheck } from 'react-icons/bs'
import { FaApple, FaCreditCard, FaGooglePlay } from 'react-icons/fa6'
import { RiPieChartLine } from 'react-icons/ri'
import { TbChartInfographic } from 'react-icons/tb'

const AppSection = () => {
    return (
        <>
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(30deg);
                    }
                    to {
                        transform: rotate(390deg);
                    }
                }
                
                @keyframes spin-reverse {
                    from {
                        transform: rotate(-40deg);
                    }
                    to {
                        transform: rotate(-400deg);
                    }
                }
                
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                
                .animate-spin-reverse {
                    animation: spin-reverse 5s linear infinite;
                }
            `}</style>

            <section className='overflow-hidden w-full max-w-max mx-auto lg:py-40 px-6 xl:px-0 flex flex-wrap items-center gap-32'>
                <div className='w-full lg:max-w-[40%] flex flex-col gap-14'>
                    <h4 className='text-primaryBlue text-xl md:text-2xl lg:text-3xl uppercase font-poppins' >PAC Asset Management <br /> Mobile App</h4>
                    <p className='text-base md:text-lg mt-10, text-justify'>
                        Explore our mobile app,
                        a platform you can use for your different Investments and also withdraw at any time you stated or wanted. You can open different accounts (like Individual Application, Joint Account Application, Corporate Account, etc.) and start earning immediately. Please click on the button below to download the app.
                    </p>
                    <div className='flex flex-wrap gap-5'>
                        <button className='flex items-center gap-2 py-1 px-3 bg-black text-white rounded-[8px]'>
                            <span><FaApple size={30} /></span>
                            <p className='flex flex-col items-start'>
                                <span className='text-[10px] font-light'>Download on the</span>
                                <span className='text-base'>App Store</span>
                            </p>
                        </button>
                        <button className='flex items-center gap-2 py-1 px-4 bg-black text-white rounded-[8px]'>
                            <span><FaGooglePlay size={30} /></span>
                            <p className='flex flex-col items-start'>
                                <span className='text-[10px] font-light'>GET IT ON</span>
                                <span className='text-base'>Google Play</span>
                            </p>
                        </button>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='font-normal text-sm'>Approved by SEC</p>
                        <img src="/sec.jpg" alt="sec" className='h-[40px]' />
                    </div>
                </div>
                <div className='relative w-full lg:max-w-[50%]'>
                    {/* CIRCLES WITH ICONS START */}
                    <div className=' absolute -top-20 -left-10 '>
                        <div className='relative animate-spin-slow flex items-center justify-center w-[650px] h-[650px] border rounded-full'>
                            <div className='w-full h-fit absolute -top-5 flex justify-center'>
                                <span className='inline-flex h-10 w-10 text-xl rounded-full bg-primaryBlue text-white  items-center justify-center '><FaCreditCard /></span>
                            </div>
                            <div className='w-full h-fit absolute -bottom-5 flex justify-center'>
                                <span className='inline-flex h-10 w-10 text-xl rounded-full bg-primaryBlue text-white  items-center justify-center '><BsSendCheck /></span>
                            </div>
                            <div className='w-fit h-full absolute -left-5 flex items-center'>
                                <span className='inline-flex h-10 w-10 text-xl rounded-full bg-primaryBlue text-white  items-center justify-center '><RiPieChartLine /></span>
                            </div>
                            <div className='relative animate-spin-reverse w-[500px] h-[500px] border rounded-full flex items-center justify-center'>
                                <div className='w-fit h-full absolute -right-5 flex items-center'>
                                    <span className='inline-flex h-10 w-10 text-xl rounded-full bg-primaryBlue text-white  items-center justify-center '><TbChartInfographic /></span>
                                </div>
                                <div className='w-[350px] h-[350px] border rounded-full'></div>
                            </div>
                        </div>
                    </div>
                    {/* CIRCLES WITH ICONS END */}
                    <div className='relative pb-40 z-[2] w-full  rounded-full flex items-end'>
                        <div className='w-full h-[250px] md:h-[300px]'>
                            <img src="/appone.png" alt="appimage" className='w-full h-full object-contain rotate-[20deg] md:-rotate-[40deg]' />
                        </div>
                        <div className='w-full md:h-[500px] '>
                            <img src="/apptwo.png" alt="appimage" className='w-full h-full object-contain md:-rotate-[20deg] md:-translate-x-44' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AppSection