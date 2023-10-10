/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'


import './index.css'

import { Formulario } from './pages/form/formulario.jsx'
import { Main } from './pages/main.js'
 
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { 
        path: "/",
        element: <Main />
      },
      { 
        path: "/form",
        element: <Formulario />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
