import React from 'react'
import Nagi from "../../assets/icons/nagi.jpg"

const Profile = () => {
  return (
    <>
        <div className='flex flex-wrap gap- items-center justify-center gap-6'>
            <div>
                <button className="text-[13px] font-geist-bold font-semibold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black">LOGOUT</button>
            </div>
            <div className="profile-container h-11 w-11 rounded-full bg-black cursor-pointer">
                <img src={Nagi} alt="Pic" className='rounded-full' />
            </div>
        </div>
    </>
  )
}

export default Profile