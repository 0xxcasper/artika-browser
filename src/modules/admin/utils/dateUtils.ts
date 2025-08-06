// Helper function to convert any date format to Date object
export const parseDate = (date: Date | any): Date => {
  if (date instanceof Date) {
    return date;
  } else if (date && typeof date === 'object' && date.toDate) {
    // Firestore Timestamp object (fallback)
    return date.toDate();
  } else if (date && typeof date === 'string') {
    // String date
    return new Date(date);
  } else if (date && typeof date === 'number') {
    // Timestamp number
    return new Date(date);
  } else {
    // Fallback
    return new Date();
  }
};

export const formatDate = (date: Date | any) => {
  // Handle Firestore timestamp conversion
  let dateObj: Date;
  
  if (date instanceof Date) {
    dateObj = date;
  } else if (date && typeof date === 'object' && date.toDate) {
    // Firestore Timestamp object
    dateObj = date.toDate();
  } else if (date && typeof date === 'string') {
    // String date
    dateObj = new Date(date);
  } else if (date && typeof date === 'number') {
    // Timestamp number
    dateObj = new Date(date);
  } else {
    // Fallback for invalid dates
    return 'Invalid Date';
  }

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTourDate = (date: Date | any) => {
  let dateObj: Date;
  
  if (date instanceof Date) {
    dateObj = date;
  } else if (date && typeof date === 'object' && date.toDate) {
    dateObj = date.toDate();
  } else if (date && typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date && typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return 'Invalid Date';
  }

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}; 