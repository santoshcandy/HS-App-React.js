import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServiceList from './components/ServiceList';
import Booking from "./pages/Booking";
import SelectedServices from './components/SelectedServices';
import "./index.css"
import Login from './components/Login'
import BookingList from './components/BookingList';
// import BottomNav from './components/BottomNav';
import AllBookings from './components/AllBookings';
import BookingNotifications from './components/BookingNotifications';
import ProfilePage from './components/ProfilePage';
import HomePorfolio from './pages/HomePorfolio';
import Layout from './components/Layout';
import HeadingSection from './components/HeadingSection';

function App() {
  const [selectedServices, setSelectedServices] = useState([]);
  return (
    <Router>
      <div >
          <HeadingSection/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Home />} />
          <Route path="/" element={<HomePorfolio />} />
          <Route path="/category/:categoryId" element={<ServiceList selectedServices={selectedServices} setSelectedServices={setSelectedServices} />} />
          <Route path='/selected-services' element={<SelectedServices selectedServices={selectedServices} />} />
          <Route path="/booking" element={<Booking />} />
          <Route path='/booking-list' element={<BookingList />} />
          <Route path='/all/booking-list' element={<AllBookings />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        <Layout />
      </div>
      <BookingNotifications />
    </Router>
  );
}

export default App;
