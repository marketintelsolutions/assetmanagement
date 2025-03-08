import { CiLocationOn } from "react-icons/ci";

export const services = [
    {
        icon: 'fund',
        coloredIcon: 'fundc',
        heading: 'Mutual Funds',
        image: 'mutualfunds',
        text: 'Our mutual funds are registered with the Securities and Exchange Commission and tailored to meet diverse investor goals, allowing you to build a well-balanced portfolio across various asset classes.',
        items: [
            {
                icon: 'balance',
                heading: 'PACAM BALANCED FUND',
                text: 'This Fund invests in a combination of equities and fixed income instruments giving you a chance to maximize the benefits across these asset classes. The Fund allocation model emphasizes diversification and stability of investment using fixed income asset class to balance out the volatility of equity investments whilst maximizing benefits of both asset classes.',
                image: 'building'
            },
            {
                icon: 'equity',
                heading: 'PACAM Equity Fund',
                text: 'PACAM Equity Fund is a pure equity fund that invests your money predominantly in a portfolio of Nigerian companies, using a rigorous research-based system. The fund provides long-term capital preservation by investing at least 75% of the fund’s assets in a diversified portfolio of high-quality companies listed on the Nigerian Stock Exchange. To manage liquidity, the fund may also invest up to 23% in short-term money market instruments.',
                image: 'building'
            },
            {
                icon: 'fixed',
                heading: 'PACAM Fixed Income Fund',
                text: 'PACAM Fixed Income Fund invests in Fixed Income instruments such as FGN Bonds, Sub National Bonds, Corporate Bonds and other investment grade ﬁxed income instruments giving investors opportunity to invest in secure and high yielding Bonds offered by Federal and State Governments of Nigeria and large Corporates.',
                image: 'building'
            },
            {
                icon: 'market',
                heading: 'PACAM Money Market Fund',
                text: 'The PACAM Money Market Fund invests in high-quality short-term Money Market securities such as Treasury Bills, Bank Placements, Commercial Papers, and other money market instruments.',
                image: 'building'
            },
            {
                icon: 'euro',
                heading: 'PACAM Eurobond Fund',
                text: 'This Fund invests in Fixed Income instruments such as FGN Bonds, Sub National Bonds, Corporate Bonds, and other investment grade Fixed income instruments giving investor’s opportunity to Invest in secure and high yielding Bonds offered by Federal and State Governments of Nigeria and large Corporates.',
                image: 'building'
            },
        ]
    },
    {
        icon: 'trading',
        coloredIcon: 'tradingc',
        heading: 'Fixed Income Trading',
        text: 'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.',
    },
    {
        icon: 'wealth',
        coloredIcon: 'wealthc',
        heading: 'Wealth Management',
        text: 'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs.',
    },
    {
        icon: 'investment',
        coloredIcon: 'investmentc',
        heading: 'Alternative Investment',
        text: 'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.',
    },
]
export const careers = [
    {
        icon: 'fund',
        heading: 'LIFE AT PAC ASSET MANAGEMENT',
        text: ['Life at PAC Asset Management is driven by a shared passion for innovation, teamwork, and growth. We’re dedicated to creating an environment where each team member feels valued, empowered, and motivated to bring their best ideas forward. Our culture promotes collaboration, continuous learning, and the pursuit of excellence across all departments.',
            "Whether it's through exciting tasks, professional development opportunities, or team-building events, we strive to ensure that everyone feels both challenged and supported. Here, you’ll find a balance between hard work and fun—where success is celebrated, and every contribution is recognized.",
            "Join us and be part of a community where you can grow your career, achieve your goals, and make a real impact."
        ],
        image: 'careerbg',
    },
    {
        icon: 'trading',
        heading: 'CULTURE',
        text: ['Our work culture is built on a foundation of respect, collaboration, and continuous improvement. We believe that when people feel valued and empowered, they’re inspired to do their best work. Open communication, transparency, and mutual support are at the heart of our daily interactions, creating an environment where ideas can flourish, and innovation thrives.',
            "At PAC Asset Management, we celebrate diversity and value each team member's unique perspective, fostering a sense of belonging and shared purpose. We emphasize work-life balance, professional growth, and a commitment to achieving excellence together. This culture not only drives our success but also makes the company a place where people are excited to grow and make a difference."
        ],
        image: 'culture',
    },
    {
        icon: 'wealth',
        heading: 'PAC ACADEMY',
        text: ['Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam cupiditate atque doloremque tempora iste, accusamus nobis impedit, porro exercitationem tempore dolorem nam quaerat labore sint amet harum quas reiciendis consequuntur?'],
        image: 'academy',
    },
    {
        icon: 'investment',
        heading: 'JOB POSTING',
        text: ['We recruit experienced professionals whenever opportunities arise. If you have expertise in investment management, fund operations, sales, or relationship management, please submit your resume to'],
        image: 'job',
    },
]

