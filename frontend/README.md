# Frontend - User Authentication & Management

React 19 + TypeScript + Vite frontend application with modern state management and UI patterns.

## 🛠️ Tech Stack

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool & dev server
- **React Router 7.9** - Client-side routing
- **Zustand 5.0** - Global state management
- **TanStack Query 5.90** - Server state management
- **React Hook Form 7.66** - Form handling
- **Zod 4.1** - Schema validation
- **Axios 1.13** - HTTP client
- **Tailwind CSS 3.4** - Styling framework

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Phase Guide](#-development-phase-guide)
- [Key Features](#-key-features)
- [Feature-Based Architecture](#-feature-based-architecture)
- [Available Scripts](#-available-scripts)
- [React Query Usage](#-react-query-usage)
- [Protected Routes](#-protected-routes)
- [Responsive Design](#-responsive-design)
- [ESLint Configuration](#eslint-configuration)

## 📁 Project Structure

```
src/
├── features/           # Feature modules
│   ├── auth/          # Authentication
│   │   ├── api/       # API calls & React Query hooks
│   │   ├── components/ # LoginForm, RegisterForm
│   │   ├── pages/     # LoginPage, RegisterPage
│   │   ├── schemas/   # Zod validation schemas
│   │   ├── store/     # Zustand auth store
│   │   └── types/     # TypeScript types
│   └── users/         # User management
│       ├── api/       # User API calls
│       ├── components/ # EditProfileForm, ChangePasswordForm
│       ├── pages/     # DashboardPage, ProfilePage
│       ├── schemas/   # Validation schemas
│       └── types/     # TypeScript types
├── shared/            # Shared resources
│   ├── api/          # Axios client with interceptors
│   ├── components/   # Reusable UI components
│   │   └── ui/       # Button, Input, Container
│   ├── config/       # Configuration files
│   └── types/        # Shared TypeScript types
├── router/           # React Router configuration
│   ├── index.tsx     # Route definitions
│   └── ProtectedRoute.tsx # Auth guard
└── providers/        # React providers
    └── QueryProvider.tsx # React Query setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Application will run on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Key Features

### State Management
- **Zustand** for global auth state (user, token, isAuthenticated)
- **React Query** for server state and API caching
- **React Hook Form** for form state

### Authentication Flow
1. User logs in → JWT token received
2. Token stored in Zustand + localStorage
3. Token automatically added to all API requests via Axios interceptor
4. Protected routes check authentication status
5. Expired/invalid token → Auto-logout and redirect

### UI Components

All components use **variant-based styling** for consistency:

```tsx
// Button variants
<Button variant="primary" />   // Blue button
<Button variant="secondary" /> // Gray button
<Button variant="danger" />    // Red button
<Button variant="form" />      // Full-width green button

// Input with error handling
<Input 
  variant="form"
  error={errors.email?.message}
  {...register('email')}
/>

// Container variants
<Container variant="default" /> // Basic container
<Container variant="form" />    // Form container with styling
<Container variant="card" />    // Card with shadow
```

### Form Validation

Using **React Hook Form + Zod** for type-safe validation:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});
```

Validation runs on frontend before API calls, reducing unnecessary requests.

## 🏗️ Development Phase Guide

When building this frontend application from scratch, follow this recommended development order:

### **Phase 1: Project Initialization & Configuration**
*Set up the basic project structure and tooling*

```bash
# 1. Initialize Vite project with React + TypeScript
npm create vite@latest frontend -- --template react-ts
cd frontend

# 2. Install core dependencies
npm install react-router-dom zustand @tanstack/react-query axios zod react-hook-form @hookform/resolvers

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Create these configuration files first:**

1. **`vite.config.ts`** - Vite configuration
2. **`tsconfig.json`** - TypeScript configuration  
3. **`tsconfig.app.json`** - App-specific TypeScript config
4. **`tsconfig.node.json`** - Node-specific TypeScript config
5. **`tailwind.config.js`** - Tailwind CSS configuration
6. **`postcss.config.cjs`** - PostCSS configuration
7. **`eslint.config.js`** - ESLint configuration
8. **`.env`** - Environment variables (VITE_API_BASE_URL)
9. **`src/index.css`** - Global styles with Tailwind directives

### **Phase 2: Shared Foundation**
*Build core utilities and configurations before features*

10. **`src/shared/config/api.config.ts`** - API configuration with environment variables
11. **`src/shared/types/api.types.ts`** - Shared API response types
12. **`src/shared/types/index.ts`** - Type exports
13. **`src/shared/api/apiClient.ts`** - Axios instance with interceptors for auth tokens
14. **`src/shared/api/index.ts`** - API exports

### **Phase 3: Shared UI Components**
*Reusable components used across features*

15. **`src/shared/components/ui/Button.tsx`** - Button component with variants
16. **`src/shared/components/ui/Input.tsx`** - Input component with error handling
17. **`src/shared/components/ui/Container.tsx`** - Container component with variants
18. **`src/shared/components/ui/index.ts`** - UI component exports

### **Phase 4: Providers Setup**
*Configure application-wide providers*

19. **`src/providers/QueryProvider.tsx`** - TanStack Query provider with configuration
20. **`src/providers/index.ts`** - Provider exports

### **Phase 5: Authentication Feature (Complete)**
*Build auth system as foundation for protected routes*

**Types & Schemas:**
21. **`src/features/auth/types/auth.types.ts`** - Auth TypeScript interfaces
22. **`src/features/auth/schemas/auth.schemas.ts`** - Zod validation schemas for login/register
23. **`src/features/auth/schemas/index.ts`** - Schema exports

**State Management:**
24. **`src/features/auth/store/authStore.ts`** - Zustand store with persist middleware
25. **`src/features/auth/store/index.ts`** - Store exports

**API Layer:**
26. **`src/features/auth/api/authApi.ts`** - Auth API functions (login, register, logout)
27. **`src/features/auth/api/authHooks.ts`** - React Query hooks (useLogin, useRegister)
28. **`src/features/auth/api/index.ts`** - API exports

**Components:**
29. **`src/features/auth/components/LoginForm.tsx`** - Login form with React Hook Form
30. **`src/features/auth/components/RegisterForm.tsx`** - Register form with React Hook Form
31. **`src/features/auth/components/index.ts`** - Component exports

**Pages:**
32. **`src/features/auth/pages/LoginPage.tsx`** - Login page layout
33. **`src/features/auth/pages/RegisterPage.tsx`** - Register page layout
34. **`src/features/auth/pages/index.ts`** - Page exports

### **Phase 6: Router Setup**
*Configure routing after auth is ready*

35. **`src/router/ProtectedRoute.tsx`** - Route guard for authenticated routes
36. **`src/router/index.tsx`** - React Router configuration with all routes

### **Phase 7: Users Feature (Complete)**
*Build user management after auth is working*

**Types & Schemas:**
37. **`src/features/users/types/user.types.ts`** - User TypeScript interfaces
38. **`src/features/users/schemas/user.schemas.ts`** - Zod validation schemas
39. **`src/features/users/schemas/index.ts`** - Schema exports

**API Layer:**
40. **`src/features/users/api/userApi.ts`** - User API functions
41. **`src/features/users/api/userHooks.ts`** - React Query hooks (useCurrentUser, useUpdateUser, etc.)
42. **`src/features/users/api/index.ts`** - API exports

**Components:**
43. **`src/features/users/components/EditProfileForm.tsx`** - Profile edit form
44. **`src/features/users/components/ChangePasswordForm.tsx`** - Password change form
45. **`src/features/users/components/UserCard.tsx`** - User display card
46. **`src/features/users/components/UsersList.tsx`** - Users list component
47. **`src/features/users/components/Pagination.tsx`** - Pagination component
48. **`src/features/users/components/index.ts`** - Component exports

**Pages:**
49. **`src/features/users/pages/DashboardPage.tsx`** - Dashboard page
50. **`src/features/users/pages/ProfilePage.tsx`** - User profile page
51. **`src/features/users/pages/UsersPage.tsx`** - Users list page (admin)
52. **`src/features/users/pages/index.ts`** - Page exports

### **Phase 8: Main Application**
*Wire everything together*

53. **`src/App.tsx`** - Main app component with RouterProvider
54. **`src/main.tsx`** - Application entry point with providers
55. **`index.html`** - HTML template

### 📋 Development Tips

**Why This Order?**
- ✅ **Configuration First**: Set up tooling before writing code
- ✅ **Shared Before Features**: Build utilities before components that use them
- ✅ **UI Components Early**: Create reusable components before feature-specific ones
- ✅ **Auth Before Users**: Authentication must work before protected user features
- ✅ **Bottom-Up Approach**: Infrastructure → Utilities → Components → Pages

**Best Practices:**
- Always create `index.ts` barrel files for clean imports
- Keep components small and focused on single responsibility
- Use TypeScript strictly - no `any` types
- Validate all user inputs with Zod schemas
- Use React Query for all server state
- Use Zustand only for client state (like auth)
- Follow the feature-based architecture pattern

**Testing Each Phase:**
1. **After Phase 3**: Test Button, Input components in isolation
2. **After Phase 5**: Test login/register flow completely
3. **After Phase 6**: Verify protected routes redirect correctly
4. **After Phase 7**: Test all user management features

## 📂 Feature-Based Architecture

Each feature is self-contained with:
- `api/` - API calls and React Query hooks
- `components/` - Feature-specific components
- `pages/` - Page components
- `schemas/` - Zod validation schemas
- `store/` - Zustand stores (if needed)
- `types/` - TypeScript interfaces

## 🔧 Available Scripts

```bash
npm run dev       # Start development server (port 5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🎯 React Query Usage

API calls are managed with TanStack Query hooks:

```tsx
// Login mutation
const { mutate: login, isPending, error } = useLogin();

// Get current user
const { data: user, isLoading } = useCurrentUser();

// Update profile
const { mutate: updateProfile } = useUpdateUser();
```

Benefits:
- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates

## 🛡️ Protected Routes

Routes requiring authentication are wrapped:

```tsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

If user is not authenticated, they're redirected to login.

## 📱 Responsive Design

Built mobile-first with Tailwind CSS:
- All components are responsive
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Touch-friendly button sizes

## ESLint Configuration

For production applications, enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
