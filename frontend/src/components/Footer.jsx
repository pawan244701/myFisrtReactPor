import React from 'react';
import { Link } from "react-router-dom";
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles['main-footer']}>
            <section className={styles['main-section']}>
                <article className={styles['articles-navigations']}>
                    <h3>Pawan Yadav</h3>
                    <p>A portfolio & experimental web project built with React.</p>
                </article>

                <article className={styles['articles-navigations']}>
                    <h4>Navigation</h4>
                    <ul>
                        <li className={styles['list']}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={styles['list']}>
                            <Link 
                            to='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >About</Link>
                        </li>
                        <li className={styles['list']}>
                            <Link 
                            to='/privacy'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Privacy-Policy</Link>
                        </li>
                        <li className={styles['list']}>
                            <Link to="/games">Games</Link>
                        </li>
                        <li className={styles['list']}>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </article>

                <nav className={styles['articles-navigations']}>
                    <h4>Connect with me</h4>
                    <ul>
                        <li className={styles['list']}><a
                            href="https://github.com/pawan244701"
                            target="_blank"
                            rel="noopener noreferrer"
                        >GitHub</a></li>

                        <li className={styles['list']}><a
                            href="https://linkedin.com/in/pawan244701"
                            target="_blank"
                            rel="noopener noreferrer"
                        >LinkedIn</a></li>

                        <li className={styles['list']}><a
                            href="https://x.com/pawan244701"
                            target='_blank'
                            rel='noopener noreferrer'
                        >X-(Twitter)</a></li>
                    </ul>
                </nav>
            </section>

            <small>&copy; {new Date().getFullYear()} pawan244701. <strong>Open-Source Project.</strong></small>

        </footer>
    )
}




