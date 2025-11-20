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
│   │   └── ui/       # 11 variant-based components:
│   │       ├── Button.tsx      # Button variants
│   │       ├── Input.tsx       # Form inputs
│   │       ├── Container.tsx   # Layout containers
│   │       ├── Label.tsx       # Form labels
│   │       ├── Heading.tsx     # Semantic headings
│   │       ├── Text.tsx        # Typography
│   │       ├── Alert.tsx       # Feedback messages
│   │       ├── NavLink.tsx     # Navigation links
│   │       ├── Avatar.tsx      # User avatars
│   │       ├── SelectInput.tsx # Styled dropdowns
│   │       └── index.ts        # Exports
│   ├── config/       # Configuration files
│   └── types/        # Shared TypeScript types (unified User type)
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

**Zustand** for global auth state:
- Stores `user`, `token`, and `isAuthenticated`
- Only `user` and `token` persisted to localStorage
- `isAuthenticated` is **derived** from token existence on rehydration
- Uses `onRehydrateStorage` hook to set `isAuthenticated = !!token`
- Single source of truth: token determines authentication status

**React Query** for server state:
- All API calls and data fetching
- Automatic caching and background refetching
- Loading and error state management
- Optimistic updates

**React Hook Form** for form state:
- Type-safe forms with Zod validation
- Real-time error messages
- Optimized re-renders

### Authentication Flow
1. User logs in → JWT token received
2. Token stored in Zustand + localStorage
3. Token automatically added to all API requests via Axios interceptor
4. Protected routes check authentication status
5. Expired/invalid token → Auto-logout and redirect

### UI Component System

All components use **variant-based styling** for consistency across the app. The system includes **11 reusable components**:

#### Core Layout Components
```tsx
// Buttons with variants
<Button variant="primary" />   // Blue button
<Button variant="secondary" /> // Gray button
<Button variant="danger" />    // Red button
<Button variant="form" />      // Full-width green button

// Containers with variants
<Container variant="default" /> // Basic container
<Container variant="form" />    // Form container with styling
<Container variant="card" />    // Card with shadow
```

#### Form Components
```tsx
// Input with error handling
<Input 
  variant="form"
  error={errors.email?.message}
  {...register('email')}
/>

// Labels with variants
<Label variant="default">Required Field</Label>
<Label variant="small">Optional info</Label>

// Styled select/dropdown
<SelectInput variant="form">
  <option value="">Choose...</option>
  <option value="1">Option 1</option>
</SelectInput>
```

#### Typography Components
```tsx
// Semantic headings (h1-h6)
<Heading variant="h1">Page Title</Heading>
<Heading variant="h2">Section Title</Heading>

// Text paragraphs with variants
<Text variant="body">Standard text</Text>
<Text variant="muted">Secondary text</Text>
<Text variant="lead">Emphasized text</Text>
<Text variant="small">Small print</Text>
```

#### Feedback & Navigation Components
```tsx
// Alert messages
<Alert variant="success">Success message!</Alert>
<Alert variant="error">Error occurred</Alert>
<Alert variant="info">Information</Alert>

// Navigation links with active state
<NavLink to="/dashboard" active={isActive}>
  Dashboard
</NavLink>

// User avatars with initials
<Avatar name="John Doe" size="sm" />
<Avatar name="Jane Smith" size="md" />
<Avatar name="Bob Wilson" size="lg" />
```

**Component Benefits:**
- ✅ **Consistency** - Same styling across the entire app
- ✅ **Maintainability** - Update design in one place
- ✅ **DRY Principle** - No repetitive Tailwind classes
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Accessibility** - Semantic HTML preserved
- ✅ **Developer Experience** - Clean, readable JSX

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
*Reusable variant-based components used across features (11 components total)*

15. **`src/shared/components/ui/Button.tsx`** - Button component with variants (primary, secondary, danger, form)
16. **`src/shared/components/ui/Input.tsx`** - Input component with error handling
17. **`src/shared/components/ui/Container.tsx`** - Container component with variants (default, form, card)
18. **`src/shared/components/ui/Label.tsx`** - Form labels (default, small)
19. **`src/shared/components/ui/Heading.tsx`** - Semantic h1-h6 headings
20. **`src/shared/components/ui/Text.tsx`** - Typography (body, small, muted, lead)
21. **`src/shared/components/ui/Alert.tsx`** - Feedback messages (success, error, info)
22. **`src/shared/components/ui/NavLink.tsx`** - Navigation links with active states
23. **`src/shared/components/ui/Avatar.tsx`** - User initials in circles (sm, md, lg)
24. **`src/shared/components/ui/SelectInput.tsx`** - Styled native dropdowns
25. **`src/shared/components/ui/Select.tsx`** - Alternative select component (if needed)
26. **`src/shared/components/ui/index.ts`** - UI component exports

### **Phase 4: Providers Setup**
*Configure application-wide providers*

27. **`src/providers/QueryProvider.tsx`** - TanStack Query provider with configuration
28. **`src/providers/index.ts`** - Provider exports

### **Phase 5: Authentication Feature (Complete)**
*Build auth system as foundation for protected routes*

**Types & Schemas:**
29. **`src/features/auth/types/auth.types.ts`** - Auth TypeScript types (Zod-inferred)
30. **`src/features/auth/schemas/auth.schemas.ts`** - Zod validation schemas for login/register
31. **`src/features/auth/schemas/index.ts`** - Schema exports

**State Management:**
32. **`src/features/auth/store/authStore.ts`** - Zustand store with persist middleware & derived state
33. **`src/features/auth/store/index.ts`** - Store exports

