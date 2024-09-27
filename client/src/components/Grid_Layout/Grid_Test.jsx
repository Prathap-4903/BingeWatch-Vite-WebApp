import React from 'react'

const Grid= () => {
  return (
    <>
        <div className='main-window flex items-center justify-center w-full h-screen bg-slate-300'>
            <div className='grid-layout h-full w-full grid grid-cols-11 grid-rows-9 gap-2 p-2'>
                <div className='col-span-2 row-span-1 rounded-xl bg-red-400 flex items-center justify-center'>LOGO</div>
                <div className='col-span-7 row-span-1 rounded-xl bg-orange-400 flex justify-end items-center'>NAV</div>
                <div className='col-span-2 row-span-1 rounded-xl bg-yellow-400 flex items-center justify-center'>PROFILE & LOGOUT</div>
                <div className='col-span-2 row-span-4 rounded-xl bg-green-400 flex items-center justify-center'>LEFT-SIDE</div>
                <div className='col-span-7 row-span-4 rounded-xl bg-blue-500 flex items-center justify-center'>HEADLINES</div>
                <div className='col-span-2 row-span-4 rounded-xl bg-purple-600 flex items-baseline justify-center'>HISTORY</div>
                <div className='col-span-2 row-span-4 rounded-xl bg-gray-700 flex items-center justify-center'>BOTTOM-L</div>
                <div className='col-span-7 row-span-4 rounded-xl bg-green-900 flex items-baseline justify-center'>BUTTONS</div>
                <div className='col-span-2 row-span-4 rounded-xl bg-blue-900 flex items-center justify-center'>BOTTOM-R</div>
            </div>
        </div>
    </>
  )
}

export default Grid