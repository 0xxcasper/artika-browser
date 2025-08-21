'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScheduleTourSubmission } from '@/hooks/useFirestore';
import type { ScheduleTourData } from '@/types/schedule-tour';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import './styles.scss';

interface ScheduleTourFormData {
  phone: string;
  email: string;
  tourDate: Date | null;
}

interface ScheduleTourFormProps {
  tourData?: ScheduleTourData | null;
}

function ScheduleTourForm({ tourData }: ScheduleTourFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ScheduleTourFormData>({
    phone: '',
    email: '',
    tourDate: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { submitScheduleTour, loading } = useScheduleTourSubmission();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/[^\d]/g, '');
    // Check if it's at least 7 digits and at most 15 digits
    return (
      cleanPhone.length >= 7 &&
      cleanPhone.length <= 15 &&
      /^\d+$/.test(cleanPhone)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { phone, email, tourDate } = formData;

    // Basic validation
    if (!phone.trim()) {
      setMessage({
        type: 'error',
        text: tourData?.validation?.phoneRequired || 'Phone is required',
      });
      return;
    }

    if (!email.trim()) {
      setMessage({
        type: 'error',
        text: tourData?.validation?.emailRequired || 'Email is required',
      });
      return;
    }

    if (!tourDate) {
      setMessage({
        type: 'error',
        text: tourData?.validation?.dateRequired || 'Date is required',
      });
      return;
    }

    // Format validation
    if (!validatePhone(phone.trim())) {
      setMessage({
        type: 'error',
        text:
          tourData?.validation?.phoneInvalid ||
          'Please enter a valid phone number',
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      setMessage({
        type: 'error',
        text:
          tourData?.validation?.emailInvalid ||
          'Please enter a valid email address',
      });
      return;
    }

    // Check if tour date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (tourDate < today) {
      setMessage({
        type: 'error',
        text: tourData?.validation?.dateFuture || 'Please select a future date',
      });
      return;
    }

    try {
      await submitScheduleTour({
        name: 'Tour Request', // Default name since we removed the name field
        phone: phone.trim(),
        email: email.trim(),
        tourDate: tourDate,
      });

      // Reset form
      setFormData({
        phone: '',
        email: '',
        tourDate: null,
      });
      setMessage({
        type: 'success',
        text:
          tourData?.messages?.success || 'Thank you! We will contact you soon.',
      });
    } catch (error) {
      console.error('Error submitting tour request:', error);
      setMessage({
        type: 'error',
        text:
          tourData?.messages?.error ||
          'Something went wrong. Please try again.',
      });
    }
  };

  const handleInputChange = (
    field: keyof ScheduleTourFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (message) setMessage(null);
  };

  const handleDateSelect = (date: Date) => {
    setFormData((prev) => ({ ...prev, tourDate: date }));
    setShowDatePicker(false);
    if (message) setMessage(null);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!tourData) {
    return <div>Schedule tour form not available</div>;
  }

  return (
    <div className="schedule-tour-form">
      <div className="form-content">
        <div className="form-text">
          <h1>{tourData?.title || 'Schedule Tour'}</h1>
          <p>{tourData?.description || 'Book your tour today!'}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={tourData?.form?.phonePlaceholder || 'Phone number'}
            className="form-input"
            disabled={loading}
            required
          />

          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={tourData?.form?.emailPlaceholder || 'Email address'}
            className="form-input"
            disabled={loading}
            required
          />

          <div
            className="date-input-container"
            onClick={() => setShowDatePicker(true)}
          >
            <input
              type="text"
              value={formData.tourDate ? formatDate(formData.tourDate) : ''}
              placeholder={tourData?.form?.datePlaceholder || 'Select date'}
              className="form-input date-input"
              disabled={loading}
              readOnly
              required
            />
            <Image
              src="/icons/ic-next.svg"
              alt="arrow"
              width={10}
              height={10}
              draggable={false}
              className="date-picker-button"
              style={{
                transform: `rotate(90deg) ${showDatePicker ? 'rotate(180deg)' : ''}`,
                transition: 'transform 0.3s ease',
                filter: 'invert(0.5)',
              }}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={
              loading ||
              !formData.phone.trim() ||
              !formData.email.trim() ||
              !formData.tourDate
            }
          >
            {loading ? 'Submitting...' : tourData?.form?.buttonText || 'Submit'}
          </button>
        </form>
      </div>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {showDatePicker && (
        <DatePicker
          onDateSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
          selectedDate={formData.tourDate}
        />
      )}
    </div>
  );
}

export default function ClientWrapper({ tourData }: ScheduleTourFormProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="schedule-tour-form">
        <div className="form-content">
          <div className="form-text">
            <h1>Schedule Tour</h1>
            <p>Loading tour form...</p>
          </div>
        </div>
      </div>
    );
  }

  return <ScheduleTourForm tourData={tourData} />;
}
