const Button = ({
  as = 'button',
  color = 'primary',
  href = '#',
  Icon,
  children,
  ...rest
}) => {
  const btnColor = {
    primary: {
      btnBg: 'bg-primary',
      ring: 'ring-primary',
      hover: 'hover:bg-red-700',
    },
    gray: {
      btnBg: 'bg-gray-500 bg-opacity-75',
      ring: 'ring-gray-500',
      hover: 'hover:bg-opacity-100',
    },
  };

  const btnClass = `
    flex items-center justify-center
    px-4 sm:px-5 py-2 sm:py-3 min-w-[120px] sm:min-w-[140px]
    ${btnColor[color].btnBg} rounded-md
    text-sm xs:text-base text-white font-medium
    transition-all duration-200
    ${btnColor[color].hover}
  `;

  const iconClass = `
    w-5 xs:w-6 h-5 xs:h-6
    mr-1 xs:mr-2
  `;

  return (
    <>
      {as === 'a' ? (
        <a href={href} className={btnClass} {...rest}>
          {Icon && <Icon className={iconClass} />}
          {children}
        </a>
      ) : (
        <button className={btnClass} {...rest}>
          {Icon && <Icon className={iconClass} />}
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
