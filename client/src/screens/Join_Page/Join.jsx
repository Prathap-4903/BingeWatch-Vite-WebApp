import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '@/components/UI_Elements/socket';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import UseUserStore from '@/store/UserStore';

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
      <div className='host-screen w-full h-screen bg-white flex justify-center items-center '>
        <Card className="w-[480px] ">
          <CardHeader>
            <CardTitle className="font-geist-bold text-[20px] ">Join The Party</CardTitle>
            <CardDescription className="font-geist-semi text-[14px]" >Enter the code shared by your homie!</CardDescription>
            <CardContent></CardContent>
            <CardContent className="font-geist-medium text-[18px] w-full ">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="code">Enter Code </Label>
                <Input type="text" id="code" placeholder="Enter the code" onChange={(e) => setRoomId(e.target.value)} className="pl-10 placeholder:absolute placeholder:left-4 " />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleJoinRoom} className="w-[180px]">Enter The Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Join;

//  px-8 py-2 rounded-[6px] bg-black hover:bg-neutral-800 text-white text-[14px] font-geist-semi