import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServiceList from './components/ServiceList';
import Booking from "./pages/Booking";
import SelectedServices from './components/SelectedServices';

import Login from './components/Login'
import BookingList from './components/BookingList';
import BottomNav from './components/BottomNav';
function App() {
  return (
    <Router>
      
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ServiceList />} />
          <Route path="/booking" element={<Booking/>} />
          <Route path='/selected-services' element={<SelectedServices/>}/>
          <Route path='/booking-list' element={< BookingList/>}/>

        </Routes>
        <BottomNav/>
      </div>
     
    </Router>
  );
}

export default App;
