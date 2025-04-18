import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bell } from '@geist-ui/icons';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import { useToast } from "@/hooks/use-toast";

const User_Profile = () => {
  const { username } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    handleUserData();
    handleFriends();
  }, []);

  const handleUserData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/user/username/${username}`, { withCredentials: true });
        if(response.data.status) {
          console.log(response.data.data);
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setPicture(response.data.data.picture);
        }
    } catch(err) {
        console.log(err);
    }
  }

  const handleFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/friends?username=${username}`, { withCredentials: true });
      if(response.data.status) {
        console.log(response.data.friends);
        setFriendsList(response.data.friends);
        console.log("Friends List", friendsList);
      }
    } catch(err) {
      console.log("Error Fetching Friends -", err);
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
      <div className="user_profile flex flex-col gap-8 w-full h-screen ">
        <div className='nav_div flex justify-between items-center '>
            <div className='logo flex h-[50px] w-[240px] items-center justify-center cursor-pointer'>
                <div className="col1-logo flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
                  <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
                  <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
                </div>
            </div>
            <div className='flex gap-8 m-4 mr-8'>
              <button onClick={handleLogout} className='text-[13px] font-geist-bold font-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500 '>LOGOUT</button>
            </div>
        </div>
        <div className='flex justify-center items-center gap-8 mx-10'>
          <div className='flex flex-col gap-8'>
            <div className='profile w-[720px] border-2 bg-white border-solid border-[#c9c9c9] rounded-[8px] p-4 shadow-xl'>
                <h1 className='text-[24px] font-geist-bold mb-4'>PROFILE</h1>
                <div className='flex gap-10 items-center'>
                  <div className='profile_pic w-[200px] h-[200px] border border-solid border-[#c9c9c9] rounded-full '>
                    <img src={picture} alt="Profile" className='rounded-full' />
                  </div>
                  <div className='profile_info flex flex-col gap-2 -mt-4 '>
                    <h1 className='text-[21px] font-geist-semi'>{username}</h1>
                    <h1 className='text-[18px] font-geist-semi -mt-2'>{name}</h1>
                    <h1 className='text-[16px] font-geist-medium mt-3 text-neutral-500'>{email}</h1>
                  </div>
                </div>
            </div>
            <div className='groups w-[720px] bg-white border-2 border-solid border-[#c9c9c9] rounded-[8px] p-4 shadow-xl'>
              <h1 className='text-[24px] font-geist-bold mb-4'>GROUP</h1>
            </div>
          </div>
          <div className='friends w-[720px] bg-white border-2 border-solid border-[#c9c9c9] rounded-[8px] p-4 shadow-xl'>
            <div className='flex justify-between'>
              <h1 className='text-[24px] font-geist-bold mb-4'>FRIENDS</h1>
              <Bell size={24} className='text-black mt-[5px]' />
            </div>
            <div>
              {friendsList.map((friend, index) => (
                <div key={index} className='flex gap-4 items-center mb-4 font-geist-semi'>
                  <img src={`http://localhost:5000/${friend.picture}`} alt="X" className='size-10 rounded-full' />
                  <p>{friend.username}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_Profile;