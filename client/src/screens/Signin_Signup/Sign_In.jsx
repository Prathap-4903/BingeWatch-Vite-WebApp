import React from 'react'
import "./Login_Styles.css";
import LogoMonkey from "../../assets/icons/monkey-icon-b.png"
import LogoText from "../../assets/icons/BingeWatch Text Black.png"

const Sign_In = () => {
  return (
    <>
    {/*<h1 className='font-geist-medium text-[250px] tracking-tighter'>Geist.</h1>*/}
    <div className="flex">
      <img src={LogoMonkey} alt="Logo" width="40" height="40" className='mt-2 ml-2'/>
      <img src={LogoText} width="180" height="34.32" className='mt-3'/>
    </div>
    <div className="flex">
      <label className="scale-[.60]">
        <input type="text" className="h-[80px] w-[400px] px-6 text-[26px] bg-white font-geist-medium font-[300] border-2 rounded-lg border-black outline-none"/>
        <span className="input-text font-geist-semi text-[27px] text-black absolute left-0 top-5 mx-6 px-2 transition duration-200 ease-in-out rounded-3xl ">Email</span>
      </label>
    </div>
    </>
  )
}

export default Sign_In