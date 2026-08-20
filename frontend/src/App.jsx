import { Routes, Route, useLocation } from 'react-router-dom';

// my own files imports
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { UserProfile } from './pages/UserProfile';

import styles from './App.module.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import logoImg from "./assets/logoImg/kali.png";
import { CreatePublicProfile } from './pages/CreatePublicProfile';
import { AllPublicUsersProfile } from './pages/AllPublicUsersProfile';
import { EditProfile } from './pages/EditProfile';
import { PostFeed } from './pages/PostFeed';
import { GameGuessTheNum } from './components/GameGuessTheNum';

function App() {
  const location = useLocation();
  const noFooterRoutes = ['/games', '/explore', '/signup', '/login', '/feed', '/edit-profile', '/contact'];
  const showFooter = !noFooterRoutes.includes(location.pathname);
  return (
    <div className={styles['app-container']}>
      <Navbar logoSrc={logoImg} />
      {/* placed here so that it can be renderd on all pages. */}

      <main className={styles['main-container']}>
        <Routes>
          {/* Routes : thsi will be holding all of our route */}

          {/* Route : these can be multiples in a return, these are indivisual... like: i can say URL, It works like: path = what is in URL e.g. : my-site.com/ and element = is what React will render on the associated path */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/explore' element={<AllPublicUsersProfile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/be-visible' element={<CreatePublicProfile />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/feed' element={<PostFeed />} />
          <Route path='/games' element={<GameGuessTheNum />} />

          <Route path='/:username' element={<UserProfile />} />

          {/* NOte : here should not be any tralling spaces like: path='/games ' it should be path='/games' othetwise it won't work */}
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default App
