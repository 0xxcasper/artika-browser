# Artika Browser - Static Website Project Index

## Project Overview

**Artika Browser** is a modern static website built with Next.js 14, TypeScript, and Tailwind CSS. It provides a clean, responsive foundation for showcasing web content with beautiful animations and modern design.

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Internationalization**: next-intl
- **Animation**: Tailwind CSS animations
- **Deployment**: Static site generation

## Project Structure

```
Artika-browser/
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 [locale]/             # Internationalized routes
│   │   │   ├── 📁 (unauth)/         # Public pages
│   │   │   └── layout.tsx           # Root layout
│   │   ├── global-error.tsx         # Global error handling
│   │   ├── robots.ts                # SEO robots.txt
│   │   └── sitemap.ts               # SEO sitemap
│   ├── 📁 components/               # Reusable UI components
│   │   ├── 📁 ui/                   # Shadcn UI components
│   │   ├── ActiveLink.tsx           # Navigation component
│   │   ├── Background.tsx           # Background component
│   │   ├── LocaleSwitcher.tsx       # Language switcher
│   │   └── ToggleMenuButton.tsx     # Mobile menu toggle
│   ├── 📁 features/                 # Feature-specific components
│   │   ├── 📁 landing/              # Landing page features
│   │   └── 📁 sponsors/             # Sponsor components
│   ├── 📁 hooks/                    # Custom React hooks
│   ├── 📁 libs/                     # Third-party library configs
│   │   ├── Env.ts                   # Environment variables
│   │   ├── i18n.ts                  # Internationalization
│   │   └── Logger.ts                # Logging configuration
│   ├── 📁 locales/                  # Translation files
│   │   ├── en.json                  # English translations
│   │   └── fr.json                  # French translations
│   ├── 📁 styles/                   # Global styles
│   │   └── global.css               # Tailwind CSS imports
│   ├── 📁 templates/                # Page templates
│   │   ├── CTA.tsx                  # Call-to-action section
│   │   ├── FAQ.tsx                  # FAQ section
│   │   ├── Features.tsx             # Features section
│   │   ├── Footer.tsx               # Footer component
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── Logo.tsx                 # Logo component
│   │   ├── Navbar.tsx               # Navigation bar
│   │   └── Sponsors.tsx             # Sponsors section
│   ├── 📁 types/                    # TypeScript type definitions
│   │   ├── Enum.ts                  # Enum definitions
│   │   └── global.d.ts              # Global type declarations
│   ├── 📁 utils/                    # Utility functions
│   │   ├── AppConfig.ts             # Application configuration
│   │   └── Helpers.ts               # Helper functions
│   ├── instrumentation.ts           # Application instrumentation
│   └── middleware.ts                # Next.js middleware (i18n only)
├── 📁 public/                       # Static assets
│   └── 📁 assets/                   # Images and media
├── package.json                     # Dependencies and scripts
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

## Key Features

### 🌐 Internationalization
- **Multi-language Support**: English and French
- **Locale Routing**: SEO-friendly URL structure
- **Dynamic Content**: Context-aware translations

### 🎨 Modern Design
- **Tailwind CSS**: Utility-first styling
- **Shadcn UI**: High-quality React components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Theme switching capability

### ⚡ Performance
- **Static Site Generation**: Fast loading times
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **SEO Optimized**: Meta tags and structured data

### 🚀 Development Experience
- **Hot Reload**: Fast development iteration
- **ESLint + Prettier**: Code quality and formatting
- **TypeScript**: Type safety throughout
- **VSCode Integration**: Optimized development setup

## Configuration

### Environment Variables
- `NEXT_PUBLIC_APP_URL`: Application URL (optional)

### Application Configuration (`src/utils/AppConfig.ts`)
- **App Name**: "Artika Browser"
- **Description**: "A modern web browser experience"
- **Supported Locales**: English (en), French (fr)

## Available Scripts

### Development
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server

### Code Quality
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run check-types`: TypeScript type checking

## Deployment

### Prerequisites
- Node.js 20+
- npm or yarn

### Environment Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Build for production: `npm run build`

### Static Site Generation
- All pages are pre-rendered at build time
- No server-side database or API calls
- Can be deployed to any static hosting service
- Optimized for CDN delivery

## Customization Points

### Quick Customization
Search for `FIXME:` comments throughout the codebase for quick customization points:

- **Favicon**: Update `public/favicon.ico` and related files
- **App Configuration**: Modify `src/utils/AppConfig.ts`
- **Content**: Update templates in `src/templates/`
- **Styling**: Customize `src/styles/global.css`

### Content Management
- **Hero Section**: `src/templates/Hero.tsx`
- **Features**: `src/templates/Features.tsx`
- **FAQ**: `src/templates/FAQ.tsx`
- **Footer**: `src/templates/Footer.tsx`

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality React components

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

### Deployment
- **Static Site Generation**: Pre-rendered pages
- **Image Optimization**: Next.js Image component
- **SEO**: Built-in meta tags and sitemap

## File Structure Details

### Templates (`src/templates/`)
- **Hero.tsx**: Main landing section with call-to-action
- **Features.tsx**: Product features showcase
- **FAQ.tsx**: Frequently asked questions
- **CTA.tsx**: Call-to-action section
- **Footer.tsx**: Site footer with links
- **Navbar.tsx**: Navigation header
- **Sponsors.tsx**: Sponsor logos section

### Components (`src/components/`)
- **ui/**: Shadcn UI components (button, input, etc.)
- **ActiveLink.tsx**: Navigation link component
- **Background.tsx**: Background effects
- **LocaleSwitcher.tsx**: Language switcher
- **ToggleMenuButton.tsx**: Mobile menu toggle

### Features (`src/features/`)
- **landing/**: Landing page specific components
- **sponsors/**: Sponsor-related components

This static website provides a clean, modern foundation for showcasing content with beautiful animations and responsive design. 