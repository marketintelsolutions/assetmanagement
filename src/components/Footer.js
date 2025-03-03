import React from "react";
import { FaInstagram, FaX } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { footerData } from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-7 md:px-0 pt-[97px] border-t-[1px] border-[#EFF0F6]">
      <article className="flex flex-col">
        <section className="max-w-max pb-[112px] w-full border-b-[1px] border-[#D9DBE9] mx-auto text-center sm:flex justify-between">
          <div className="flex flex-col mb-12">
            {/* <span><Logocolored />logo</span> */}
            <Link to={'/'} className='text-4xl  text-left font-bold'>PAC Asset</Link>

            <p className="w-[310.36px] mt-[28px] mb-6 text-[#6F6C90] text-left text-xl font-normal font-['DM Sans'] leading-[30px]">
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
          <div className="text-left grid grid-cols-1 mb:grid-cols-2 md:flex gap-y-[46px] gap-x-0  md:gap-[99px] ">
            {footerData.map((footerItem, index) => {
              return (
                <div key={index} className="flex flex-col gap-5 mb:gap-10">
                  <h2 className="text-[#170F49] text-xl font-bold font-dm_sans leading-snug">
                    {footerItem.heading}
                  </h2>
                  <div className="flex flex-col gap-[12px] mb:gap-[18px]">
                    {footerItem.items.map((item, index) => {
                      let Icon = item.icon;
                      if (item.icon) {
                        return (
                          <p
                            className="max-w-[250px] flex h-5 items-start gap-[6px] text-wrap md:max-w-[257px] text-[#6F6C90] text-base md:text-lg font-normal font-dm_sans leading-tight"
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
                          className="max-w-[250px] text-[#6F6C90] text-base md:text-lg font-normal font-dm_sans leading-tight"
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
        <section className="max-w-max py-[25px] mx-auto w-full flex flex-col sm:flex-row justify-between">
          <p className=" text-[#6F6C90] text-lg font-normal font-dm_sans leading-[30px]">
            Copyright © {new Date().getFullYear()} PAC Asset
          </p>
          <p className="text-left sm:text-right">
            <span className="text-[#6F6C90] text-lg font-normal font-dm_sans leading-[30px]">
              All Rights Reserved |{" "}
            </span>
            <span className="text-[#4A3AFF] text-lg font-normal font-dm_sans underline leading-[30px]">
              Terms and Conditions
            </span>
            <span className="text-[#6F6C90] text-lg font-normal font-dm_sans leading-[30px]">
              {" "}
              |{" "}
            </span>
            <span className="text-[#4A3AFF] text-lg font-normal font-dm_sans underline leading-[30px]">
              Privacy Policy
            </span>
          </p>
        </section>
      </article>
    </footer>
  );
};

export default Footer;
