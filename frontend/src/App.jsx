import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Signup } from './components/Signup'
import { Login } from './components/Login'

import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleSignup = () => {
    setShowSignup(previousState => !previousState);
    setShowLogin(false);
  }
  const toggleLogin = () => {
    setShowLogin(previousState => !previousState);
    setShowSignup(false);
  }


  return (
    <div>
      <Navbar onSignupClick={toggleSignup} onLoginClick={toggleLogin}/>
      {showSignup && <Signup />}
      {showLogin && <Login />}
    </div>
  )
}

export default App
