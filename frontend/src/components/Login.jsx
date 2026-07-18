import styles from './Login.module.css'
export const Login = () => {
    return (
        <main className={styles['login-container']}>
            <form className={styles['login-form']}>
                <h1 className={styles['login-h1']}>Login</h1>
                <div className={styles['input-group']}>
                    <label className={styles['login-label']} htmlFor="username">Username</label>
                    <input className={styles['login-input']} type="text" id="username" placeholder="username" autoComplete="username" required />
                </div>
                <div className={styles['input-group']}>
                    <label className={styles['login-label']} htmlFor="password">Password</label>
                    <input className={styles['login-input']} type="password" id="password" placeholder="my$#%46pdhF76" autoComplete="current-password" required />
                </div>
                <button className={styles['login-button']} type="submit">Login</button>
            </form>
        </main>
    )
};