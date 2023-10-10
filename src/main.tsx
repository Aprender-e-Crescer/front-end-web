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
import { AdminLandingPageSelector }from './pages/AdminLandingPageSelector'

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
        path: "/formulario-edicao",
        element: <FormUpSert/>
      },
      {
        path: "/form",
        element: <Formulario />
      },
      { 
        path: "/admin-landing-page-editor",
        element: <AdminLandingPageEditor /> 
      },
      {
        path: "/admin-landing-page-selector",
        element: <AdminLandingPageSelector /> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
