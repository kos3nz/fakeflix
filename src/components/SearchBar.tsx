import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSearchQuery } from 'redux/search/search.selectors';
import { changeInputValue, clearInputValue } from 'redux/search/search.slice';
import { removeSymbols } from 'utils';

export const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);

  const search = () => {
    router.push({
      pathname: '/search',
      query: { keyword: removeSymbols(query) },
    });
  };

  const handleSearchTitles = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchInputRef.current?.blur();

      if (query.length === 0) return;
      else {
        search();
      }
    }
  };

  const handleClickSearchIcon = () => {
    if (query.length > 0) {
      search();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInputValue(e.target.value));
  };

  const handleClearInput = () => {
    dispatch(clearInputValue());
  };

  return (
    <div className="flex items-center max-w-[250px] mr-2 sm:mr-0 relative">
      <label htmlFor="search" className="absolute left-2 cursor-pointer">
        <button
          className="flex justify-center items-center"
          onClick={handleClickSearchIcon}
          aria-label="Search titles"
        >
          <FiSearch className="w-5 h-5 text-gray-300 hover:text-gray-50 transition duration-200" />
        </button>
      </label>
      <input
        ref={searchInputRef}
        name="search"
        id="search"
        type="text"
        placeholder="Search Titles..."
        autoComplete="off"
        className="
          py-2 pr-7 pl-9 w-full
          text-xs sm:text-sm text-paragraph
        placeholder-gray-400 caret-gray-200
        bg-gray-900/75 rounded-md
          ring-1 ring-gray-500
          transition duration-200;
          focus:outline-none focus:ring-gray-200 focus:bg-gray-900/90
          appearance-none
        "
        onChange={handleInputChange}
        value={query}
        onKeyDown={handleSearchTitles}
      />
      <span
        className="absolute right-1 flex justify-center items-center cursor-pointer"
        onClick={handleClearInput}
      >
        <RiCloseFill className="w-5 xs:w-6 h-5 xs:h-6 text-gray-500 hover:text-gray-300 transition duration-200" />
      </span>
    </div>
  );
};
