import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'

const Join = () => {
  return (
    <>
      <div className='host-screen w-full h-screen bg-white flex justify-center items-center '>
        <Card className="w-[480px] ">
          <CardHeader>
            <CardTitle className="font-geist-bold text-[20px] ">Join The Party</CardTitle>
            <CardDescription className="font-geist-semi text-[14px]" >Enter the code shared by your homie!</CardDescription>
            <CardContent></CardContent>
            <CardContent className="font-geist-medium text-[18px] w-full ">
              {/* <Input type="text" placeholder="Enter the code" /> */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="code">Enter Code </Label>
                <Input type="text" id="code" placeholder="Enter the code" className="pl-10 placeholder:absolute placeholder:left-4 " />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-[180px]">Enter The Stream</Button>
            </CardFooter>
          </CardHeader>
        </Card>  
      </div>
    </>
  )
}

export default Join