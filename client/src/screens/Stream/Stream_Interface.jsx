import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Stream.css";
import { Input } from "../../components/ui/input";
import { PaperPlaneTilt, Camera } from "@phosphor-icons/react";
import { Mic, Cast, BarChart2, Upload } from '@geist-ui/icons'

const Stream_Interface = () => {
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]); // Store join requests
  const { username } = useUserStore();
  const { roomId } = useParams();

  useEffect(() => {
    // socket.emit("get-users-in-room", roomId);
    // console.log("Getting users in room", roomId);

    // Listen for updated users in the room
    socket.on("users-in-room", (users) => setUsersInRoom(users));

    // Handle incoming join requests
    socket.on("join-request", ({ username, socketId }) => {
      console.log("Join request from", username);
      setJoinRequests((prev) => [...prev, { username, socketId }]);
    });

    return () => {
      socket.off("users-in-room");
      socket.off("join-request");
    };
  }, [roomId]);

  const handleApprove = (socketId, username) => {
    socket.emit("approve-join", { id: roomId, socketId, username });
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  const handleReject = (socketId) => {
    socket.emit("reject-join", { socketId });
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  return (
    <>
    <div className='stream-screen w-full h-screen bg-[#1a1a1a] flex justify-center items-center gap-[10px] p-[6px] '>
      <div className='left-part w-[800px] h-[654px] flex flex-col flex-1 justify-center items-center bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] gap-[8px] '>
        <div className='stream-video w-[870px] h-[480px] m-[7px] bg-[#1a1a1a] border-solid border-[1px] border-[#666] rounded-[34px] '></div>
        <div className='bottom-part flex w-[870px] h-[204px] gap-[10px] border-solid border-[1px] border-[#666] rounded-[34px] mb-[7.5px] '>
          <div className='bottom-left flex flex-col gap-[15px] w-[652.39px] h-[204px] justify-start items-center pl-[12px]  '>
            <div className='controls flex w-[489.04] h-[80px] mt-[25px] gap-[125.18px] '>
              <div className='camera w-[65px] h-[65px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center '>
                <Camera size={32} className='text-white' />
              </div>
              <div className='mic w-[65px] h-[65px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white '>
                <Mic />
              </div>
              <div className='share-screen w-[65px] h-[65px] bg-[#292929] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white '>
                <Cast />
              </div>
            </div>
            <div className='reactions w-[552.39px] h-[60px] bg-[#292929] rounded-[25px] border-solid border-[1px] border-[#666] '></div>    
          </div>
          <div className='bottom-right w-[243.17px] h-[204px] flex flex-col gap-[16px] justify-center items-end pr-[12px] rounded-[25px] '>
            <div className='poll w-[159.12px] h-[80px] bg-[#292929] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white '>
              <BarChart2 size={28} />
            </div> 
            <div className='file w-[159.12px] h-[80px] bg-[#292929] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white  '>
              <Upload size={28} />
            </div> 
          </div>
        </div>
      </div>
      <div className='right-part w-[438px] h-[654px] flex flex-col items-center gap-[7px] bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] '>
        <div className='friends-box flex flex-wrap justify-center w-[403px] h-[269.45px] gap-[50px] rounded-[34px] mt-[20px] mb-[30px] '>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
          <div className='friends w-[70px] h-[70px] bg-[#292929] border-solid border-[1px] border-[#666] rounded-full '></div>
        </div>
        <div className='chat-box w-[423px] h-[360px] flex justify-center items-end gap-[20px] bg-[#1a1a1a] border-solid border-[1px] border-[#666] rounded-[34px] mt-[25px] mb-[7.5px] '>
          <div className='text-box w-[310px] h-[45px] bg-[#292929] rounded-[20px] mb-[20px] flex justify-center items-center '>
            <Input type="email" placeholder="Message.." className="border-none rounded-[34px] h-[45px] text-white" />
          </div>
          <div className='send-btn w-[45px] h-[45px] bg-[#292929] rounded-[14px] mb-[20px] cursor-pointer flex justify-center items-center text-white'>
            <PaperPlaneTilt size={20} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Stream_Interface;