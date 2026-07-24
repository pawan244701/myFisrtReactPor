import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

export const Navbar = ({ logoSrc }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
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
                <Link to='/home' className={styles['nav-links']}>Home</Link>
                <Link to='/games' className={styles['nav-links']}>Games</Link>
                <Link to='' className={styles['nav-links']}>Anime</Link>
                <Link to='/login' className={styles['nav-links']}>Login</Link>
                <Link to='/signup' className={styles['nav-links']}>Signup</Link>
            </div>
            <button className={styles['hamburger-menu']} onClick={toggleMenu} >&#9776;</button>
        </div>
    );
};
