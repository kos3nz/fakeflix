import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AuthInput } from './AuthInput';
import { Button as AuthButton } from 'components/Button';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { manageUserSessionWithEmail } from 'redux/user/user.slice';
import { selectIsProcessing } from 'redux/user/user.selectors';

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const isProcessing = useAppSelector(selectIsProcessing);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  // console.log(watch('email'));
  // console.log({ errors });

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

  const onSubmit = handleSubmit(({ email, password }) => {
    const type = 'signUp';
    dispatch(manageUserSessionWithEmail({ email, password, type }));
  });

  return (
    <>
      <h2 className="text-paragraph text-xl xs:text-2xl font-semibold mb-4">
        Sign Up
      </h2>
      <motion.form
        onSubmit={onSubmit}
        initial="hidden"
        animate="visible"
        variants={formVariant}
      >
        <motion.div variants={itemVariant} className="mb-3 xs:mb-4">
          <AuthInput
            id="username"
            placeholder="Your name"
            error={errors.username}
            registration={usernameRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={itemVariant} className="mb-3 xs:mb-4">
          <AuthInput
            id="email"
            placeholder="E-mail"
            error={errors.email}
            registration={emailRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={itemVariant} className="mb-3 xs:mb-4">
          <AuthInput
            type="password"
            id="password"
            placeholder="Password"
            error={errors.password}
            registration={passwordRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={itemVariant} className="mb-8">
          <AuthInput
            type="password"
            id="passwordConfirmation"
            placeholder="Repeat your password"
            error={errors.passwordConfirmation}
            registration={passwordConfirmationRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={itemVariant}>
          <AuthButton
            type="submit"
            color="primary"
            aria-label="sign up"
            disabled={isProcessing}
          >
            Sign up
          </AuthButton>
        </motion.div>
      </motion.form>
    </>
  );
};

const formVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};
