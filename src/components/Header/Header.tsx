import Avatar from '../Avatar'
import Sidebar from '../Sidebar/Sidebar'
import { useState } from 'react'

export default function Header() {
  const [show, setShow] = useState(false)
  return (
    <>
      <header className='flex justify-between p-10 bg-blue-700'>
        <button onClick={() => setShow(!show)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Avatar />
      </header>
        {
          show ? <Sidebar /> : null
        }
    </>
  )
}


