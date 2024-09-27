import React from 'react'
import "./Home_Styles.css";
import LogoMonkey from "../../assets/icons/monkey-icon-b.png";
import LogoText from "../../assets/icons/BingeWatch Text Black.png";
import NavBar from '../../components/NavBar/NavBar';
import Headlines from './Headlines';
import Buttons from './Buttons';
import History from './History';
import Profile from './Profile';

const Home_Page = () => { 
  return (
    <>
      <div className='main-window flex items-center justify-center w-full h-screen'>
        <div className='grid-layout h-full w-full grid grid-cols-11 grid-rows-9 gap-2 p-2'>
          <div className='logo-container col-span-2 row-span-1 rounded-xl flex items-center justify-center cursor-pointer'>
            <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
            <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
          </div>
          <div className='nav-bar col-span-7 row-span-1 rounded-xl flex items-center justify-end'>
            <NavBar />
          </div>
          <div className='profile-container col-span-2 row-span-1 rounded-xl flex items-center justify-center'>
            <Profile />
          </div>
          <div className='col-span-2 row-span-4 rounded-xl flex items-center justify-center'></div>
          <div className='headlines col-span-7 row-span-4 rounded-xl flex items-center justify-center'>
            <Headlines />
          </div>
          <div className='history col-span-2 row-span-4 rounded-xl flex items-baseline justify-center'>
            <History />
          </div>
          <div className='col-span-2 row-span-4 rounded-xl flex items-center justify-center'></div>
          <div className='buttons-div col-span-7 row-span-4 rounded-xl flex items-baseline justify-center'>
            <Buttons />
          </div>
          <div className='col-span-2 row-span-4 rounded-xl flex items-center justify-center'></div>
        </div>
      </div>



    {/* <div className="logo-container flex items-center justify-between p-2">
        <div className="flex ">
            <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
            <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
        </div>
        <div className="flex items-center space-x-3 mr-1">
            <button className="text-[12px] font-geist-bold font-semibold px-[6px] py-[5px] bg-black text-white border-solid border-2 rounded-[8px] border-black">LOGOUT</button>
            <div className="profile-container h-9 w-9 rounded-full bg-black"></div>
        </div>
    </div> */}

    </>
  )
}

export default Home_Page