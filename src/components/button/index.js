const Button = ({ color = 'default', text, ...rest }) => {
  const formColor = {
    default: {
      label: 'text-purple-500',
      placeholder: 'placeholder-purple-300',
      ring: 'ring-purple-600',
      btnBg: 'bg-purple-500',
    },
  };

  return (
    <button
      className={`px-4 py-2 ${formColor[color].btnBg} text-white rounded-xl font-semibold text-base`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
