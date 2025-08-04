import React from 'react';
// import HeadingSection from '../components/HeadingSection';
import OurService from '../components/OurService';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceAreas from '../components/ServiceAreas';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AnimatedButton from '../components/AnimatedButton';
import WarrantySection from '../components/WarrantySection';
import QuickSupport from '../components/QuickSupport';
import BookingForm from '../components/BookingForm';

const HomePorfolio = () => {
  return (
    <>
      {/* <HeadingSection /> */}
      <OurService />

      {/* Fixed "Book Now" button that scrolls to the booking form */}
      <AnimatedButton text="Book Now" to="/" scrollToId="booking-form" />

      {/* Booking form section with scroll target ID */}
      <div id="booking-form">
        <BookingForm />
      </div>

      <WarrantySection />
      <WhyChooseUs />
      <ServiceAreas />
      <Testimonials />
      <QuickSupport />
      <Footer />
    </>
  );
};

export default HomePorfolio;
