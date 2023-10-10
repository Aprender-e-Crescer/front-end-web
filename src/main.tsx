/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'


import './index.css'
import RestrictLoginFront from './components/RestrictLoginFront'
import { AnswerViewer } from './pages/AnswerViewer'
import { FormUpSert } from './pages/FormUpSert'
import { AdminLandingPageEditor } from './pages/AdminLandingPageEditor'
 
const router = createBrowserRouter([
  {
    // eslint-disable-next-line react/jsx-filename-extension  
    element: <App />,
    children: [
      {
        path: "/answer-viewer",
        element: <AnswerViewer />
      },
      { 
        path: "/arearestrita",
        element: <RestrictLoginFront/>
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
