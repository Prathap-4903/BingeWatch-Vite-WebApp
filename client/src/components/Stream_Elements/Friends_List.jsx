import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Friends_List = (props) => {
  const [picture, setPicture] = useState('');

  useEffect(() => {
    if (props.Username && props.Username != null) {
      handleUserProfile();
    }
  }, [props.Username]);

  const handleUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/username/${props.Username}`, { withCredentials: true });
      if (response.data.status) {
        const userData = response.data.data;
        console.log(userData);
        setPicture(userData.picture);
      }
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className='friends_container flex flex-col justify-center items-center w-[70px] h-[75px] mx-4 rounded-lg p-1'>
        <img 
          src={picture} 
          alt="Profile-Pic" 
          className='w-[50px] h-[50px] bg-[#292929] border border-[#666] rounded-full'
        />
        <p className='text-white text-[12px] text-center font-geist-medium mt-1'>{props.Username}</p>
      </div>
    </>
  )
}

export default Friends_List;

/*
<div className='w-[70px] h-[75px] flex flex-col justify-center items-center font-geist-medium gap-2'>
  <div className='friends w-[50px] h-[50px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '>
    <img src={picture} alt="Profile-Pic" className='rounded-full'/>
  </div>
  <p className='text-white text-[12px]'>{props.Username}</p>
</div>
*/

/*
v2

<div className='friends_container bg-emerald-300 w-full h-full '>
  <div className='bg-red-300 w-[70px] h-[75px] grid grid-cols-3 gap-4 font-geist-medium '>
    <div className='friends w-[50px] h-[50px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '>
      <img src={picture} alt="Profile-Pic" className='rounded-full'/>
    </div>
    <p className='text-white text-[12px]'>{props.Username}</p>
  </div>
</div>
*/