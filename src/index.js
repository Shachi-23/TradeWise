import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import HomePage from './components/Homepage/HomePage';
import SignUpPage from './components/SignUp/SignUpPage';
import LearnToUse from './components/LearnToUse/LearnToUse';
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Dashboard/MainPage/MainPage';
import AddToWishlist from './components/Dashboard/AddToWishlist/AddToWishlist';
import Holdings from './components/Dashboard/Holdings/Holdings';
import Funds from './components/Dashboard/Funds/Funds';
import UserProfile from './components/Dashboard/UserProfile/UserProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/learntouse" element={<LearnToUse />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/addtowishlist" element={<AddToWishlist />} />
      <Route path="/holdings" element={<Holdings />} />
      <Route path="/funds" element={<Funds />} />
      <Route path="/userprofile" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>
);
