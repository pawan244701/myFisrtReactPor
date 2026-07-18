import { useState } from "react";
import { Navbar } from './Navbar'
import { Login } from "./Login";
import { Signup } from './Signup';

import './Home.module.css';

export const Home = () => {
    const [activePage, setActivePage] = useState('home');
    const navTo = (pageName) => {
        setActivePage((currrentState) => currrentState === pageName ? 'home' : pageName);
    }

    return (
        <div>
            <Navbar onLoginClick={() => navTo('login')} onSignupClick={() => navTo('signup')} />


            {/* //1st on page load : activePage is home bcoz we've passed in USESTATE() so is home === signup FALSE don't even look at other side
            //2nd time clicking signup : activePage is signup page now condition is TRUE show the signup page */}
            
            
            {activePage === 'signup' && <Signup />}
            {activePage === 'login' && <Login />}
        </div>
    )
};