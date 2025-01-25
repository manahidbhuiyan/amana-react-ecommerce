import React from 'react'
import TopHead from '../header/TopHead'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='fixed top-0 z-20 w-full bg-lightgrey'>
      <TopHead />
      <Navbar />
    </div>
  )
}

export default Header
