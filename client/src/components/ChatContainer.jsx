import React, { use } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { useEffect } from 'react';

const ChatContainer = ({selectedUser, setSelectedUser}) => {

  const scroolEnd = React.useRef(null);

  useEffect(() => {
    if (scroolEnd.current) {
      scroolEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative '>

      {/* Header */}
      <div className='flex items-center gap-4 py-4 px-6 border-b border-stone-600 bg-black/30 rounded-t-xl'>
        <img src={assets.profile_martin} alt="" className='w-10 h-10 rounded-full border-2 border-green-400 shadow-md'/>
        <p className='flex-1 text-lg text-white font-semibold flex items-center'>
          Martin jonson 
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
        {messagesDummyData.map((msg, index) => {
          const isMe = msg.senderId === '89jnjn4b38cn4h4d9f6';
          return (
            <div 
              key={index} 
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar on left for receiver, right for sender */}
              {!isMe && (
                <img 
                  src={assets.profile_martin} 
                  alt="" 
                  className='w-7 h-7 rounded-full border border-stone-500 shadow-sm' 
                />
              )}
              {/* Message bubble */}
              {msg.image ? (
                <img src={msg.image} alt="" className='max-w-[300px] rounded-2xl shadow-lg border border-stone-700'/>
              ) : (
                <p className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md text-base font-medium ${isMe ? 'bg-purple-700 text-white rounded-br-none' : 'bg-purple-600 text-white rounded-bl-none border border-stone-700'}`}>{msg.text}</p>
              )}
              {/* Timestamp */}
              <span className='text-xs text-stone-400 mb-1 ml-1 mr-1'>{formatMessageTime(msg.createdAt)}</span>
              {/* Avatar on right for sender */}
              {isMe && (
                <img 
                  src={assets.avatar_icon} 
                  alt="" 
                  className='w-7 h-7 rounded-full border border-stone-500 shadow-sm' 
                />
              )}
            </div>
          )
        })}
        <div ref={scroolEnd}></div>
      </div>


      {/* bottom area */}

      <div className='absolute bottom-0 left-0 right-0 bg-stone-800 p-4 rounded-b-xl flex items-center gap-3'>
        <div className='flex-1 flex item-center bg-gray-100/12 px-3 rounded-full'>
          <input type="text" placeholder='Send message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
          <input type="file" name="" id="image" accept='image/png, image/jpeg' hidden/>
          <label htmlFor="image" >
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer mt-3' />
          </label>
        </div>

        <img src={assets.send_button} alt="" className='w-5 h-5 cursor-pointer' />
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
