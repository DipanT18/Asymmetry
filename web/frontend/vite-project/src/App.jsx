import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import './index.css'
import Home from './Home/Home.jsx'
import Explore from './explore.jsx'
import Login from './LoginPage/Login.jsx'
import Subscribtion from './Subscribtion.jsx'
import About from './About.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(  
    //Writing routes here
    <>
    <Route path = "/" element = {<Home />} />
    <Route path = "/explore" element = {<Explore />} />
    <Route path = "/login" element = {<Login />} />
    <Route path = "/subscribe" element = {<Subscribtion/>} />
    <Route path = "/about" element = {<About />} />
    </>
  )
)

export default function App() {
  return (
    <RouterProvider router = {router} />
  )
}