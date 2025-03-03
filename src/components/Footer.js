import React from "react";
import { FaInstagram, FaX } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { footerData } from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative px-7 md:px-0 pt-[97px] bg-primaryBlue text-white border-t-[1px] border-[#EFF0F6]">
      <div className="absolute -top-10 right-0 bg-primarygray h-20 w-full max-w-[50%]"></div>
      <article className="flex flex-col">
        <section className="max-w-[1100px] flex gap-20 pb-[22px] w-full  mx-auto text-center sm:flex justify-between">
          <div className="flex flex-col mb-12">
            {/* <span><Logocolored />logo</span> */}
            <Link to={'/'} className='text-4xl  text-left font-bold'>PAC Asset</Link>

            <p className="w-[310.36px] mt-[28px] mb-6  text-left text-xl font-normal font-['DM Sans'] leading-[30px]">
              PAC Asset offers a wide range of investment advice, products and services, including brokerage ; retirement accounts, ETFs, online trading & more.
            </p>
            <div className="flex gap-[22px] text-[20px] text-primaryPurple items-center">
              <a href="https://x.com/vapzersignals?s=21" target="_blank">
                <RiTwitterXFill />
              </a>
              <a
                href="https://www.instagram.com/vapzer.ai?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="text-left grid grid-cols-1 mb:grid-cols-2 md:flex gap-y-[36px] gap-x-0  md:gap-[49px] ">
            {footerData.map((footerItem, index) => {
              return (
                <div key={index} className="flex flex-col gap-10">
                  <h2 className="uppercase text-xl font-bold font-dm_sans leading-snug">
                    {footerItem.heading}
                  </h2>
                  <div className=" flex flex-col gap-[12px] mb:gap-[18px]">
                    {footerItem.items.map((item, index) => {
                      let Icon = item.icon;
                      if (item.icon) {
                        return (
                          <p
                            className="max-w-[250px] flex h-5 items-start gap-[6px] text-wrap md:max-w-[257px]  text-base md:text-base font-normal font-dm_sans leading-tight"
                            key={index}
                          >
                            <span className="h-5 flex text-3xl">
                              <Icon />
                            </span>
                            {item.text}
                          </p>
                        );
                      }
                      return (
                        <Link
                          className="max-w-[250px] border-b pb-4 text-base md:text-base font-normal font-dm_sans leading-tight"
                          key={index}
                          to={`/${item.path}`}
                        >
                          {item.text}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="py-[25px] border-t-[1px] border-[#D9DBE9] mx-auto w-full flex flex-col sm:flex-row justify-between">
          <p className="  text-lg font-normal font-dm_sans text-left w-full max-w-[1100px] mx-auto leading-[30px]">
            Copyright © {new Date().getFullYear()} PAC Asset
          </p>

        </section>
      </article>
    </footer>
  );
};

export default Footer;
