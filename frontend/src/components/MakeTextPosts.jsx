import { useState, useEffect } from 'react';
import styles from './TextPosts.module.css';

export const MakeTextPosts = ({ isOwner }) => {
  const [textPostContent, setTextPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!textPostContent.trim()) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(import.meta.env.VITE_POSTS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ textPostContent })
      });

      const data = await response.json();

      if (response.ok) {
        setTextPostContent('');
        alert('published');
      } else {
        setError(data.message || 'Failed to publish post');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['posts-container']}>
      {isOwner && (
        <form onSubmit={handleCreatePost} className={styles['create-post-form']}>
          <h3>Text Posts</h3>
          <textarea
            placeholder="create a post!"
            value={textPostContent}
            onChange={(e) => setTextPostContent(e.target.value)}
            rows="3"
            required
          />

          {error && (
            <div className={styles['input-group-error']}
              role='alert'>
              <label className={styles['login-error']}>
                {error}
              </label>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      )}
    </div>
  );
};
