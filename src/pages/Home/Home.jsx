import React, { useEffect, useState } from 'react'
import Hero from '../../components/Home/Hero'
import NewProducts from '../../components/Home/NewProducts'
import SpecialOffers from '../../components/Home/SpecialOffers'
import { useSelector } from 'react-redux'
import Location from '../../components/layout/Navbar/Location/Location'

const Home = () => {

  const [showLocationModal, setShowLocationModal] = useState(false);
  const localSelectArea = localStorage.getItem("selectedArea")

  
  useEffect(() => {
    console.log("localSelectArea",localSelectArea)
    if (!localSelectArea) {
      alert("You need to select an area first");
      setShowLocationModal(true);
    }
  }, [localSelectArea]);
  
  return (
    <div className='mt-10 px-4'>
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Location onClose={() => setShowLocationModal(false)} />
        </div>
      )}
      {localSelectArea ? (
        <>
          <Hero />
          <SpecialOffers />
          <NewProducts />
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">Please select your area first</h2>
        </div>
      )}
    </div>
  )
}

export default Home