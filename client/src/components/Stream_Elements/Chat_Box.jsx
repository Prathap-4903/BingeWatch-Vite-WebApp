import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '@/components/functions/socket';
import { Input } from "../../components/ui/input";
import { PaperPlaneTilt } from "@phosphor-icons/react";

const Chat_Box = () => {
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
    </>
  )
}

export default Chat_Box;

/*
<form onSubmit={sendMessage} className="flex">
  <input
    type="text"
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    placeholder="Type a message"
    className="flex-1 p-2 border rounded-lg placeholder:text-white text-white"
  />
  <button type="submit" className="ml-1 bg-[#212121] border-solid border-2 border-[#6c3baa] text-white p-2 rounded-lg">
    Send
  </button>
</form>
*/

/*
<div className='chat-box w-[423px] h-[360px] flex justify-center items-end gap-[20px] bg-[#1a1a1a] border-solid border-[1px] border-[#666] rounded-[34px] mb-[7.5px] '>
  <div className='text-box w-[310px] h-[45px] bg-[#292929] rounded-[20px] mb-[20px] flex justify-center items-center '>
    <Input type="email" placeholder="Message.." className="border-none rounded-[34px] h-[45px] text-white" />
  </div>
  <div className='send-btn w-[45px] h-[45px] bg-[#292929] rounded-[14px] mb-[20px] cursor-pointer flex justify-center items-center text-white'>
    <PaperPlaneTilt size={20} />
  </div>
</div>
*/