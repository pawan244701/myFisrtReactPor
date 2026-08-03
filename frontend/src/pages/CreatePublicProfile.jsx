import React, { useState } from 'react';

export const CreatePublicProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        area: '',
        bio: ''
    });
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }


    return (
        <div>
            <h1>Create Public Account</h1>
            <form onSubmit={handleSubmit}>
                {currentStep === 0 && (
                    <div>
                        <label htmlFor="username">Enter Username</label>
                        <input type="text"
                            id='username'
                            name='username'
                            placeholder='e.g. pawan244701'
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {currentStep === 1 && (
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
                {currentStep === 2 && (
                    <div>

                    </div>
                )}

            </form>
        </div>
    );
};
