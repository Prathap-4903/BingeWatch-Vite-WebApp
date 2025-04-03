import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className='hidden md:flex gap-[232px]'>
        <div className='host-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
          <button onClick={handleHost} className='text-[20px] text-black font-geist-bold font-bold'>HOST</button>
        </div>
        <div className='join-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
          <button onClick={handleJoin} className='text-[20px] text-black font-geist-bold font-bold'>JOIN</button>
        </div>
      </div>

      {/* Mobile_Screen */}
      <div className='md:hidden flex m-4 gap-12 justify-center items-center '>
        <div className='host_btn size-[100px] flex justify-center items-center border-2 border-r-4 border-b-4 border-solid border-black rounded-full '>
          <button onClick={handleHost} className='text-[16px] font-geist-bold '>HOST</button>
        </div>
        <div className='join_btn size-[100px] flex justify-center items-center border-2 border-r-4 border-b-4 border-solid border-black rounded-full '>
          <button onClick={handleJoin} className='text-[16px] font-geist-bold '>JOIN</button>
        </div>
      </div>
    </>
  )
}

export default Buttons;