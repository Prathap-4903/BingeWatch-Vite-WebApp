import React from 'react'

const NavLinks = () => {

    const links = [{name: "FRIENDS"}, {name: "GROUPS"}];

  return (
    <>
        <div className='flex items-center gap-16 mr-6'>
            <a href="#">FRIENDS</a>
        <a href="#">GROUPS</a>
        </div>
    </>
  )
}

export default NavLinks