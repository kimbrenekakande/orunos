import React from 'react'

function page() {
  return (
    <div className=' h-screen w-screen flex flex-col items-center justify-center'>
      <form action="" className='w-60%'>
        <label htmlFor="discount" className='block'> discount </label>
        <input type="text" name='discount' id='discount' defaultValue={70} className='border border-white' />
      </form>
    </div>
  )
}

export default page 