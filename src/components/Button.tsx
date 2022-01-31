import { forwardRef } from 'react';
import type { IconType } from 'react-icons';
import { Spinner } from './Spinner';

type Props<Component extends React.ElementType> = {
  as?: Component;
  className?: string;
  color?: keyof typeof btnColor;
  Icon?: IconType;
  isProcessing?: boolean;
};

type ButtonProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>;

export const Button = <C extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'primary',
  Icon,
  isProcessing = false,
  children,
  ...rest
}: ButtonProps<C>) => {
  const Component = as || 'button';

  const btnClass = `
    w-full flex items-center justify-center
    px-2 py-3 min-w-[120px] sm:min-w-[140px]
    rounded-md text-sm xs:text-base font-medium transition-all duration-200
    ${btnColor[color].bg} ${btnColor[color].border}
    ${btnColor[color].text} ${btnColor[color].cursor}
  `;

  const iconClass = `
    w-5 xs:w-6 h-5 xs:h-6
    mr-1 xs:mr-2
  `;

  return (
    <Component className={btnClass + className} {...rest}>
      {isProcessing ? (
        <Spinner color={btnColor[color].spinner || undefined} />
      ) : (
        <>
          {Icon && <Icon className={iconClass} aria-hidden />}
          {children}
        </>
      )}
    </Component>
  );
};

const btnColor = {
  primary: {
    bg: 'bg-primary hover:bg-red-700',
    text: 'text-white',
    border: 'ring-1 ring-primary',
    cursor: 'cursor-pointer',
    spinner: 'text-white',
  },
  gray: {
    bg: 'bg-gray-500 bg-opacity-75 hover:bg-opacity-100',
    text: 'text-white',
    border: 'ring-1 ring-gray-500',
    cursor: 'cursor-pointer',
    spinner: 'text-primary',
  },
  google: {
    bg: 'bg-blue-700 hover:bg-transparent',
    text: 'text-white',
    border: 'ring-1 ring-blue-700 hover:ring-gray-200',
    cursor: 'cursor-pointer',
    spinner: 'text-white',
  },
  anonymous: {
    bg: 'bg-transparent',
    text: 'text-white hover:text-primary',
    border: 'ring-1 ring-gray-300 hover:ring-primary',
    cursor: 'cursor-pointer',
    spinner: 'text-primary',
  },
  disabled: {
    bg: 'bg-gray-700 bg-opacity-90',
    text: 'text-gray-500',
    border: 'ring-1 ring-gray-500',
    cursor: 'cursor-default',
    spinner: '',
  },
};
