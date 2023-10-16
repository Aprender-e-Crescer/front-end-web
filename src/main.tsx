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
import { BusinessGraduates } from './pages/BusinessGraduates'
import { BusinessIncubated } from './pages/BusinessIncubated'
import { MentorNetwork } from './pages/MentorNetwork'

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
      },
      { 
        path: "/empresas-graduadas",
        element: <BusinessGraduates /> 
      },
      { 
        path: "/empresas-incubadas",
        element: <BusinessIncubated /> 
      },
      { 
        path: "/rede-de-mentores",
        element: <MentorNetwork /> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
