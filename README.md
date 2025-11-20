# 🚀 Full-Stack User Authentication & Management

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready full-stack TypeScript MERN application featuring JWT authentication, user profile management, and modern development practices.

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Login/Logout with JWT tokens
- Clear error messages for invalid credentials
- Protected routes and API endpoints
- Persistent sessions with localStorage
- Token expiration handling

### 👤 User Management
- View and edit user profile
- Update name and age
- Change password with verification
- Delete account functionality
- Browse all users in paginated list
- Filter users by age

### 📋 Users List
- Paginated display (9 users per page, 3x3 grid)
- User cards with avatar, name, email, age, join date
- Age filtering dropdown
- Pagination controls with page numbers
- Navigation menu across pages
- Loading and error states

### ⚡ Performance
- MongoDB indexes on frequently queried fields
- Optimized pagination with server-side queries
- React Query caching for faster page loads

### 🛡️ Security
- Bcrypt password hashing (12 rounds)
- JWT token-based authentication
- Rate limiting on all endpoints
- CORS protection
- XSS attack prevention
- MongoDB injection prevention
- Security headers (Helmet)
- Input sanitization

### 🎨 Modern Frontend
- React 19 with TypeScript
- Zustand for global state management (with derived state pattern)
- TanStack Query for server state & caching
- React Hook Form + Zod validation
- Tailwind CSS with comprehensive UI component system
- Variant-based components (11 reusable UI components)
- Protected route system
- Responsive design (mobile-first)

### 🏗️ Architecture
- Feature-based folder structure (scalable & maintainable)
- Clean separation of concerns
- Backend: Controller → Service → Model pattern
- Frontend: Zod schemas as single source of truth for types
- Variant-based UI component system (11 components)
- Derived state pattern for auth (isAuthenticated)
- Custom React Query hooks
- Axios interceptors with auto token injection

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v22+)
- **Framework**: Express 5.1
- **Language**: TypeScript 5.9
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: Helmet, bcrypt, rate limiting
- **Logging**: Pino

### Frontend
- **Library**: React 19.2
- **Build Tool**: Vite 7.2
- **Language**: TypeScript 5.9
- **Routing**: React Router 7.9
- **State Management**: Zustand 5.0
- **Server State**: TanStack Query 5.90
- **Forms**: React Hook Form 7.66
- **Validation**: Zod 4.1
- **HTTP Client**: Axios 1.13
- **Styling**: Tailwind CSS 3.4

---

## 📁 Project Structure

```
user_app/
├── backend/                 # Express backend
│   └── src/
│       ├── features/        # Feature modules
│       │   ├── auth/       # Authentication
│       │   └── users/      # User management
│       └── shared/         # Shared utilities
│           ├── config/     # Configuration
│           ├── middleware/ # Express middleware
│           ├── types/      # TypeScript types
│           └── utils/      # Utility functions
│
└── frontend/               # React frontend
    └── src/
        ├── features/       # Feature modules
        │   ├── auth/      # Authentication
        │   │   ├── api/   # Auth API & hooks
        │   │   ├── components/ # LoginForm, RegisterForm
        │   │   ├── pages/ # Login, Register pages
        │   │   ├── schemas/ # Zod validation
        │   │   ├── store/ # Zustand auth store
        │   │   └── types/ # Auth types
        │   └── users/     # User management
        │       ├── api/   # User API & hooks
        │       ├── components/ # EditProfile, ChangePassword, UserCard, etc.
        │       ├── pages/ # Dashboard, Profile, Users pages
        │       ├── schemas/ # Zod validation
        │       └── types/ # User types
        ├── shared/        # Shared resources
        │   ├── api/       # Axios client with interceptors
        │   ├── components/ # Reusable UI components
        │   │   └── ui/    # 11 variant-based components
        │   ├── config/    # API configuration
        │   └── types/     # Shared TypeScript types (unified User type)
        ├── router/        # Route configuration
        │   ├── index.tsx  # Route definitions
        │   └── ProtectedRoute.tsx # Auth guard
        └── providers/     # React providers
            └── QueryProvider.tsx # React Query setup
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22+ and npm
- **MongoDB** installed and running
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stiliyangoshev97/fullstack-users-auth.git
   cd fullstack-users-auth
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/typescript-express-api

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# Security Configuration
BCRYPT_ROUND=12

# CORS Configuration
CORS_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

### Running the Application

#### Start MongoDB
```bash
# If using macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/me` | Get current user | ✅ |
| PATCH | `/auth/change-password` | Change password | ✅ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |
| POST | `/auth/reset-password` | Reset password with token | ❌ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users (paginated) | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| PUT | `/users/:id` | Update user profile | ✅ |
| DELETE | `/users/:id` | Delete user account | ✅ |

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 25
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Update Profile
```bash
curl -X PUT http://localhost:3000/api/users/:id \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "age": 26
  }'
```

