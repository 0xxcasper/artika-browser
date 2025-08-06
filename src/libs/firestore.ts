import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Tour submission interface
export interface TourSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  tourDate: Date;
  submittedAt: Date;
  read: boolean;
  note?: string;
  readAt?: Date;
}

// Newsletter subscription interface
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: Date;
  language: string;
  status: 'active' | 'unsubscribed';
  unsubscribedAt?: Date;
  note?: string;
}

// Collection names
export const COLLECTIONS = {
  TOUR_SUBMISSIONS: 'tour_submissions',
  NEWSLETTER_SUBSCRIPTIONS: 'newsletter_subscriptions'
} as const;

// Tour submission service
export class TourSubmissionService {
  // Submit a new tour request
  static async submitTourRequest(data: {
    name: string;
    phone: string;
    email: string;
    tourDate: Date;
  }): Promise<string> {
    try {
      const submissionData = {
        ...data,
        submittedAt: new Date(),
        read: false
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.TOUR_SUBMISSIONS), submissionData);
      console.log('Tour request submitted successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting tour request:', error);
      throw new Error(`Failed to submit tour request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all tour submissions (for admin)
  static async getAllSubmissions(): Promise<TourSubmission[]> {
    try {
      console.log('Fetching all tour submissions...');
      const q = query(
        collection(db, COLLECTIONS.TOUR_SUBMISSIONS),
        orderBy('submittedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const submissions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          // Convert Firestore timestamp to Date
          tourDate: data.tourDate?.toDate ? data.tourDate.toDate() : new Date(data.tourDate),
          // Convert Firestore timestamp to Date
          submittedAt: data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date(data.submittedAt),
          read: data.read,
          note: data.note,
          // Convert readAt timestamp if it exists
          readAt: data.readAt?.toDate ? data.readAt.toDate() : (data.readAt ? new Date(data.readAt) : undefined)
        };
      }) as TourSubmission[];
      
      console.log(`Successfully fetched ${submissions.length} tour submissions`);
      return submissions;
    } catch (error) {
      console.error('Error getting tour submissions:', error);
      if (error instanceof Error && error.message.includes('permission')) {
        throw new Error('Access denied. Please check Firestore security rules.');
      }
      throw new Error(`Failed to get tour submissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Mark a submission as read
  static async markAsRead(submissionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.TOUR_SUBMISSIONS, submissionId);
      await updateDoc(docRef, {
        read: true,
        readAt: new Date()
      });
      console.log('Tour submission marked as read:', submissionId);
    } catch (error) {
      console.error('Error marking tour submission as read:', error);
      throw new Error(`Failed to mark tour submission as read: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update a submission with note
  static async updateSubmissionWithNote(submissionId: string, note: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.TOUR_SUBMISSIONS, submissionId);
      await updateDoc(docRef, {
        read: true,
        note: note,
        readAt: new Date()
      });
      console.log('Tour submission updated with note:', submissionId);
    } catch (error) {
      console.error('Error updating tour submission with note:', error);
      throw new Error(`Failed to update tour submission with note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete a submission
  static async deleteSubmission(submissionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.TOUR_SUBMISSIONS, submissionId);
      await deleteDoc(docRef);
      console.log('Tour submission deleted:', submissionId);
    } catch (error) {
      console.error('Error deleting tour submission:', error);
      throw new Error(`Failed to delete tour submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get count of unread submissions
  static async getUnreadCount(): Promise<number> {
    try {
      console.log('Fetching unread tour submissions count...');
      const q = query(
        collection(db, COLLECTIONS.TOUR_SUBMISSIONS),
        orderBy('submittedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const unreadCount = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        return !data.read;
      }).length;
      
      console.log(`Found ${unreadCount} unread tour submissions`);
      return unreadCount;
    } catch (error) {
      console.error('Error getting unread tour submissions count:', error);
      throw new Error(`Failed to get unread tour submissions count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Newsletter subscription service
export class NewsletterSubscriptionService {
  // Submit a new newsletter subscription
  static async subscribeToNewsletter(data: {
    email: string;
    language: string;
  }): Promise<string> {
    try {
      const subscriptionData = {
        email: data.email.toLowerCase().trim(),
        subscribedAt: new Date(),
        language: data.language,
        status: 'active' as const
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS), subscriptionData);
      console.log('Newsletter subscription submitted successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting newsletter subscription:', error);
      throw new Error(`Failed to submit newsletter subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all newsletter subscriptions (for admin)
  static async getAllSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      console.log('Fetching all newsletter subscriptions...');
      const q = query(
        collection(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS),
        orderBy('subscribedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const subscriptions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          // Convert Firestore timestamp to Date
          subscribedAt: data.subscribedAt?.toDate ? data.subscribedAt.toDate() : new Date(data.subscribedAt),
          language: data.language,
          status: data.status,
          // Convert unsubscribedAt timestamp if it exists
          unsubscribedAt: data.unsubscribedAt?.toDate ? data.unsubscribedAt.toDate() : (data.unsubscribedAt ? new Date(data.unsubscribedAt) : undefined),
          note: data.note
        };
      }) as NewsletterSubscription[];
      
      console.log(`Successfully fetched ${subscriptions.length} newsletter subscriptions`);
      return subscriptions;
    } catch (error) {
      console.error('Error getting newsletter subscriptions:', error);
      if (error instanceof Error && error.message.includes('permission')) {
        throw new Error('Access denied. Please check Firestore security rules.');
      }
      throw new Error(`Failed to get newsletter subscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update subscription with note
  static async updateSubscriptionWithNote(subscriptionId: string, note: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS, subscriptionId);
      await updateDoc(docRef, {
        note: note,
        status: 'unsubscribed' // Mark as done when note is added
      });
      console.log('Newsletter subscription updated with note:', subscriptionId);
    } catch (error) {
      console.error('Error updating newsletter subscription with note:', error);
      throw new Error(`Failed to update newsletter subscription with note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Unsubscribe from newsletter
  static async unsubscribeFromNewsletter(subscriptionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS, subscriptionId);
      await updateDoc(docRef, {
        status: 'unsubscribed',
        unsubscribedAt: new Date()
      });
      console.log('Newsletter subscription unsubscribed:', subscriptionId);
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw new Error(`Failed to unsubscribe from newsletter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete a subscription
  static async deleteSubscription(subscriptionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS, subscriptionId);
      await deleteDoc(docRef);
      console.log('Newsletter subscription deleted:', subscriptionId);
    } catch (error) {
      console.error('Error deleting newsletter subscription:', error);
      throw new Error(`Failed to delete newsletter subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get count of active subscriptions
  static async getActiveCount(): Promise<number> {
    try {
      console.log('Fetching active newsletter subscriptions count...');
      const q = query(
        collection(db, COLLECTIONS.NEWSLETTER_SUBSCRIPTIONS),
        orderBy('subscribedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const activeCount = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        return data.status === 'active';
      }).length;
      
      console.log(`Found ${activeCount} active newsletter subscriptions`);
      return activeCount;
    } catch (error) {
      console.error('Error getting active newsletter subscriptions count:', error);
      throw new Error(`Failed to get active newsletter subscriptions count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 