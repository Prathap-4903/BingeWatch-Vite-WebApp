import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "../../hooks/use-toast";
// import Nagi from "../../assets/icons/nagi.jpg";

const Profile = () => {
  const [username, setUsername] = useState('');
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    handleVerify();
  }, []);

  const handleVerify = async () => {
    try{
      const response = await axios.get('http://localhost:5000/auth/verify', { withCredentials: true });
      if(response.data.status){
        //console.log(response.data.user.id);

        const userResponse = await axios.get(`http://localhost:5000/user/id/${response.data.user.id}`, { withCredentials: true });
        if(userResponse.data.status){
          const userData = userResponse.data.data;
          console.log(userData);
          setUsername(userData.username);
          setPicture(userData.picture);
        }
      } else {
        navigate('/sign-in');
      }
    } catch(err) {
      console.log(err);
    }
  }

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
      <div className='flex items-center justify-center gap-5 '>
        <div>
          <button onClick={handleLogout} className='text-[13px] font-geist-bold font-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500 '>LOGOUT</button>
        </div>
        <div className='flex justify-center items-center gap-5 cursor-pointer '>
          <div>
            <h1 className='text-[15px] font-geist-semi py-1 '>{username}</h1>
          </div>
          <div className='profile-container h-11 w-11 rounded-full'>
            <img src={picture} alt='Profile-Pic' className='rounded-full' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;