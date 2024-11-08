import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home_Styles.css";
import axios from 'axios';
import LogoMonkey from "../../assets/icons/monkey-icon-b.png";
import LogoText from "../../assets/icons/BingeWatch Text Black.png";
import NavBar from '../../components/NavBar/NavBar';
import Headlines from './Headlines';
import Buttons from './Buttons';
import History from './History';
import Profile from './Profile';

const Home_Page = () => { 

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/auth/verify')
    .then(res => {
      if(res.data.status){
        console.log(res.data);
      } else {
        navigate('/sign-in')
      }
    })
  })


  return (
    <>
    <div className="main-screen w-full h-screen bg-[#fff]">
      <div className="flex-layout flex flex-col h-screen w-full gap-2 p-2">
        <div className="row1 flex gap-2">
          <div className="col1-logo flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
            <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
            <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
          </div>
          <div className="col2-nav flex items-center justify-end flex-auto ">
            <NavBar />
          </div>
          <div className="col3-profile flex items-center justify-center h-[71.11px] w-[240px] ">
            <Profile />
          </div>
        </div>
        <div className="row2 flex flex-1 gap-2">
          <div className="leftPart w-[240px] h-[308.44px] "></div>
          <div className="headlines flex items-center justify-center flex-1 ">
            <Headlines />
          </div>
          <div className="history flex w-[240px] h-[308.44px] justify-center items-baseline ">
            <History />
          </div>
        </div>
        <div className="row3 flex flex-1 gap-2">
          <div className="leftPart w-[240px] "></div>
          <div className="Buttons flex items-baseline justify-center flex-1 ">
            <Buttons />
          </div>
          <div className="rightPart w-[240px] "></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home_Page