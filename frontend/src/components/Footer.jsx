import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <section>
                <article>
                    <h3>Pawan Yadav</h3>
                    <p>A portfolio & experimental web project built with React.</p>
                </article>

                <article>
                    <h4>Navigation</h4>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <a
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >About</a>
                        </li>
                        <li>
                            <a
                                href='/privacy'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Privacy-Policy</a>
                        </li>
                        <li>
                            <Link to="/games">Games</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </article>

                <nav>
                    <h4>Connect with me</h4>
                    <ul>
                        <li><a
                            href="https://github.com/pawan244701"
                            target="_blank"
                            rel="noopener noreferrer"
                        >GitHub</a></li>

                        <li><a
                            href="https://linkedin.com/in/pawan244701"
                            target="_blank"
                            rel="noopener noreferrer"
                        >LinkedIn</a></li>

                        <li><a
                            href="https://x.com/pawan244701"
                            target='_blank'
                            rel='noopener noreferrer'
                        >X-(Twitter)</a></li>
                    </ul>
                </nav>
            </section>

            <small>&copy; {new Date().getFullYear()} pawan244701. Open-Source Project.</small>

        </footer>
    )
}




