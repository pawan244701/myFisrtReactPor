import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // i imported it like: import { Navigate } from 'react-router-dom'; adn fucked my mind ~ for 1/2 hour
import styles from './Login.module.css'

import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const { authUserFunc, logout } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const validateForm = () => {
        const isPasswordLenghtOk = password.length >= 8;
        return isPasswordLenghtOk;
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
                    username: username,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                authUserFunc(username);
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
                        htmlFor="username"
                    >Username
                    </label>
                    <input
                        className={styles['login-input']}
                        type="text"
                        id="username"
                        name='username'
                        placeholder="username"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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