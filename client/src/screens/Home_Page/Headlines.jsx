import React from 'react';

const Headlines = () => {
  return (
    <>
      <div className='bg-white/50 backdrop-blur w-[527px] h-[300px] -mt-4 -mr-[3px] hidden md:flex flex-col justify-center items-center rounded-[5px]'>
        <h1 className='font-geist-bold font-bold text-[40px] '>Why Watch Alone?</h1>
        <h1 className='font-geist-bold font-bold text-[40px] -mt-3 '>Binge Watch Together!</h1>
        <p className='font-geist-semi font-semibold text-[20px] -mt-1 '>"Make Binge-Worthy Moments With Your Homies"</p>
      </div>

      {/* Mobile_Screen */}
      <div className='main_part_mob md:hidden w-full '>
        <div className='bg_img w-full h-52 bg-[url("@/assets/illustration/Background_Illustration.jpg")] bg-cover flex justify-center '>
          <div className='head_bg bg-white/60 backdrop-blur w-auto h-[100px] mt-3 flex justify-center items-center rounded-[8px] '>
            <div className='head_txt_container flex flex-col justify-center items-center '>
              <h1 className='font-geist-bold text-[14px] '>Why Watch Alone?</h1>
              <h1 className='font-geist-bold whitespace-nowrap text-[14px] '>Binge Watch Together!</h1>
              <p className='font-geist-semi whitespace-nowrap text-[8px] '>"Make Binge-Worthy Moments With Your Homies"</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Headlines;