import { useState } from "react";
import { Navbar } from '../components/Navbar'
import { Login } from "../components/Login";
import { Signup } from './Signup';

import './Home.module.css';

export const Home = () => {
    const [activePage, setActivePage] = useState('Home');
    const navTo = (pageName) => {
        setActivePage((currentState) => currentState === pageName ? 'Home' : pageName);
    }

    return (
        <div>
            <Navbar onLoginClick={() => navTo('Login')} onSignupClick={() => navTo('Signup')} />


            {/* //1st on page load : activePage is home bcoz we've passed in USESTATE() so is home === signup FALSE don't even look at other side
            //2nd time clicking signup : activePage is signup page now condition is TRUE show the signup page */}
            
            
            {activePage === 'Signup' && <Signup />}
            {activePage === 'Login' && <Login />}
        </div>
    )
};