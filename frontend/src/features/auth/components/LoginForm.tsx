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
import { Button, Input, Container, Label, Heading, Alert, Text } from '../../../shared/components/ui';

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
    <Container variant="form" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading variant="h2" className="text-center mb-6">Login</Heading>

      {/* API Error Message */}
      {error && (
        <Alert variant="error" className="mb-4">
          <Text className="font-semibold">Login Failed</Text>
          <Text variant="small" className="mt-1">{errorMessage}</Text>
        </Alert>
      )}

      {/* Email Input */}
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="password">Password</Label>
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
      <Button
        type="submit"
        variant="form"
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>

      {/* Register Link */}
      <Text variant="small" className="text-center mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
          Register here
        </Link>
      </Text>
    </Container>
  );
};

export default LoginForm;
