import React from 'react'
import NavLinks from './NavLinks'

const NavBar = () => {
  return (
    <nav className='flex items-center justify-center '>
        <div>
            <ul className='md:flex hidden'>
                <li>
                    <NavLinks />
                </li>
            </ul>
            {/* Mobile Nav */}
            <ul className=' flex md:hidden w-full h-full '>
                <li>
                    <NavLinks />
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar