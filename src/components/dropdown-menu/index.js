import { motion, AnimatePresence } from 'framer-motion';

const DropdownMenu = ({ isVisible, ...rest }) => {
  const dropdownVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: { y: 50, opacity: 0 },
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
          Sign Out
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
