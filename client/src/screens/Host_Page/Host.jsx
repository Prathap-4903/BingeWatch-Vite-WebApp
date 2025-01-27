import "./Host.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import socket from '@/components/UI_Elements/socket';
import useUserStore from "@/store/UserStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Host = () => {
  const { username } = useUserStore();
  const [code, setCode] = useState('');
  const nav = useNavigate();

  //Functions
  const generateCode = async() => {
    try{
      const code = await axios.get("http://localhost:5000/host", { withCredentials: true });
      setCode(code.data);
    } catch(err){
      console.log("Error Generating Code : ", err);
    }
  };

  const handleCreateRoom = () => {
    if(code, username) {
      socket.emit('create-room', code, username);
      socket.on('create-room-response', (data) => {
        if(data){
          nav(`/stream/${code}`);
        } else {
          alert('Room Already Exists');
        }
      })
    } else {
      console.log('Error', code, username);
    }
  }

  useEffect(() => {
    generateCode();
    console.log("Hi Host -", username);
  }, [])

  return (
    <>
      <div className='host-screen w-full h-screen bg-white flex justify-center items-center '>
        <Card className="w-[480px] ">
          <CardHeader>
            <CardTitle className="font-geist-bold text-[20px] ">Room ID</CardTitle>
            <CardDescription className="font-geist-semi text-[14px]" >Share this code with your homies!</CardDescription>
            <CardContent></CardContent>
            <CardContent className="font-geist-medium text-[18px] w-full ">{code}</CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleCreateRoom} className="w-[180px]">Start The Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Host;