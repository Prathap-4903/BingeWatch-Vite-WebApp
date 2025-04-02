import React, { useState, useEffect } from 'react';
import NavLinks from './NavLinks';
import axios from 'axios';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import { List, X } from "@phosphor-icons/react";
// import Profile_Pic from "@/assets/icons/Nagi.jpg";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const [picture, setPicture] = useState('');
  
  const ToggleShowNav = () => {
    setShowNav(!showNav);
  }

  const handleVerify = async () => {
      try{
        const response = await axios.get('http://localhost:5000/auth/verify', { withCredentials: true });
        if(response.data.status){
          //console.log(response.data.user.id);
  
          const userResponse = await axios.get(`http://localhost:5000/user/id/${response.data.user.id}`, { withCredentials: true });
          if(userResponse.data.status){
            const userData = userResponse.data.data;
            console.log(userData);
            setPicture(userData.picture);
          }
        } else {
          console.log("User not verified");
        }
      } catch(err) {
        console.log(err);
      }
    }

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <nav>
      <div className='hidden md:flex items-center justify-center '>
        <ul>
          <li>
            <NavLinks />
          </li>
        </ul>
      </div>

      {/* Mobile Nav */}
      <div className='mobile_nav md:hidden w-full h-auto flex items-center '>
        <div className="nav_logo flex h-[50px] w-[240px] items-center justify-center cursor-pointer p-8 lg:p-[0px] ">
          <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
          <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
          <img src={picture} alt='Profile-Pic' className='w-8 h-8 rounded-full md:hidden absolute right-16' />
          {!showNav ? <List size={32} onClick={ToggleShowNav} className={showNav ? 'hidden' : 'md:hidden absolute right-4 cursor-pointer'} /> : <X size={32} onClick={ToggleShowNav} className={showNav ? 'md:hidden absolute right-4 cursor-pointer' : 'hidden'}/>}
          {showNav && (
            <div className='showNav_container md:hidden z-30 w-[75%] h-auto absolute right-0 top-16 bg-white border-l-2 border-y-2 rounded-l-xl border-solid border-[#c9c9c9] '>
              <div>
                <ul className='flex flex-col items-center gap-8 my-10 font-geist-medium '>
                  <li><a href="#" className='hover:underline '>Friends</a></li>
                  <li><a href="#" className='hover:underline '>Groups</a></li>
                  <li><a href="#" className='hover:underline '>Contact</a></li>
                  <li><a href="#" className='hover:underline '>About Us</a></li>
                  <button className='text-[13px] font-geist-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500 '>LOGOUT</button>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;