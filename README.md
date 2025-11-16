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
- Zustand for global state management
- TanStack Query for server state
- React Hook Form + Zod validation
- Tailwind CSS with variant-based components
- Protected route system
- Responsive design

### 🏗️ Architecture
- Feature-based folder structure
- Clean separation of concerns
- Controller → Service → Model pattern
- Reusable UI components
- Custom hooks
- Axios interceptors

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
        │   ├── auth/      # Auth components
        │   └── users/     # User components
        ├── shared/        # Shared resources
        │   ├── api/       # API client
        │   ├── components/ # UI components
        │   └── types/     # TypeScript types
        ├── router/        # Route configuration
        └── providers/     # React providers
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

## 🎨 UI Components

The frontend includes reusable, variant-based components:

- **Button**: `primary`, `secondary`, `danger`, `form` variants
- **Input**: Form inputs with error display
- **Container**: Flexible wrapper with `default`, `form`, `card` variants

Example:
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

<Input 
  variant="form" 
  error={errors.email?.message}
  {...register('email')}
/>
```

---

## 📖 Development Guide

### Adding a New Feature

1. Create feature folders in both `backend/src/features/` and `frontend/src/features/`
2. Follow the existing structure:
   - Backend: `controller`, `service`, `routes`, `schemas`, `types`
   - Frontend: `api`, `components`, `pages`, `schemas`, `types`
3. Update routes in respective routers
4. Add API endpoints to backend
5. Create React Query hooks for API calls
6. Build UI components

### State Management

- **Global Auth State**: Zustand (`features/auth/store/authStore.ts`)
- **Server State**: React Query hooks (`features/*/api/*Hooks.ts`)
- **Form State**: React Hook Form with Zod validation

### Validation

Both frontend and backend use Zod for validation:
- **Backend**: Validates all incoming API requests
- **Frontend**: Validates form inputs before submission

---

## 🐛 Known Issues

None at the moment! 🎉

---

## 🚧 Future Enhancements

- [ ] Email verification
- [ ] Password strength indicator
- [ ] User roles and permissions
- [ ] Profile picture upload
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] User activity logging
- [ ] Dark mode
- [ ] Unit and integration tests
- [ ] Docker configuration
- [ ] CI/CD pipeline

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Stiliyan Goshev**
- GitHub: [@stiliyangoshev97](https://github.com/stiliyangoshev97)

---

## 🙏 Acknowledgments

- Built with modern best practices and industry standards
- Inspired by enterprise-level applications
- Uses feature-based architecture for scalability

---

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Coding!** 🚀
