/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'


import './index.css'
import { Main } from './pages/main'
import { AnswerViewer } from './pages/AnswerViewer'

 
const router = createBrowserRouter([
  {
    // eslint-disable-next-line react/jsx-filename-extension
    element: <App />,
    children: [
      { 
        path: "/",
        element: <Main />
      },
      { 
        path: "/answer-viewer",
        element: <AnswerViewer />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
