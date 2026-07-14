import { useState } from 'react'
import './App.css'

function App() {
  const formFuck = (event) => {
    event.preventDefault();
    alert('it is new React learning project yuou will definetly find someting within few days');
    event.target.reset();
  }

  return (
    <div>
    <form onSubmit={formFuck}>
      <h1>Login Form</h1>
      <label htmlFor="email">Enter Email</label>
      <input type="email" id='email' name='email' placeholder='example@email.com' autoComplete='email' required/>
      <label htmlFor="password">Password</label>
      <input type="password" id='password' name='password' placeholder='pass123*&^' autoComplete='current-password' required />
      <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default App
