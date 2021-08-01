import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import AuthInput from './auth-input';
import AuthButton from './auth-button';

const SignUp = ({ toggleAuth, variants: { form, item } }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => console.log(data);

  // console.log(watch('email'));
  // console .log({ errors });

  const usernameRegistration = register('username', {
    required: 'Please enter your name',
    minLength: {
      value: 3,
      message: 'Your name needs to be longer than 3 characters',
    },
  });

  const emailRegistration = register('email', {
    required: 'Please enter a valid email address.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address.',
    },
  });

  const passwordRegistration = register('password', {
    required: 'Please enter your password.',
    minLength: {
      value: 6,
      message: 'The password should have a length between 6 and 30 characters.',
    },
    maxLength: {
      value: 30,
      message: 'The password should have a length between 6 and 30 characters.',
    },
  });

  const passwordConfirmationRegistration = register('passwordConfirmation', {
    validate: (value) =>
      value === watch('password') || 'Passwords should match.',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-90 mx-auto sm:max-w-lg bg-black px-8 py-10 sm:px-12 sm:py-16 bg-opacity-75 rounded-lg"
    >
      <h2 className="text-gray-200 text-xl xs:text-2xl font-semibold">
        Sign Up
      </h2>
      <p className="text-red-600 text-sm font-semibold text-center mt-4 xs:mt-5 mb-2 xs:mb-4">
        Pay attention: this is not the original Netflix sign in. Don't insert
        your real credentials here!!
      </p>
      <motion.div initial="hidden" animate="visible" variants={form}>
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthInput
            id="username"
            placeholder="Your name"
            errors={errors}
            registration={usernameRegistration}
          />
        </motion.div>
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthInput
            id="email"
            placeholder="E-mail"
            errors={errors}
            registration={emailRegistration}
          />
        </motion.div>
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthInput
            type="password"
            id="password"
            placeholder="Password"
            errors={errors}
            registration={passwordRegistration}
          />
        </motion.div>
        <motion.div variants={item} className="mb-8">
          <AuthInput
            type="password"
            id="passwordConfirmation"
            placeholder="Repeat your password"
            errors={errors}
            registration={passwordConfirmationRegistration}
          />
        </motion.div>
        <motion.div variants={item}>
          <AuthButton type="submit" text="Sign in" color="primary" />
        </motion.div>
      </motion.div>
      <hr className="mt-6 w-11/12 mx-auto text-gray-500" />
      <p
        className="
          mt-6
          text-sm md:text-base text-center
        text-gray-500
        "
      >
        Do you already have an account?
        <span
          className="
            ml-2 inline-block
          text-red-600 font-bold
            cursor-pointer
            duration-300
          hover:text-red-700 hover:transform-gpu hover:scale-95
          "
          onClick={() => toggleAuth((state) => !state)}
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignUp;
