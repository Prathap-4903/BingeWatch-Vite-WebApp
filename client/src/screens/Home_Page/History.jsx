import React from 'react';

const History = () => {
  return (
    <>
      <div className='hidden md:flex bg-white w-full h-64 mt-10 mr-5 mx-3 my-4 items-baseline justify-center border-solid border-[3px] border-r-[5px] border-b-[5px] border-black rounded-xl '>
        <div className='flex w-full border-solid border-b-[3px] border-black items-center justify-center'>
          <h1 className='my-1 text-[16px] font-geist-bold font-semibold'>HISTORY</h1>
        </div>
      </div>

      {/* Mobile_Screen */}
      <div className='history_container md:hidden bg-white w-full h-auto flex justify-center items-center '>
        <div className='history_box w-72 h-52 mt-4 flex justify-center border-2 border-r-4 border-b-4 border-solid border-black rounded-[10px] '>
          <div className='w-full h-10 flex justify-center items-center border-b-2 border-solid border-black '>
            <h1 className='my-1 text-[14px] font-geist-bold font-semibold'>HISTORY</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default History;