import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingLayout from './layouts/LandingLayout'
import Homepage from './pages/Homepage'
import AddBook from './pages/AddBook'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import BooksPage from './pages/BooksPage'
import SinglePage from './pages/SinglePage'
import { ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'




const App = () => {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Navbar/>
    <Routes>
     <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    
       <Route path='/' element={<LandingLayout/>}>
           <Route index element={<Homepage/>}/>
          <Route path='/add' element={<AddBook/>}/>
          <Route path='/books' element={<BooksPage/>}/>
          <Route path='/books/:id' element={<SinglePage/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>

    
      
    </>
  )
}

export default App
