import React from 'react';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Contact_Page = () => {
  return (
    <>
      <div className='w-full h-screen '>
        <div className="flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
          <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
          <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
        </div>
        <div className='w-full h-screen flex justify-center mt-20'>
          <div className='flex flex-col gap-7'>
            <h1 className='font-geist-bold text-[32px] text-center '>Contact Us</h1>
            <p className='font-geist-medium text-[16px] w-[520px] text-center'>Have a brilliant idea for our next feature? Spot a bug during your movie marathon? We're all ears! Use the form below to send us your thoughts and help us make the ultimate watch party experience.</p>
            <div className='flex flex-col border border-solid border-[#c9c9c9] rounded-[10px] p-4 '>
              <form action="" className='flex flex-col gap-4'>
                <div>
                  <Label htmlFor="name">Enter Name </Label>
                  <Input id='name' type="text" className='font-geist-medium' />
                </div>
                <div>
                  <Label htmlFor="email">Enter Email </Label>
                  <Input id='email' type="email" className='font-geist-medium' />
                </div>
                <div>
                  <Label htmlFor="message">Enter Message </Label>
                  <Input id='message' type="text" className='font-geist-medium' />
                </div>
                <Button>Send</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact_Page;