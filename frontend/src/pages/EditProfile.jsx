import styles from './EditProfile.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { useRef } from 'react';

export const EditProfile = () => {

    const [error, setError] = useState(null);
    const { token, checkUserProfile, user } = useAuth();
    const navigate = useNavigate();
    // to make input auto focus on render
    const inputRef = useRef(null);
    const [formData, setFormData] = useState({
        country: '',
        area: '',
        bio: ''
    });

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);


    useEffect(() => {
        const fetchcurrentProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_API}/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok && data.profile) {
                    setFormData({
                        bio: data.profile.bio || '',
                        bio: data.profile.country || '',
                        bio: data.profile.area || ''
                    });
                } else {
                    setError('Failed to fetch profile details');
                }
            } catch (error) {
                setError(error || 'Server error while loading profile!');
            }
        };
        if (token) {
            fetchcurrentProfile();
        }
    }, [token]);

    // it allows typign in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // submit form and navigate to dynamic username profile route
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_PUBLIC_ACCOUNT_EDIT_API, {
                method: "PUT",
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

                // resetign all fieleds so that when user came back they won't find any thing written here 
                setFormData({
                    bio: '',
                    area: '',
                    country: ''
                });
                navigate('/home');
            } else {
                setError(data.message || 'Something went wrong! Please try again.');
            }
        } catch (error) {
            // console.log(error);
            setError('Server connection Error. Please try again.');
        }
    };

    return (
        <div>
            <div className={styles['main-container']}>
                <h1>Edit Public Account Details</h1>
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
                            ref={inputRef}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <label
                            className={styles['create-label']}
                            htmlFor="area"
                        >Area</label>
                        <input
                            className={styles['create-input']}
                            type="text"
                            placeholder='e.g. Mathura'
                            name="area"
                            id="area"
                            autoComplete='area'
                            value={formData.area}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div
                        className={styles['button-group']}>
                        <button
                            className={styles['submit-button']}
                            type='submit'
                        >Done</button>
                    </div>
                </form >
            </div >
        </div>
    );
}