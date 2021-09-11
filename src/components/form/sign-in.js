import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import AuthInput from '../input/auth-input';
import AuthButton from '../button/auth-button';
import {
  manageUserSessionWithEmail,
  manageAnonymousSession,
} from 'redux/user/user.slice';
import { selectIsProcessing } from 'redux/user/user.selectors';

const SingIn = () => {
  const isProcessing = useSelector(selectIsProcessing);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const type = 'signIn';
  // console .log({ errors });

  const signInViaEmail = ({ email, password }) => {
    dispatch(manageUserSessionWithEmail({ email, password, type }));
  };

  const signInAnonymously = () => {
    dispatch(manageAnonymousSession({ type }));
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
    <motion.form
      onSubmit={handleSubmit(signInViaEmail)}
      initial="hidden"
      animate="visible"
      variants={form}
    >
      <motion.div variants={item} className="mb-3 xs:mb-4">
        <AuthInput
          id="email"
          placeholder="E-mail"
          errors={errors}
          registration={emailRegistration}
          disabled={isProcessing}
        />
      </motion.div>
      <motion.div variants={item} className="mb-5 xs:mb-7">
        <AuthInput
          type="password"
          id="password"
          placeholder="Password"
          errors={errors}
          registration={passwordRegistration}
          variants={item}
          disabled={isProcessing}
        />
      </motion.div>
      <motion.div variants={item} className="mb-2">
        <AuthButton
          type="submit"
          text="Sign in"
          color="primary"
          label="sign in with email"
          disabled={isProcessing}
        />
      </motion.div>
      <motion.div variants={item} className="mb-2">
        <AuthButton
          type="button"
          text="Sign in with Google"
          color="google"
          Icon={FcGoogle}
          label="sign in with Google"
          disabled={isProcessing}
        />
      </motion.div>
      <motion.div variants={item}>
        <AuthButton
          type="button"
          text="Sign in anonymously"
          color="anonymous"
          label="sign in anonymously"
          onClick={signInAnonymously}
          disabled={isProcessing}
        />
      </motion.div>
    </motion.form>
  );
};

export default SingIn;

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
