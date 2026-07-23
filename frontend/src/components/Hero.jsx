import { Link } from "react-router-dom"
import styles from './Hero.module.css';
export const Hero = () => {
    return (
        <section className={styles['main-sectoin']}>
            <header className={styles['main-header']}>
                <h1>Hi, I'm Pawan Yadav</h1>
                <h2>Welcome to the project</h2>
                <p>I'm open to get Good Advices so if you have any message me on
                    <a href="https://linkedin.com/in/pawan244701/"
                        target="_blank"
                        rel='noopener noreferrer'
                        className={styles['linkedin']}
                    > Linkedin</a></p>
                <p><strong>A Full-stack learner and Frontend developer</strong></p>
                <p>This project is in existence because I want to learn React.js and build something using React</p>
            </header>
            <nav className={styles['nav-links']}>
                <Link to='/about'>Read More</Link>
            </nav>
        </section>
    )
}
