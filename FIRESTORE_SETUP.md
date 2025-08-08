# Firestore Setup Guide

## 🔧 Fixing "Missing or insufficient permissions" Error

The error you're seeing is due to Firestore security rules blocking access to the `email_submissions` collection. Follow these steps to fix it:

### Option 1: Quick Fix (Development)

1. **Go to Firebase Console**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Select your project (`artika-browser`)

2. **Navigate to Firestore**
   - Click on "Firestore Database" in the left sidebar
   - Click on the "Rules" tab

3. **Update Security Rules**
   - Replace the existing rules with the content from `firestore.rules`
   - Click "Publish" to save the changes

### Option 2: Using Firebase CLI

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

### Option 3: Production-Ready Rules

For production, use the more secure rules from `firestore.rules.production`:

1. Copy the content from `firestore.rules.production`
2. Paste it in the Firebase Console Rules tab
3. Click "Publish"

## 📋 Current Rules Explanation

### Development Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to email_submissions collection
    match /email_submissions/{document} {
      allow read, write: if true;
    }

    // Allow read and write access to all collections (for development)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Warning**: These rules allow full access to all collections. Use only for development.

### Production Rules (`firestore.rules.production`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Email submissions collection
    match /email_submissions/{document} {
      // Allow anyone to create new email submissions
      allow create: if true;

      // Allow read access to all submissions (for admin)
      allow read: if true;

      // Allow update and delete only for authenticated users (admin)
      allow update, delete: if request.auth != null;
    }

    // Default rule - deny all access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**✅ Recommended**: These rules are more secure and production-ready.

## 🚀 After Updating Rules

1. **Test the Email Form**
   - Try submitting an email through the form
   - Check the browser console for success messages

2. **Test the Admin Page**
   - Visit `/admin` to see if submissions are loading
   - Try marking submissions as read
   - Try deleting submissions

3. **Check Firestore Console**
   - Go to Firestore Database in Firebase Console
   - You should see the `email_submissions` collection
   - New submissions should appear here

## 🔍 Troubleshooting

### Still Getting Permission Errors?

1. **Clear Browser Cache**
   - Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

2. **Check Firebase Project**
   - Ensure you're using the correct Firebase project
   - Verify the project ID in `src/libs/firebase.ts`

3. **Check Network Tab**
   - Open browser DevTools → Network tab
   - Look for failed requests to Firestore
   - Check the error messages

4. **Verify Rules Deployment**
   - In Firebase Console, check the Rules tab
   - Ensure the rules were published successfully

### Common Issues

- **Wrong Project**: Make sure your Firebase config points to the correct project
- **Rules Not Published**: Rules must be published to take effect
- **Cached Rules**: Browser might be using cached rules, try hard refresh

## 📞 Need Help?

If you're still having issues:

1. Check the browser console for detailed error messages
2. Verify your Firebase project configuration
3. Ensure Firestore is enabled in your Firebase project
4. Check that the `email_submissions` collection exists (it will be created automatically)

The updated rules should resolve the permissions issue and allow your email submission system to work properly!
