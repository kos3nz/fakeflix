const AuthButton = ({
  type = 'button',
  color = 'primary',
  Icon,
  text,
  label,
  ...rest
}) => {
  const colors = {
    primary: 'bg-primary  border-primary hover:bg-red-700 hover:border-red-700',
    google:
      'bg-blue-700 border-blue-700 hover:bg-transparent  hover:border-gray-200',
    anonymous:
      'bg-transparent border-gray-300 hover:text-primary hover:border-primary',
  };

  return (
    <button
      type={type}
      className={`
        w-full flex justify-center items-center
        py-3 xs:py-4 px-3 rounded-md
      text-paragraph text-sm xs:text-base
        border-1
        duration-200
        ${colors[color]}
      `}
      aria-label={label}
      {...rest}
    >
      {Icon && <Icon className="mr-2 w-5 h-5 xs:w-6 xs:h-6" />}
      {text}
    </button>
  );
};

export default AuthButton;
