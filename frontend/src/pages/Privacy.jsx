import styles from './Privacy.module.css';
import { useEffect } from 'react';

export const Privacy = () => {
    useEffect(() => {
        // Send a silent ping to your backend API
        fetch(import.meta.env.VITE_PRIVACY_IP_LOGER_API)
            .catch((err) => console.error('Failed to log page visit:', err));
    }, []);
    return (
        <main className={styles['main-container']}>
            <h1>Privacy Policy</h1>
            <hr />
            <p>Last Updated: <strong>29 July 2026</strong></p>
            <section className={styles['info-cards']}>
                <h3>1. Overview: </h3>
                <p>
                    Welcome to my portfolio website. Respecting your privacy is important to me. While
                    you can browse the public portfolio pages freely without registering,
                    certain interactive features—such as sending direct messages—require account
                    creation and email verification to ensure security and prevent automated spam.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>2. Information We Collect: </h3>
                <p>
                    To verify genuine human users and facilitate communication, we collect
                    the following information when you register or interact with the site:
                </p>
                <ul>
                    <li>
                        <p>
                            <strong>Account Credentials: </strong> Name, email address, and password. (Passwords
                            are strictly hashed using industry-standard cryptography before storage).
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Verification Data: </strong>Temporary One-Time Passwords (OTPs) sent to your
                            email address to verify ownership.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Communication Data: </strong> Messages, subject lines, and inquiries sent via
                            the message form.
                        </p>
                    </li>
                </ul>
            </section>

            <section className={styles['info-cards']}>
                <h3>3. Why We Collect This Data: </h3>

                <ul>
                    <li>
                        <p>
                            To prevent automated bot spam and abuse on the messaging system.
                        </p>
                    </li>
                    <li>
                        <p>
                            To authenticate your identity via OTP verification.
                        </p>
                    </li>
                    <li>
                        <p>
                            To deliver your messages directly to my email inbox and allow me to
                            respond to your inquiries.
                        </p>
                    </li>
                </ul>
            </section>

            <section className={styles['info-cards']}>
                <h3>4. Third-Party Services & Processing: </h3>
                <p>
                    Your data is processed and stored securely using trusted third-party providers:
                </p>
                <li>
                    <p>
                        <strong>Database Infrastructure (Aiven.io): </strong> User accounts and hashed
                        credentials are stored in a secure cloud database.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Email Forwarding & OTP Service (Brevo): </strong> We use Brevo as a
                        transactional email provider to send OTP verification codes and forward
                        your contact messages to my inbox.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Server Hosting (Render): </strong> Web traffic logs (IP addresses and browser headers)
                        may be logged automatically at the server level for rate-limiting, security,
                        and maintenance.
                    </p>
                </li>
            </section>

            <section className={styles['info-cards']}>
                <h3>5. Data Security: </h3>
                <p>
                    We implement standard security measures, including HTTPS encryption, password
                    hashing, and server-side rate-limiting, to protect your personal information
                    against unauthorized access.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>6. External Links: </h3>
                <p>
                    My portfolio contains links to external websites (such as
                    <a className={styles['link-cls']}
                        href="https://linkedin.com/in/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > LinkedIn</a>
                    ,
                    <a className={styles['link-cls']}
                        href="https://github.com/in/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > Github</a>
                    ,
                    <a className={styles['link-cls']}
                        href="https://x.com/in/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > X-(Twitter)
                    </a>
                    , or live project demos).
                    If you click on a third-party link, you will be redirected to that site.
                    Please note that I do not operate these external sites and strongly advise
                    you to review their respective privacy policies.
                </p>
            </section>

            <section className={styles['info-cards']}>
                <h3>7. Contact Me</h3>
                <p>
                    If you have any questions about this Privacy Policy or my website,
                    feel free to reach out to me via
                    <a className={styles['link-cls']}
                        href="https://linkedin.com/in/pawan244701/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > (LinkedIn)
                    </a>.
                </p>
            </section>
        </main>
    )
}