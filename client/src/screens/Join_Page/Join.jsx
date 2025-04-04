import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '@/components/functions/socket';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import UseUserStore from '@/store/UserStore';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";

const Join = () => {
  const [roomId, setRoomId] = useState("");
  const { username } = UseUserStore();
  const nav = useNavigate();

  useEffect(() => {
    socket.on('join-room-pending', () => {
      toast({
        title: "Request Sent To Host!",
        description: "Waiting for approval..."
      });
    });

    socket.on('join-room-approved', () => {
      nav(`/stream/${roomId}`);
      toast({
        title: "Request Approved By Host!",
        description: "Enjoy The Stream..."
      });
    });

    socket.on('join-room-rejected', () => {
      toast({
        variant: "destructive",
        title: "Request Rejected By Host!",
        description: "You can try again later."
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off('join-room-pending');
      socket.off('join-room-approved');
      socket.off('join-room-rejected');
    };
  }, [roomId]);

  //Functions
  const handleJoinRoom = () => {
    console.log("Button Clicked!");
    if(roomId) {
      socket.emit('join-room', roomId, username);
      socket.on('join-room-response', (data) => {
        if(!data) {
          alert('No Room Found');
        }
      });
    };
  };

  return (
    <>
      <div className="logo-container flex cursor-pointer m-2">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-1 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-2" />
      </div>

      <div className='host-screen w-full h-screen bg-white flex justify-center items-center '>
        <Card className="min-w-[300px] max-w-[400px] md:min-w-[400px] md:max-w-[480px] mb-28">
          <CardHeader>
            <CardTitle className="font-geist-bold text-[16px] md:text-[20px] ">Join The Party</CardTitle>
            <CardDescription className="font-geist-semi text-[12px] md:text-[14px]" >Enter the code shared by your homie!</CardDescription>
            <CardContent className="font-geist-medium md:text-[18px] w-full pt-3 px-2 flex justify-center items-center ">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="code" className="text-[12px] p-0 m-0">Enter Code </Label>
                <Input type="text" id="code" placeholder="Enter the code" onChange={(e) => setRoomId(e.target.value)} className="text-[13px] md:text-[15px] placeholder:absolute placeholder:left-4 " />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleJoinRoom} className="w-[120px] md:w-[180px] font-geist-bold text-[12px]">Enter The Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Join;

//  px-8 py-2 rounded-[6px] bg-black hover:bg-neutral-800 text-white text-[14px] font-geist-semi