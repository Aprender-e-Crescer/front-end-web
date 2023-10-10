/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

import { AnswerViewer } from './pages/AnswerViewer'
import { FormUpSert } from './pages/FormUpSert'
import { AdminLandingPageEditor } from './pages/AdminLandingPageEditor'
import { Formulario } from './pages/Formulario'
import { ACLandingPage } from './pages/ACLandingPage'

import './index.css'
 
const router = createBrowserRouter([
  {
    // eslint-disable-next-line react/jsx-filename-extension  
    element: <App />,
    children: [
      {
        path: '/',
        element: <ACLandingPage />
      },
      {
        path: "/answer-viewer",
        element: <AnswerViewer />
      },
      {
        path: "/form",
        element: <Formulario />
      },
      {
        path: "/formulario-edicao",
        element: <FormUpSert/>
      },
      { 
        path: "/admin-landing-page-editor",
        element: <AdminLandingPageEditor /> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
