import React from 'react'
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
    <div>
      
    </div>
      
    </>
  )
}

export default Sign_In