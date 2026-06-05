import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    //Writing routes here
    <Route path = "/" element = {} />
  )
)

//Router provider is used to provide the router to the entire application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
