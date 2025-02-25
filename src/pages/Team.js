import React from 'react'
import Hero from '../components/Landing/Hero'

const team = [
    {
        image: 'building',
        name: 'Chris Oshiafi',
        desc: [
            'Mr. Oshiafi has over two decades of experience in Structured Finance, Consulting, Investment Banking and Venture Capital/Private Equity. He holds a 2nd Class (Upper Division) in Accounting & Finance from the University of London and Master of Business Administration degree from the Universisty of Lagos.',
            'He is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), an Associate of the Chartered Insurance Institute of London, (ACII) UK and Chartered Institute of Taxation of Nigeria (ACIT). He also attended various programmes at the prestigious Columbia Business School, New York, United States and INSEAD Business School, Fontainebleau, France, the IESE Business School in Barcelona, Spain and the Chief Executive Programme (CEP 17) Class of the Lagos Business School.',
            'He was the Pioneer Managing Director/CEO of Truebond Investments & Capital Limited, a Company with diverse interests in Oil & Gas, Telecommunications, Power and the Capital Markets. He has also worked with the firm of Damitop Consulting Limited as Managing Partner where he worked on number of World Bank projects for the Federal and several State Governments. He served as Executive Director (Investment Banking) of Citizens International Bank (now Enterprise Bank Limited) until his appointment as the pioneer Chief Executive Officer of PanAfrican Capital Plc.'
        ],
    },
    {
        image: 'building',
        name: 'Sina Alimi',
        desc: [
            'Sina is the Deputy Chief Executive Officer of PanAfrican Capital Holdings, a Proprietary Investment Company with presence in Lagos, Accra, Nairobi and Mauritius. He also serves is a member of the Board of Directors for several companies within the Group. ',
            'Acquiring a Chartered Accountant status in 1991 charted a course for his entire career that spans over twenty-five (25) years cutting across Deal Structuring, Project Finance, Mergers & Acquisitions, Privatization and Asset Management.',
            'Having worked with Diamond Bank Limited where he started his banking career in Audit and Banking Operations, Sina later joined the Investment Banking Division of Fountain Trust Bank Plc in 1997 and subsequently served as Group Head, Corporate Finance and Head, Investment Banking Group. While in Corporate Finance, Sina was actively involved in high profile projects and advisory mandates in the private sector as well as the privatization programme of the Federal Government of Nigeria.',
            'The alumnus of Lagos Business School (LBS) and IESE Business School Barcelona, Spain is a graduate of Accounting from the prestigious University of Lagos, where he graduated as one of the best in his class. Sina is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and Chartered Institute of Taxation of Nigeria (CITN). He is also an alumnus of Lagos Business School (LBS) and IESE Business School Barcelona, Spain.'
        ],
    },
    {
        image: 'building',
        name: 'Eric Okoruwa',
        desc: [
            'Eric Okoruwa is the Group Executive Director of PanAfrican Capital Holdings with over 20 years’ experience in investment banking and financial advisory.',
            'Eric has been involved in various high-profile transactions, raising over $5 billion and N300 billion from both foreign and local financial institution and capital markets across diverse sector. While at Fountain Trust bank Plc, he worked on a number of high-profile private sector advisory transactions as well as the Federal Government privatization program of the Federal Government of Nigeria.',
            'He holds a Bachelor of Science Degree in Business Administration from the University of Lagos and a Master’s degree in Marketing from the University of Lagos. He has attended a number of Executive courses, Advanced Manager’s Programme (AMP) from the Lagos Business School, “Leading Organizational Change” – Whatrton University of Pennsylvania and the Lagos Business School Global Chief Executive Officer (GCEO) programme for Africa in conjunction with Strathmore University Business School and IESE Business School Navarra, New York.',
            'He also attended various international and local courses on company Valuation and Issues Pricing, Factoring, Mergers & Acquisitions, Bonds & Derivatives, Asset Backed Securities, Structured Finance and International Trade Finance.'
        ],
    },
    {
        image: 'building',
        name: 'Dele Ige',
        desc: [
            'Dele holds an MBA in Finance (University of Mysore, India) he is also an Associate of Institute of Chartered Accounts of Nigeria (ICAN).',
            'He has more than 13 years working experience in Asset/Investment Management, having worked as an Investment Advisor, Equity Analyst, Credit Analyst, Fixed Income Trader, Portfolio Manager and Client Relationship Manager.',
            'He joined PAC Asset Management Limited in 2011 as the company was in infancy. His tireless efforts has seen the set up and licensing of PAC Asset Management Limited (PACAM) and the floating of Five mutual funds including PACAM Balanced Fund, PACAM Money Market Fund, PACAM Fixed Income Fund, PACAM Equity Fund and PACAM Eurobond Fund. Dele facilitated the setup of a fixed income trading unit to complement the firm’s funds management mandate.',
            'He has also acquired fixed income trading experience. Before joining PAC Asset Management, he had worked with Xerox H.S. (Nigeria) Limited and Financial Derivatives Company Limited (FDC) as Equity/Fixed Income Analyst and subsequently as Portfolio Manager.',
            'His responsibilities covered equity research, Equity/Fixed Income portfolio management both in local and foreign currency instruments.'
        ],
    },

]

const Team = () => {
    return (
        <section className="h-[95vh] relative w-full bg-black">
            <div className="w-full h-full max-w-[90%] mx-auto" style={{ backgroundImage: `url(/construction.jpg)`, backgroundSize: 'cover' }}>
                <div className="bg-[#00000041] relative h-full w-full flex pt-20 gap-20 items-center justify-end">
                    <div className="absolute -bottom-[62px] -left-5 w-full max-w-[42%]  ">
                        <img src="/building.jpg" alt="building" className="w-full object-cover" />
                    </div>
                    <div className="w-full max-w-[53%] text-white bg-black px-14 py-20">
                        <h1 className="text-3xl font-light">BOARD OF DIRECTORS</h1>
                        <p className="text-xl font-light mt-5">The Board of Directors for PAC Asset Management Limited meets on a quarterly basis and is responsible for setting the Company’s strategic goals and evaluating overall business performance</p>
                    </div>
                </div>
                <div className="w-[550px] h-[140px] absolute -bottom-[62px] right-0 opacity-95 bg-primaryBlue">
                </div>
            </div>

            <div className='w-full max-w-max mx-auto py-40'>
                <h1 className='text-5xl'>BOARD OF DIRECTORS</h1>
                <p className='mt-10 text-3xl'>Our Board consist of highly accomplished and experienced professionals, providing a diversity of expertise, and understanding of the financial services industry.</p>

                <div className='grid grid-cols-3 mt-10 gap-10'>
                    {
                        team.map((item, index) => (
                            <div className='w-full h-full' key={index}>
                                <div className='w-full'><img src={`/${item.image}.jpg`} className='w-full  object-cover max-h-[200px]' /></div>
                                <div className='pt-5 px-6 pb-8 bg-black text-white'>
                                    <h2 className='text-2xl  uppercase text-[#e7e0e0]'>{item.name}</h2>
                                    <p className='h-[250px] text-xl  mt-4'>{item.desc[0]}</p>
                                    <button className='mt-10 py-3 px-4 border hover:bg-secondaryRed hover:text-white border-secondaryRed text-secondaryRed'>READ MORE</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Team