export const navData = [
    {
        text: 'ABOUT US',
        items: [
            {
                heading: 'ABOUT US',
                links: [
                    {
                        text: 'What we do',
                        path: '/about'
                    },

                    {
                        text: 'Team',
                        path: '/team'
                    },
                ]
            }
        ]
    },
    {
        text: 'SERVICES',
        path: '/services',
        items: [
            {
                heading: 'SERVICES',
                links: [
                    {
                        text: 'Mutual Funds',
                        path: '/services/mutual-funds'
                    },
                    {
                        text: 'Fixed Income Trading',
                        path: '/services/fixed-income-trading'
                    },
                    {
                        text: 'Wealth Management',
                        path: '/services/wealth-management'
                    },
                    {
                        text: 'Alternative Investment',
                        path: '/services/alternative-investment'
                    },
                ]
            }
        ]
    },
    {
        text: 'INSIGHTS',
        items: [
            {
                heading: 'RESEARCH',
                links: [
                    {
                        text: 'Daily Market',
                        path: 'https://pacresearch.org/#/resources/daily%20financial%20market%20record',
                        external: true
                    },
                    {
                        text: 'Sectorial Report',
                        path: 'https://pacresearch.org/#/resources/sectoral%20report',
                        external: true
                    },
                ]
            },
            {
                heading: 'RESOURCES',
                links: [
                    {
                        text: 'Fund Manager',
                        path: '/insights/fund-manager'
                    },
                    {
                        text: 'FAQS',
                        path: '/insights/faqs'
                    },
                    {
                        text: 'Fund Calculator',
                        path: '/insights/fund-calculator'
                    },
                ]
            }
        ]
    },
    {
        text: 'CAREERS',
        path: '/careers',
        items: [
            {
                heading: 'CAREERS',
                links: [
                    {
                        text: 'PAC Asset Management',
                        path: '/careers'
                    },
                    // {
                    //     text: 'Life At PAC Asset Management',
                    //     path: '/careers/Life-At-PAC-Asset-Management'
                    // },
                    // {
                    //     text: 'Culture',
                    //     path: '/careers/culture'
                    // },
                    // {
                    //     text: 'PAC Academy',
                    //     path: '/careers/PAC-ACADEMY'
                    // },
                    // {
                    //     text: 'Job Posting',
                    //     path: '/careers/Job-Posting'
                    // },
                ]
            }
        ]
    },
    {
        text: 'CONTACT',
        path: '/contact'
    },
]


// export const services = [
//     {
//         name:'',

//     }
// ]

export const footerData = [
    {
        heading: "Services",
        items: [
            {
                text: "Mutual Fund",
                path: "services/mutual-funds",
                icon: false,
            },
            {
                text: "Fixed Income Trading",
                path: "services/fixed-income-trading",
                icon: false,
            },
            {
                text: "Wealth Management",
                path: "services/wealth-management",
                icon: false,
            },
            {
                text: "Alternative Investment",
                path: "services/alternative-investment",
                icon: false,
            },
        ],
    },
    {
        heading: "Useful Links",
        items: [
            {
                text: "About",
                path: "about",
                icon: false,
            },
            {
                text: "Contact us",
                path: "contact",
                icon: false,
            },
        ],
    },

    {
        heading: "Contact us",
        items: [

            {
                text: "Plot 8A, Elsie Femi Pearse, Off Adeola Odeku, Victoria Island, Lagos.",
                icon: CiLocationOn,
                path: "",
            },
        ],
    },
];

