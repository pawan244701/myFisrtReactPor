import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const UserProfile = () => {
    const { username } = useParams(); // Reads username from URL /profile/:username
    const { user: loggedInUserName } = useAuth(); // Reads current logged-in user

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // VITE_BASE_API
    // VITE_BASE_API_LOCAL
    const VITE_BASE_API = import.meta.env.VITE_BASE_API;
    useEffect(() => {
        const fetchProfile = async () => {
            // 1. Resetign state whenever username changes
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${VITE_BASE_API}/${username}`);
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

        if (username) {
            fetchProfile();
        }
    }, [username, VITE_BASE_API]);

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
