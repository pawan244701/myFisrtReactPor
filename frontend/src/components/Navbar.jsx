import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = ({ logoSrc }) => {
    const { isAuthorized, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = ( event ) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }; 
    }, [isOpen]);

    return (
        <div className={styles["main-container"]}>
            <div className={styles["logo-container"]}>
                <img
                    src={logoSrc}
                    alt='Logo'
                    className={styles['actual-logo']}
                />
            </div >

            <div className={`${styles['toggle-container']} ${isOpen ? styles.open : ''}`}>
                <Link to='/userProfile' className={styles['nav-links']}>Profile</Link>
                <Link to='/home' className={styles['nav-links']}>Home</Link>
                <Link to='/contact' className={styles['nav-links']}>Contact</Link>
                <Link
                    to='/login'
                    className={styles['nav-links']}
                    onClick={isAuthorized ? logout : undefined}
                >{isAuthorized ? 'Logout' : 'Login'}
                </Link>

                {!isAuthorized && (<Link to='/signup' className={styles['nav-links']}>Signup</Link>)}

            </div>
            <button
            ref={menuRef}
                className={styles['hamburger-menu']}
                onClick={toggleMenu}
            >&#128100;
            </button>
        </div>
    );
};
