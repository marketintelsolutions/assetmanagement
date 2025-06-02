import React from 'react'
import { forms } from '../utils/data'
import Hero from '../components/Landing/Hero'

const FormItem = () => {
    const { pathname } = window.location

    const path = pathname.split('/')[3]

    const item = forms.find((item) => item.slug === path)

    // console.log('item', item, path);
    return (
        <div>
            <Hero
                heading={item.heading}
                text={''}
                image={'formsInner'}
                bgImage={'formsInnerbg'}
            />
            <div className='py-40'>{item.component}</div>
        </div>
    )
}

export default FormItem