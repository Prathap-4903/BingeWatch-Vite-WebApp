import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from "@/components/functions/socket";
import { Input } from "@/components/ui/input";
import { PaperPlaneTilt } from "@phosphor-icons/react";

const Chat_Box_Mob = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { roomId } = useParams();
  
  useEffect(() => {
    socket.on('chat-message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  
    return () => {
      socket.off('chat-message');
    }
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Sending Message -", inputMessage);
    if (inputMessage) {
      socket.emit('chat-message', { roomId: roomId, message: inputMessage });
      setInputMessage('');
    }
  }

  return (
    <>
      <div className='chat_box_mob_container w-[90%] h-[200px] z-10 flex flex-col gap-2 border border-solid border-[#666] rounded-[10px] mb-24 '>
        <div className='chat_box_mob h-[75%] mx-2 mt-2 font-geist-medium overflow-y-scroll hide-scrollbar '>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === socket.id ? 'text-right text-white' : 'text-left text-black'}`}>
            <span className={`inline-block px-[6px] py-[4px] rounded ${msg.sender === socket.id ? 'bg-transparent text-white border border-solid border-[#666] rounded-[10px]' : 'bg-[#212121] text-white rounded-[10px] '}`}>
              <label htmlFor="chat" className='text-neutral-500 font-geist-semi text-[11px] '>{msg.username}</label>
              <p id="chat" className='text-[10px]' >{msg.message}</p>
            </span>
          </div>
        ))}
        </div>
        <div>
          <form onSubmit={sendMessage} className='w-[96%] flex gap-2 mb-2 '>
            <div className='text_box bg-[#292929] w-full h-[40px] rounded-[10px] font-geist-medium flex justify-center items-end ml-3 '>
              <Input type="text" value={inputMessage} placeholder="Message.." onChange={(e) => setInputMessage(e.target.value)} className="border-none h-full rounded-[10px] text-white " />
            </div>
            <button type="submit" className='bg-[#292929] w-[50px] text-white rounded-[10px] flex justify-center items-center ' >
              <PaperPlaneTilt size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat_Box_Mob;

/*
<div className='chat_container w-[423px] h-[327px] flex flex-col bg-[#1a1a1a] border-solid border-[1px] border-[#666] rounded-[36px] mx-3 mb-2 px-4 py-5 '>
    <div className='chat_box h-[327px] mb-4 text-[12px] font-geist-medium overflow-y-scroll hide-scrollbar rounded '>
    {messages.map((msg, index) => (
      <div key={index} className={`mb-2 ${msg.sender === socket.id ? 'text-right text-white' : 'text-left text-black'}`}>
        <span className={`inline-block p-2 rounded ${msg.sender === socket.id ? 'bg-transparent text-white border border-solid border-[#666] rounded-xl' : 'bg-[#212121] text-white rounded-xl '}`}>
          <label htmlFor="chat" className='text-neutral-500 font-geist-semi'>{msg.username}</label>
          <p id="chat" >{msg.message}</p>
        </span>
      </div>
    ))}
    <div ref={messagesEndRef} />
    </div>
    <div>
      <form onSubmit={sendMessage} className='w-full flex gap-2 '>
        <div className='text-box w-full h-[45px] font-geist-medium bg-[#292929] rounded-[20px] flex justify-center items-end '>
          <Input type="text" value={inputMessage} placeholder="Message.." onChange={(e) => setInputMessage(e.target.value)} className="border-none rounded-[34px] h-[45px] text-white" />
        </div>
        <button type="submit" className='send-btn w-[45px] h-[45px] bg-[#292929] rounded-[14px] flex justify-center items-center text-white'>
          <PaperPlaneTilt size={20} />
        </button>
      </form>
    </div>
</div>
*/