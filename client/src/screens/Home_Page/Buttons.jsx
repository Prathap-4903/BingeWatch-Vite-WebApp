import React from 'react'
import { useNavigate } from "react-router-dom"

const Buttons = () => {

  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/join");
  }

  const handleHost = () => {
    navigate("/host");
  }

  return (
    <>
        <div className='flex gap-[232px]'>
            <div className='host-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
                <button onClick={handleHost} className='text-[20px] text-black font-geist-bold font-bold'>HOST</button>
            </div>
            <div className='join-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
                <button onClick={handleJoin} className='text-[20px] text-black font-geist-bold font-bold'>JOIN</button>
            </div>
        </div>
    </>
  )
}

export default Buttons