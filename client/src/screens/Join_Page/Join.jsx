import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '@/components/UI_Elements/socket';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import UseUserStore from '@/store/UserStore';

const Join = () => {
  const [id, setId] = useState();
  const { username } = UseUserStore();
  const nav = useNavigate();

  //Functions
  const handleJoinRoom = () => {
    if(id) {
      socket.emit('join-room', id, username);
      socket.on('join-room-pending', () => {
        toast({
          title: "Request Sent To Host!",
          description: "Waiting for approval..."
        });
      });

      socket.on('join-room-approved', () => {
          nav(`/stream/${id}`);
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
    }
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
                <Input type="text" id="code" placeholder="Enter the code" onChange={(e) => setId(e.target.value)} className="pl-10 placeholder:absolute placeholder:left-4 " />
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