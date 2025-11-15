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
