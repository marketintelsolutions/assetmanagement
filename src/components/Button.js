import React from 'react'

const Button = ({ text, bg }) => {
    return (
        <>
            {bg ?
                <button className='mt-10 border border-secondaryRed text-secondaryRed hover:border-primaryBlue hover:bg-primaryBlue hover:text-white px-4 py-3 rounded-[6px]'>{text}</button>
                : <button
                    className='text-white bg-secondaryRed   border-secondaryRed hover:bg-white hover:text-primaryBlue  mt-10 py-3 px-6 rounded-[6px]'>
                    {text}
                </button>}
        </>
    )
}

export default Button