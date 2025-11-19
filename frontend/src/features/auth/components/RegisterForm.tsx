/**
 * ===== REGISTER FORM COMPONENT =====
 * 
 * New user registration form.
 * 
 * Used in: RegisterPage.tsx
 * 
 * TECH STACK:
 * - React Hook Form: Form state management
 * - Zod: Schema validation
 * - React Query: useRegister mutation
 * 
 * FEATURES:
 * - Client-side validation (Zod schema)
 * - Server-side validation (API errors)
 * - Auto-login after successful registration
 * - Loading state during submission
 * - Link to login page for existing users
 * 
 * FIELDS COLLECTED:
 * - name: User's full name (required)
 * - email: Must be valid email format (required, unique)
 * - password: Min 6 characters (required)
 * - age: Number >= 0 (required)
 * 
 * REGISTRATION FLOW:
 * 1. User fills out form
 * 2. Zod validates client-side
 * 3. useRegister sends POST /api/auth/register
 * 4. Backend creates user, returns token + user data
 * 5. useRegister auto-calls setAuth (logs user in)
 * 6. Redirect to /dashboard (handled in useRegister)
 * 
 * NOTE: Unlike login, registration automatically logs user in.
 * See features/auth/api/authHooks.ts useRegister for details.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useRegister } from '../api';
import { registerSchema, type RegisterFormData } from '../schemas';
import { Button, Input, Container } from '../../../shared/components/ui';

const RegisterForm = () => {
  // React Query mutation for registration
  const { mutate: register, isPending, error } = useRegister();

  // React Hook Form setup
  // NOTE: "register" from useForm conflicts with "register" from useRegister
  // So we rename it to "registerField"
  const {
    register: registerField,  // Renamed to avoid naming conflict
    handleSubmit,             // Wraps onSubmit with validation
    formState: { errors },    // Validation errors
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Zod validation
  });

  /**
   * Form submission handler
   * Called after client-side validation passes
   */
  const onSubmit = (data: RegisterFormData) => {
    // Call API mutation (auto-logs in on success)
    register(data);
  };

  // Extract error message from various error formats
  // Backend may return errors in different formats
  const errorMessage = error?.message || 
    (error as any)?.response?.data?.message || 
    'An error occurred during registration';

  return (
    <Container variant="form" as="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {/* API Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Registration Failed</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          variant="form"
          error={errors.name?.message}
          {...registerField('name')}
        />
      </div>

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
          {...registerField('email')}
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          variant="form"
          error={errors.password?.message}
          {...registerField('password')}
        />
      </div>

      {/* Age Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age
        </label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          variant="form"
          error={errors.age?.message}
          {...registerField('age', { valueAsNumber: true })}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="form"
        disabled={isPending}
      >
        {isPending ? 'Creating account...' : 'Register'}
      </Button>

      {/* Login Link */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
          Login here
        </Link>
      </p>
    </Container>
  );
};

export default RegisterForm;
