import React, { useEffect } from 'react'
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { LuPhone } from 'react-icons/lu'
import Hero from '../components/Landing/Hero'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";

const Contact = () => {

    return (
        <section>
            <Hero
                heading={'Contact Us'}
                text={'We would love to hear from you.'}
                image={'contact'}
                bgImage={'contactbg'}
            />

            <div className='w-full relative'>
                <div className=' absolute right-[-25%] top-[10%]'>
                    <MobileAnimation animationData={spiralAsh} size={800} />
                </div>
                <div className='py-40 px-10 lg:px-5 w-full max-w-[1200px] mx-auto flex flex-wrap gap-4 justify-between'>
                    <SlideIn duration={900} distance={90} direction="left" delay={150}>
                        <div className='w-full lg:min-w-[500px] flex flex-col gap-4 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)] p-10 h-fit rounded-[10px]'>
                            <h1 className='text-[40px]'>Contact Channels</h1>
                            <p className='text-[20px] font-light'>We would love to hear from you.</p>
                            <p className='text-[17px] font-extralight mt-12 flex gap-4'>
                                <span className='text-primaryOrange'><IoLocationOutline size={50} /></span>
                                <span>
                                    Plot 8A, Elsie Femi Pearse Street,<br />
                                    Off Adeola Odeku,<br />
                                    Victoria Island,<br />
                                    Lagos.
                                </span>
                            </p>
                            <p className='text-[17px] font-extralight mt-8 flex gap-4 items-center'>
                                <span className='text-primaryOrange'><IoMailOutline size={50} /></span>
                                <span className='text-black'>info@pacassetmanagement.com</span>
                            </p>
                            <p className='text-[17px] font-extralight mt-8 flex items-center gap-4'>
                                <span className='text-primaryOrange'><LuPhone size={50} /></span>
                                <span className='text-black'> +234 811 111 1006</span>
                            </p>
                        </div>
                    </SlideIn>

                    <div className='w-full lg:max-w-[50%]'>
                        <SlideIn duration={900} distance={90} direction="right" delay={300}>
                            <form className='w-full flex flex-col gap-10 p-10 rounded-[10px] bg-white shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)]'>
                                <h2>Send us a mail</h2>
                                <div className='w-full flex flex-col gap-4'>
                                    <label htmlFor="name" className='text-[15px] font-semibold text-gray-400'>Your name</label>
                                    <input type="text" id='name' className='focus:outline-none  focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)]  text-base w-full' />
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <label htmlFor="email" className='text-[15px] font-semibold text-gray-400'>Email Address</label>
                                    <input type="email" id='email' className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)]  text-sm w-full' />
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <label htmlFor="phone" className='text-[15px] font-semibold text-gray-400'>Phone number</label>
                                    <input type="number" id='phone' className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full' />
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <label htmlFor="subject" className='text-[15px] font-semibold text-gray-400'>Subject</label>
                                    <input type="text" id='subject' className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full' />
                                </div>
                                <div className='w-full flex flex-col gap-4 mt-0'>
                                    <label htmlFor="message" className='text-[15px] font-semibold text-gray-400'>Your Message</label>
                                    <textarea type="text" id='message' className='h-[120px] resize-none focus:outline-none focus:border-black pb-4 rounded-[10px] px-4 py-5 bg-[rgba(194,196,200,0.48)]  text-sm w-full' />
                                </div>
                                <button type='button' className='w-full py-4 mt-10 rounded-full border border-secondaryRed hover:text-secondaryRed bg-secondaryRed  text-white hover:border-primaryBlue hover:bg-white  '>Send Message</button>
                            </form>
                        </SlideIn>
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7037020698344!2d3.409201775240221!3d6.432094793559022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ad0e16842f3%3A0x3d9a06e8b5a2c72a!2s8A%20Elsie%20Femi%20Pearse%20St%2C%20Victoria%20Island%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1740662653135!5m2!1sen!2sng" width="100%" height="450" style={{ border: 0, loading: "lazy", width: '100%' }}></iframe>
            </div>
        </section>
    )
}

export default Contact