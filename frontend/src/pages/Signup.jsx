import { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
export const Signup = () => {
    const { authUserFunc } = useAuth();
    const navigate = useNavigate();

    // creating state obj so that we won't need to create four saperate states for all inputs
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }

    const validateForm = () => {
        const isPasswordLenghtOk = formData.password.length >= 8;
        const isPasswordMatching = formData.password === formData.confirmPassword;
        // console.log(`lenght: ${isPasswordLenghtOk} | pass matchign : ${isPasswordMatching}`)
        return isPasswordLenghtOk && isPasswordMatching;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            alert('Password must be at least 8 char long and both shoud match.');
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_SIGNUP_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const textData = await response.text();
            const data = textData ? JSON.parse(textData) : {};

            if (response.ok) {
                authUserFunc(formData.username);
                navigate(`/`);
            }
            else {
                alert(data.message || 'Signup failed! Please try again.');
            }
        } catch (error) {
            console.error('signup error :', error);
            alert('Server error or service warming up. Please try again in a few seconds!');
        }
    };

    return (
        <main className={styles['signup-container']}>
            <form
                onSubmit={handleSubmit}
                className={styles['signup-form']}
            >
                <h1 className={styles['signup-h1']}>Signup</h1>

                <div className={styles['input-group']}>
                    <label
                        className={styles['signup-label']}
                        htmlFor="username"
                    >Enter Username
                    </label>

                    <input
                        className={styles['signup-input']}
                        type="text"
                        id="username"
                        name='username'
                        placeholder="Username"
                        autoComplete="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles['input-group']}>
                    <label
                        className={styles['signup-label']}
                        htmlFor="email"
                    >Enter Email
                    </label>
                    <input
                        className={styles['signup-input']}
                        type="email"
                        id="email"
                        name='email'
                        placeholder="example@email.com"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles['input-group']}>
                    <label
                        className={styles['signup-label']}
                        htmlFor="password"
                    >Enter Password
                    </label>
                    <input
                        className={styles['signup-input']}
                        type="password"
                        id="password"
                        name='password'
                        placeholder="my$#%46pdhF76"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles['input-group']}>
                    <label
                        className={styles['signup-label']}
                        htmlFor="confirmPassword"
                    >Re-enter Password
                    </label>
                    <input
                        className={styles['signup-input']}
                        type="password"
                        id="confirmPassword"
                        name='confirmPassword'
                        placeholder="my$#%46pdhF76"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className={styles['signup-button']}
                    type="submit"
                >Signup
                </button>
            </form>
        </main>
    )
}
