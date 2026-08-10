import { useEffect, useState } from "react";
import styles from '../components/TextPosts.module.css';

export const PostFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_FEED_API);
            const data = await response.json();
            if (response.ok) {
                setPosts(data.posts || data);
            }
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        }
    };

    return (
        <div>
            {/* Posts List */}
            <div className={styles['posts-list']}>
                {posts.length === 0 ? (
                    <p>No posts available yet.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.postId} className={styles['post-card']}>
                            <p>{post.username}, {post.country}</p>
                            <p className={styles['post-content']}>{post.content}</p>
                            <span className={styles['post-date']}>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
