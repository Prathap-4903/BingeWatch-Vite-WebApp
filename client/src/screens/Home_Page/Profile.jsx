import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nagi from "../../assets/icons/nagi.jpg";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { motion } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/sign-in');
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleLog = () => {
    // Your logout logic
    setShowToast(true);
    
    // Automatically dismiss the toast after 2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <div className='flex flex-wrap gap- items-center justify-center gap-6'>
        <div>
          <button
            onClick={handleLogout}
            className="text-[13px] font-geist-bold font-bold px-3 py-[6px] bg-white text-black border-solid border-2 border-r-4 border-b-4 rounded-[8px] border-black hover:bg-black hover:text-white transition-all ease-in-out duration-500"
          >
            LOGOUT
          </button>
          {showToast && (
            <motion.div
            initial={{ opacity: 0, y: 50 }} // Starting position and opacity for slide up
            animate={{ opacity: 1, y: 0 }} // Animate to full opacity and position
            exit={{ opacity: 1, y: 50 }} // Animate back to slide down
            transition={{ duration: 0.25 }} // Duration of the transition
            className="absolute bottom-0 left-[40%] mb-10"
          >
              <Toast>
                <div className="font-geist-semi inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <HiCheck className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3 text-sm font-geist-medium">Logout Successful</div>
                <Toast.Toggle onDismiss={() => setShowToast(false)} />
              </Toast>
            </motion.div>
          )}
        </div>
        <div className="profile-container h-11 w-11 rounded-full bg-black cursor-pointer">
          <img src={Nagi} alt="Pic" className='rounded-full' />
        </div>
      </div>
    </>
  );
}

export default Profile;
