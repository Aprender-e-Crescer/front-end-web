import { Link } from 'react-router-dom'
import './Footer.css'

import React from 'react'

const Footer = () => {
  return (
   <footer className='footer'>
        <div className='pe'>
            <img src="/img/logomarcaSudo.png" alt="logoSudo" />
        </div>

        <div className='pe2'>
            <span >
                <span>Desenvolvido por Mar Virtual
2023 - SUDOTEC Desenvolvimento e tecnologia. Todos os direitos reservados</span>
            </span>
        </div>
   </footer>
  )
}
export default Footer