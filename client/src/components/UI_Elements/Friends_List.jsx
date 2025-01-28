import React, { useState } from 'react';
import Nagi from '@/assets/icons/nagi.jpg';

const Friends_List = (props) => {
  const [picture, setPicture] = useState(props.picture);

  return (
    <>
      <div className='w-[70px] h-[75px] flex flex-col justify-center items-center font-geist-medium gap-2'>
        <div className='friends w-[50px] h-[50px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '>
          <img src={Nagi} alt="" className='rounded-full'/>
        </div>
        <p className='text-white text-[12px]'>{props.username}</p>
      </div>
    </>
  )
}

export default Friends_List;