/**
 * Change Password Form Component
 * 
 * Form for changing user password.
 * Uses React Hook Form + Zod for validation.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePassword } from '../../auth/api';
import { changePasswordSchema, type ChangePasswordFormData } from '../../auth/schemas';
import { Button, Input } from '../../../shared/components/ui';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const { mutate: changePassword, isPending, error, isSuccess } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
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
