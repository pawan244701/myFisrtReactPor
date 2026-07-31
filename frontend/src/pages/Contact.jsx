import { useState } from 'react';
import styles from './Contact.module.css';

export const Contact = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to send a message. Please login first!');
      return;
    }

    //import.meta.env.VITE_CONTACT_API
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setMessage(''); // clearing box
      } else {
        setError(data.message || 'Message could not be sent. Daily limit might be exhausted!');
      }
    } catch (error) {
      setError('Unable to reach Server. Please try again in a few seconds!');
      // alert('No server please try again after a few days.');
    }
  };

  return (
    <main className={styles['main-container']}>
      <header className={styles['header-container']}>
        <h1>Get in Touch</h1>
        <p>Have feedback on this project, or want to collaborate? Send a message below.</p>
        <p><strong>NOTE:</strong> Only Signed In users can Message.</p>
        <p>
          Go to{' '}
          <a
            href="https://linkedin.com/in/pawan44701/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{' '}
          if you don't want to Sign Up!
        </p>
      </header>

      <section className={styles['form-container']}>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className={styles['input-group-error']}
              role='alert'>
              <label className={styles['login-error']}>
                {error}
              </label>
            </div>
          )}
          <label htmlFor="message">Enter your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div>
            <button type="submit">Send Message</button>
          </div>
        </form>
      </section>
    </main>
  );
};
