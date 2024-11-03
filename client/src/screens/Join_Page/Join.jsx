import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'

const Join = () => {
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

export default Join