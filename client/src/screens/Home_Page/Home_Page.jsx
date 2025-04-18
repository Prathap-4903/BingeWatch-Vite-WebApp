import "./Home_Styles.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import socket from '@/components/functions/socket';
import useUserStore from '@/store/UserStore';
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import NavBar from '@/components/NavBar/NavBar';
import Headlines from './Headlines';
import Buttons from './Buttons';
import History from './History';
import Profile from './Profile';

const Home_Page = () => { 
  const { username, setUsername } = useUserStore();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/auth/verify', { withCredentials: true })
    .then(res => {
      if(res.data.status){
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("Username - ", res.data.user.username);
        setUsername(res.data.user.username);
        socket.emit('new-user', res.data.user.username);
      } else {
        navigate('/sign-in');
      }
    })
  }, [])

  return (
    <>
    <div className="main_screen_mob w-full h-screen md:hidden ">
      <header>
        <NavBar />
      </header>
      <main className="w-full flex flex-col">
        <Headlines />
        <Buttons />
        <History />
      </main>
    </div>

    {/* Laptop Screen */}
    <div className="main-screen w-full h-screen bg-[#fff]">
      <div className="flex-layout hidden md:flex flex-col h-screen w-full gap-2 p-2">
        <div className="row1 flex gap-2">
          <div className="col1-logo flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
            <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
            <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
          </div>
          <div className="col2-nav h-[57px] flex items-center justify-end flex-auto ">
            <NavBar />
          </div>
          <div className="col3-profile flex items-center justify-center h-[71.11px] w-[275px] mr-8 ">
            <Profile />
          </div>
        </div>
        <div className="row2 flex flex-1 gap-2">
          <div className="leftPart w-[240px] h-[308.44px]"></div>
          <div className="headlines -mt-4 flex items-center justify-center flex-1 ">
            <Headlines />
          </div>
          <div className="history flex w-[240px] h-[308.44px] justify-center items-baseline ">
            <History />
          </div>
        </div>
        <div className="row3 flex flex-1 gap-2">
          <div className="leftPart w-[240px] "></div>
          <div className="Buttons flex items-baseline justify-center flex-1">
            <Buttons />
          </div>
          <div className="rightPart w-[240px] "></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home_Page;