---

## 🎯 Available Scripts

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with 12 rounds
- **Authentication**: JWT tokens with expiration
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Zod schemas on frontend and backend
- **SQL Injection Prevention**: MongoDB sanitization
- **XSS Protection**: Input sanitization and security headers
- **CORS**: Configured for specific origins
- **Security Headers**: Helmet middleware

---

## 🎨 UI Component System

The frontend features a comprehensive **variant-based component system** for consistent design and maintainability:

### Core Components

- **Button**: `primary`, `secondary`, `danger`, `form` variants
- **Input**: Form inputs with error display and validation support
- **Container**: Flexible wrapper with `default`, `form`, `card` variants
- **Label**: Form labels with `default`, `small` variants
- **Heading**: Semantic h1-h6 headings with consistent styling
- **Text**: Typography variants: `body`, `small`, `muted`, `lead`
- **Alert**: Feedback messages: `success`, `error`, `info` variants
- **NavLink**: Navigation links with active state styling
- **Avatar**: User initials in circles (sm, md, lg sizes)
- **SelectInput**: Styled native dropdown/select elements

### Component Benefits

✅ **Consistency** - Same elements use same components across the app  
✅ **Maintainability** - Change design once, updates everywhere  
✅ **DRY Principle** - Eliminates repetitive Tailwind classes  
✅ **Type Safety** - All components fully typed with TypeScript  
✅ **Developer Experience** - Cleaner JSX, easier to read

### Usage Examples

```tsx
// Buttons
<Button variant="primary" onClick={handleClick}>Click Me</Button>
<Button variant="danger">Delete</Button>

// Forms
<Input 
  variant="form" 
  error={errors.email?.message}
  {...register('email')}
/>
<Label variant="small">Optional Field</Label>
<SelectInput variant="form">
  <option value="">Select age...</option>
  <option value="18-25">18-25</option>
</SelectInput>

// Typography
<Heading variant="h1">Page Title</Heading>
<Text variant="muted">Supplementary information</Text>

// Feedback
<Alert variant="success">Profile updated successfully!</Alert>

// Navigation
<NavLink to="/dashboard" active={isActive}>Dashboard</NavLink>

// User Elements
<Avatar name="John Doe" size="md" />
```

---

## 📖 Development Guide

### Adding a New Feature

1. Create feature folders in both `backend/src/features/` and `frontend/src/features/`
2. Follow the existing structure:
   - **Backend**: `controller`, `service`, `routes`, `schemas`, `types`, `model` (if needed)
   - **Frontend**: `api`, `components`, `pages`, `schemas`, `types`, `store` (if needed)
3. Update routes in respective routers
4. Add API endpoints to backend with Zod validation
5. Create React Query hooks for API calls in frontend
6. Build UI components using the shared component system
7. Update `PROJECT_CONTEXT.md` and `CHANGELOG.md`

### State Management Strategy

