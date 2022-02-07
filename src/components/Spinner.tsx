import { CgSpinner } from 'react-icons/cg';

type SpinnerProps = {
  color?: string;
};

export const Spinner = ({ color = 'text-red-700' }: SpinnerProps) => {
  return (
    <CgSpinner
      className={`h-6 w-6 animate-spin xs:h-8 xs:w-8 ${color}`}
      aria-hidden
    />
  );
};
