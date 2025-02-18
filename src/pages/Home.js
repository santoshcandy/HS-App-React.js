import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ServiceCategories from '../components/ServiceCategories'
import Footer from '../components/Footer'
import HeadingSection from '../components/HeadingSection'

const Home = () => {
  return (
    <div>
      < HeadingSection/>
      <SearchBar/>
      <ServiceCategories/>
      <Footer/>
    </div>
  )
}

export default Home
