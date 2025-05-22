import React from 'react'
import Hero from '../components/Landing/Hero'
import WhatWeDoDetails from '../components/About/WhatWeDoDetails'

const WhatWeDo = () => {
    return (
        <>
            <Hero
                heading={'What We Do'}
                text={'We are an integrated asset management firm providing a range of mutual funds and diverse asset classes designed to meet the unique needs of its clients.'}
                image={'about1'}
                bgImage={'building1'}
            />
            <WhatWeDoDetails />
        </>
    )
}

export default WhatWeDo