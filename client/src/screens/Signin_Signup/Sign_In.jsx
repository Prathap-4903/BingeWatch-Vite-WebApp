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

    <div className='flex justify-center items-center h-screen flex-col'>

      <div className='bg-white p-8 border-black rounded-3xl border-2'>

      <div className="flex">
        <label className="scale-[.60]">
          <input required type="text" className="peer h-[80px] w-[400px] px-6 text-[26px] bg-white font-geist-medium font-[300] border-2 rounded-lg border-black outline-none"/>
          <span className="input-text absolute font-geist-semi text-[25px] text-black absolute left-0 top-5 mx-6 px-2 transition-all duration-200 ease-in-out transform ">Email</span>
        </label>
      </div>

      <div className="flex">
        <label className="scale-[.60]">
          <input required value={maskedPassword} onChange={handlePasswordChange} type="text" className="peer h-[80px] w-[400px] px-6 pt-[15px] text-[30px] bg-white font-geist-medium font-[300] border-2 rounded-lg border-black outline-none"/>
          <span className="input-password absolute font-geist-semi text-[25px] text-black absolute left-0 top-5 mx-6 px-2 transition-all duration-200 ease-in-out transform ">Password</span>
        </label>
      </div>

      </div>

    </div>
    
    
    </>
  )
}

export default Sign_In