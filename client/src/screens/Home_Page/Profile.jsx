import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nagi from "../../assets/icons/nagi.jpg"

const Profile = () => {

  const navigate = useNavigate();

  function gotosignin() {
    navigate('/sign-in')
  }

  return (
    <>
        <div className='flex flex-wrap gap- items-center justify-center gap-6'>
            <div>
                <button onClick={gotosignin} className="text-[13px] font-geist-bold font-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500">LOGOUT</button>
            </div>
            <div className="profile-container h-11 w-11 rounded-full bg-black cursor-pointer">
                <img src={Nagi} alt="Pic" className='rounded-full' />
            </div>
        </div>
    </>
  )
}

export default Profile