- **Zustand**: Global auth state (user, token, isAuthenticated)
  - Only `user` and `token` persisted to localStorage
  - `isAuthenticated` is **derived** from token existence on rehydration
  - Single source of truth: token determines authentication status
- **React Query**: All API calls and server state management
- **React Hook Form**: Form state and validation
- **No Context API needed**: Zustand is lightweight and sufficient

### Type System Strategy

- **Backend**: Manual TypeScript interfaces and types
- **Frontend**: **Zod schemas as single source of truth**
  - Export types using `z.infer<typeof schema>`
  - No duplicate manual interfaces
  - Validation and types stay in sync automatically
- **Shared types**: Unified `User` type in `frontend/src/shared/types/user.types.ts`

### Validation Strategy

Both frontend and backend use Zod for validation:
- **Backend**: Validates all incoming API requests
- **Frontend**: Validates form inputs before submission
- **Benefit**: Catch errors early, reduce unnecessary API calls

---

## 🔄 Recent Updates

### v1.2.0 - UI Component System (November 2025)
**Major frontend refactoring** to establish a variant-based UI component system:

**New Components Created:**
- `Label` - Form labels (default, small)
- `Heading` - Semantic h1-h6 headings
- `Text` - Typography (body, small, muted, lead)
- `Alert` - Feedback messages (success, error, info)
- `NavLink` - Navigation with active states
- `Avatar` - User initials (sm, md, lg)
- `SelectInput` - Styled native dropdowns

**Impact:**
- ✅ Eliminated ~200+ lines of repetitive Tailwind classes
- ✅ Consistent design system across entire application
- ✅ Easier maintenance (change once, updates everywhere)
- ✅ Cleaner JSX and better developer experience
- ✅ All components fully type-safe with TypeScript

### v1.1.0 - Type System Consolidation (November 2025)
**Frontend type system refactoring** to eliminate duplicates:
- ✅ Created unified `User` type in `shared/types/user.types.ts`
- ✅ Established Zod as single source of truth for types
- ✅ Removed ~150 lines of duplicate type definitions
- ✅ All types now inferred from Zod schemas using `z.infer`

---

## 🐛 Known Issues

None at the moment! 🎉

---

## 🚧 Future Enhancements

- [ ] Forgot Password / Reset Password flow (UI implementation)
- [ ] Email verification
- [ ] Password strength indicator
- [ ] User roles and permissions
- [ ] Profile picture upload
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] User activity logging
- [ ] Dark mode / Theme switcher
- [ ] Toast notifications system
- [ ] Loading skeletons
- [ ] Unit and integration tests
- [ ] Docker configuration
- [ ] CI/CD pipeline

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📊 Project Status

**Current Version**: v1.2.0  
**Last Updated**: November 20, 2025  
**Status**: ✅ Fully Functional

### What's Included
✅ Complete authentication system (register, login, logout)  
✅ User profile management (view, edit, change password, delete)  
✅ Paginated users list with filtering (9 users per page)  
✅ 11 reusable variant-based UI components  
✅ Zod-based type system (single source of truth)  
✅ Derived state pattern for authentication  
✅ Feature-based architecture (scalable)  
✅ Full TypeScript coverage  
✅ Comprehensive security features  

### Latest Improvements
🎨 **UI Component System** - Eliminated 200+ lines of repetitive Tailwind classes  
🔧 **Type Consolidation** - Established Zod as single source of truth  
⚡ **Performance** - MongoDB indexes + React Query caching  
🔒 **Security** - Rate limiting, XSS protection, MongoDB injection prevention  

---

## 👨‍💻 Author

**Stiliyan Goshev**
- GitHub: [@stiliyangoshev97](https://github.com/stiliyangoshev97)

---

## 🙏 Acknowledgments

- Built with modern best practices and industry standards
- Inspired by enterprise-level applications
- Uses feature-based architecture for scalability
- Implements derived state pattern for robust auth management
- Follows DRY principles with variant-based component system

---

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Coding!** 🚀
