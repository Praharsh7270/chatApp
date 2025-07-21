import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useState } from 'react'
import { useEffect } from 'react'

const SideBar = () => {

    const {logout,onlineUsers, AuthUser} = useContext(AuthContext);

    const {setSelectedUser,getUsers,selectedUser,users,unseenMessages,setUnseenMessages} = useContext(ChatContext);
    const[inputValue, setInputValue] = useState("");


    const navigate = useNavigate();

    // Filter out the current user from the users list
    const filteredUsers = (users || []).filter(user => user._id !== AuthUser?._id);
    const filterUser  = inputValue ? filteredUsers.filter((user) => user.fullName.toLowerCase().includes(inputValue.toLowerCase())) : filteredUsers;

    useEffect   (() => {
        getUsers();
    }),[onlineUsers]

    useEffect(() => {
      console.log('Online users:', onlineUsers);
    }, [onlineUsers]);

  return (
    <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
        <div className='pb-5 '>
            <div className='flex justify-between items-center '>
                <img src={assets.logo} alt="logo"  className='max-w-40'/>
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} alt="" className='max-h-5 cursor-pointer'/>

                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#3489] border border-gray-600 test-gray-100 hidden group-hover:block'>
                        <p onClick={() =>{
                            navigate('/profile')
                        }}>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500'/>
                        <p className='cursor-pointer text-sm' onClick={logout}>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#2f3136] rounded-full flex items-center gap-3 px-3 py-3 mt-5'>
                <img src={assets.search_icon} alt="Search" className='w-3' />
                <input onChange={(e) =>{
                    setInputValue(e.target.value);
                }} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Seach'/>
            </div>
        </div>

        <div className='flex flex-col'>
            {filterUser.map((user, index) => {
                // Determine profile image source
                let profileImgSrc = assets.avatar_icon;
                if (user?.ProFilePic) {
                  profileImgSrc = user.ProFilePic;
                } else if (user?.profilePic) {
                  profileImgSrc = user.profilePic.startsWith('http')
                    ? user.profilePic
                    : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/${user.profilePic}`;
                } else {
                  console.warn('No profile picture for', user.fullName);
                }
                return (
                  <div onClick={() => setSelectedUser(user)} key={index} className={`relative flex items-center gap-3 p-3 rounded-lg hover:bg-[#2f3136] cursor-pointer ${selectedUser?._id === user._id ? 'bg-[#2f3136]' : ''}`} >
                    <img 
                      src={profileImgSrc}
                      alt=""
                      className='w-[35px] aspect-[1/1] rounded-full '
                    />
                    <div className='flex flex-col leading-5'>
                        <p>{user.fullName}</p>
                        {
                            // Use String() to ensure type match for comparison
                            onlineUsers && onlineUsers.map && onlineUsers.map(String).includes(String(user._id))
                                ? <span className='text-green-500'>online</span>  
                                : <span className='text-red-500'>offline</span>
                        }
                    </div>
                    {unseenMessages?.[user._id] && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p> }
                </div>
                );
            })}
        </div>
        
    </div>
  )
}

export default SideBar