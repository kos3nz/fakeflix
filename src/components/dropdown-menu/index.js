import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { manageUserSession } from 'redux/user/user.slice';

const DropdownMenu = ({ isVisible, ...rest }) => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const type = 'signOut';
    dispatch(manageUserSession({ type }));
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
          {...rest}
        >
          <DropdownItem text="Log out" onClick={handleSignOut} />
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;

const DropdownItem = ({ text, ...rest }) => {
  return (
    <li
      className="
      py-3 px-6
      border-b-1 last-of-type:border-b-0 border-gray-500
      cursor-pointer
      hover:underline
      "
      {...rest}
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
