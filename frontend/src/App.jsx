import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route } from "react-router-dom"

export default () => {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}