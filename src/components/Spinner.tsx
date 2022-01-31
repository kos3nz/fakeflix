import { CgSpinner } from 'react-icons/cg';

type SpinnerProps = {
  color?: string;
};

export const Spinner = ({ color = 'text-red-700' }: SpinnerProps) => {
  return (
    <CgSpinner className={`animate-spin w-6 h-6 xs:w-8 xs:h-8 ${color}`} />
  );
};
