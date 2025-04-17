import React from 'react';

const NavLinks = () => {
  const links = [{name: "FRIENDS"}, {name: "GROUPS"}];

  return (
    <>
      <div className='flex items-center gap-16 mr-6 font-geist-bold font-bold'>
        <a href="#" className='hover:underline'>FRIENDS</a>
        <a href="#" className='hover:underline'>GROUPS</a>
        <a href="/contact" className='hover:underline'>CONTACT</a>
        <a href="/about-us" className='hover:underline'>ABOUT US</a>
      </div>
    </>
  )
}

export default NavLinks;