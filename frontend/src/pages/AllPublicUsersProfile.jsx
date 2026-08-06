import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import styles from './AllPublicUsersProfile.module.css';

export const AllPublicUsersProfile = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const VITE_BASE_API = import.meta.env.VITE_BASE_API;
    const VITE_BASE_API_LOCAL = import.meta.env.VITE_BASE_API_LOCAL;
    useEffect(() => {
        const fetchAllProfiles = async () => {
            try {
                const response = await fetch(`${VITE_BASE_API}/allProfiles`);
                const data = await response.json();

                if (response.ok) {
                    setProfiles(data.profiles);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProfiles();
    }, [VITE_BASE_API]);

    if (loading) return <div>
        <label>Loading public profiles...</label>
    </div>;
    if (error) return <div>
        {error && (
            <div className={styles['input-group-error']}
                role='alert'>
                <label className={styles['login-error']}>
                    {error}
                </label>
            </div>
        )}
    </div>;

    return (
        <div className={styles['main-container']}>
            <h1>Users Public Profiles</h1>
            <hr />
            <main className={styles['profile-container']}>
                {profiles.length === 0 ? (
                    <p className={styles['no-profiles']}>No profile found! You can create your Own!</p>
                ) : (
                    <div className={styles['profiles-grid']}>
                        {profiles.map((profile) =>
                        (<div key={profile.username} className={styles['profile-card']}>
                            <h3><strong>@{profile.username}</strong></h3>
                            <p>Name: <strong>@{profile.full_name}</strong></p>
                            <p>Bio: <strong>{profile.bio ? `${profile.bio.substring(0, 60)}` : "No bio available!"}</strong></p>

                            <Link to={`/${profile.username}`}  className={styles['view-btn']}>View Profile</Link>
                        </div>)
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}


