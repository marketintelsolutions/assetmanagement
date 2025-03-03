import { CiLocationOn } from "react-icons/ci";

export const services = [
    {
        icon: 'fund',
        heading: 'Mutual Funds',
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
        heading: 'Fixed Income Trading',
        text: 'We offer fixed income portfolio management service to our client who wish to participate in the Fixed Income Markets locally and internationally.',
    },
    {
        icon: 'wealth',
        heading: 'Wealth Management',
        text: 'Our wealth management solutions deliver lifestyle management and diversified investment opportunities bespoke to each client’s needs, by providing them with cutting edge Investment Advisory and Portfolio Management Services premised on sound research and information.',
    },
    {
        icon: 'investment',
        heading: 'Alternative Investment',
        text: 'Alternative Investment enables our clients to invest in non-conventional asset classes such as commodities, real estate and other investment with special characteristics.',
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
                heading: 'INSIGHTS',
                links: [
                    {
                        text: 'Research',
                        path: '/insights/research'
                    },
                    {
                        text: 'Resources',
                        path: '/insights/resources'
                    },
                ]
            }
        ]
    },
    {
        text: 'CAREERS',
        items: [
            {
                heading: 'CAREERS',
                links: [
                    {
                        text: 'Life At PAC Asset Management',
                        path: '/careers/Life-At-PAC-Asset-Management'
                    },
                    {
                        text: 'Culture',
                        path: '/careers/culture'
                    },
                    {
                        text: 'PAC Academy',
                        path: '/careers/PAC-ACADEMY'
                    },
                    {
                        text: 'Job Posting',
                        path: '/careers/Job-Posting'
                    },
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
                path: "services/mutual-fund",
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