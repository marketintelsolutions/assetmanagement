import React from 'react'

const Button = ({ children }) => {
    return (
        <button className='text-white text-sm md:text-base bg-secondaryRed min-w-[120px] border  border-secondaryRed hover:bg-white hover:text-primaryBlue  mt-10 py-3 px-6 rounded-full'>{children}</button>
    )
}

export default Button