import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const UserProfile = () => {
    const { username } = useParams(); // Reads username from URL /profile/:username
    const { user: loggedInUserName } = useAuth(); // Reads current logged-in user
    
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // VITE_USER_ACCOUNT_API
    // VITE_USER_ACCOUNT_API_LOCAL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_USER_ACCOUNT_API);
                const data = await response.json();

                if (response.ok) {
                    setProfile(data.profile);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Server error. Could not fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;

    // Check if the current visitor id the owns of profile
    const isOwner = loggedInUserName === profile.full_name;

    return (
        <div className="profile-container">
            <h1>@{profile.username}</h1>
            <p><strong>Name:</strong> {profile.full_name}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Location:</strong> {profile.area}, {profile.country}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Date:</strong> {profile.dateOfBirth}</p>

            {isOwner && (
                <Link to="/edit-profile" className="edit-btn">
                    Edit Profile
                </Link>
            )}
        </div>
    );
};
