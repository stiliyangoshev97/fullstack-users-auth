/**
 * Edit Profile Form Component
 * 
 * Form for updating user profile (name and age).
 * Uses React Hook Form + Zod for validation.
 * 
 * FLOW:
 * 1. User sees form pre-filled with current name + age (defaultValues)
 * 2. User changes name or age
 * 3. On submit, Zod validates the data
 * 4. If valid, calls PUT /api/users/:id with new data
 * 5. On success:
 *    - Updates user in Zustand store (authStore.updateUser)
 *    - Shows success message
 *    - Calls optional onSuccess callback (if provided by parent)
 * 6. On error:
 *    - Shows error message from backend
 * 
 * USED IN: ProfilePage.tsx (Profile Settings tab)
 * 
 * PROPS:
 * - user: Current user data (used for defaultValues)
 * - onSuccess: Optional callback after successful update
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '../api';
import { updateUserSchema, type UpdateUserFormData } from '../schemas';
import { Button, Input } from '../../../shared/components/ui';
import type { IUser } from '../types/user.types';

interface EditProfileFormProps {
  user: IUser;                    // Current user (for default values)
  onSuccess?: () => void;         // Optional callback after update
}

const EditProfileForm = ({ user, onSuccess }: EditProfileFormProps) => {
  // React Query mutation for updating profile
  // mutate renamed to 'updateUser' for clarity
  const { mutate: updateUser, isPending, error, isSuccess } = useUpdateUser();

  // React Hook Form setup
  const {
    register,                     // Function to register inputs
    handleSubmit,                 // Wraps onSubmit, validates first
    formState: { errors },        // Validation errors from Zod
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema), // Use Zod schema
    defaultValues: {              // Pre-fill form with current values
      name: user.name,
      age: user.age,
    },
  });

  /**
   * Called when form submits and passes validation
   * data = { name: "...", age: ... }
   */
  const onSubmit = (data: UpdateUserFormData) => {
    // Trigger update mutation (API call to PUT /api/users/:id)
    // Second argument: mutation options (callbacks)
    updateUser(data, {
      onSuccess: () => {
        // If parent provided onSuccess callback, call it
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
