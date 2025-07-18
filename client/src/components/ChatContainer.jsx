import React from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = ({selectedUser,setSelectedUser}) => {
  return selectedUser ? (

    // header
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className='w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex item-center'>Martin jonson <span className='w-2 h-2 rounded-full bg-green-500'></span></p>
        <img src={assets.arrow_icon} alt="" className='md:hidden max-w-7' onClick={() =>{
          // Logic to handle back navigation or collapse chat
          setSelectedUser(null) 
        }}/>
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-7' />
      </div>
        {/* chat details here */}
      <div className='flex flex-col gap-3 p-5 h-[calc(100%-60px)] overflow-y-scroll'>
        {messagesDummyData.map((msg,index) =>{
          return <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '89jnjn4b38cn4h4d9f6' && 'flex-row-reverse'}`} > {msg.image ? (
            <img src={msg.image} alt="" className='max-w-[300px] rounded-lg'/>
          ): (
            <p className='text-white'>{msg.text}</p>
          )} </div>
        })}
        <div className='text-center text-xs'>
          <img src={ms.senderId === '89jnjn4b38cn4h4d9f6' ? assets.avatar_icon : assets.profile_martin} alt="" />
        </div>
      </div>
    </div>
  ) : 
  <div className='flex flex-col items-center justify-center h-full gap-5'>
    <img src={assets.logo_icon} alt="" className='max-w-16'/>
    <p className='text-lg font-medium text-white'>Hello </p>
  </div>
}

export default ChatContainer