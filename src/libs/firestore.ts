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

// Collection names
export const COLLECTIONS = {
  TOUR_SUBMISSIONS: 'tour_submissions'
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