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
            py-3 px-4 w-full
            bg-gray-700 rounded-md
            text-paragraph placeholder-gray-500 caret-gray-200
            appearance-none
            ${error ? 'border-b-2 border-yellow-500' : ''}
            focus:outline-none
          `}
      {...registration}
      {...rest}
    />
    {error && <p className="mt-1 text-sm text-yellow-500">{error.message}</p>}
  </>
);
