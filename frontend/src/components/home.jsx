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
            {activePage === 'signup' && <Signup />}
            {activePage === 'login' && <Login />}
        </div>
    )
};