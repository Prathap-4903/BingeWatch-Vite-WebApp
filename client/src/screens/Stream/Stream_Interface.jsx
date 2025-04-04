import "./Stream.css";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from "@/components/functions/socket";
import { Camera, DotsThreeOutline, Heart } from '@phosphor-icons/react';
import { Mic, Cast, BarChart2, Upload, UserPlus } from '@geist-ui/icons';
import Friends_List from "@/components/Stream_Elements/Friends_List";
import Request_Alert from "@/components/UI_Elements/Request_Alert";
import Reaction_Tab from "@/components/Stream_Elements/Reaction_Tab";
import Chat_Box from "@/components/Stream_Elements/Chat_Box";
import Chat_Box_Mob from "@/components/Stream_Elements/Chat_Box_Mob";
import useUserStore from "@/store/UserStore";
import useHostStore from "@/store/HostStore";

const New_Stream_Interface = () => { 
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [joinAlert, setJoinAlert] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const { username } = useUserStore();
  const { hostname, setHostname } = useHostStore();
  const { roomId } = useParams();

  // UseEffects
  useEffect(() => {
    socket.emit('get-host-name', roomId);
    socket.on('host-name', (host) => setHostname(host));

    // Listen for updated users in the room
    socket.on("users-in-room", (users) => {
      console.log('Users in Room:', users);
      setUsersInRoom(users);
    });

    // Handle incoming join requests
    socket.on("join-request", ({ username, socketId }) => {
      console.log("Join request from", username);
      setJoinAlert(true);
      setJoinRequests((prev) => [...prev, { username, socketId }]);
      console.log("Join Requests -", joinRequests);
    });

    return () => {
      socket.off("host-name");
      socket.off("users-in-room");
      socket.off("join-request");
    };
  }, [roomId, hostname, usersInRoom]);

  // Functions
  const handleApprove = (socketId, username) => {
    socket.emit("approve-join", { roomId, socketId, username });
    setJoinAlert(false);
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  const handleReject = (socketId) => {
    socket.emit("reject-join", { socketId });
    setJoinAlert(false);
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  return (
    <>
    <div className="stream_screen_mob md:hidden w-full h-screen bg-[#1a1a1a] flex flex-col justify-center items-center ">
      <div className="room_info_mob absolute left-4 top-[12px] p-1 ">
        <h1 className='text-neutral-400 font-geist-bold text-[12px]  '>👑 {hostname}</h1>
      </div>
      <div className="stream_video_mob w-[320px] max-w-[650px] h-[172px] mb-2 bg-[#1a1a1a] border-solid border border-[#666] rounded-[10px]  "></div>
      <div className="friends_box w-full flex flex-wrap justify-center items-center ">
        {usersInRoom.map((user, index) => (
          <Friends_List key={index} Username={user} />
        ))}
        <div className='friends_container flex flex-col justify-center items-center w-[70px] h-[75px] my-2 mx-4 lg:my-0 rounded-lg p-1 cursor-pointer'>
          <div className='w-[40px] h-[40px] flex justify-center items-center text-white bg-[#292929] border border-[#666] rounded-full'>
            <UserPlus size={16} className="ml-1" />
          </div>
          <p className='text-white text-[10px] text-center font-geist-medium mt-1'>Invite</p>
        </div>
      </div>
      
      <Chat_Box_Mob />

      <div className="controls_container w-full absolute bottom-0 ">
        <div className="controls_tab w-full h-[72px] bg-neutral-950 flex justify-center items-center gap-5 ">
          <div className="reactions w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Heart size={20} />
          </div>
          <div className="camera_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Camera size={20} />
          </div>
          <div className="mic_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Mic size={18} />
          </div>
          <div className="cast_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Cast size={20} />
          </div>
          <div className="features w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <DotsThreeOutline size={24} />
          </div>
        </div>
      </div>
    </div>

    {/* Laptop Screen */}
    <div className='stream_screen hidden w-full h-screen bg-[#1a1a1a] lg:flex justify-center items-center gap-[10px] p-[6px] '>
      <div className='left_part w-[800px] h-[654px] flex flex-col flex-1 justify-center items-center bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] gap-[8px] '>
        <div className='stream_video w-[870px] h-[480px] m-[7px] bg-[#1a1a1a] border-solid border border-[#666] rounded-[34px] '></div>
        <div className='bottom-part flex w-[870px] h-[204px] gap-[10px] border-solid border-[1px] border-[#666] rounded-[34px] mb-[7.5px] '>
          <div className='bottom-left flex flex-col gap-[15px] w-[652.39px] h-[204px] justify-start items-center pl-[12px]  '>
            <div className='controls flex w-[489.04] h-[80px] mt-[25px] gap-[125.18px] '>
              <div className='camera w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center cursor-pointer '>
                <Camera size={32} className='text-white' />
              </div>
              <div className='mic w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
                <Mic />
              </div>
              <div className='share-screen w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
                <Cast />
              </div>
            </div>
            <Reaction_Tab />
          </div>
          <div className='bottom-right w-[243.17px] h-[204px] flex flex-col gap-[16px] justify-center items-end pr-[12px] rounded-[25px] '>
            <div className='poll w-[159.12px] h-[80px] bg-[#292929] hover:bg-[#1f1f1f] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
              <BarChart2 size={28} />
            </div> 
            <div className='file w-[159.12px] h-[80px] bg-[#292929] hover:bg-[#1f1f1f] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
              <Upload size={28} />
            </div> 
          </div>
        </div>
      </div>
      <div className='right_part w-[438px] h-[654px] flex flex-col items-center gap-[12px] bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] '>
        <div className='room_info w-full h-[55px] mt-3 rounded-3xl flex justify-center items-center'>
          <h1 className='text-neutral-400 '>👑 {hostname}</h1>
        </div>
        <div className='friends_box flex flex-wrap justify-center items-center w-[403px] h-[580px] gap-4'>
          {usersInRoom.map((user, index) => (
            <Friends_List key={index} Username={user} />
          ))}
          <div className='friends_container flex flex-col justify-center items-center w-[70px] h-[75px] mx-4 rounded-lg p-1 cursor-pointer'>
            <div className='w-[45px] h-[50px] flex justify-center items-center text-white bg-[#292929] border border-[#666] rounded-full'>
              <UserPlus size={24} className="ml-1" />
            </div>
            <p className='text-white text-[12px] text-center font-geist-medium mt-1'>Invite</p>
          </div>
        </div>
        <Chat_Box />
      </div>
      {joinAlert && (
        <Request_Alert joinRequests={joinRequests} handleApprove={handleApprove} handleReject={handleReject} />
      )}
    </div>
    </>
  )
}

export default New_Stream_Interface;

/* "Prathap_4903", "Parker_116", "Qwen_116", "Luffy_Meat_056", "Sanji_69" */

/*
<h2 className='text-emerald-500'>HOST OF THE ROOM - {hostInRoom}</h2>
<h2 className='text-red-500'>Users in Room:</h2>
<ul className='text-white'>
  {usersInRoom.map((user, index) => (
    <li key={index}>{user}</li>
  ))}
</ul>
{joinRequests.length > 0 && (
<div className='text-red-500'>
  <h2>Join Requests</h2>
  {joinRequests.map(({ username, socketId }) => (
    <div key={socketId}>
      <p>{username} wants to join</p>
      <button onClick={() => handleApprove(socketId, username)}>
        Approve
      </button>
      <button onClick={() => handleReject(socketId)}>Reject</button>
    </div>
  ))}
</div>
)}
*/

/*
<div className='friends-box flex justify-center items-center w-[403px] h-[580px] '>
  {usersInRoom.map((user, index) => (
    <div key={index} className='w-full h-full flex justify-center items-center '>
      <Friends_List Username={user}/>
    </div>
  ))}
</div>
*/