import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import styles from './CreatePublicProfile.module.css';
import { useRef } from 'react';

export const CreatePublicProfile = () => {

    // to make input auto focus on render
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const { token, checkUserProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        area: '',
        bio: ''
    });
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const TOTAL_STEPS = 6;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            // preventing special chars to be used in username
            const cleanedUsername = value.replace(/[^a-zA-Z0-9_]/g, '');

            setFormData((previousData) => ({
                ...previousData,
                username: cleanedUsername
            }));
        } else {
            setFormData((previousData) => ({
                ...previousData,
                [name]: value
            }));
        }
    }

    const isCurrentStepValid = () => {
        if (currentStep === 1) {
            const username = formData.username.trim();

            if (!username) {
                setError('Username is required!');
                return false;
            }

            // Regex ensuring only letters, numbers, and underscores are allowed
            const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!validUsernameRegex.test(username)) { // why this username is show as undefined
                setError('Username cannot contain spaces or special characters (@, #, etc.)!');
                return false;
            }
        }
        return true;
    };

    const handleClickNext = () => {
        if (!isCurrentStepValid()) {
            setError('Please provide Username it is not optional!');
            return;
        }
        setError(null);
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((previ) => previ + 1)
        }
    }
    const handleClickBack = () => {
        if (currentStep <= TOTAL_STEPS) {
            setCurrentStep((previ) => previ - 1)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep !== TOTAL_STEPS) return;
        setError(null);

        // import.meta.env.VITE_PUBLIC_ACCOUNT_CREATION_API
        // import.meta.env.VITE_PUBLIC_ACCOUNT_CREATION_API_LOCAL
        try {
            const response = await fetch(import.meta.env.VITE_PUBLIC_ACCOUNT_CREATION_API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const textData = await response.text();
            const data = textData ? JSON.parse(textData) : {};

            if (response.ok) {
                await checkUserProfile(token);
                navigate(`/${formData.username}`);
            } else {
                setError(data.message || 'Something went wrong! Please try again.');
            }
        } catch (error) {
            // console.log(error);
            setError('Server connection Error. Please try again.');
        }
    };

    return (
        <div className={styles['main-container']}>
            <h1>Create Public Account</h1>
            <form
                className={styles['create-form']}
                onSubmit={handleSubmit}>
                {error && (
                    <div className={styles['input-group-error']}
                        role='alert'>
                        <label className={styles['login-error']}>
                            {error}
                        </label>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="username"
                        >
                            Enter Username</label>
                        <input
                            ref={inputRef}
                            className={styles['create-input']}
                            type="text"
                            id='username'
                            name='username'
                            placeholder='e.g. pawan244701'
                            required
                            autoComplete='name'
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <small>
                            Only letters, numbers, and underscores are allowed (no spaces or @, #, $).
                        </small>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="gender"
                        >Gender</label>
                        <select
                            className={styles['create-input']}
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">--Select Gender--</option>
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="dateOfBirth"
                        >DoB</label>
                        <input
                            className={styles['create-input']}
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 4 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="country"
                        >Country</label>
                        <input
                            className={styles['create-input']}
                            type="text"
                            placeholder='e.g. India'
                            name="country"
                            id="country"
                            autoComplete='country'
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 5 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="area"
                        >Area</label>
                        <input
                            className={styles['create-input']}
                            type="text"
                            placeholder='e.g. Mini Bypass, Bareilly'
                            name="area"
                            id="area"
                            autoComplete='area'
                            value={formData.area}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 6 && (
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="bio"
                        >Bio</label>
                        <textarea
                            placeholder='e.g. I am Pawan Yadav, a Full-Stack developer'
                            name="bio"
                            id="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div
                    className={styles['button-group']}>
                    {currentStep > 1 && (
                        <button
                            className={styles['back-button']}
                            type='button'
                            onClick={handleClickBack}
                        >Back</button>
                    )}
                    {currentStep < TOTAL_STEPS && (
                        <button
                            className={styles['next-button']}
                            type='button'
                            onClick={handleClickNext}
                        >Next</button>
                    )}
                    {currentStep === 6 && (
                        <button
                            className={styles['submit-button']}
                            type='submit'
                        >Create</button>
                    )}
                </div>
            </form >
        </div >
    );
};
