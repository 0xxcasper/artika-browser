# Font Configuration Guide

## Overview

This project uses a modular SCSS font system that loads fonts from the `public/fonts` directory.

## Font Structure

### Current Fonts

- **Baskervville-Regular.ttf** - Primary serif font for headings

### Font Files Location

```
public/fonts/
├── Baskervville-Regular.ttf
└── (add more fonts here)
```

## Adding New Fonts

### 1. Add Font Files

Place your font files in `public/fonts/` directory:

- `.ttf` (TrueType)
- `.woff` (Web Open Font Format)
- `.woff2` (Web Open Font Format 2.0) - Recommended for better performance

### 2. Update Font Declarations

Edit `src/styles/_fonts.scss` and add `@font-face` declarations:

```scss
@font-face {
  font-family: 'YourFontName';
  src:
    url('/fonts/YourFont-Regular.woff2') format('woff2'),
    url('/fonts/YourFont-Regular.woff') format('woff'),
    url('/fonts/YourFont-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src:
    url('/fonts/YourFont-Bold.woff2') format('woff2'),
    url('/fonts/YourFont-Bold.woff') format('woff'),
    url('/fonts/YourFont-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 3. Update Font Variables

Add your font to the variables section:

```scss
$font-primary: 'YourFontName', serif;
$font-secondary: 'AnotherFont', sans-serif;
```

## Using Fonts

### CSS Classes

```html
<h1 class="font-primary heading-1">Primary Font Heading</h1>
<p class="font-secondary body-base">Secondary Font Body</p>
<code class="font-mono">Monospace Code</code>
```

### SCSS Mixins

```scss
.my-heading {
  @include font-primary;
  @include heading-2;
}

.my-body {
  @include font-secondary;
  @include body-large;
}
```

### Typography Scale

- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px
- `text-4xl` - 36px
- `text-5xl` - 48px
- `text-6xl` - 60px

### Heading Styles

- `heading-1` - H1 style with primary font
- `heading-2` - H2 style with primary font
- `heading-3` - H3 style with primary font
- `heading-4` - H4 style with primary font
- `heading-5` - H5 style with primary font
- `heading-6` - H6 style with primary font

### Body Styles

- `body-large` - Large body text
- `body-base` - Base body text
- `body-small` - Small body text
- `body-xs` - Extra small body text

## Performance Optimization

### Font Display

All fonts use `font-display: swap` for better performance:

- Text remains visible during font loading
- Prevents invisible text during font download
- Improves perceived performance

### Font Loading Strategy

1. **Preload critical fonts** in `_app.tsx` or `layout.tsx`:

```html
<link
  rel="preload"
  href="/fonts/Baskervville-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

2. **Use font-display: swap** for non-critical fonts
3. **Optimize font files** using tools like `fonttools` or online converters

## Testing Fonts

Visit `/font-test` to see all font styles in action.

## Best Practices

1. **Use WOFF2 format** when possible for better compression
2. **Limit font variants** to reduce bundle size
3. **Use system fonts** as fallbacks
4. **Test font loading** on slow connections
5. **Monitor Core Web Vitals** for font-related performance issues

## Troubleshooting

### Font Not Loading

1. Check file path in `@font-face` declaration
2. Verify font file exists in `public/fonts/`
3. Check browser console for 404 errors
4. Ensure font file format is supported

### Font Display Issues

1. Check `font-display` property
2. Verify font-family name matches exactly
3. Test with different font weights/styles
4. Check for CSS conflicts
