import React from 'react';

const Request_Alert = ({ joinRequests, handleApprove, handleReject }) => {
  return (
    <>
      <div className='req-screen w-full h-screen bg-transparent flex justify-end items-end isolate z-10 '>
        <div className='req-container w-96 h-auto bg-white m-10 flex flex-col px-4 py-4 gap-4 border border-solid border-[#c9c9c9] rounded-xl '>
          <div>
            <h1 className='text-[23px] font-bold'>Join Requests</h1>
          </div>
          <div>
          {joinRequests.map(({ username, socketId }) => (
            <div key={socketId} className='flex flex-col gap-4'>
              <p className='font-geist-semi text-[16px] '>{username} Wants To Join The Stream..</p>
              <div className='flex space-x-5 justify-center'>
                <button onClick={() => handleReject(socketId)} className='bg-[#010101] text-white rounded-xl px-[10px] py-[8px] w-full cursor-pointer hover:bg-[#212121] '>Decline</button>
                <button onClick={() => handleApprove(socketId, username)} className='border border-solid border-[#c9c9c9] rounded-xl px-[10px] py-[8px] w-full cursor-pointer hover:bg-[#f0f0f0] '>Accept</button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Request_Alert;