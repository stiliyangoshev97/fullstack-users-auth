/**
 * Edit Profile Form Component
 * 
 * Form for updating user profile (name and age).
 * Uses React Hook Form + Zod for validation.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '../api';
import { updateUserSchema, type UpdateUserFormData } from '../schemas';
import { Button, Input } from '../../../shared/components/ui';
import type { IUser } from '../types/user.types';

interface EditProfileFormProps {
  user: IUser;
  onSuccess?: () => void;
}

const EditProfileForm = ({ user, onSuccess }: EditProfileFormProps) => {
  const { mutate: updateUser, isPending, error, isSuccess } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      age: user.age,
    },
  });

  const onSubmit = (data: UpdateUserFormData) => {
    updateUser(data, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Success Message */}
      {isSuccess && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          variant="form"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      {/* Age Input */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age
        </label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          variant="form"
          error={errors.age?.message}
          {...register('age', { valueAsNumber: true })}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="form" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default EditProfileForm;
