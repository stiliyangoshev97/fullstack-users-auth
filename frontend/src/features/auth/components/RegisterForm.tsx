/**
 * Register Form Component
 * 
 * Form for new user registration.
 * Uses React Hook Form + Zod for validation.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useRegister } from '../api';
import { registerSchema, type RegisterFormData } from '../schemas';
import { Button, Input, Container } from '../../../shared/components/ui';

const RegisterForm = () => {
  const { mutate: register, isPending, error } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <Container variant="form" as="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {/* API Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
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
