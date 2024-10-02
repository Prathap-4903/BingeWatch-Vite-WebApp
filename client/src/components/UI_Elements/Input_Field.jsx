import React from 'react'

const Input = () => {
  return (
    <>
        <div className="w-full space-y-1">
            <label htmlFor="name" className="font-geist-semi">Enter Name : </label>
            <div className="relative w-full">
                <input required type="text" id="name" className="block w-full font-geist-medium font-light px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2  peer focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black placeholder-transparent" placeholder="" />
                <label htmlFor="name" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
            </div>
        </div>
    </>
  )
}

export default Input