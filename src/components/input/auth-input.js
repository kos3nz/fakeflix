const AuthInput = ({
  type = 'text',
  placeholder = '',
  id,
  registration,
  errors,
  ...rest
}) => (
  <>
    <input
      type={type}
      id={id}
      autoComplete="off"
      placeholder={placeholder}
      className={`
            py-3 px-4 w-full
            bg-gray-700 rounded-md
            text-paragraph placeholder-gray-500 caret-gray-200
            appearance-none
            ${errors[id] ? 'border-b-2 border-yellow-500' : ''}
            focus:outline-none
          `}
      {...registration}
      {...rest}
    />
    {errors[id] && (
      <p className="mt-1 text-sm text-yellow-500">{errors[id].message}</p>
    )}
  </>
);

export default AuthInput;
