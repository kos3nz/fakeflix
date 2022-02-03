import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';
import { DropdownMenu } from 'components/DropdownMenu';
import { useOutsideClick } from 'hooks';

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

export const User = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsVisible(false));

  return (
    // 親コンポーネントにrefを設定することで、profile iconをクリックしたときに二重にsetIsVisibleがトリガーされるのを防ぎ、DropdownMenuをクリックしたときはref.current.containsに含まれるためunmountしない
    <div className="text-paragraph" ref={dropdownRef}>
      <div
        className="
          flex items-center space-x-1
          cursor-pointer
        "
        onClick={() => setIsVisible((isVisible) => !isVisible)}
      >
        <div className="w-[32px] sm:w-[40px]">
          <img src="/images/profile.png" alt="user" />
        </div>
        <motion.div animate={isVisible ? 'up' : 'down'} variants={iconVariants}>
          <IoMdArrowDropdown className="w-5 h-5" />
        </motion.div>
      </div>
      <DropdownMenu isVisible={isVisible} />
    </div>
  );
};
