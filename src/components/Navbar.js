import React, { useState } from 'react'
import { navData } from '../utils/data'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [activeItems, setActiveItems] = useState([])
    const [isItems, setIsItems] = useState(false)

    const handleItemsToggle = (item) => {
        setIsItems(true)
        setActiveItems(item.items)
    }
    return (
        <nav onMouseLeave={() => setIsItems(false)} className='bg-primaryBlue relative py-10 text-white px-20 flex justify-between items-center'>
            <Link to={'/'} className='text-4xl font-bold'>PAC Asset</Link>
            <div className=' flex gap-20 justify-between '>
                {
                    navData.map((item, index) => {
                        if (item.items) {
                            return <Link to={item.path} onMouseEnter={() => handleItemsToggle(item)} className='' key={index}>{item.text}</Link>
                        }
                        return <Link to={item.path} className='' key={index}>{item.text}</Link>
                    }
                    )
                }
            </div>
            <button className='border border-white text-white px-4 py-3 rounded-[6px]'>SELF SERVICE</button>
            {isItems &&
                <div className='absolute z-10 w-full h-fit top-full left-0 pt-20 pb-20 bg-[#00000058] backdrop-blur-[3px]'>
                    <div className='w-full h-full  px-20 mx-auto'>
                        {
                            activeItems.map((item, index) => (
                                <div key={index} className='w-full max-w-[250px] flex flex-col '>
                                    <h2 className='text-xl border-b-2 pb-3'>{item.heading}</h2>

                                    <div className='flex flex-col'>
                                        {
                                            item.links.map((item) => (
                                                <Link to={item.path} className='text-sm capitalize py-3 border-b border-[#a09d9d]'>{item.text}</Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>}
        </nav>
    )
}

export default Navbar