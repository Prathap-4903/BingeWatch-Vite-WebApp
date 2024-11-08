import React from 'react'
import "./Stream.css";

const Stream_Interface = () => {
  return (
    <>
    <div className='stream-screen w-full h-screen bg-[#1a1a1a] flex justify-center items-center gap-[5px] p-[6px] '>
      <div className='left-part w-[800px] h-[669.45px] flex flex-col gap-[25px] flex-1 justify-center items-center bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] '>
        <div className='stream-video w-[895.56px] h-[480px] bg-[#1a1a1a] border-solid border-[1px] border-[#666] rounded-[25px] '></div>
        <div className='bottom-part flex w-[853.28px] h-[204px] '>
          <div className='bottom-left w-[652.39px] h-[204px] '>
            <div className='controls flex w-[489.04] h-[80px] bg-[#1f1f1f] gap-[125.18px] '>
              <div className='camera w-[60px] h-[60px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] '></div>
              <div className='mic w-[60px] h-[60px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] '></div>
              <div className='share-screen w-[60px] h-[60px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] '></div>
            </div>
            <div className='reactions w-[652.39px] h-[60px] bg-[#292929] rounded-[25px] border-solid border-[1px] border-[#666] '></div>    
          </div>
          <div className='bottom-right w-[159.12px] h-[204px] '>
            <div className='poll w-full h-[80px] bg-[#292929] rounded-[20px] border-solid border-[1px] border-[#666] '></div> 
            <div className='file w-full h-[80px] bg-[#292929] rounded-[20px] border-solid border-[1px] border-[#666] '></div> 
          </div>
        </div>
      </div>
      <div className='right-part w-[438px] h-[669.45px] bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] '>

      </div>
    </div>
    </>
  )
}

export default Stream_Interface