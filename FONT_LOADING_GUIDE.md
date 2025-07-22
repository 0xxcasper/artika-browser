# Font Loading System Guide

## Overview
This project implements a comprehensive font loading system that ensures all fonts are loaded before displaying page content, preventing layout shifts and improving user experience.

## Features

### ✅ **Preload Critical Fonts**
- Fonts are preloaded in the HTML head
- Uses `font-display: swap` for optimal performance
- Prevents invisible text during font loading

### ✅ **Font Loading Detection**
- Real-time font loading status monitoring
- Progress tracking for multiple fonts
- Timeout fallback to prevent infinite loading

### ✅ **Multiple Loading Strategies**
- Simple loader with spinner
- Progress-based loader with percentage
- Custom fallback support
- Hook-based font loading management

## Components

### 1. FontLoader Component
Basic font loader with spinner and custom fallback support.

```tsx
import FontLoader from '@/components/font-loader';

<FontLoader 
  fonts={['Baskervville', 'Inter']}
  timeout={5000}
  fallback={<CustomLoadingComponent />}
>
  <YourPageContent />
</FontLoader>
```

### 2. ProgressFontLoader Component
Advanced loader with progress bar and percentage display.

```tsx
import ProgressFontLoader from '@/components/font-loader/progress-loader';

<ProgressFontLoader 
  fonts={['Baskervville', 'Inter']}
  timeout={3000}
  showProgress={true}
>
  <YourPageContent />
</ProgressFontLoader>
```

### 3. useFontLoader Hook
Custom hook for font loading management.

```tsx
import { useFontLoader } from '@/hooks/useFontLoader';

function MyComponent() {
  const { fontsLoaded, loadingProgress, isLoading } = useFontLoader({
    fonts: ['Baskervville', 'Inter'],
    timeout: 5000,
    onLoad: () => console.log('Fonts loaded!'),
    onTimeout: () => console.warn('Font loading timeout')
  });

  if (isLoading) {
    return <div>Loading... {loadingProgress}%</div>;
  }

  return <div>Content with loaded fonts</div>;
}
```

## Configuration

### Root Layout Setup
The font loading system is configured in `src/app/layout.tsx`:

```tsx
import ProgressFontLoader from '@/components/font-loader/progress-loader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/Baskervville-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous" 
        />
        
        {/* Font display optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Baskervville';
              src: url('/fonts/Baskervville-Regular.ttf') format('truetype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body>
        <ProgressFontLoader 
          fonts={['Baskervville', 'Inter']}
          timeout={3000}
          showProgress={true}
        >
          {children}
        </ProgressFontLoader>
      </body>
    </html>
  );
}
```

### Font Configuration
Fonts are defined in `src/styles/_fonts.scss`:

```scss
@font-face {
  font-family: 'Baskervville';
  src: url('/fonts/Baskervville-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap; // Optimize font loading performance
}
```

## Usage Examples

### 1. Page-Level Font Loading
```tsx
import FontLoader from '@/components/font-loader';

export default function MyPage() {
  return (
    <FontLoader fonts={['Baskervville']}>
      <div>
        <h1>This content waits for fonts</h1>
        <p>Text will only render after fonts are loaded</p>
      </div>
    </FontLoader>
  );
}
```

### 2. Component-Level Font Loading
```tsx
import { useFontLoader } from '@/hooks/useFontLoader';

export default function MyComponent() {
  const { fontsLoaded, isLoading } = useFontLoader({
    fonts: ['Baskervville'],
    timeout: 2000
  });

  if (isLoading) {
    return <div>Loading fonts...</div>;
  }

  return (
    <div style={{ fontFamily: 'Baskervville, serif' }}>
      Content with loaded font
    </div>
  );
}
```

### 3. Custom Fallback
```tsx
<FontLoader 
  fonts={['Baskervville']}
  fallback={
    <div className="custom-loader">
      <h2>Loading...</h2>
      <p>Please wait while we prepare your experience</p>
    </div>
  }
>
  <YourContent />
</FontLoader>
```

