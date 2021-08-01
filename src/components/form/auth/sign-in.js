import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import AuthInput from './auth-input';
import AuthButton from './auth-button';

const SingIn = ({ toggleAuth, variants: { form, item } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => console.log(data);

  // console .log({ errors });

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
      onSubmit={handleSubmit(onSubmit)}
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
        />
      </motion.div>
      <motion.div variants={item} className="mb-2">
        <AuthButton type="submit" text="Sign in" color="primary" />
      </motion.div>
      <motion.div variants={item} className="mb-2">
        <AuthButton
          type="submit"
          text="Sign in with Google"
          color="google"
          Icon={FcGoogle}
        />
      </motion.div>
      <motion.div variants={item}>
        <AuthButton
          type="button"
          text="Sign in anonymously"
          color="anonymous"
        />
      </motion.div>
    </motion.form>
  );
};

export default SingIn;
