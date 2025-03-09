import React, { useState } from 'react'
import { navData } from '../utils/data'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaLinkedin, FaPhone } from 'react-icons/fa6'
import { IoLogoFacebook, IoMail } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'

const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [activeItem, setActiveItem] = useState([])
    const [isItems, setIsItems] = useState(false)

    const handleItemsToggle = (item) => {
        setIsItems(true)
        setActiveItem(item)
    }
    return (
        <>
            <div className='bg-primaryBlue py-4 zr:hidden lg:flex'>
                <div className='w-full max-w-max mx-auto flex justify-end'>
                    <div className='flex gap-12 items-center'>
                        <div className='flex text-white text-2xl gap-8'>
                            <span><IoLogoFacebook /></span>
                            <span><FaLinkedin /></span>
                        </div>
                        <div className='flex gap-2 items-center text-l text-white'>
                            <span><FaPhone /></span>
                            <p>+234 271 6899 | 271 8632</p>
                        </div>
                        <div className='flex gap-2 items-center text-l text-white'>
                            <span><IoMail /></span>
                            <p>info@pacassetmanagement.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <nav onMouseLeave={() => setIsItems(false)} className='sticky z-[99] top-0 left-0 bg-white py-6 text-primaryBlue px-10 lg:px-20 flex justify-between items-center'>
                <Link to={'/'} className='text-4xl font-bold'><img src="/logo.png" alt="logo" className=' max-w-[250px]' /></Link>
                <div className={`absolute lg:static zr:top-[100%] lg:top-auto lg:bg-transparent bg-[#00000065] zr:w-full lg:w-auto lg:left-auto zr:left-0 px-10 lg:px-0 py-10 lg:py-0 flex gap-12 lg:gap-20 backdrop-blur-[2px] lg:backdrop-blur-none justify-between zr:flex-col lg:flex-row ${isMenu ? 'flex' : 'zr:hidden lg:flex'}`}>
                    {
                        navData.map((item, index) => {
                            return <>
                                <Link to={item.path} onMouseEnter={() => item.items && handleItemsToggle(item)} className='text-white lg:text-primaryBlue flex justify-between border-b lg:border-none border-white pb-3 lg:pb-0' key={index}>
                                    <span>{item.text}</span>
                                    <span className='zr:flex lg:hidden'><FaAngleDown /></span>
                                </Link>
                                {isItems && activeItem.text === item.text &&
                                    <div className='lg:absolute z-10 w-full h-fit top-full left-0 pt-0 lg:pt-20 lg:pb-20 lg:bg-[#0000008a] '>
                                        <div className='w-full h-full flex gap-12 lg:px-20 mx-auto'>
                                            {
                                                activeItem.items.map((item, index) => (
                                                    <div key={index} className='w-full max-w-[250px] flex flex-col '>
                                                        <h2 className='text-xl text-white border-b-2 pb-3'>{item.heading}</h2>

                                                        <div className='flex flex-col text-white'>
                                                            {
                                                                item.links.map((item) => {
                                                                    if (item.external) {
                                                                        return <a href={item.path} target='_blank' className='text-sm capitalize py-3 border-b border-[#a09d9d]' >{item.text}</a>
                                                                    }
                                                                    return <Link onClick={() => {
                                                                        setIsItems(false)
                                                                        setIsMenu(false)
                                                                    }
                                                                    } to={item.path} className='text-sm capitalize py-3 border-b border-[#a09d9d]'>{item.text}</Link>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                                )
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                        }
                        )
                    }
                </div>
                <div className='flex'>
                    <button className='zr:hidden lg:flex border border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white px-4 py-3 rounded-[6px]'>SELF SERVICE</button>
                    <button onClick={() => setIsMenu((prev) => !prev)} className='text-3xl zr:flex lg:hidden text-primaryBlue'>
                        <span><FiMenu /></span>
                    </button>
                </div>

            </nav>
        </>
    )
}

export default Navbar