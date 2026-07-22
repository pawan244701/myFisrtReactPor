import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// my own files imports
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Games } from './pages/Games';

import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className='app-container'>
      <Navbar />
      {/* placed here so that it can be renderd on all pages. */}

      <main className='main-container'>
        <Routes>
          {/* Routes : thsi will be holding all of our route */}

          {/* Route : these can be multiples in a return, these are indivisual... like: i can say URL, It works like: path = what is in URL e.g. : my-site.com/ and element = is what React will render on the associated path */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/games' element={<Games />} />
          {/* NOte : here should not be any tralling spaces like: path='/games ' it should be path='/games' othetwise it won't work */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
