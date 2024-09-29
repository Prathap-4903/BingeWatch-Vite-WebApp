import React from 'react'

const NavLinks = () => {

    const links = [{name: "FRIENDS"}, {name: "GROUPS"}];

  return (
    <>
        <div className='flex items-center gap-16 mr-6 font-geist-bold font-bold'>
            <a href="#">FRIENDS</a>
            <a href="#">GROUPS</a>
            <a href="#">CONTACT</a>
            <a href="#">ABOUT US</a>

        </div>
    </>
  )
}

export default NavLinks