import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import useOutsideClick from 'hooks/useOutsideClick';
import {
  searchTitles,
  changeInputValue,
  clearInputValue,
  clearTitles,
  showInput,
  hideInput,
} from 'redux/search/search.slice';
import {
  selectSearchIsVisible,
  selectSearchQuery,
} from 'redux/search/search.selectors';

const inputVariant = {
  visible: {
    opacity: 1,
    width: '100%',
    transition: {
      opacity: { duration: 0.3 },
      width: { duration: 0.4 },
    },
  },
  hidden: { opacity: 0.1, width: '0px' },
  exit: {
    opacity: 0,
    width: '0px',
    transition: {
      opacity: { duration: 0.3 },
      width: { duration: 0.4 },
    },
  },
};

const clearButtonVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const SearchBar = () => {
  const searchContainerRef = useRef();
  const searchInputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const isVisible = useSelector(selectSearchIsVisible);
  const query = useSelector(selectSearchQuery);

  useOutsideClick(searchContainerRef, () => {
    // inputに入力値があった場合、input elementはそのまま残す
    if (searchInputRef.current?.value.length === 0) {
      dispatch(hideInput());
      router.push('/');
    }
  });

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    dispatch(changeInputValue(inputValue));

    if (inputValue.length === 0) {
      router.push({
        pathname: '/search',
        query: { keyword: inputValue },
      });
      dispatch(clearTitles());
    }
    if (inputValue.length > 0) {
      router.push({
        pathname: '/search',
        query: { keyword: inputValue },
      });
      dispatch(searchTitles(inputValue));
    }
  };

  const handleShowInput = () => dispatch(showInput());

  const handleClearInput = () => {
    dispatch(clearInputValue());
    dispatch(clearTitles());
    // router.push({
    //   pathname: '/search',
    //   query: { keyword: '' },
    // });
  };

  return (
    <div ref={searchContainerRef} className="flex items-center gap-2 relative">
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.input
              ref={searchInputRef}
              name="search"
              id="search"
              type="text"
              placeholder="Search titles, people..."
              autoComplete="off"
              className="
              p-2 pr-8 w-[200px]
              text-sm text-paragraph
              placeholder-gray-400 caret-gray-200
            bg-gray-900/75 rounded-md
              ring-1 ring-gray-500
              transition duration-200;
              focus:outline-none focus:ring-gray-200
              appearance-none
            "
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={inputVariant}
              onChange={handleInputChange}
              value={query}
            />
            <motion.span
              className="absolute top-[50%] translate-y-[-50%] right-9 flex justify-center items-center cursor-pointer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={clearButtonVariant}
              onClick={handleClearInput}
            >
              <RiCloseFill className="w-5 xs:w-6 h-5 xs:h-6 text-gray-300 hover:text-gray-500 transition duration-200" />
            </motion.span>
          </>
        )}
      </AnimatePresence>
      <motion.label
        htmlFor="search"
        onClick={handleShowInput}
        className="cursor-pointer"
      >
        <FiSearch className="w-5 xs:w-6 h-5 xs:h-6 text-gray-200 hover:text-gray-50 transition duration-200" />
      </motion.label>
    </div>
  );
};

export default SearchBar;
