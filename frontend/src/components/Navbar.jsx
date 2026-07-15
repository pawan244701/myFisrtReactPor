import { useState } from 'react'
import './Navbar.css'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="main-container">
            <div className="logo-container">
                <a href="#" >Logo</a>
            </div >
            <div className={`toggle-container ${isOpen ? 'open' : ''}`}>
                <div className='nav-links-container'>
                    <a href="#" className='nav-links'>Home</a>
                    <a href="#" className='nav-links'>Games</a>
                    <a href="#" className='nav-links'>Anime</a>
                </div>
                <div className='nav-button-container'>
                    <button>Login</button>
                    <button>Signup</button>
                </div>
            </div>
            <button className='hamburger-menu' onClick={toggleMenu}>&#9776;</button>
        </div>
    );
};
