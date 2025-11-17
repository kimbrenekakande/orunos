'use server'

import { addShit } from './creator'

function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <form action={addShit} className=' border border-gray-500 p-10 flex flex-col gap-2 w-[70%]'>
        <label htmlFor="qn"></label>
        <input type="text"  id='qn' name='qn' placeholder='Whats Your Question Lad' className='border border-gray-500 w-full h-8 p-2'/>

        <label htmlFor="ans"></label>
        <textarea rows={60} id='ans' name='ans' placeholder="Paste Your Answer Here Good Sir" className='border border-gray-500 w-full h-8' />

        <button className='bg-white hover:bg-orange-600 text-black px-4 py-2 rounded cursor-grab'>CREATE</button>
      </form>

    </div>
  )
}

export default Home