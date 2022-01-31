import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from 'redux/hooks';
import { authType, manageUserSessionWithSupabase } from 'redux/user/user.slice';

type DropdownMenuProps = { isVisible: boolean };

export const DropdownMenu = ({ isVisible }: DropdownMenuProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    dispatch(manageUserSessionWithSupabase({ type: authType.SIGN_OUT }));
    router.push('/play');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.ul
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          className="
            absolute top-20 right-6
            min-w-[100px] xs:min-w-[120px]
            bg-black bg-opacity-60
            border-1 border-gray-500
            text-center text-sm xs:text-base
          "
        >
          <DropdownItem text="Log out" onClick={handleSignOut} />
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

type DropdownItemProps = { text: string; onClick: () => void };

const DropdownItem = ({ text, onClick }: DropdownItemProps) => {
  return (
    <li
      className="
      py-3 px-6
      border-b-1 last-of-type:border-b-0 border-gray-500
      cursor-pointer
      hover:underline
      "
      onClick={onClick}
    >
      {text}
    </li>
  );
};

const dropdownVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      y: { duration: 0.4 },
      opacity: { duration: 0.3 },
    },
  },
};
