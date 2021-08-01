const AuthButton = ({
  type = 'button',
  color = 'primary',
  Icon,
  text,
  ...rest
}) => {
  const colors = {
    primary: 'bg-red-600  border-red-600 hover:bg-red-700 hover:border-red-700',
    google:
      'bg-blue-700 border-blue-700 hover:bg-transparent  hover:border-gray-200',
    anonymous:
      'bg-transparent border-gray-300 hover:text-red-600 hover:border-red-600',
  };

  return (
    <button
      type={type}
      className={`
        w-full flex justify-center items-center
        py-3 xs:py-4 px-3 rounded-md
      text-gray-200 text-sm xs:text-base
        border-1
        duration-200
        ${colors[color]}
      `}
      {...rest}
    >
      {Icon && <Icon className="mr-2 w-5 h-5 xs:w-6 xs:h-6" />}
      {text}
    </button>
  );
};

export default AuthButton;
