'use client';

import { useState } from 'react';
import { NewsletterSubscriptionService } from '@/libs/firestore';
import { useLanguage } from '@/contexts/LanguageContext';
import './styles.scss';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError(language === 'vi' ? 'Vui lòng nhập email hợp lệ' : 'Please enter a valid email');
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
      setError(language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`newsletter-form ${className}`}>
      <div className="newsletter-content">
        <h2 className="newsletter-title">
          {language === 'vi' 
            ? 'Nhận thông tin cập nhật mới nhất từ chúng tôi'
            : 'Get the Insights You Need, Straight to Your Inbox!'
          }
        </h2>
        
        <form onSubmit={handleSubmit} className="newsletter-form-container">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'vi' ? 'Email' : 'Email'}
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
                ? (language === 'vi' ? 'Đang gửi...' : 'Subscribing...')
                : (language === 'vi' ? 'Đăng ký' : 'Subscribe')
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
              {language === 'vi' 
                ? 'Đăng ký thành công! Cảm ơn bạn đã đăng ký.'
                : 'Successfully subscribed! Thank you for signing up.'
              }
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 