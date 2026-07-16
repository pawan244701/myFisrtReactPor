import styles from './Signup.module.css';
export const Signup = () => {
    return (
        <main className={styles['signup-body']}>
            <div className={styles['signup-container']}>
                <form className={styles['signup-form']}>
                <h1 className={styles['signup-h1']}>Signup</h1>

                    <div className={styles['input-group']}>
                        <label className={styles['signup-label']} htmlFor="username">Enter Username</label>
                        <input className={styles['signup-input']} type="text" id="username" placeholder="Username" autoComplete="username" required />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['signup-label']} htmlFor="email">Enter Email</label>
                        <input className={styles['signup-input']} type="email" id="email" placeholder="example@email.com" autoComplete="email" required />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['signup-label']} htmlFor="password">Enter Password</label>
                        <input className={styles['signup-input']} type="password" id="password" placeholder="my$#%46pdhF76" autoComplete="new-password" required />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['signup-label']} htmlFor="confirmPassword">Re-enter Password</label>
                        <input className={styles['signup-input']} type="password" id="confirmPassword" placeholder="my$#%46pdhF76" autoComplete="current-password" required />
                    </div>
                    <button className={styles['signup-button']} type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}
