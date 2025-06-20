import React, { useState } from 'react'
import { navData } from '../utils/data'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa6'
import { IoLogoFacebook, IoMail } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'
import Button from '../components/ui/Button'

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
            <div className='bg-primaryBlue px-6 xl:px-0 py-4 zr:hidden lg:flex'>
                <div className='w-full  max-w-max mx-auto flex justify-end'>
                    <div className='flex gap-12 items-center'>
                        <div className='flex text-white text-2xl gap-8'>
                            <a target='_blank' href='https://www.linkedin.com/company/pac-asset-management'><FaLinkedin /></a>
                            <a target='_blank' href='https://www.instagram.com/pacassetmanagement?igsh=MXAzeWRsYmp2bGxnZQ=='><FaInstagram /></a>
                        </div>
                        <div className='flex gap-2 items-center text-l text-white'>
                            <span><FaPhone /></span>
                            <a href='tel:+2348111111006'>+234 811 111 1006</a>
                        </div>
                        <div className='flex gap-2 items-center text-l text-white'>
                            <span><IoMail /></span>
                            <a href='mailto:info@pacassetmanagement.com'>info@pacassetmanagement.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <nav onMouseLeave={() => setIsItems(false)} className='sticky z-[99] top-0 left-0 bg-white w-full  py-2'>
                <div className='py-6 text-primaryBlue px-6 md:px-10 xl:px-0 max-w-max mx-auto flex gap-5 justify-between items-center'>
                    <Link to={'/'} className='text-4xl font-bold'><img src="/logo.png" alt="logo" className='max-w-[200px] md:max-w-[250px]' /></Link>
                    <div className={`absolute lg:static zr:top-[100%] lg:top-auto lg:bg-transparent bg-[#00000065] zr:w-full lg:w-auto lg:left-auto zr:left-0 px-6 md:px-10 lg:px-0 py-10 lg:py-0 flex gap-10 lg:gap-12 xl:gap-20 backdrop-blur-[2px] lg:backdrop-blur-none justify-between zr:flex-col lg:flex-row ${isMenu ? 'flex' : 'zr:hidden lg:flex'}`}>
                        {
                            navData.map((item, index) => {
                                return <>
                                    <div
                                        key={index}
                                        onMouseEnter={() => {
                                            if (item.items) {
                                                handleItemsToggle(item)
                                            } else {
                                                setIsItems(false)
                                            }
                                        }}
                                        className='text-white lg:text-primaryBlue flex justify-between border-b lg:border-none border-white pb-3 lg:pb-0'
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => {
                                                setIsMenu((prev) => !prev)
                                                setIsItems(false)
                                            }}
                                        >
                                            <span
                                                className='text-[15px] xl:text-base'>
                                                {item.text}
                                            </span>
                                        </Link>
                                        {item.items && <span onClick={() => handleItemsToggle(item)} className=' zr:flex lg:hidden'><FaAngleDown /></span>}
                                    </div >
                                    {isItems && activeItem.text === item.text &&
                                        <div className='lg:absolute z-10 w-full h-fit top-full left-0 pt-0 lg:pt-20 lg:pb-20 lg:bg-[#0000008a] '>
                                            <div className='w-full h-full flex gap-12 lg:px-20 mx-auto'>
                                                {
                                                    activeItem.items && activeItem.items.map((item, index) => (
                                                        <div key={index} className='w-full max-w-[250px] flex flex-col '>
                                                            <h2 className='text-lg md:text-xl text-white border-b-2 pb-3'>{item.heading}</h2>

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
                        <a
                            target='_blank'
                            href='https://cp-pac.zanibal.com/'>
                            <button className='text-white text-sm md:text-base bg-secondaryRed min-w-[120px] border  border-secondaryRed hover:bg-white hover:text-primaryBlue  py-3 px-6 rounded-full'>SELF SERVICE</button>
                        </a>
                        <button onClick={() => setIsMenu((prev) => !prev)} className='text-3xl zr:flex lg:hidden text-primaryBlue'>
                            <span><FiMenu /></span>
                        </button>
                    </div>

                </div>
            </nav >
        </>
    )
}

export default Navbar