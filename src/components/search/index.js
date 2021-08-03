import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import useOutsideClick from 'hooks/useOutsideClick';

const Search = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchContainerRef = useRef();
  const searchInputRef = useRef();

  const inputVariant = {
    visible: {
      opacity: 1,
      width: '100%',
      transition: {
        duration: 0.2,
      },
    },
    hidden: { opacity: 0, width: '0px' },
    exit: { opacity: 0, width: '0px' },
  };

  useOutsideClick(searchContainerRef, () => {
    // inputに入力値があった場合、input elementはそのまま残す
    if (searchInputRef.current?.value?.length === 0) setIsVisible(false);
  });

  return (
    <div ref={searchContainerRef} className="flex items-center gap-2">
      <AnimatePresence>
        {isVisible && (
          <motion.input
            ref={searchInputRef}
            name="search"
            id="search"
            type="text"
            placeholder="Search titles, people"
            autoComplete="off"
            className="
              p-2 w-[200px]
              text-sm text-paragraph
              placeholder-gray-500 caret-gray-200
            bg-gray-900 bg-opacity-50 rounded-md
              ring-1 ring-gray-500
              transition duration-200;
              focus:outline-none focus:ring-gray-200
              appearance-none
            "
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={inputVariant}
          />
        )}
      </AnimatePresence>
      <motion.label
        htmlFor="search"
        onClick={() => setIsVisible(true)}
        className="cursor-pointer"
      >
        <FiSearch className="w-5 xs:w-6 h-5 xs:h-6 text-gray-200 hover:text-gray-500 transition duration-200" />
      </motion.label>
    </div>
  );
};

export default Search;
