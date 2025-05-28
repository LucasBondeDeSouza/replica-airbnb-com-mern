import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

import { UserContextProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Place from './pages/Place';
import NotFound from './pages/NotFound';

axios.defaults.baseURL = 
  import.meta.env.MODE === 'development'
    ? "http://localhost:3000/api"
    : "http://localhost:3000/api"

axios.defaults.withCredentials = true

export default () => {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:subpage/:action?/:id?' element={<Account />} />
          <Route path='/place/:id' element={<Place />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}