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
    <div className="relative mr-2 flex max-w-[250px] items-center sm:mr-0">
      <label htmlFor="search" className="absolute left-2 cursor-pointer">
        <button
          className="flex items-center justify-center"
          onClick={handleClickSearchIcon}
          aria-label="Search titles"
        >
          <FiSearch className="h-5 w-5 text-gray-300 transition duration-200 hover:text-gray-50" />
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
          duration-200; w-full appearance-none rounded-md
          bg-gray-900/75 py-2 pr-7
        pl-9 text-xs
        text-paragraph placeholder-gray-400
          caret-gray-200 ring-1
          ring-gray-500 transition
          focus:bg-gray-900/90 focus:outline-none focus:ring-gray-200
          sm:text-sm
        "
        onChange={handleInputChange}
        value={query}
        onKeyDown={handleSearchTitles}
      />
      <span
        className="absolute right-1 flex cursor-pointer items-center justify-center"
        onClick={handleClearInput}
      >
        <RiCloseFill className="h-5 w-5 text-gray-500 transition duration-200 hover:text-gray-300 xs:h-6 xs:w-6" />
      </span>
    </div>
  );
};
