import { Link } from "react-router-dom"
import styles from './Hero.module.css';

import { useAuth } from '../contexts/AuthContext';

export const Hero = () => {

    const { user } = useAuth();

    return (
        <section className={styles['main-section']}>
            <header className={styles['main-header']}>
                <h2>Hi {user || 'Visitor'}, I'm Pawan Yadav</h2>
                <h3>Welcome to the project</h3>
                <p>
                    I'm open to get Good Advices so if you have any message me on
                    <a href="https://linkedin.com/in/pawan244701/"
                        target="_blank"
                        rel='noopener noreferrer'
                        className={styles['linkedin']}
                    > Linkedin</a>
                </p>
                <p><strong>A Full-stack learner and Frontend developer</strong></p>
                <p>This project is in existence because I want to learn React.js and build something using React</p>
                <nav className={styles['nav-links']}>
                    <Link to='/about'>Read More</Link>
                </nav>
            </header>
        </section>
    )
}
