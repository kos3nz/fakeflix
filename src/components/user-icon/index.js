import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownMenu from 'components/dropdown-menu';
import useOutsideClick from 'hooks/useOutsideClick';

const UserIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef();

  const iconVariants = {
    up: {
      rotate: 180,
      transition: {
        duration: 0.2,
      },
    },
    down: {
      rotate: 360,
      transition: {
        duration: 0.2,
      },
    },
  };

  useOutsideClick(dropdownRef, () => setIsVisible(false));

  return (
    // 親コンポーネントにrefを設定することで、profile iconをクリックしたときに二重にsetIsVisibleがトリガーされるのを防ぎ、DropdownMenuをクリックしたときはref.current.containsに含まれるためunmountしない
    <div className="text-paragraph" ref={dropdownRef}>
      <div
        className="
          flex items-center gap-1
          cursor-pointer
        "
        onClick={() => setIsVisible((isVisible) => !isVisible)}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_profilepic.png"
          alt="user"
          className="w-full max-w-[32px] sm:max-w-[40px]"
        />
        <motion.div animate={isVisible ? 'up' : 'down'} variants={iconVariants}>
          <IoMdArrowDropdown className="w-5 h-5" />
        </motion.div>
      </div>
      <DropdownMenu isVisible={isVisible} />
    </div>
  );
};

export default UserIcon;
