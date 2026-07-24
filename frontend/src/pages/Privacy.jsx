import styles from './Privacy.module.css'
export const Privacy = () => {
    return (
        <main className={styles['main-container']}>
            <h1>Privacy Policy</h1>
            <hr />
            <p>Last Updated: <strong>24 July 2026</strong></p>
            <section className={styles['info-cards']}>
                <h3>1. Overview</h3>
                <p>
                    Welcome to my portfolio website. Respecting your privacy is
                    important to me. This website is a static, front-end application
                    created purely to showcase my projects, skills, and work experience.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>2. Information Collection</h3>
                <ul>
                    <li>
                        <p>
                            <strong>No Personal Data Collected: </strong>
                            This website does not require user registration,
                            account creation, or login. I do not collect, store any personal
                            identification information (such as your name, email address,
                            or phone number).
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>No Form Submissions or Databases: </strong>
                            This site operates entirely on the front-end
                            and does not connect to a
                            custom backend database to harvest or retain user data.
                        </p>
                    </li>
                </ul>
            </section>

            <section className={styles['info-cards']}>
                <h3>3. Cookies and Tracking</h3>
                <p>
                    This website does not use tracking cookies, marketing cookies, or
                    persistent storage to track your browsing behavior across the web.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>4. Third-Party Hosting & Infrastructure</h3>
                <p>
                    This website is hosted on Render.
                    <br />
                    Like most web hosting platforms, the hosting provider may automatically log standard
                    technical web traffic data (such as IP addresses, browser types, and access times) at
                    the server level for security, bandwidth monitoring, and performance purposes.
                    <br />
                    I do not own, manage, or sell these infrastructure logs.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>5. External Links</h3>
                <p>
                    My portfolio contains links to external websites (such as
                    <a className={styles['link-cls']} href="https://linkedin.com/in/pawan244701/"
                        target="_blank" rel="noopener noreferrer"
                    > LinkedIn</a>
                    ,
                    <a className={styles['link-cls']} href="https://github.com/in/pawan244701/"
                        target="_blank" rel="noopener noreferrer"
                    > Github</a>
                    ,
                    <a className={styles['link-cls']} href="https://x.com/in/pawan244701/"
                        target="_blank" rel="noopener noreferrer"
                    > X-(Twitter)
                    </a>
                    , or live project demos).
                    If you click on a third-party link, you will be redirected to that site.
                    Please note that I do not operate these external sites and strongly advise
                    you to review their respective privacy policies.
                </p>
            </section>
            <section className={styles['info-cards']}>
                <h3>6. Contact Me</h3>
                <p>
                    If you have any questions about this Privacy Policy or my website,
                    feel free to reach out to me via [
                    <a className={styles['link-cls']}
                        href="https://linkedin.com/in/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > LinkedIn 
                    </a>
                     / 
                    <a className={styles['link-cls']}
                        href="https://x.com/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > X-(Twitter) 
                    </a>
                    ].
                </p>
            </section>
        </main>
    )
}