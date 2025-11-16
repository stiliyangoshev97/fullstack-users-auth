/**
 * Login Form Component
 * 
 * Form for user authentication.
 * Uses React Hook Form + Zod for validation.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useLogin } from '../api';
import { loginSchema, type LoginFormData } from '../schemas';
import { Button, Input, Container } from '../../../shared/components/ui';

const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  // Extract error message from various error formats
  const errorMessage = error?.message || 
    (error as any)?.response?.data?.message || 
    'An error occurred during login';

  return (
    <Container variant="form" as="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* API Error Message */}
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
