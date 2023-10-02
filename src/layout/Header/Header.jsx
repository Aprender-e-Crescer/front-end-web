import { Link } from 'react-router-dom'
import './Header.css'

import React from 'react'

const Header = () => {
  return (
   <header className='header'>
        <div className='head'>
            <Link to={`/`}>
            <img src="/img/logomarcaSudo.png" alt="logoSudo" />
            </Link>
        </div>

        <div className='head2'>
            <span>
                (46) 3536-6281
                </span>
            <span className='restrita'>
                <Link>
                ÁREA RESTRITA
                </Link>
            </span>
        </div>
   </header>
  )
}
export default Header
