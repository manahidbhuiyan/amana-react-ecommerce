import React from 'react'
import Hero from '../../components/Home/Hero'
import NewProducts from '../../components/Home/NewProducts'
import SpecialOffers from '../../components/Home/SpecialOffers'

const Home = () => {
  return (
    <div className='mt-10 px-4'>
      <Hero />
      <SpecialOffers />
      <NewProducts />
    </div>
  )
}

export default Home
