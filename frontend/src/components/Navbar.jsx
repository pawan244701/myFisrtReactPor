import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = ({ logoSrc }) => {
    const { isAuthorized, logout, isVisible, profileDetails } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    const handleLinkClick = () => {
        setIsOpen(false); // Close menu when a navigation link is clicked
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles["main-container"]}>
            <Link to='/home' className={styles['nav-links']}>
                <div className={styles["logo-container"]}>
                    <img
                        src={logoSrc}
                        alt='Logo'
                        className={styles['actual-logo']}
                    />
                </div >
            </Link>

            <div ref={menuRef}
                className={`${styles['toggle-container']} 
            ${isOpen ? styles.open : ''}`}>

                {isAuthorized && isVisible && profileDetails && (
                    <Link
                        to={`/${profileDetails}`}
                        className={styles['nav-links']}
                        onClick={handleLinkClick}
                    >
                        Profile
                    </Link>
                )}
                {isAuthorized && !isVisible && (
                    <Link
                        to='/be-visible'
                        className={styles['nav-links']}
                        onClick={handleLinkClick}
                    >
                        Be-Visible
                    </Link>
                )}


                <Link to='/explore' className={styles['nav-links']}>Explore</Link>

                <Link to='/contact' className={styles['nav-links']}>Contact</Link>

                <Link
                    to='/login'
                    className={styles['nav-links']}
                    onClick={isAuthorized ? logout : undefined}
                >{isAuthorized ? 'Logout' : 'Login'}
                </Link>
                {!isAuthorized && (
                    <Link
                        to='/signup'
                        className={styles['nav-links']}
                    >Signup</Link>)}
            </div>
            <button
                ref={buttonRef}
                className={styles['hamburger-menu']}
                onClick={toggleMenu}
            >&#128100;
            </button>
        </div>
    );
};
