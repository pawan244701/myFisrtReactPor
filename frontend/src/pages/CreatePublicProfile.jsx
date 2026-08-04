import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import styles from './CreatePublicProfile.module.css';
export const CreatePublicProfile = () => {

    const { token } = useAuth();
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
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }

    const isCurrentStepValid = () => {
        if (currentStep === 1) {
            return formData.username.trim() !== '';
        }
        return true;
    };

    const handleClickNext = () => {
        if (!isCurrentStepValid()) {
            setError('Please provide Username it id not optional!');
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
                navigate(`/`);
            } else {
                setError(data.message || 'Something went wrong! Please try again.');
            }
        } catch (error) {
            console.log(error);
            setError('Server connection Error. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create Public Account</h1>
            {error && (
                <div className={styles['input-group-error']}
                    role='alert'>
                    <label className={styles['login-error']}>
                        {error}
                    </label>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div>
                        <label htmlFor="username">Enter Username</label>
                        <input
                            type="text"
                            id='username'
                            name='username'
                            placeholder='e.g. pawan244701'
                            required
                            autoComplete='name'
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <select
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
                    <div>
                        <label htmlFor="dateOfBirth">DoB</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <label htmlFor="country">Country</label>
                        <input
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
                    <div>
                        <label htmlFor="area">Area</label>
                        <input
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
                    <div>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            placeholder='e.g. I am Pawan Yadav, a Full-Stack developer'
                            name="bio"
                            id="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div>
                    {currentStep > 1 && (
                        <button type='button' onClick={handleClickBack} >Back</button>
                    )}
                    {currentStep < TOTAL_STEPS && (
                        <button type='button' onClick={handleClickNext} >Next</button>
                    )}
                    {currentStep === 6 && (
                        <button type='submit' >Create</button>
                    )}
                </div>
            </form >
        </div >
    );
};

