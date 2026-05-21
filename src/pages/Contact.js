import React, { useState } from 'react'
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { LuPhone } from 'react-icons/lu'
import Hero from '../components/Landing/Hero'
import SlideIn from '../components/SlideIn'
import MobileAnimation from '../components/MobileAnimation'
import spiralAsh from "../utils/animations/spiral_ash.json";
import { apiService, apiUtils } from '../services/apiClient'

const ADMIN_EMAIL = 'info@pacassetmanagement.com'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

const Contact = () => {
    const [formData, setFormData] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState(null) // 'success' | 'error'

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Enter a valid email address'
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
        if (!formData.message.trim()) newErrors.message = 'Message is required'
        return newErrors
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: undefined }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)
        setStatus(null)

        try {
            await apiService.contact.submit(formData, ADMIN_EMAIL)
            setStatus('success')
            setFormData(initialForm)
        } catch (error) {
            console.error('Contact form error:', error)
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className='w-full relative overflow-hidden'>
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
                <div className='py-40 px-6 md:px-10 lg:px-5 w-full max-w-[1200px] mx-auto flex flex-wrap lg:flex-nowrap gap-4 lg:gap-20 justify-between'>
                    <SlideIn duration={900} distance={90} direction="left" delay={150} className='w-full'>
                        <div className='w-full lg:min-w-[500px] bg-primaryBlue text-white flex flex-col gap-4 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)] p-5 md:p-10 h-fit rounded-[10px]'>
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
                                <span className='text-white'><IoMailOutline size={50} /></span>
                                <span className='text-white'>info@pacassetmanagement.com</span>
                            </p>
                            <p className='text-[17px] font-extralight mt-8 flex items-center gap-4'>
                                <span className='text-white'><LuPhone size={50} /></span>
                                <span className='text-white'> +234 811 111 1006</span>
                            </p>
                        </div>
                    </SlideIn>

                    <div className='w-full lg:max-w-[50%]'>
                        <SlideIn duration={900} distance={90} direction="right" delay={300}>
                            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5 md:gap-10 px-5 py-8 md:py-10 md:px-10 rounded-[10px] bg-white shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)]'>
                                <h2 className='text-xl font-semibold'>Send us a mail</h2>

                                {status === 'success' && (
                                    <div className='bg-green-50 border border-green-400 text-green-800 rounded-lg px-4 py-3 text-sm'>
                                        Your message has been sent! We'll get back to you within 1–2 business days.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className='bg-red-50 border border-red-400 text-red-800 rounded-lg px-4 py-3 text-sm'>
                                        Something went wrong. Please try again or email us directly at info@pacassetmanagement.com.
                                    </div>
                                )}

                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="name" className='text-[15px] font-semibold text-gray-400'>Your name</label>
                                    <input
                                        type="text"
                                        id='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-base w-full'
                                    />
                                    {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="email" className='text-[15px] font-semibold text-gray-400'>Email Address</label>
                                    <input
                                        type="email"
                                        id='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full'
                                    />
                                    {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="phone" className='text-[15px] font-semibold text-gray-400'>Phone number</label>
                                    <input
                                        type="tel"
                                        id='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full'
                                    />
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="subject" className='text-[15px] font-semibold text-gray-400'>Subject</label>
                                    <input
                                        type="text"
                                        id='subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className='focus:outline-none focus:border-black pb-4 rounded-full px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full'
                                    />
                                    {errors.subject && <p className='text-red-500 text-xs mt-1'>{errors.subject}</p>}
                                </div>

                                <div className='w-full flex flex-col gap-2 mt-0'>
                                    <label htmlFor="message" className='text-[15px] font-semibold text-gray-400'>Your Message</label>
                                    <textarea
                                        id='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        className='h-[120px] resize-none focus:outline-none focus:border-black pb-4 rounded-[10px] px-4 py-5 bg-[rgba(194,196,200,0.48)] text-sm w-full'
                                    />
                                    {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message}</p>}
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full py-4 mt-10 rounded-full border border-secondaryRed hover:text-secondaryRed bg-secondaryRed text-white hover:border-primaryBlue hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors'
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
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
