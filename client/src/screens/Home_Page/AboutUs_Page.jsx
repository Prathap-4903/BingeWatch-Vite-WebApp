import React from 'react';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import AboutBg from "@/assets/background/about1.jpg";

const AboutUs_Page = () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col'>
        <div className="flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
          <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
          <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
        </div>
        <div className='w-full flex justify-center mt-20 p-8'>
          <div className='flex gap-6 border border-solid border-[#c9c9c9] rounded-[10px] p-4 '>
            <img src={AboutBg} alt="About BG" className='w-96 h-[360px] rounded-[8px]' />
            <div className='flex flex-col gap-4'>
              <h1 className='font-geist-bold text-[32px] text-center'>Our Story</h1>
              <p className='font-geist-medium text-[16px] w-[450px] text-justify'>Welcome to our Watch Party WebApp! I'm a student on a mission to blend my love for film with my growing skills in web development. This project is an exciting journey of learning and problem-solving. I'm building this platform to address some of the limitations I've encountered in other watch party apps, aiming for a smoother, more intuitive, and enjoyable experience for everyone. Your support and feedback fuel my determination to see this project through and create something truly valuable.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs_Page;