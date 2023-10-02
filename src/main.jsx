/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'


import './index.css'

import { Formulario } from './routes/form/Formulario.jsx'
 
const router = createBrowserRouter([
  {
    // eslint-disable-next-line react/jsx-filename-extension
    element: <App />,
    children: [
      { 
        path: "/",
        element: <Formulario />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <RouterProvider router={router}/>
    
  </React.StrictMode>
)
