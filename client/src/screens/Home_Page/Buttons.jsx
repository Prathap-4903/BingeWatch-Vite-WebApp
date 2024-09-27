import React from 'react'

const Buttons = () => {
  return (
    <>
        <div className='flex gap-[232px]'>
            <div className='host-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
                <h1 className='text-[20px] text-black font-geist-bold font-bold'>HOST</h1>
            </div>
            <div className='join-btn h-[150px] w-[150px] bg-white border-solid border-[2.75px] border-r-[5px] border-b-[5px] border-black rounded-full flex text-center justify-center items-center cursor-pointer'>
                <h1 className='text-[20px] text-black font-geist-bold font-bold'>JOIN</h1>
            </div>
        </div>
    </>
  )
}

export default Buttons