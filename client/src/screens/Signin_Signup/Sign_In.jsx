import React, { useState } from "react";
import "./Login_Styles.css";
//import { Eye } from '@geist-ui/icons'
//mport Eye from '@geist-ui/icons/eye';
//import Eyeoff from '@geist-ui/icons/eyeoff';
import LockLogo from "../../assets/icons/lock_png.png";
import LogoMonkey from "../../assets/icons/monkey-icon-b.png";
import LogoText from "../../assets/icons/BingeWatch Text Black.png";
import GoogleLogo from "../../assets/icons/logo-google.svg"

const Sign_In = () => {

  return (
    <>
      {/*<h1 className='font-geist-medium text-[250px] tracking-tighter'>Geist.</h1>*/}
      <div className="logo-container flex cursor-pointer">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-2 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-3" />
      </div>

      <div className="login-screen flex justify-center items-center h-screen">
        <div className="login-container bg-transparent border-r-[5px] border-b-[5px] pt-4 px-4 pb-4 border-black rounded-3xl border-[2.5px] space-y-2 mx-10 min-w-[340px] w-[500px]">
          <h1 className="font-geist-bold text-2xl">Login</h1>
          <p className="font-geist-medium font-[375] ">Grab Your Popcorn and Join The Party!</p>
          <div className="input-body flex flex-wrap space-y-3 justify-center items-center w-full">
            <div className="flex flex-wrap space-y-3 w-full">
              <div className="input-container space-y-3 w-full">
                <div className="w-full space-y-1">
                  <label htmlFor="floating_outlined_e" className="font-geist-semi">Enter Email : </label>
                  <div className="relative w-full">
                    <input type="text" id="floating_outlined_e" className="block w-full font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
                    <label htmlFor="floating_outlined_e" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                  </div>
                </div>
                <div className="w-full space-y-1">
                  <label htmlFor="floating_outlined_p" className="font-geist-semi">Enter Password : </label>
                  <div className="relative w-full">
                    <input type="password" id="floating_outlined_p" className="block w-full font-geist-medium px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
                    <label htmlFor="floating_outlined_p" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                    <div className="absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none">
                      <div className="flex items-end justify-end justify-items-end">
                        <img src={LockLogo} alt="" className="h-6 w-6" />
                      </div>
                        
                      </div>
                  </div>
                </div>
              </div>
              <div className="button-container flex flex-col flex-wrap space-y-3 justify-center w-full">
                <button className="font-geist-medium font-thin underline text-[14px] bg-transparent hover:scale-[1.025] ease-in-out">Don't have an account? Click Here to Sign Up!</button>
                <button className="font-geist-bold text-white bg-black border-2 border-black py-1 rounded-xl hover:bg-white hover:text-black hover:scale-100 hover:border-r-4 hover:border-b-4">Sign In</button>
                <button className="flex justify-center gap-2 font-geist-semi border-2 font-medium border-black py-1 rounded-xl bg-transparent hover:border-r-4 hover:border-b-4">
                  <img src={GoogleLogo} alt="" className="h-5 w-5 mt-[1.7px]" />
                  <span>Sign In With Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
