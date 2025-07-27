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

// Email submission interface
export interface EmailSubmission {
  id: string;
  email: string;
  name?: string;
  message?: string;
  submittedAt: Date;
  read: boolean;
  note?: string;
  readAt?: Date;
}

// Collection names
export const COLLECTIONS = {
  EMAIL_SUBMISSIONS: 'email_submissions'
} as const;

// Email submission service
export class EmailSubmissionService {
  // Submit a new email
  static async submitEmail(data: {
    email: string;
    name?: string;
    message?: string;
  }): Promise<string> {
    try {
      const submissionData = {
        ...data,
        submittedAt: new Date(),
        read: false
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.EMAIL_SUBMISSIONS), submissionData);
      console.log('Email submitted successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting email:', error);
      throw new Error(`Failed to submit email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all email submissions (for admin)
  static async getAllSubmissions(): Promise<EmailSubmission[]> {
    try {
      console.log('Fetching all email submissions...');
      const q = query(
        collection(db, COLLECTIONS.EMAIL_SUBMISSIONS),
        orderBy('submittedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const submissions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          name: data.name,
          message: data.message,
          // Convert Firestore timestamp to Date
          submittedAt: data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date(data.submittedAt),
          read: data.read,
          note: data.note,
          // Convert readAt timestamp if it exists
          readAt: data.readAt?.toDate ? data.readAt.toDate() : (data.readAt ? new Date(data.readAt) : undefined)
        };
      }) as EmailSubmission[];
      
      console.log(`Successfully fetched ${submissions.length} submissions`);
      return submissions;
    } catch (error) {
      console.error('Error getting email submissions:', error);
      if (error instanceof Error && error.message.includes('permission')) {
        throw new Error('Access denied. Please check Firestore security rules.');
      }
      throw new Error(`Failed to fetch submissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Mark email as read
  static async markAsRead(submissionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.EMAIL_SUBMISSIONS, submissionId);
      await updateDoc(docRef, { read: true });
      console.log('Email marked as read:', submissionId);
    } catch (error) {
      console.error('Error marking email as read:', error);
      throw new Error(`Failed to mark as read: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete email submission
  static async deleteSubmission(submissionId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.EMAIL_SUBMISSIONS, submissionId);
      await deleteDoc(docRef);
      console.log('Email submission deleted:', submissionId);
    } catch (error) {
      console.error('Error deleting email submission:', error);
      throw new Error(`Failed to delete submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get unread count
  static async getUnreadCount(): Promise<number> {
    try {
      const q = query(
        collection(db, COLLECTIONS.EMAIL_SUBMISSIONS),
        orderBy('read', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      const unreadCount = querySnapshot.docs.filter(doc => !doc.data().read).length;
      console.log('Unread count:', unreadCount);
      return unreadCount;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0; // Return 0 on error to prevent breaking the UI
    }
  }
}

// Export commonly used Firestore functions
export {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy
}; 