export const fundManagerReports = [
    {
        title: '2022 Reports',
        items: [
            {
                title: 'December 2022 Fund Manager Report',
                file: 'dec2022'
            },
            {
                title: 'November 2022 Fund Manager Report',
                file: 'nov2022'
            },
            {
                title: 'October 2022 Fund Manager Report',
                file: 'oct2022'
            },
            {
                title: 'September 2022 Fund Manager Report',
                file: 'sep2022'
            },
            {
                title: 'August 2022 Fund Manager Report',
                file: 'aug2022'
            },
            {
                title: 'July 2022 Fund Manager Report',
                file: 'jul2022'
            },
            {
                title: 'June 2022 Fund Manager Report',
                file: 'jun2022'
            },
            {
                title: 'May 2022 Fund Manager Report',
                file: 'may2022'
            },
            {
                title: 'April 2022 Fund Manager Report',
                file: 'apr2022'
            },
            {
                title: 'March 2022 Fund Manager Report',
                file: 'mar2022'
            },
            {
                title: 'February 2022 Fund Manager Report',
                file: 'feb2022'
            },
            {
                title: 'January 2022 Fund Manager Report',
                file: 'jan2022'
            },
        ]
    },
    {
        title: '2021 Reports',
        items: [
            {
                title: 'December 2021 Fund Manager Report',
                file: 'dec2021'
            },
            {
                title: 'November 2021 Fund Manager Report',
                file: 'nov2021'
            },
            {
                title: 'October 2021 Fund Manager Report',
                file: 'oct2021'
            },
            {
                title: 'September 2021 Fund Manager Report',
                file: 'sep2021'
            },
            {
                title: 'August 2021 Fund Manager Report',
                file: 'aug2021'
            },
            {
                title: 'July 2021 Fund Manager Report',
                file: 'jul2021'
            },
            {
                title: 'June 2021 Fund Manager Report',
                file: 'jun2021'
            },
            {
                title: 'May 2021 Fund Manager Report',
                file: 'may2021'
            },
            {
                title: 'April 2021 Fund Manager Report',
                file: 'apr2021'
            },
            {
                title: 'March 2021 Fund Manager Report',
                file: 'mar2021'
            },
            {
                title: 'February 2021 Fund Manager Report',
                file: 'feb2021'
            },
            {
                title: 'January 2021 Fund Manager Report',
                file: 'jan2021'
            },
        ]
    },
    {
        title: '2020 Reports',
        items: [
            {
                title: 'December 2020 Fund Manager Report',
                file: 'dec2020'
            },

            {
                title: 'September 2020 Fund Manager Report',
                file: 'sep2020'
            },
            {
                title: 'August 2020 Fund Manager Report',
                file: 'aug2020'
            },
            {
                title: 'July 2020 Fund Manager Report',
                file: 'jul2020'
            },
            {
                title: 'June 2020 Fund Manager Report',
                file: 'jun2020'
            },

        ]
    },
    {
        title: '2019 Reports',
        items: [
            {
                title: 'September 2019 Fund Manager Report',
                file: 'sep2019'
            },

            {
                title: 'May 2019 Fund Manager Report',
                file: 'may2019'
            },

            {
                title: 'February 2019 Fund Manager Report',
                file: 'feb2019'
            },
            {
                title: 'January 2019 Fund Manager Report',
                file: 'jan2019'
            },
        ]


    },
]

export const team = [
    {
        image: 'building',
        name: 'Chris Oshiafi',
        slug: 'chris-oshiafi',
        desc: [
            'Mr. Oshiafi has over two decades of experience in Structured Finance, Consulting, Investment Banking and Venture Capital/Private Equity. He holds a 2nd Class (Upper Division) in Accounting & Finance from the University of London and Master of Business Administration degree from the Universisty of Lagos.',
            'He is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), an Associate of the Chartered Insurance Institute of London, (ACII) UK and Chartered Institute of Taxation of Nigeria (ACIT). He also attended various programmes at the prestigious Columbia Business School, New York, United States and INSEAD Business School, Fontainebleau, France, the IESE Business School in Barcelona, Spain and the Chief Executive Programme (CEP 17) Class of the Lagos Business School.',
            'He was the Pioneer Managing Director/CEO of Truebond Investments & Capital Limited, a Company with diverse interests in Oil & Gas, Telecommunications, Power and the Capital Markets. He has also worked with the firm of Damitop Consulting Limited as Managing Partner where he worked on number of World Bank projects for the Federal and several State Governments. He served as Executive Director (Investment Banking) of Citizens International Bank (now Enterprise Bank Limited) until his appointment as the pioneer Chief Executive Officer of PanAfrican Capital Plc.'
        ],
    },
    {
        image: 'building',
        name: 'Sina Alimi',
        slug: 'sina-alimi',
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
        slug: 'eric-okoruwa',
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
        slug: 'dele-ige',
        desc: [
            'Dele holds an MBA in Finance (University of Mysore, India) he is also an Associate of Institute of Chartered Accounts of Nigeria (ICAN).',
            'He has more than 13 years working experience in Asset/Investment Management, having worked as an Investment Advisor, Equity Analyst, Credit Analyst, Fixed Income Trader, Portfolio Manager and Client Relationship Manager.',
            'He joined PAC Asset Management Limited in 2011 as the company was in infancy. His tireless efforts has seen the set up and licensing of PAC Asset Management Limited (PACAM) and the floating of Five mutual funds including PACAM Balanced Fund, PACAM Money Market Fund, PACAM Fixed Income Fund, PACAM Equity Fund and PACAM Eurobond Fund. Dele facilitated the setup of a fixed income trading unit to complement the firm’s funds management mandate.',
            'He has also acquired fixed income trading experience. Before joining PAC Asset Management, he had worked with Xerox H.S. (Nigeria) Limited and Financial Derivatives Company Limited (FDC) as Equity/Fixed Income Analyst and subsequently as Portfolio Manager.',
            'His responsibilities covered equity research, Equity/Fixed Income portfolio management both in local and foreign currency instruments.'
        ],
    },

]