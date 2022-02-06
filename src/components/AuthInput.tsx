import { ComponentPropsWithoutRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type AuthInputProps = ComponentPropsWithoutRef<'input'> & {
  registration: UseFormRegisterReturn;
  error: FieldError | undefined;
};

export const AuthInput = ({ registration, error, ...rest }: AuthInputProps) => (
  <>
    <input
      autoComplete="off"
      className={`
            w-full appearance-none rounded-md
            bg-gray-700 py-3
            px-4 text-paragraph placeholder-gray-500
            caret-gray-200
            ${error ? 'border-b-2 border-yellow-500' : ''}
            focus:outline-none
          `}
      {...registration}
      {...rest}
    />
    {error && <p className="mt-1 text-sm text-yellow-500">{error.message}</p>}
  </>
);
