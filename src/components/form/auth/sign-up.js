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
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial="hidden"
      animate="visible"
      variants={form}
    >
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
    </motion.form>
  );
};

export default SignUp;
