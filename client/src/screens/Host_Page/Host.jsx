import "./Host.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Host = () => {

  const [code, setCode] = useState('');

  const generateCode = async() => {
    try{
      const code = await axios.get("http://localhost:5000/host")
      setCode(code.data);
    } catch(err){
      console.log("Error Generating Code : ", err);
    }
  }

  useEffect(() => {
    generateCode();
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
              <Button className="w-[180px]">Start Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Host