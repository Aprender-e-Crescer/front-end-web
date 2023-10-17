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
import { IncubatorLandingPage } from './pages/IncubatorLandingPage'
import { IncubatorComoFunciona } from './pages/IncubatorComoFunciona'
import { IncubatorQueroParticipar } from './pages/IncubatorQueroParticipar'
import { IncubatorCentralDeDownloads } from './pages/IncubatorCentralDeDownloads'
import { IncubatorFormulario } from './pages/IncubatorFormulario'

 
export const router = createBrowserRouter([
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
        path: "/incubator-page",
          element: <IncubatorLandingPage />
      },
      {
        path: "/como-funciona-estrutura",
          element: <IncubatorComoFunciona />
      },
      {
        path: "/quero-participar-incubadora",
          element: <IncubatorQueroParticipar />
      },
      {
        path: "/incubadora-central-de-downloads",
          element: <IncubatorCentralDeDownloads />
      },
      {
        path: "/incubadora-formulario",
          element: <IncubatorFormulario />
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
