import React from 'react'
import assets from '../assets/assets'
import { useState } from 'react';

const LoginPage = () => {

  const [currState , setCurrState] = useState("Sign Up");
  const [FullName , setFullName] = useState("");
  const [Email , setEmail] = useState("");
  const [Password , setPassword] = useState("");
  const [bio , setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);


  const onsubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      // Simulate data submission
      console.log("User Data Submitted:", { FullName, Email, Password, bio });
      setIsDataSubmitted(true);
      return;
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>

      {/* right */}
      <form onSubmit={onsubmitHandler} action="" className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg '>
        <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}</h2>
        {isDataSubmitted && (
          <img onClick={() =>{
            setIsDataSubmitted(false)
          }} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
        )}
        
        {currState === "Sign Up" && !isDataSubmitted &&(
          <input onChange={(event) => {
            setFullName(event.target.value);
          }} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none ' placeholder='Full name' required/>
        )}
        {!isDataSubmitted && (
          <>
          <input onChange={(event)=>{
            setEmail(event.target.value)
          } } type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email' required/>
          <input onChange={(event) =>{
            setPassword(event.target.value)
          }} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' required/>


          </>
        )}

        {
          currState === "Sign Up" && isDataSubmitted && (
            <textarea rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Bio' required onChange={(event) => {
              setBio(event.target.value);
            }}></textarea>
          )
        }


        <button type='submit' className='bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-purple-900 transition-colors cursor-pointer font-semibold text-base w-80'>
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex-items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" name="" id="" />
          <p>Agree to the terms and conditions</p>
        </div>

        <div className='flex flex-col gap-2'> 
          {currState === "Sign Up" ? (
            <p className='text-sm text-gray-500'>Already have an account? <span onClick={() =>{
              setCurrState("Login");
              setIsDataSubmitted(false);
            }} className='font-medium text-violet-500 cursor-pointer'>Login</span></p>
          ) : (
            <p className='text-sm text-gray-500'>Don't have an account? <span onClick={() =>{
              setCurrState("Sign Up");
              setIsDataSubmitted(false);
            }} className='font-medium text-violet-500 cursor-pointer'>Sign Up</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage