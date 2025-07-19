import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const ProfilePage = () => {

  const [SelectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Dummy User");
  const [bio, setBio] = useState("This is a dummy bio for the user profile.");

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    navigate('/'); // Redirect to home page after form submission
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-290 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={onsubmitHandler} action="" className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='text-sm text-gray-500'>
            <input onChange={(e) =>{
              setSelectedImage(e.target.files[0]);
            }} type="file" name="avatar" id="avatar" accept='.png, .jpg, .jpeg' hidden/>
            <img src={SelectedImage ? URL.createObjectURL(SelectedImage) : assets.avatar_icon} alt="" className={`w-24 h-24 ${SelectedImage && "rounded-full"} `}/>
          </label>
          <input onChange={(event) =>{
            setName(event.target.value);
            value = {name};
          }} type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500'/>

          <textarea name="" id="" placeholder='Write somethig cool' required className='p-2 border border-gray-500 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500' rows={4} onChange={(event)  => {
            setBio(event.target.value);
            value = {bio};
          }}>  </textarea>

          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md cursor-pointer' >Save</button>
        </form>
        <img src={assets.logo_icon} alt="" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 '/>
      </div>
    </div>
    </div>
  )
}

export default ProfilePage