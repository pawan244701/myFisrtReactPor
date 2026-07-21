import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// my own files imports
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { Footer } from './pages/Footer';
import { Games } from './pages/Games';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        {/* Routes : thsi will be holding all of our route */}

        {/* Route : these can be multiples in a return, these are indivisual... like: i can say URL, It works like: path = what is in URL e.g. : my-site.com/ and element = is what React will render on the associated path */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/about' element={<About />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/games' element={<Games />} />
      </Routes>
    </div>
  )
}

export default App
