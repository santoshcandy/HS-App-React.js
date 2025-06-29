 import React from 'react';
//  import HeadingSection from '../components/HeadingSection';
import OurService from '../components/OurService';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceAreas from '../components/ServiceAreas';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AnimatedButton from '../components/AnimatedButton';
import WarrantySection from '../components/WarrantySection';
 import QuickSupport from '../components/QuickSupport';

 
 const HomePorfolio = () => {
    return ( 
            <>
            {/* <HeadingSection/> */}
            <OurService/>
             <AnimatedButton text="Book Now" to="/services" />
             <WarrantySection/>
            <WhyChooseUs/>
            <ServiceAreas/>
            <Testimonials/>
             <QuickSupport/>
            <Footer/>
            </>

     );
 }
  
 export default HomePorfolio;