import styles from './TechStack.module.css'
export const TechStack = () => {
    return (
        <section className={styles['main-section']}>
            <h1>My Tech Stack</h1>
            <div className={styles['secondery-container']}>
                <article className={styles['stack-card']}>
                    <h3>Design: </h3>
                    <ul>
                        <li>Figma</li>
                    </ul>
                </article>
                <article className={styles['stack-card']}>
                    <h3>Frontend: </h3>
                    <ul>
                        <li>HTML5</li>
                        <li>CSS3</li>
                        <li>JavaScript (ES-6+)</li>
                        <li>React.js</li>
                    </ul>
                </article>
                <article className={styles['stack-card']}>
                    <h3>Backend: </h3>
                    <ul>
                        <li>Node.js</li>
                        <li>Express.js</li>
                    </ul>
                </article>
                <article className={styles['stack-card']}>
                    <h3>Database: </h3>
                    <ul>
                        <li>MySQL</li>
                    </ul>
                </article>
            </div>
        </section>
    )
}