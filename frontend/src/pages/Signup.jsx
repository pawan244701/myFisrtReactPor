import { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Signup = () => {
    const { authUserFunc } = useAuth();
    const navigate = useNavigate();

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
        setError(null);

        const isValid = validateForm();
        if (!isValid) {
            setError('Password must be at least 8 char long and both shoud match.');
            return;
        }
        setIsLoading(true);

        // import.meta.env.VITE_SIGNUP_API
        try {
            const response = await fetch('import.meta.env.VITE_SIGNUP_API', {
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
                setIsOtpSent(true);
                // authUserFunc(formData.username);
                // navigate(`/`);
            }
            else {
                setError(data.message || 'Signup failed! Please try again.');
            }
        } catch (error) {
            // console.log('Full Error: ', error);
            if (error.message === "Failed to fetch") {
                setError('Unable to reach Server. Please try again in a few seconds!');
            } else {
                setError('An unexpected error occured. Please try again!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // import.meta.env.VITE_VERIFY_OTP_API
            const response = await fetch('import.meta.env.VITE_VERIFY_OTP_API', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otpCode: otpCode
                }),
            });

            const textData = await response.text();
            const data = textData ? JSON.parse(textData) : {};

            if (response.ok) {
                authUserFunc(formData.username);
                navigate(`/`);
            } else {
                setError(data.message || 'Verification failed. Invalid or Expired Otp. Please signup again.');
            }
        } catch (error) {
            setError('Server connection Error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles['signup-container']}>
            {!isOtpSent ? (
                <form
                    onSubmit={handleSubmit}
                    className={styles['signup-form']}
                >
                    <h1 className={styles['signup-h1']}>Signup</h1>

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
                        disabled={isLoading}
                    >Signup
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className={styles['signup-form']}>
                    <h1 className={styles['signup-h1']}>Verify Email</h1>

                    {error && (
                        <div className={styles['input-group-error']} role='alert'>
                            <label className={styles['login-error']}>{error}</label>
                        </div>
                    )}

                    <p>We sent a 7-digit OTP code to <strong>{formData.email}</strong></p>

                    <div className={styles['input-group']}>
                        <label className={styles['signup-label']} htmlFor="otpCode">
                            Enter OTP
                        </label>
                        <input
                            className={styles['signup-input']}
                            type="text"
                            id="otpCode"
                            name="otpCode"
                            maxLength="7"
                            placeholder="0123456"
                            required
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                        />
                    </div>

                    <button
                        className={styles['signup-button']}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            )}
        </main>
    );
};