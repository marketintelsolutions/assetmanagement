import React, { useState, useEffect } from 'react'
import { navData } from '../utils/data'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa6'
import { IoLogoFacebook, IoMail } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'
import Button from '../components/ui/Button'

const FUND_CODES = [
    { label: 'PACAM MMF', code: 'PMMF', display: 'yield' },
    { label: 'PACAM BF', code: 'PACAM_BF', display: 'bidOffer' },
    { label: 'PACAM FIF', code: 'PFIF', display: 'bidOffer' },
    { label: 'PACAM EqF', code: 'PEF', display: 'bidOffer' },
    { label: 'PACAM EuF', code: 'PEUF', display: 'bidOffer' },
]

const formatNGN = (val) =>
    `₦${Number(val).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`

const fetchDaemonToken = async () => {
    const res = await fetch('https://api.prod.mywealthcare.io/administration/api/v1/users/token/daemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: process.env.REACT_APP_FUNDS_API_USERNAME,
            password: process.env.REACT_APP_FUNDS_API_PASSWORD,
            tenant: process.env.REACT_APP_FUNDS_API_TENANT,
        }),
    })
    const data = await res.json()
    return data.access_token
}

const fetchFundByCode = async (code, token) => {
    const res = await fetch(`https://api.prod.mywealthcare.io/funds/api/v1/funds/code/${code}`, {
        headers: { Authorization: `Bearer ${token}`, 'x-tenant-id': 'pac-asset' },
    })
    return res.json()
}

const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [activeItem, setActiveItem] = useState([])
    const [isItems, setIsItems] = useState(false)
    const [liveFunds, setLiveFunds] = useState(FUND_CODES.map(f =>
        f.display === 'yield'
            ? { label: f.label, value: '—' }
            : { label: f.label, bid: '—', offer: '—' }
    ))

    useEffect(() => {
        let token = null
        let tokenFetchedAt = 0
        const TOKEN_TTL = 55 * 60 * 1000 // refresh token 5 min before 1hr expiry

        const loadFunds = async () => {
            try {
                if (!token || Date.now() - tokenFetchedAt > TOKEN_TTL) {
                    token = await fetchDaemonToken()
                    tokenFetchedAt = Date.now()
                }
                const results = await Promise.all(FUND_CODES.map(f => fetchFundByCode(f.code, token)))
                setLiveFunds(FUND_CODES.map((f, i) => {
                    const r = results[i]
                    if (f.display === 'yield') {
                        return {
                            label: f.label,
                            value: r?.yield != null ? `${Number(r.yield).toFixed(2)}%` : '—',
                        }
                    }
                    return {
                        label: f.label,
                        bid: r?.bidPrice != null ? formatNGN(r.bidPrice) : '—',
                        offer: r?.offerPrice != null ? formatNGN(r.offerPrice) : '—',
                    }
                }))
            } catch (e) {
                console.error('Failed to load live fund prices', e)
            }
        }
        loadFunds()
        const interval = setInterval(loadFunds, 5 * 60 * 1000) // refresh fund prices every 5 minutes
        return () => clearInterval(interval)
    }, [])

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
                    <Link to={'/'} className='text-4xl font-bold'><img src="/logo.png" alt="logo" className='max-w-[150px] mb:max-w-[200px] md:max-w-[250px]' /></Link>
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
                    <div className='flex items-center gap-4'>
                        <a
                            target='_blank'
                            href='https://pac-asset.portal.prod.mywealthcare.io/'>
                            <button className='text-secondaryRed mb:text-white flex text-xs md:text-base mb:bg-secondaryRed mb:min-w-[120px] mb:border font-semibold mb:font-normal  border-secondaryRed hover:bg-white hover:text-primaryBlue  mb:py-3 mb:px-6 rounded-full'>SELF SERVICE</button>
                        </a>
                        <button onClick={() => setIsMenu((prev) => !prev)} className='text-2xl mb:text-3xl zr:flex lg:hidden text-primaryBlue'>
                            <span><FiMenu /></span>
                        </button>
                    </div>
                    {/*  */}
                </div>
            </nav >
            <div className='bg-primaryBlue text-white py-2 overflow-hidden'>
                <div className='flex w-max animate-marquee'>
                    {Array.from({ length: 8 }).flatMap((_, copy) =>
                        liveFunds.map((item, index) => (
                            <div key={`${copy}-${index}`} className='flex items-center gap-2 px-8 whitespace-nowrap text-sm md:text-base border-r border-white'>
                                <span className='font-semibold'>{item.label}</span>
                                {item.bid !== undefined ? (
                                    <>
                                        <span className='text-xs text-gray-300'>Bid</span>
                                        <span className='text-sm text-secondaryRed'>{item.bid}</span>
                                        <span className='text-xs text-gray-300'>Offer</span>
                                        <span className='text-sm text-secondaryRed'>{item.offer}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className='text-xs text-gray-300'>Yield</span>
                                        <span className='text-sm text-secondaryRed'>{item.value}</span>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar