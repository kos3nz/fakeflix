import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from 'db/supabaseClient';

const DropdownMenu = ({ isVisible, ...rest }) => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
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
          py-3 px-6
          bg-black bg-opacity-60
          border-1 border-gray-500
          text-center text-sm xs:text-base
          cursor-pointer
          hover:underline
        "
          {...rest}
        >
          <li onClick={handleSignOut}>Log out</li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;

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
