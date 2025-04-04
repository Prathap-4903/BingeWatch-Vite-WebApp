import "./Host.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import socket from '@/components/functions/socket';
import useUserStore from "@/store/UserStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";

const Host = () => {
  const { username } = useUserStore();
  const [roomId, setRoomId] = useState('');
  const nav = useNavigate();

  // Functions
  const generateCode = async() => {
    try{
      const response = await axios.get("http://localhost:5000/host", { withCredentials: true });
      setRoomId(response.data);
    } catch(err){
      console.log("Error Generating Code : ", err);
    }
  };

  const handleCreateRoom = () => {
    if(roomId, username) {
      socket.emit('create-room', roomId, username);
      socket.on('create-room-response', (data) => {
        if(data){
          nav(`/stream/${roomId}`);
        } else {
          alert('Room Already Exists');
        }
      })
    } else {
      console.log('Error', roomId, username);
    }
  }

  useEffect(() => {
    generateCode();
  }, [])

  return (
    <>
      <div className="logo-container flex cursor-pointer m-2">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-1 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-2" />
      </div>

      <div className='host-screen w-full h-screen bg-white flex justify-center items-center '>
        <Card className="min-w-[320px] max-w-[400px] md:min-w-[400px] md:max-w-[480px] mb-28">
          <CardHeader>
            <CardTitle className="font-geist-bold text-[16px] md:text-[20px] ">Room ID</CardTitle>
            <CardDescription className="font-geist-semi text-[12px] md:text-[14px]" >Share this code with your homies!</CardDescription>
            <CardContent className="font-geist-medium text-[13px] md:text-[16px] w-full h-16 pt-6 px-0 flex justify-center items-center ">{roomId}</CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleCreateRoom} className="w-[120px] md:w-[180px] font-geist-bold text-[12px]">Start The Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Host;