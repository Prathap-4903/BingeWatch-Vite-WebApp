import React, { useState } from "react";
import "./Signup_Styles.css";
import GlassOn from "../../../assets/icons/glass-on.png";
import GlassOff from "../../../assets/icons/glass-off.png";
import LogoMonkey from "../../../assets/icons/monkey-icon-b.png";
import LogoText from "../../../assets/icons/BingeWatch Text Black.png";
import GoogleLogo from "../../../assets/icons/logo-google.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import axios from '../../../axios';

const Sign_up = () => {

  const[glass, setGlass] = useState(GlassOn)
  const[glassc, setGlassc] = useState(GlassOn)

  const navigate = useNavigate()

  const handleGlass = () => {
    glass == GlassOn ? setGlass(GlassOff) : setGlass(GlassOn)
  }

  const handleGlassc = () => {
    glassc == GlassOn ? setGlassc(GlassOff) : setGlassc(GlassOn)
  }

  function gotologin() {
    navigate("/sign-in")
  }

  const [name, setName] = useState('');
  const[username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:5000/auth/sign-up', { name, username, email, password, confirm_password });
        navigate("/sign-in");
    } catch(err){
        console.log(err);
    }
  };


  return (
    <>
      <div className="logo-container flex cursor-pointer">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-2 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-3" />
      </div>

      <form action="" onSubmit={handleSubmit} method="post">
        <div className="login-screen flex justify-center items-center h-screen">
        <div className="login-container flex flex-col max-h-[451px] bg-transparent border-r-[5px] border-b-[5px] pt-4 px-4 pb-4 border-black rounded-3xl border-[2.5px] space-y-2 mx-10 min-w-[340px] w-[500px]">
          <h1 className="font-geist-bold text-2xl">Signup</h1>
          <p className="font-geist-medium font-[375] ">Grab Your Popcorn and Join The Party!</p>
          <div className="input-body flex flex-wrap space-y-3 mb-3 justify-center items-center w-full flex-grow overflow-y-scroll hide-scrollbar">
            <div className="flex flex-wrap space-y-3 w-full mb-2">
              <div className="input-container space-y-3 w-full">
              <div className="w-full space-y-1">
                <label htmlFor="name" className="font-geist-semi">Enter Name : </label>
                <div className="relative w-full">
                    <input required type="text" id="name" className="block w-full font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2  peer focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black placeholder-transparent" placeholder="" onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="username" className="font-geist-semi">Enter Username : </label>
                <div className="relative w-full">
                  <input required type="text" id="username" className="block w-full font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2  peer focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black placeholder-transparent" placeholder="" onChange={(e) => setUsername(e.target.value)} />
                  <label htmlFor="username" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="email" className="font-geist-semi">Enter Email : </label>
                <div className="relative w-full">
                  <input required type="text" id="email" className="block w-full font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" onChange={(e) => setEmail(e.target.value)} />
                  <label htmlFor="email" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="password" className="font-geist-semi">Enter Password : </label>
                <div className="relative w-full">
                  <input required type="password" id="password" className="block w-full font-geist-medium font-medium px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" onChange={(e) => setPassword(e.target.value)} />
                  <label htmlFor="password" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                  <div className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer">
                    <div className="flex items-end justify-end justify-items-end">
                      <img onClick={handleGlass} src={glass} alt="" className="h-[42px] w-[42px]" />
                    </div>
                    </div>
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="confirm_password" className="font-geist-semi">Confirm Password : </label>
                <div className="relative w-full">
                  <input required type="password" id="confirm_password" className="block w-full font-geist-medium font-medium px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" onChange={(e) => setConfirmPassword(e.target.value)} />
                  <label htmlFor="confirm_password" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
                  <div className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer">
                    <div className="flex items-end justify-end justify-items-end">
                      <img onClick={handleGlassc} src={glassc} alt="" className="h-[42px] w-[42px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap space-y-1 w-full">
              <label htmlFor="picture" className="font-geist-semi left-1 justify-start items-start">Upload Profile Picture : </label>
                  <label htmlFor="picture" className="flex flex-col items-center justify-center w-full h-24 border-2 border-black border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-black dark:text-black font-geist-semi font-semibold"><span className="font-geist-medium font-thin">Click To Upload</span> or Drag And Drop</p>
                          <p className="text-xs text-black font-geist-medium font-thin">JPG/PNG (MAX. 800x400px)</p>
                      </div>
                      <input id="picture" type="file" className="hidden" />
                  </label>
              </div> 

            </div>
          </div>
          </div>
          <div className="button-container flex flex-col flex-wrap space-y-3 justify-center w-full">
            <button onClick={gotologin} className="font-geist-medium font-thin underline text-[13px] bg-transparent hover:scale-[1.025] ease-in-out">Already have an account? Click Here to Sign In!</button>
            <button type="submit" className="font-geist-bold text-white bg-black border-2 border-black py-1 rounded-xl hover:bg-white hover:text-black hover:scale-100 hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">Sign Up</button>
            <button className="flex justify-center gap-2 font-geist-semi border-2 font-medium border-black py-1 rounded-xl bg-transparent hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">
              <img src={GoogleLogo} alt="" className="h-5 w-5 mt-[1.7px]" />
                <span>Sign Up With Google</span>
            </button>
          </div>
        </div>
      </div>
      </form>
      
    </>
  )
}

export default Sign_up