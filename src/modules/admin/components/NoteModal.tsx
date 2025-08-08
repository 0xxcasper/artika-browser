'use client';

import { useState } from 'react';
import { TourSubmission, NewsletterSubscription } from '@/libs/firestore';

interface NoteModalProps {
  submission: TourSubmission | NewsletterSubscription;
  onSubmit: (
    note: string,
    submission: TourSubmission | NewsletterSubscription,
  ) => Promise<void>;
  onCancel: () => void;
}

export default function NoteModal({
  submission,
  onSubmit,
  onCancel,
}: NoteModalProps) {
  const [noteMessage, setNoteMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isNewsletter = 'email' in submission && !('name' in submission);
  const title = isNewsletter ? 'Newsletter Subscription' : 'Tour Request';
  const subtitle = isNewsletter
    ? `Email: ${submission.email}`
    : `${submission.name} - ${submission.phone}`;

  const handleSubmit = async () => {
    if (!noteMessage.trim()) {
      alert('Please enter a note message');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(noteMessage.trim(), submission);
    } catch (error) {
      console.error('Error submitting note:', error);
      alert('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="note-modal">
        <div className="modal-header">
          <h3>Add Note</h3>
          <button onClick={onCancel} className="close-button">
            ×
          </button>
        </div>
        <div className="modal-content">
          <p className="modal-subtitle">
            Marking as done:{' '}
            <strong>
              {title} - {subtitle}
            </strong>
          </p>
          <div className="note-input-group">
            <label htmlFor="note-input">Note Message (Required):</label>
            <textarea
              id="note-input"
              value={noteMessage}
              onChange={(e) => setNoteMessage(e.target.value)}
              placeholder={`Enter your note about this ${isNewsletter ? 'newsletter subscription' : 'tour request'}...`}
              rows={4}
              className="note-textarea"
              disabled={loading}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button
            onClick={onCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={loading || !noteMessage.trim()}
          >
            {loading ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  );
}
