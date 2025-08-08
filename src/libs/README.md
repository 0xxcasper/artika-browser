# Firebase & Firestore Configuration

This directory contains the Firebase configuration and Firestore utilities for the Artika Browser application.

## Files Overview

### `firebase.ts`

Main Firebase configuration file that initializes:

- Firebase App
- Firestore Database
- Authentication
- Storage
- Analytics (client-side only)

### `firestore.ts`

Comprehensive Firestore utilities including:

- Generic CRUD operations
- Query helpers
- Pagination support
- Collection-specific services
- Type-safe operations

### `useFirestore.ts` (in `../hooks/`)

React hooks for using Firestore in components:

- `useFirestoreCollection` - For fetching collections
- `useFirestoreDocument` - For fetching single documents
- `useFirestorePagination` - For paginated data

## Quick Start

### 1. Basic Usage in Components

```tsx
import { useFirestoreCollection } from '@/hooks/useFirestore';
import { COLLECTIONS } from '@/libs/firestore';

function MyComponent() {
  const { data, loading, error, addDocument } = useFirestoreCollection(
    COLLECTIONS.ARTWORKS,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### 2. Using Direct Firestore Service

```tsx
import { FirestoreService } from '@/libs/firestore';

// Get all documents
const artworks = await FirestoreService.getAll('artworks');

// Get by ID
const artwork = await FirestoreService.getById('artworks', 'doc-id');

// Add document
const id = await FirestoreService.add('artworks', {
  title: 'New Artwork',
  artist: 'Artist Name',
});

// Update document
await FirestoreService.update('artworks', 'doc-id', {
  title: 'Updated Title',
});

// Delete document
await FirestoreService.delete('artworks', 'doc-id');
```

### 3. Using Collection-Specific Services

```tsx
import { ArtworkService, ArtistService } from '@/libs/firestore';

// Get artworks by category
const sculptures = await ArtworkService.getArtworksByCategory('sculpture');

// Get featured artworks
const featured = await ArtworkService.getFeaturedArtworks();

// Get artists by category
const painters = await ArtistService.getArtistsByCategory('painting');
```

## Available Collections

The following collections are predefined in `COLLECTIONS`:

- `ARTWORKS` - Artwork items
- `ARTISTS` - Artist information
- `EXHIBITIONS` - Exhibition data
- `NEWS` - News articles
- `EVENTS` - Event information
- `USERS` - User data
- `GALLERIES` - Gallery information

## Data Types

### FirestoreDocument Interface

All documents extend this base interface:

```tsx
interface FirestoreDocument {
  id: string;
  [key: string]: any;
}
```

### Example Artwork Type

```tsx
interface Artwork extends FirestoreDocument {
  title: string;
  artist: string;
  category: string;
  imageUrl: string;
  description: string;
  featured: boolean;
  createdAt: Date;
}
```

## Query Examples

### Filtering

```tsx
import { where, orderBy } from 'firebase/firestore';

// Get featured artworks
const featured = await FirestoreService.query('artworks', [
  where('featured', '==', true),
  orderBy('createdAt', 'desc'),
]);

// Get artworks by artist
const artistWorks = await FirestoreService.query('artworks', [
  where('artistId', '==', 'artist-id'),
  orderBy('title', 'asc'),
]);
```

### Pagination

```tsx
import { useFirestorePagination } from '@/hooks/useFirestore';

function PaginatedList() {
  const { data, loading, hasMore, loadMore } = useFirestorePagination(
    'artworks',
    10, // page size
    [where('featured', '==', true)],
  );

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}
```

## Error Handling

All Firestore operations include proper error handling:

```tsx
try {
  const data = await FirestoreService.getAll('artworks');
} catch (error) {
  console.error('Firestore error:', error);
  // Handle error appropriately
}
```

## Security Rules

Make sure to configure Firestore security rules in your Firebase console. Example rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to artworks
    match /artworks/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Allow read access to artists
    match /artists/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Environment Variables

For production, consider moving Firebase config to environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Then update `firebase.ts`:

```tsx
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
```
