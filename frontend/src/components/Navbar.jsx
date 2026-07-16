import { useState } from 'react';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={styles["main-container"]}>
            <div className={styles["logo-container"]}>
                <a href="#" className={styles['logo-links']}>Logo</a>
            </div >

            <div className={`${styles['toggle-container']} ${isOpen ? styles.open : ''}`}>
                <div className={styles['nav-links-container']}>
                    <a href="#" className={styles['nav-links']}>Home</a>
                    <a href="#" className={styles['nav-links']}>Games</a>
                    <a href="#" className={styles['nav-links']}>Anime</a>
                </div>
            
                <div className={styles['nav-button-container']}>
                    <button className={styles['nav-buttons']}>Login</button>
                    <button className={styles['nav-buttons']}>Signup</button>
                </div>
            </div>
            <button className={styles['hamburger-menu']} onClick={toggleMenu}>&#9776;</button>
        </div>
    );
};
