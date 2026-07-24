import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css'

export const About = () => {
  return (
    <main className={styles['main-container']}>
      <header className={styles['header-container']}>
        <h1>About This Portfolio & Experiments Site</h1>
        <p>
          <strong>Live Site: </strong>
          <a 
            href="https://pawan244701-react.onrender.com" 
            rel="noopener noreferrer"
            className={styles['link']}
          >
            pawan244701-react.onrender.com
          </a>
        </p>
      </header>

      <section className={styles['main-section']}>
        <h2>Hi, I am Pawan Yadav — Eager to Learn Every Single New Thing</h2>
        <article>
          <p>
            This is a portfolio and experiments site that is constantly evolving. 
            Created by <strong>Pawan Yadav</strong>, this project serves as a hands-on lab for learning 
            React.js and locking core concepts into muscle memory.
          </p>
          <p>
            While constantly growing, the primary objective is to build a modern, fully responsive, 
            and visually appealing web application.
          </p>
        </article>
      </section>

      <section className={styles['main-section']}>
        <h2>Tech & Tools Used</h2>

        <article>
          <h3 className={styles['heading3']}>Design & UI/UX</h3>
          <ul>
            <li>Figma</li>
          </ul>
        </article>

        <article>
          <h3 className={styles['heading3']}>Core Web Technologies</h3>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript (ES6+)</li>
          </ul>
        </article>

        <article>
          <h3 className={styles['heading3']}>Libraries & Frameworks</h3>
          <ul>
            <li>React.js</li>
            <li>React Router</li>
          </ul>
        </article>

        <article>
          <h3 className={styles['heading3']}>Build Tools & Environment</h3>
          <ul>
            <li>Vite</li>
            <li>npm</li>
          </ul>
        </article>
      </section>

      <section className={styles['main-section']}>
        <h2>Project Source & Social Media</h2>
        <p>
          Want to review the code? The blueprint of this platform is entirely open-source. 
          Explore the architecture or connect with me via the platforms below:
        </p>

        <nav>
          <ul>
            <li>
              <span>Inspect the source code on: </span>
              <a 
              className={styles['link']}
                href="https://github.com/pawan244701/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <span>Connect with me on: </span>
              <a 
              className={styles['link']}
                href="https://linkedin.com/in/pawan244701/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <span>Follow me on: </span>
              <a 
              className={styles['link']}
                href="https://x.com/pawan244701/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <span>Return to application: </span>
              <Link to="/">Home Page</Link>
              {/* replacement of anchor tage within the App not for external links
                  it uses event.preventDefault() to prevent browser to send out the network req
                  it also calls window.history.pushState() and updates the addr bar in browser without refresh */}
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
};