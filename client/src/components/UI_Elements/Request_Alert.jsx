import React from 'react';

const Request_Alert = () => {
  return (
    <>
      <div className='req-screen w-full h-screen flex justify-end items-end '>
        <div className='req-container w-96 h-auto m-10 flex flex-col px-4 py-4 gap-4 border border-solid border-[#c9c9c9] rounded-xl '>
          <div>
            <h1 className='text-[23px] font-bold'>Join Requests</h1>
          </div>
          <div>
            <p className='text-[16px] font-semibold'>User Wants To Join The Stream..</p>
          </div>
          <div className='flex space-x-5 justify-center'>
            <button className='bg-[#010101] text-white rounded-xl px-[10px] py-[8px] w-full cursor-pointer hover:bg-[#212121] '>Decline</button>
            <button className='border border-solid border-[#c9c9c9] rounded-xl px-[10px] py-[8px] w-full cursor-pointer hover:bg-[#f0f0f0] '>Accept</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Request_Alert;