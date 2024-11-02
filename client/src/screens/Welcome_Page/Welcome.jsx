import React from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Welcome = () => {

  const navigate = useNavigate();
  const handleWelcome = () => {
    navigate("/sign-in");
  }


  return (
    <>
    <div className='Main-Screen w-full h-screen flex flex-col gap-4 justify-center items-center'>
        <h1 className='font-geist-bold text-[24px]'>Welcome To BingeWatch - Stream Movies With Friends!</h1> 
        <Button onClick={handleWelcome}>Get Started</Button>
    </div>
        
    </>
  )
}

export default Welcome