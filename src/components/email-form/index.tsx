'use client';

import { useState } from 'react';
import { useEmailSubmission } from '@/hooks/useFirestore';
import './styles.scss';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const { submitEmail, loading } = useEmailSubmission();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    
    // Basic validation
    if (!trimmedEmail) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    // Email format validation
    if (!validateEmail(trimmedEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    try {
      await submitEmail({
        email: trimmedEmail,
        message: 'Reserve a ticket'
      });
      
      setEmail('');
      setMessage({ type: 'success', text: 'Thank you! You\'ve been added to our mailing list.' });
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (message) setMessage(null);
  };

  return (
    <div className="email-form">
      <div className="email-content">
        <div className="email-text">
          <h1>Stay in the loop</h1>
          <p>{`Get the latest updates and exclusive content${'\n'}delivered directly to your inbox.`}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="email-form-container">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            className="email-input"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="signup-button"
            disabled={loading || !email.trim()}
          >
            {loading ? 'Adding...' : 'Subscribe'}
          </button>
        </form>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
} 