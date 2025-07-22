# Path Alias Configuration

## Overview
This project uses path aliases to simplify imports and improve code organization.

## Configured Aliases

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/public/*": ["./public/*"]
    }
  }
}
```

### Next.js Configuration (`next.config.mjs`)
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
};
```

### JavaScript Support (`jsconfig.json`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/public/*": ["./public/*"]
    }
  }
}
```

## Available Aliases

| Alias | Path | Description |
|-------|------|-------------|
| `@/*` | `./src/*` | Source code directory |
| `@/components/*` | `./src/components/*` | React components |
| `@/styles/*` | `./src/styles/*` | SCSS styles |
| `@/app/*` | `./src/app/*` | Next.js App Router pages |
| `@/libs/*` | `./src/libs/*` | Utility libraries |
| `@/types/*` | `./src/types/*` | TypeScript type definitions |
| `@/utils/*` | `./src/utils/*` | Utility functions |
| `@/public/*` | `./public/*` | Public assets |

## Usage Examples

### Importing Components
```typescript
// ✅ Good - Using alias
import Hero from '@/components/hero';
import Button from '@/components/button';

// ❌ Bad - Relative path
import Hero from '../../../components/hero';
```

### Importing Styles
```typescript
// ✅ Good - Using alias
import '@/styles/global.scss';

// ❌ Bad - Relative path
import '../../styles/global.scss';
```

### Importing Utilities
```typescript
// ✅ Good - Using alias
import { formatDate } from '@/utils/helpers';
import { AppConfig } from '@/utils/AppConfig';

// ❌ Bad - Relative path
import { formatDate } from '../../utils/helpers';
```

### Importing Types
```typescript
// ✅ Good - Using alias
import type { User } from '@/types/Auth';
import type { Subscription } from '@/types/Subscription';

// ❌ Bad - Relative path
import type { User } from '../../types/Auth';
```

## IDE Support

### VS Code
- Install TypeScript extension
- Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- Auto-completion and go-to-definition will work with aliases

### WebStorm/IntelliJ
- Aliases are automatically recognized
- Auto-completion and navigation work out of the box

### Vim/Neovim
- Install `coc-tsserver` or similar TypeScript language server
- Aliases will be recognized automatically

## Troubleshooting

### Alias Not Working
1. **Restart TypeScript server** in your IDE
2. **Clear Next.js cache**: `rm -rf .next`
3. **Restart development server**: `npm run dev`
4. **Check file extensions**: Ensure you're importing the correct file extension

### Import Errors
```bash
# Check if alias is resolved correctly
npm run build

# Check TypeScript compilation
npx tsc --noEmit
```

### Common Issues

#### Module not found error
```bash
Error: Cannot find module '@/components/hero'
```
**Solution**: Check if the file exists and restart TypeScript server

#### Path mapping error
```bash
Error: Path mapping for '@' not found
```
**Solution**: Verify `tsconfig.json` and `next.config.mjs` are configured correctly

## Best Practices

1. **Always use aliases** for imports within the project
2. **Keep aliases consistent** across the codebase
3. **Use absolute paths** for external dependencies
4. **Document new aliases** when adding them
5. **Test aliases** after configuration changes

## Testing Aliases

Visit `/alias-test` to verify that aliases are working correctly.

## Adding New Aliases

1. **Update `tsconfig.json`**:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/public/*": ["./public/*"],
      "@/new-alias/*": ["./src/new-folder/*"]
    }
  }
}
```

2. **Update `next.config.mjs`**:
```javascript
webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@/public': path.resolve(__dirname, 'public'),
    '@/new-alias': path.resolve(__dirname, 'src/new-folder'),
  };
  return config;
}
```

3. **Update `jsconfig.json`** (if needed)
4. **Restart development server**
5. **Test the new alias** 