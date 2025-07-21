import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import {Toaster} from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function App() {
  const {AuthUser} = useContext(AuthContext);

  return (
    <>
    <div className="bg-[url('../src/assets/bgImage.svg')]  bg-contain">
    <Toaster />
      <Routes>

        <Route path='/' element= {AuthUser ? <HomePage/> : <Navigate to ="/login"/>}/>
        <Route path='/login' element= {!AuthUser ? <LoginPage/> : <Navigate to ="/"/>}/>
        <Route path='/profile' element= {AuthUser ? <ProfilePage/> : <Navigate to ="/login"/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
