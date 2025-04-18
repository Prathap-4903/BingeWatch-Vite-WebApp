import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from "@/components/functions/socket";
import { X } from '@phosphor-icons/react';
import { toast } from "@/hooks/use-toast";

const Friends_List = (props) => {
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [userId, setUserId] = useState('');
  const [picture, setPicture] = useState('');
  const [userClick, setUserClick] = useState(false);

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
        setUserId(userData._id);
        setPicture(userData.picture);
      }
    } catch(err) {
      console.error(err);
    }
  }

  const handleUserClick = () => {
    setUserClick(!userClick);
  }

  const handleAddFriend = (senderId, receiverId) => {
    socket.emit('friend-request', { senderId, receiverId });
    console.log("Sending friend request:", { senderId: currentUser.id, receiverId: userId });
    toast({
      title: "Friend Request Sent!",
      description: "Wait For Your Friend To Accept It..",
    });
  }

  return (
    <>
      <div onClick={handleUserClick} className='friends_container flex flex-col justify-center items-center w-[70px] h-auto lg:h-[75px] my-2 lg:my-0 mx-4 rounded-lg p-1 cursor-pointer '>
        <img 
          src={picture} 
          alt="Profile-Pic" 
          className='w-[40px] h-[40px] bg-[#292929] border border-[#666] rounded-full'
        />
        <p className='text-white text-[10px] lg:text-[12px] text-center font-geist-medium mt-1'>{props.Username}</p>
        {userClick && (
          <div className='absolute w-auto bg-neutral-600 text-neutral-100 px-4 py-2 rounded shadow-lg mt-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center gap-4'>
                <X size={20} className='absolute text-bold top-2 right-2 cursor-pointer' onClick={handleUserClick} />
                <p className='text-[14px] font-geist-semi mr-8'>{props.Username}</p>
              </div>
              <div className='flex flex-col mt-2 items-start gap-2 text-[14px] font-geist-medium'>
                <button onClick={() => handleAddFriend(currentUser.id, userId)} className='hover:underline'>Add Friend</button>
                <button className='hover:underline'>Invite to Group</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Friends_List;