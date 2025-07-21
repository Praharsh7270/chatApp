import React from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'

const HomePage = () => {

    const [selectedUser, setSelectedUser] = React.useState("");

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
            <SideBar />
            <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />
            <RightSideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
    </div>
  )
}

export default HomePage