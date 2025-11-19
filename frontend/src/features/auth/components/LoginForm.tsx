/**
 * Login Form Component
 * 
 * Form for user authentication.
 * Uses React Hook Form + Zod for validation.
 * 
 * TECH STACK:
 * - React Hook Form: Handles form state and submission
 * - Zod: Schema validation (email format, required fields)
 * - React Query: API call via useLogin hook
 * 
 * FLOW:
 * 1. User types email + password
 * 2. React Hook Form tracks values and validates with Zod on submit
 * 3. If valid, calls login mutation (API call to /api/auth/login)
 * 4. On success, useLogin hook:
 *    - Saves user + token to Zustand
 *    - Redirects to /dashboard
 * 5. On error, displays error message from backend
 * 
 * USED IN: LoginPage.tsx
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useLogin } from '../api';
import { loginSchema, type LoginFormData } from '../schemas';
import { Button, Input, Container } from '../../../shared/components/ui';

const LoginForm = () => {
  // React Query mutation for login API call
  // mutate renamed to 'login' for clarity
  const { mutate: login, isPending, error } = useLogin();

  // React Hook Form setup
  const {
    register,      // Function to register input fields
    handleSubmit,  // Wraps onSubmit, validates before calling it
    formState: { errors }, // Field-level validation errors from Zod
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Use Zod schema for validation
  });

  /**
   * Called when form is submitted and passes validation
   * data = { email: "...", password: "..." }
   */
  const onSubmit = (data: LoginFormData) => {
    // Trigger login mutation (API call)
    login(data);
  };

  // Extract user-friendly error message from API error
  const errorMessage = error?.message || 
    (error as any)?.response?.data?.message || 
    'An error occurred during login';

  return (
    // Container with form styling
    // handleSubmit wraps onSubmit - validates with Zod before calling onSubmit
    <Container variant="form" as="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* API Error Message */}
      {/* Shows if login fails (wrong password, server error, etc.) */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Login Failed</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        {/* 
          {...register('email')} spreads:
          - name="email"
          - ref={...} (React Hook Form tracks this input)
          - onChange/onBlur handlers for validation
          
          error={errors.email?.message} shows Zod validation error below input
        */}
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          variant="form"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        {/* 
          {...register('password')} wires this input to React Hook Form
          Zod validates password is required and meets min length
        */}
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          variant="form"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      {/* Submit Button */}
      {/* 
        disabled while API call is in progress (isPending)
        Shows "Logging in..." text while pending
      */}
      <Button
        type="submit"
        variant="form"
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>

      {/* Register Link */}
      {/* If user doesn't have account, navigate to /register */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
          Register here
        </Link>
      </p>
    </Container>
  );
};

export default LoginForm;