**API Layer:**
34. **`src/features/auth/api/authApi.ts`** - Auth API functions (login, register, logout)
35. **`src/features/auth/api/authHooks.ts`** - React Query hooks (useLogin, useRegister)
36. **`src/features/auth/api/index.ts`** - API exports

**Components:**
37. **`src/features/auth/components/LoginForm.tsx`** - Login form with React Hook Form
38. **`src/features/auth/components/RegisterForm.tsx`** - Register form with React Hook Form
39. **`src/features/auth/components/index.ts`** - Component exports

**Pages:**
40. **`src/features/auth/pages/LoginPage.tsx`** - Login page layout
41. **`src/features/auth/pages/RegisterPage.tsx`** - Register page layout
42. **`src/features/auth/pages/index.ts`** - Page exports

### **Phase 6: Router Setup**
*Configure routing after auth is ready*

43. **`src/router/ProtectedRoute.tsx`** - Route guard for authenticated routes
44. **`src/router/index.tsx`** - React Router configuration with all routes

### **Phase 7: Users Feature (Complete)**
*Build user management after auth is working*

**Types & Schemas:**
45. **`src/shared/types/user.types.ts`** - **Unified User type** (shared across features)
46. **`src/features/users/types/user.types.ts`** - Feature-specific user types
47. **`src/features/users/schemas/user.schemas.ts`** - Zod validation schemas
48. **`src/features/users/schemas/index.ts`** - Schema exports

**API Layer:**
49. **`src/features/users/api/userApi.ts`** - User API functions
50. **`src/features/users/api/userHooks.ts`** - React Query hooks (useCurrentUser, useUpdateUser, useUsers, etc.)
51. **`src/features/users/api/index.ts`** - API exports

**Components:**
52. **`src/features/users/components/EditProfileForm.tsx`** - Profile edit form
53. **`src/features/users/components/ChangePasswordForm.tsx`** - Password change form
54. **`src/features/users/components/UserCard.tsx`** - User display card with Avatar
55. **`src/features/users/components/UsersList.tsx`** - Users list grid component
56. **`src/features/users/components/Pagination.tsx`** - Pagination controls
57. **`src/features/users/components/index.ts`** - Component exports

**Pages:**
58. **`src/features/users/pages/DashboardPage.tsx`** - Dashboard landing page
59. **`src/features/users/pages/ProfilePage.tsx`** - User profile page with tabs
60. **`src/features/users/pages/UsersPage.tsx`** - Paginated users list with filtering
61. **`src/features/users/pages/index.ts`** - Page exports

### **Phase 8: Main Application**
*Wire everything together*

62. **`src/App.tsx`** - Main app component with RouterProvider
63. **`src/main.tsx`** - Application entry point with providers
64. **`index.html`** - HTML template

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
- `schemas/` - Zod validation schemas (single source of truth for types)
- `store/` - Zustand stores (if needed, e.g., auth store)
- `types/` - TypeScript types (Zod-inferred, not manually defined)

### Key Architectural Decisions

**Derived State Pattern (isAuthenticated)**
The `isAuthenticated` flag is derived from token existence rather than persisted separately:

```typescript
// In authStore.ts
partialize: (state) => ({
  user: state.user,
  token: state.token,
  // isAuthenticated is NOT persisted
}),
onRehydrateStorage: () => (state) => {
  if (state) {
    state.isAuthenticated = !!state.token; // Derived from token
  }
}
```

**Benefits:**
- ✅ Single source of truth: token is the only persisted auth indicator
- ✅ No state inconsistency: `isAuthenticated` always matches token presence
- ✅ More resilient to manual localStorage changes or token expiration
- ✅ Prevents edge cases where token and isAuthenticated get out of sync

**Zod as Single Source of Truth**
All types are inferred from Zod schemas using `z.infer<typeof schema>`:
- ✅ No duplicate type definitions
- ✅ Validation and types stay in sync automatically
- ✅ Easier to maintain and update
- ✅ Type safety guaranteed by Zod schemas

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
- Grid layouts for user lists (3x3 on desktop, responsive on mobile)

## 🔄 Recent Updates

### v1.2.0 - UI Component System (November 2025)
**Major refactoring** to establish a variant-based UI component system:

**New Components Created:**
- `Label` - Form labels (default, small)
- `Heading` - Semantic h1-h6 headings
- `Text` - Typography (body, small, muted, lead)
- `Alert` - Feedback messages (success, error, info)
- `NavLink` - Navigation with active states
- `Avatar` - User initials (sm, md, lg)
- `SelectInput` - Styled native dropdowns

**Files Refactored (9 files):**
- Forms: `LoginForm`, `RegisterForm`, `ChangePasswordForm`, `EditProfileForm`
- Pages: `ProfilePage`, `DashboardPage`, `UsersPage`
- Components: `UserCard`, `UsersList`

**Impact:**
- ✅ Eliminated ~200+ lines of repetitive Tailwind classes
- ✅ Consistent design system across entire app
- ✅ Easier maintenance (change once, updates everywhere)
- ✅ Cleaner JSX and better developer experience
- ✅ All components fully type-safe with TypeScript

### v1.1.0 - Type System Consolidation (November 2025)
**Type system refactoring** to eliminate duplicates and establish Zod as single source of truth:

**Changes Made:**
- ✅ Created unified `User` type in `shared/types/user.types.ts`
- ✅ Consolidated `IUser` and `AuthUser` into single `User` type
- ✅ Refactored auth schemas to export Zod-inferred types
- ✅ Removed ~150 lines of duplicate type definitions
- ✅ Updated 15+ import statements across 10 files

**Benefits:**
- Single source of truth for types
- No manual interface maintenance
- Validation and types stay in sync automatically
- Easier to add new fields

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
