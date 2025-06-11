import React from "react";
import { FaInstagram, FaLinkedin, FaX } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { footerData } from "../utils/data";
import { Link } from "react-router-dom";
import { useDisclosure } from "../hooks/useDisclosure";
import NdprModal from "./Modals/NdprModal";

const Footer = () => {
  const ndprModal = useDisclosure()

  return (
    <footer className="relative px-7 md:px-5 pt-[97px] bg-primaryBlue text-white border-t-[1px] border-[#EFF0F6]">
      <div className="absolute -top-10 right-0 bg-primarygray h-20 w-full max-w-[80%] md:max-w-[50%]"></div>
      <article className="flex flex-col">
        <section className="max-w-max flex flex-col md:flex-row gap-10 md:gap-20 pb-[22px] w-full  mx-auto text-center sm:flex justify-between">
          <div className="flex flex-col mb-12">
            {/* <span><Logocolored />logo</span> */}
            <Link to={'/'} className='text-4xl  text-left font-bold'><img src="/logowhite.svg" alt="logo" className='w-full max-w-[280px]' /></Link>

            <p className="md:w-[310.36px] mt-[28px] mb-6  text-left text-xl font-normal font-['DM Sans'] leading-[30px]">
              PAC Asset Management offers a wide range of investment advice, products and services, including brokerage; retirement accounts, ETFs, online trading & more.
            </p>
            <div className="flex gap-[22px] text-[20px] text-primaryPurple items-center">
              <a href="https://www.linkedin.com/company/pac-asset-management" target="_blank">
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/pacassetmanagement?igsh=MXAzeWRsYmp2bGxnZQ=="
                target="_blank"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="text-left grid grid-cols-1 w-full md:max-w-[60%] justify-between  mb:grid-cols-2 md:flex gap-[35px] md:gap-y-[36px] gap-x-[36px] lg:gap-x-0  md:gap-[49px] ">
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
        <div className="py-[25px] border-t-[1px] border-[#D9DBE9] mx-auto w-full max-w-[1300px] flex flex-col sm:flex-row gap-10 items-center">
          <span className="w-fit  text-lg font-normal font-dm_sans  leading-[30px]">
            Copyright © {new Date().getFullYear()} PAC Asset Management
          </span>
          <span onClick={ndprModal.open} className="cursor-pointer text-secondaryBlue font-medium text-lg">NDPR</span>
        </div>
      </article>

      {ndprModal.isOpen && <NdprModal modal={ndprModal} />}
    </footer>
  );
};

export default Footer;
