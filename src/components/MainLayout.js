import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { WhatsAppWidget } from 'react-whatsapp-widget'
// import Footer from './Footer'

const MainLayout = ({ children }) => {
    const { pathname } = window.location

    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <WhatsAppWidget phoneNumber="+2348111111006" companyName='PACAM Support' replyTimeText='Replies almost immediately' />

        </>
    )
}

export default MainLayout