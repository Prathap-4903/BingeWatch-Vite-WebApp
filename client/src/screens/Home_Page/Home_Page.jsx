import React from 'react'
import "./Home_Styles.css";
import LogoMonkey from "../../assets/icons/monkey-icon-b.png";
import LogoText from "../../assets/icons/BingeWatch Text Black.png";

const Home_Page = () => {
  return (
    <>
    <div className="logo-container flex items-center justify-between p-2">
        <div className="flex ">
            <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
            <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
        </div>
        <div className="flex items-center space-x-3 mr-1">
            <button className="text-[12px] font-geist-bold font-semibold px-[6px] py-[5px] bg-black text-white border-solid border-2 rounded-[8px] border-black">LOGOUT</button>
            <div className="profile-container h-9 w-9 rounded-full bg-black"></div>
        </div>
    </div>

    </>
  )
}

export default Home_Page