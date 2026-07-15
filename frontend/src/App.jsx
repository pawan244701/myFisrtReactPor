import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Signup } from './components/Signup'
import './App.css'

function App() {
  const formFuck = (event) => {
    event.preventDefault();
    alert('it is new React learning project yuou will definetly find someting within few days');
    event.target.reset();
  }

  return (
    <div>
      <Navbar />
      {/* <Signup /> */}
    </div>
  )
}

export default App
