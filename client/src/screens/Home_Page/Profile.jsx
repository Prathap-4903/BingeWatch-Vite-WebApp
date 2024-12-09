import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nagi from "../../assets/icons/nagi.jpg";
import { useToast } from "../../hooks/use-toast";

const Profile = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    axios.get('http://localhost:5000/auth/verify', { withCredentials: true })
    .then(res => {
      if(res.data.status){
        //console.log(res.data);
        setUsername(res.data.user.username);
      } else {
        navigate('/sign-in')
      }
    })
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/sign-in');
          toast({
            title: "Sign_Out Done!",
            description: "We Miss You! Comeback Soon.",
          })
        }
      })
      .catch(err => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with logout.",
        })
        console.log(err);
      });
  }

  return (
    <>
      <div className='flex flex-wrap gap- items-center justify-center gap-6'>
        <div>
          <button
            onClick={handleLogout}
            className="text-[13px] font-geist-bold font-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500"
          >
            LOGOUT
          </button>
        </div>
        <div className="profile-container h-11 w-11 rounded-full bg-black cursor-pointer">
          {/* <p>{username}</p> */}
          <img src={Nagi} alt="Pic" className='rounded-full' />
        </div>
      </div>
    </>
  );
}

export default Profile;
