import { useState } from 'react';
import styles from './Contact.module.css';

export const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('endPoint/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setMessage(''); // clearing box
      } else {
        // alert(data.message || 'Failed to send message.');
      }
    } catch (error) {
      // console.error('Error sending message:', error);
      alert('No server please try again after a few days.');
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
