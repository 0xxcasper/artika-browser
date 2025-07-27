'use client';

import EmailForm from '@/components/email-form';
import './styles.scss';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Get in touch with us. We'd love to hear from you!</p>
        </div>

        <EmailForm />

        <div className="contact-info">
          <div className="info-item">
            <h3>Email</h3>
            <p>info@artika.com</p>
          </div>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>Address</h3>
            <p>123 Art Street<br />Creative District<br />Art City, AC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
} 