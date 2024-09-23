import React, { useState } from 'react'
import "./Login_Styles.css";
import LogoMonkey from "../../assets/icons/monkey-icon-b.png"
import LogoText from "../../assets/icons/BingeWatch Text Black.png"

const Sign_In = () => {

  const [password, setPassword] = useState("");  // Holds actual password
  const [maskedPassword, setMaskedPassword] = useState("");  // Holds asterisks

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;

    // Update the actual password by keeping track of each character typed
    setPassword((prevPassword) =>
      inputValue.length > prevPassword.length
        ? prevPassword + inputValue.slice(-1) // Add the new character
        : prevPassword.slice(0, inputValue.length) // Remove last character
    );

    setMaskedPassword("*".repeat(inputValue.length));
  };

  return (
    <>
    {/*<h1 className='font-geist-medium text-[250px] tracking-tighter'>Geist.</h1>*/}
    <div className="flex">
      <img src={LogoMonkey} alt="Logo" width="40" height="40" className='mt-2 ml-2'/>
      <img src={LogoText} width="180" height="34.32" className='mt-3'/>
    </div>

    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col bg-white pt-4 px-4 pb-4 border-black rounded-3xl border-[2.5px] space-y-2'>
        <h1 className='font-geist-bold text-2xl'>Login</h1>
        {/*<div className='absolute w-[35px] h-[4px] bg-black rounded-full'></div>*/}
        <p className='font-geist-medium font-[375] '>Grab Your Popcorn and Join The Party!</p>
        <div className='flex-col justify-center items-center'>
        <div className='flex flex-col space-y-3'>
          <div className='w-full space-y-1'>
            <label htmlFor="floating_outlined_e" className='font-geist-semi'>Enter Email : </label>
            <div class="relative w-full">
              <input type="text" id="floating_outlined_e" class="block font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
              <label for="floating_outlined_e" class="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
            </div>
          </div>
          <div className='w-full space-y-1'>
            <label htmlFor="floating_outlined_p" className='font-geist-semi'>Enter Password : </label>
            <div class="relative w-full">
              <input type="text" id="floating_outlined_p" class="block font-geist-medium px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
              <label for="floating_outlined_p" class="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            </div>
          </div>
          <button className='font-geist-bold text-white bg-black border-2 border-black py-1 rounded-xl'>Sign In</button>
        </div>
        
        
        </div>
      </div>
    </div>
    </>
  )
}

export default Sign_In