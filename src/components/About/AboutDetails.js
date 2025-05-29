import React from 'react'
import SlideIn from '../SlideIn'
import MobileAnimation from '../MobileAnimation'
import spiralAsh from "../../utils/animations/spiral_ash.json";

const AboutDetails = () => {
    return (
        <div className='relative px-6 xl:px-0'>
            <div className='absolute -right-40 top-10'>
                <MobileAnimation animationData={spiralAsh} size={600} />
            </div>
            <div className='absolute -left-40 bottom-80'>
                <MobileAnimation animationData={spiralAsh} size={600} />
            </div>
            <section className='relative z-[2] w-full max-w-[1200px] mx-auto my-40'>
                <SlideIn duration={900} distance={70} direction="left" delay={150}>
                    <h1 className='text-3xl md:text-4xl font-medium text-primaryBlue font-poppins'>ABOUT PAC ASSET MANAGEMENT</h1>
                </SlideIn>
                <SlideIn duration={900} distance={70} direction="left" delay={250}>
                    <p className='mt-10 text-base md:text-[20px] lg:text-lg text-justify'>PAC Asset Management Limited (PAC Asset) is an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients. The company also offers wealth management services for high-net-worth individuals, focusing on long-term goals and estate planning. The company is Licensed and regulated by the Securities & Exchange Commission (SEC), and operates as a Funds and Portfolio Manager in Nigeria.</p>
                </SlideIn>

            <div className='flex gap-10 items-center mt-20'>
                <div className='w-full max-w-[500px]'><img src="/missionimg.jpg" alt="missionimg" className='w-full' /></div>
                <div className='w-full max-w-[50%] flex flex-col gap-10'>
                    <p className='text-[30px] font-normal'>"We are committed to providing a safe investment outlet to meet our client’s clearly understood investment objectives. <br /> Our services would provide innovative investment opportunities to meet
                        the continuous changes of client needs with a passion for creating sustainable value."</p>
                    <p className='text-lg font-bold text-primaryBlue'>MISSION</p>
                </div>
            </div>

                <p className='mt-10 md:mt-20 text-2xl md:text-3xl'><span className='font-bold'>Our vision</span> is to become the preferred Asset Manager of Choice to our clients.</p>

                <div className='flex flex-wrap md:flex-nowrap gap-6 mt-24 items-start'>

                    <div className='w-full md:max-w-[30%]'>
                        <h2 className='text-3xl md:text-4xl font-medium text-primaryBlue font-poppins'>CORE VALUES</h2>
                        <div className=' grid grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:flex flex-col gap-3 md:gap-5 mt-10 '>
                            <p className='text-base md:text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Service with Passion</p>
                            <p className='text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Professionalism</p>
                            <p className='text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Integrity</p>
                            <p className='text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Respect for the Individual</p>
                            <p className='text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Integrity</p>
                            <p className='text-lg flex items-center gap-2'>
                                <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                                Team Spirit</p>
                        </div>
                    </div>
                    <SlideIn duration={900} distance={70} direction="left" delay={150} className='w-full'>
                        <div className='w-full h-[300px] md:h-[400px] object-cover relative '><div className='absolute top-0 left-0 w-full h-full bg-[#0000008e]'></div><img src="/corevalue.jpg" alt="corevalue" className='w-full h-full' /></div>

                    </SlideIn>
                </div>

            <div className='bg-primaryBlue py-10 px-20 mt-20 flex flex-col '>
                <h2 className='text-4xl font-medium text-white font-poppins'>PAC AT A GLANCE</h2>
                <div className=' gap-8 mt-10 text-white text-lg grid grid-cols-2'>
                    <p className='flex items-center gap-2'>
                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                        Over ₦30 Billion Assets Under Management (AUM)
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                        Regulated by the Securities & Exchange Commission
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                        12+ Years of Investment Management Experience
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                        5 Active Mutual Funds
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='inline-flex h-3 w-3 bg-secondaryRed'></span>
                        A member company of PanAfrican Capital Holdings
                    </p>
                </div>
            </div>

                <h2 className='text-3xl md:text-4xl mt-20 md:mt-28 font-medium text-primaryBlue font-poppins'>WHY CHOOSE PAC ASSET MANAGEMENT</h2>


                <div className='relative w-full   lg:h-[664px] mt-10 md:mt-20 lg:mt-56 max-w-max mx-auto flex flex-wrap lg:flex-nowrap gap-4'>
                    <div className='w-full  h-full'>
                        <div className='flex flex-wrap md:flex-nowrap gap-4'>
                            <SlideIn duration={900} distance={70} direction="bottom" delay={150} className='w-full md:max-w-[468px]'>
                                <div className="w-full  md:h-[297px] bg-[#666666] py-[34px] px-6 md:px-[33px] " >
                                    <h3 className="text-white text-2xl font-bold font-['Lato'] tracking-tight">Client-Driven</h3>
                                    <p className=" md:h-[112px] mt-[18px] mb-[25px] text-white text-base font-normal font-sans leading-normal">
                                        We are committed to managing and growing your wealth with a focus on
                                        delivering exceptional client experience.
                                    </p>

                                </div>
                            </SlideIn>
                            <SlideIn duration={900} distance={70} direction="bottom" delay={200} className='w-full md:max-w-[468px]'>
                                <div className="w-full md:h-[297px] bg-[#666666] py-[34px] px-6 md:px-[33px] " >
                                    <h3 className="text-white text-2xl font-bold font-['Lato'] tracking-tight">Market Intelligence</h3>
                                    <p className=" md:h-[112px] mt-[18px] mb-[25px] text-white text-base font-normal font-sans leading-normal">
                                        Our experienced research team delivers timely insights to support
                                        informed investment decisions while offering advisory services based on comprehensive
                                        research and market intelligence.
                                    </p>
                                </div>
                            </SlideIn>
                        </div>
                        <SlideIn duration={900} distance={70} direction="left" delay={300} className='w-full   h-full max-h-[351px]  mt-4 '>
                            <div className='w-full   h-full  ' style={{ backgroundImage: `url(/managerbigbg.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <div className='w-full h-full py-[49px]  bg-[#00000079] px-4 md:pr-[33px] flex flex-col gap-5 justify-center md:items-end'>
                                    <h1 className='md:w-[391px] text-white text-3xl md:text-4xl font-bold'>Impressive Return</h1>

                                    <p className="md:w-[391px] text-white text-lg md:text-xl font-normal font-sans leading-normal">
                                        Our funds and non-fund products are structured to deliver strong,
                                        competitive returns for our investors.
                                    </p>

                                </div>
                            </div>
                        </SlideIn>
                    </div>
                    <SlideIn duration={900} distance={70} direction="right" delay={350} className='w-full lg:w-[468px] h-full '>
                        <div className="h-full px-6 bg-primaryBlue  p-[49px] flex gap-11 items-center justify-end flex-col " >
                            <div className='flex flex-col gap-11'>
                                <h1 className='text-white text-3xl md:text-4xl font-bold'>Technology-Driven</h1>
                                <p className="min-h-[110px] text-white text-lg md:text-xl font-normal font-sans leading-normal">PAC Asset Management leverages cutting-edge technology to streamline its
                                    operations. Our self-service digital platform allows for seamless investment monitoring,
                                    subscriptions, and redemptions.</p>

                            </div>
                        </div>
                    </SlideIn>
                    {/* <div className='zr:hidden lg:flex absolute lg:-right-[80px] xl:-right-[132px] -top-[285px] '>
                        <img src="/motherchildtwo.png" alt="motherchildtwo" className='w-full lg:max-w-[300px] xl:max-w-[405px]' />
                    </div> */}
                </div>




                <div className='relative z-[2] mt-28 bg-primaryBlue p-6 md:p-10 lg:p-20 '>
                    <SlideIn>
                        <h2 className='text-3xl md:text-4xl  font-medium text-white font-poppins'>INVESTMENT PHILOSOPHY & PROCESS</h2>

                    </SlideIn>
                    <SlideIn>
                        <p className='mt-10 text-base text-white md:text-[20px] lg:text-lg text-justify'>Our investment philosophy is based on a deep understanding of the structure of markets and
                            the financial instruments that will match clients’ expectations. We adopt a value investing approach in a methodical and disciplined manner towards creating
                            a portfolio that will effectively match risk with return.
                            <br /><br />
                            We review the portfolio with the client from time to time in line with the investment
                            management agreement.</p>
                    </SlideIn>
                </div>

                <div className='relative z-[2] flex flex-wrap md:flex-nowrap gap-8 mt-8'>
                    <div className='w-full  flex flex-col gap-10 bg-primaryBlue text-white p-6 md:p-10 lg:p-20'>
                        <SlideIn>
                            <p className='text-[25px] mb:text-[26px] md:text-[32px] lg:text-[45px] font-normal'>"We are positioned to provide you with innovative investment management
                                services, delivering diversified investment opportunities from different sectors of
                                the economy."</p>
                        </SlideIn>
                        <p className='text-lg text-white font-bold'>OUR TRACK RECORD SPEAKS</p>
                    </div>
                    <div className='w-full max-w-[400px] flex flex-col gap-8 '>
                        <SlideIn direction='right'>
                            <div className='w-full flex flex-col items-center bg-[#d2ac47] px-12 py-16 text-white'>
                                <img src="/awardone.png" alt="awardone" className='w-full max-w-[100px]' />
                                <h3 className='mt-10 text-center uppercase font-bold text-xl'>PACAM Fixed Income Fund</h3>
                                <p className='mt-4 text-lg text-center'>Best Fixed Income Fund <br /> for the Year 2022</p>
                            </div>
                        </SlideIn>
                        <SlideIn direction='right' delay={250}>
                            <div className='w-full flex flex-col items-center bg-[#d2ac47] px-12 py-16 text-white'>
                                <img src="/awardtwo.png" alt="awardone" className='w-full max-w-[100px]' />
                                <h3 className='mt-10 text-center uppercase font-bold text-xl'>PACAM Eurobond Fund</h3>
                                <p className='mt-4 text-lg text-center'>Best Fixed Income Fund <br /> for the Year 2023</p>
                            </div>
                        </SlideIn>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutDetails