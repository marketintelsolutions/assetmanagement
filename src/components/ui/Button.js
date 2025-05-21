import React from 'react'

const Button = ({ children }) => {
    return (
        <button className='text-white bg-secondaryRed   border-secondaryRed hover:bg-white hover:text-primaryBlue  mt-10 py-3 px-6 rounded-[6px]'>{children}</button>
    )
}

export default Button