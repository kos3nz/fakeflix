import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AuthInput } from './AuthInput';
import { Button as AuthButton } from 'components/Button';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { manageUserSessionWithSupabase, authType } from 'redux/user/user.slice';
import { selectIsProcessing } from 'redux/user/user.selectors';

type FormValue = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const isProcessing = useAppSelector(selectIsProcessing);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onBlur' });

  const signInViaEmail = handleSubmit(({ email, password }) => {
    dispatch(
      manageUserSessionWithSupabase({ email, password, type: authType.SIGN_IN })
    );
  });

  const signInAsGuest = () => {
    dispatch(
      manageUserSessionWithSupabase({
        email: process.env.NEXT_PUBLIC_GUEST_EMAIL,
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
        type: authType.SIGN_IN,
      })
    );
  };

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

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-paragraph xs:text-2xl">
        Sign In
      </h2>
      <motion.form
        onSubmit={signInViaEmail}
        initial="hidden"
        animate="visible"
        variants={form}
      >
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthInput
            id="email"
            placeholder="E-mail"
            error={errors.email}
            registration={emailRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={item} className="mb-4 xs:mb-6">
          <AuthInput
            type="password"
            id="password"
            placeholder="Password"
            error={errors.password}
            registration={passwordRegistration}
            disabled={isProcessing}
          />
        </motion.div>
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthButton
            type="submit"
            color="primary"
            aria-label="sign in with email"
            isProcessing={isProcessing}
          >
            Sign in
          </AuthButton>
        </motion.div>
        <motion.div variants={item} className="mb-3 xs:mb-4">
          <AuthButton
            type="button"
            color="google"
            Icon={FcGoogle}
            aria-label="sign in with Google"
            isProcessing={isProcessing}
          >
            Sign in with Google
          </AuthButton>
        </motion.div>
        <motion.div variants={item}>
          <AuthButton
            type="button"
            color="anonymous"
            aria-label="sign in anonymously"
            onClick={signInAsGuest}
            isProcessing={isProcessing}
          >
            Try it as a Guest
          </AuthButton>
        </motion.div>
      </motion.form>
    </>
  );
};

const form = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};
