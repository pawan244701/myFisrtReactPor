import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const { authUserFunc, logout } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const validateForm = () => {
        const isPasswordLenghtOk = password.length >= 8;
        const isEmailCurrect = email.includes('@') && email.includes('.');
        return isPasswordLenghtOk && isEmailCurrect;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const isValid = validateForm();
        if (!isValid) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        //import.meta.env.VITE_LOGIN_API
        try {
            const response = await fetch(import.meta.env.VITE_LOGIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                authUserFunc(data.username, data.token);
                navigate(`/`);
            }
            else {
                setError(data.message || 'Login failed due to Invalid details!');
            }
        } catch (error) {
            // console.log('Full Error: ', error);
            if (error.message === "Failed to fetch") {
                setError('Unable to reach Server. Please try again in a few seconds!');
            } else {
                setError('An unexpected error occured. Please try again!');
            }
        }
    }

    return (
        <main className={styles['login-container']}>
            <form
                onSubmit={handleSubmit}
                className={styles['login-form']}>
                <h1 className={styles['login-h1']}>Login</h1>

                {error && (
                    <div className={styles['input-group-error']}
                        role='alert'>
                        <label className={styles['login-error']}>
                            {error}
                        </label>
                    </div>
                )}
                <div className={styles['input-group']}>
                    <label
                        className={styles['login-label']}
                        htmlFor="email"
                    >Email
                    </label>
                    <input
                        className={styles['login-input']}
                        type="email"
                        id="email"
                        name='email'
                        placeholder="myEmail@email.com"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label
                        className={styles['login-label']}
                        htmlFor="password"
                    >Password
                    </label>
                    <input
                        className={styles['login-input']}
                        type="password"
                        id="password"
                        name='password'
                        placeholder="my$#%46pdhF76"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className={styles['login-button']}
                    type="submit"
                >Login
                </button>
            </form>
        </main>
    )
};
