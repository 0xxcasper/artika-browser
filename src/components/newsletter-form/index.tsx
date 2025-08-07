'use client';

import { useState } from 'react';
import { NewsletterSubscriptionService } from '@/libs/firestore';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreloader } from '@/contexts/PreloaderContext';
import './styles.scss';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const { language } = useLanguage();
  const { newsletterForm } = usePreloader();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError(newsletterForm.newsletter_validation_message);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await NewsletterSubscriptionService.subscribeToNewsletter({
        email: email.toLowerCase().trim(),
        language: language
      });

      setSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError(newsletterForm.newsletter_error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`newsletter-form ${className}`}>
      <div className="newsletter-content">
        <h2 className="newsletter-title">
          {newsletterForm.newsletter_title}
        </h2>
        
        <form onSubmit={handleSubmit} className="newsletter-form-container">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletterForm.newsletter_email_placeholder}
              className="newsletter-input"
              disabled={loading}
              required
            />
            <button
              type="submit"
              className="newsletter-button"
              disabled={loading}
            >
              {loading 
                ? `...${newsletterForm.newsletter_button_text}`
                : newsletterForm.newsletter_button_text
              }
            </button>
          </div>
          
          {error && (
            <div className="newsletter-error">
              {error}
            </div>
          )}
          
          {success && (
            <div className="newsletter-success">
              {newsletterForm.newsletter_success_message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 