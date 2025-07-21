import React, { use } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { useEffect } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ChatContainer = () => {

  const {messages , selectedUser, setSelectedUser,getMessages, sendMessage} = useContext(ChatContext);
  const scroolEnd = useRef(null);

  const {AuthUser,onlineUser} = useContext(AuthContext);


  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return null;
    }

    await sendMessage(inputValue.trim());
    setInputValue("");
  }


  // Handle sending an image 

  const handleSendImage  =  async  (e) =>{
    const file  = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      console.log("Sending image to backend:", reader.result.slice(0, 30)); // log first 30 chars
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  useEffect(() =>{
    if(selectedUser){
      getMessages(selectedUser._id);

    }
  }, [selectedUser]);

  // Debug: log selectedUser only when it changes
  useEffect(() => {
    console.log('Selected user:', selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if (scroolEnd.current && messages) {
      scroolEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[messages])

  useEffect(() => {
    console.log('Messages:', messages);
    if (messages.length) {
      messages.forEach((msg, i) => {
        if (!msg.text && !msg.image) {
          console.warn(`Message ${i} is missing text and image:`, msg);
        } else {
          console.log(`Message ${i}:`, msg);
        }
      });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full overflow-scroll relative '>

      {/* Header */}
      <div className='flex items-center gap-4 py-4 px-6 border-b border-stone-600 bg-black/30 rounded-t-xl'>
        <img src={selectedUser?.ProFilePic || selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-10 h-10 rounded-full border-2 border-green-400 shadow-md'/>
        <p className='flex-1 text-lg text-white font-semibold flex items-center'>
          {selectedUser?.fullName || selectedUser?.name || "Unknown User"}
          <span className='w-2 h-2 rounded-full bg-green-500 ml-2 border-2 border-white'></span>
        </p>
        <img 
          src={assets.arrow_icon} 
          alt="Back" 
          className='md:hidden w-10 h-7 cursor-pointer transition-transform hover:scale-110 hover:bg-stone-800 p-1 rounded-full' 
          onClick={() => setSelectedUser(null)}
        />
        <img src={assets.help_icon} alt="Help" className='max-md:hidden w-7 h-7 transition-transform hover:scale-110 hover:bg-stone-800 p-1 rounded-full' />
      </div>

      {/* Chat Messages */}
      <div className='flex flex-col gap-4 px-6 py-5 h-[calc(100%-72px)] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent pb-24'>
        {messages.map((msg, index) => {
          const isMe = String(msg.SenderId) === String(AuthUser._id);
          return (
            <div 
              key={index} 
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar on left for receiver */}
              {!isMe && (
                <img 
                  src={selectedUser?.ProFilePic || selectedUser?.profilePic || assets.avatar_icon} 
                  alt="" 
                  className='w-7 h-7 rounded-full border border-stone-500 shadow-sm order-1' 
                />
              )}
              {/* Message bubble */}
              {msg.text ? (
                <p className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md text-base font-medium ${
                  isMe
                    ? 'bg-purple-700 text-white rounded-br-none order-2'
                    : 'bg-purple-600 text-white rounded-bl-none order-2 border border-stone-700'
                }`}>
                  {msg.text}
                </p>
              ) : msg.image ? (
                <img src={msg.image} alt="sent" className='max-w-[300px] rounded-2xl shadow-lg border border-stone-700 order-2' />
              ) : (
                <p className="text-red-500 order-2">Invalid message</p>
              )}
              {/* Avatar on right for sender */}
              {isMe && (
                <img 
                  src={AuthUser?.ProFilePic || AuthUser?.profilePic || assets.avatar_icon} 
                  alt="" 
                  className='w-7 h-7 rounded-full border border-stone-500 shadow-sm order-3' 
                />
              )}
              {/* Timestamp (always after bubble) */}
              <span className='text-xs text-stone-400 mb-1 ml-1 mr-1 order-4'>
                {msg.createdAt ? formatMessageTime(msg.createdAt) : 'No Date'}
              </span>
            </div>
          )
        })}
        <div ref={scroolEnd}></div>
      </div>


      {/* bottom area */}

      <div className='absolute bottom-0 left-0 right-0 bg-stone-800 p-4 rounded-b-xl flex items-center gap-3'>
        <div className='flex-1 flex item-center bg-gray-100/12 px-3 rounded-full'>
          <input onChange={(e) =>{
            setInputValue(e.target.value);
          }}
          value={inputValue}
          onKeyDown={(e) =>{
            e.key === 'Enter' ? handleSendMessage(e): null;
          }} type="text" placeholder='Send message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
          <input onChange={handleSendImage} type="file" name="image" id="image" accept='image/png, image/jpeg' hidden/>
          <label htmlFor="image" >
            <img  src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer mt-3' />
          </label>
        </div>

        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-5 h-5 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-full gap-6'>
      <img src={assets.logo_icon} alt="Logo" className='w-16 h-16 drop-shadow-lg'/>
      <p className='text-xl font-semibold text-white opacity-80'>Welcome to the Chat App</p>
      <p className='text-base text-stone-300'>Select a user to start chatting</p>
    </div>
  )
}

export default ChatContainer
