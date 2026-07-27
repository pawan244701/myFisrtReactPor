import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // i imported it like: import { Navigate } from 'react-router-dom'; adn fucked my mind ~ for 1/2 hour
import styles from './Login.module.css'

import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const { authUserFunc, logout } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = () => {
        const isPasswordLenghtOk = password.length >= 8;
        return isPasswordLenghtOk;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9999/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                authUserFunc(username);
                navigate(`/`);
            }
            else {
                alert('Login failed due to Invalid details!');
            }
        } catch (error) {
            console.error('loging error :', error);
            alert('Server error!');
        }
    };

    return (
        <main className={styles['login-container']}>
            <form
                onSubmit={handleSubmit}
                className={styles['login-form']}>
                <h1 className={styles['login-h1']}>Login</h1>

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