## Performance Optimization

### 1. Font Preloading
```html
<link 
  rel="preload" 
  href="/fonts/Baskervville-Regular.ttf" 
  as="font" 
  type="font/ttf" 
  crossOrigin="anonymous" 
/>
```

### 2. Font Display Strategy
```scss
@font-face {
  font-family: 'Baskervville';
  font-display: swap; // Show text immediately with fallback font
}
```

### 3. Timeout Management
```tsx
<FontLoader timeout={3000}> // Force load after 3 seconds
  <Content />
</FontLoader>
```

## Testing

### Test Page
Visit `/font-loading-test` to see all font loading features in action:

- Simple font loader
- Progress-based loader
- Custom fallbacks
- Font display testing
- Hero component with fonts

### Manual Testing
1. **Clear browser cache** to simulate first load
2. **Use slow network** in DevTools to test loading states
3. **Check console** for font loading events
4. **Verify no layout shifts** during font loading

## Troubleshooting

### Font Not Loading
1. **Check file path**: Ensure font files exist in `public/fonts/`
2. **Verify font name**: Font family name must match exactly
3. **Check CORS**: Ensure `crossOrigin="anonymous"` is set
4. **Clear cache**: Clear browser cache and restart server

### Loading Stuck
1. **Check timeout**: Increase timeout value if needed
2. **Verify font list**: Ensure all fonts in the list exist
3. **Check console**: Look for font loading errors
4. **Test individually**: Load fonts one by one to isolate issues

### Performance Issues
1. **Optimize font files**: Convert to WOFF2 format
2. **Reduce font variants**: Only load necessary weights/styles
3. **Use system fonts**: Fall back to system fonts when possible
4. **Implement subsetting**: Only load required characters

## Best Practices

### 1. Font Selection
- **Limit font variants**: Only load necessary weights and styles
- **Use system fonts**: Fall back to system fonts for better performance
- **Optimize file size**: Convert to WOFF2 format when possible

### 2. Loading Strategy
- **Preload critical fonts**: Use `<link rel="preload">` for important fonts
- **Set appropriate timeouts**: Balance user experience with loading time
- **Provide fallbacks**: Always have system font fallbacks

### 3. User Experience
- **Show loading state**: Provide visual feedback during font loading
- **Prevent layout shifts**: Use `font-display: swap` or similar strategies
- **Graceful degradation**: Ensure content is readable even without custom fonts

### 4. Performance
- **Monitor Core Web Vitals**: Track LCP, CLS, and FID metrics
- **Use font subsetting**: Only load required characters
- **Implement caching**: Cache fonts appropriately for returning users

## API Reference

### FontLoader Props
```tsx
interface FontLoaderProps {
  children: React.ReactNode;
  fonts?: string[];           // Array of font family names
  fallback?: React.ReactNode; // Custom loading component
  timeout?: number;           // Timeout in milliseconds (default: 5000)
}
```

### ProgressFontLoader Props
```tsx
interface ProgressFontLoaderProps {
  children: React.ReactNode;
  fonts?: string[];           // Array of font family names
  timeout?: number;           // Timeout in milliseconds (default: 5000)
  showProgress?: boolean;     // Show progress bar (default: true)
}
```

### useFontLoader Hook
```tsx
interface UseFontLoaderOptions {
  fonts?: string[];           // Array of font family names
  timeout?: number;           // Timeout in milliseconds (default: 5000)
  onLoad?: () => void;        // Callback when fonts load
  onTimeout?: () => void;     // Callback when timeout reached
}

interface UseFontLoaderReturn {
  fontsLoaded: boolean;       // Whether all fonts are loaded
  timeoutReached: boolean;    // Whether timeout was reached
  loadingProgress: number;    // Loading progress (0-100)
  isLoading: boolean;         // Whether fonts are still loading
}
``` 