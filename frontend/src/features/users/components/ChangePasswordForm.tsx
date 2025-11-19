/**
 * ===== CHANGE PASSWORD FORM COMPONENT =====
 * 
 * Allows logged-in users to change their password.
 * 
 * Used in: ProfilePage.tsx
 * 
 * TECH STACK:
 * - React Hook Form: Form state & validation
 * - Zod: Schema validation (min 6 chars, etc)
 * - React Query: useChangePassword mutation
 * 
 * FEATURES:
 * - Validates current password before changing
 * - Shows success/error messages inline
 * - Resets form on success
 * - Disabled state during submission
 * - Optional onSuccess callback (e.g., close modal)
 * 
 * VALIDATION RULES (from changePasswordSchema):
 * - currentPassword: Required
 * - newPassword: Min 6 characters
 * 
 * FLOW:
 * 1. User enters current password + new password
 * 2. Zod validates format (client-side)
 * 3. Submit calls useChangePassword mutation
 * 4. Backend verifies current password
 * 5. Backend hashes & saves new password
 * 6. Success → reset form, call onSuccess callback
 * 7. Error → show error message
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePassword } from '../../auth/api';
import { changePasswordSchema, type ChangePasswordFormData } from '../../auth/schemas';
import { Button, Input } from '../../../shared/components/ui';

/**
 * Props for ChangePasswordForm
 * @param onSuccess - Optional callback after successful password change
 */
interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  // React Query mutation for changing password
  const { mutate: changePassword, isPending, error, isSuccess } = useChangePassword();

  // React Hook Form setup with Zod validation
  const {
    register,      // Function to register input fields
    handleSubmit,  // Wraps onSubmit with validation
    reset,         // Clears form after success
    formState: { errors }, // Validation errors
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema), // Use Zod schema
  });

  /**
   * Form submission handler
   * Called after validation passes
   */
  const onSubmit = (data: ChangePasswordFormData) => {
    // Call API mutation
    changePassword(data, {
      onSuccess: () => {
        reset();                // Clear form fields
        if (onSuccess) onSuccess(); // Call optional callback
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Success Message */}
      {isSuccess && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Password changed successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
        </div>
      )}

      {/* Current Password Input */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
          Current Password
        </label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter current password"
          variant="form"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
      </div>

      {/* New Password Input */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          variant="form"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="form" disabled={isPending}>
        {isPending ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
