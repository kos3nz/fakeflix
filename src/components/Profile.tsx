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

export const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsVisible(false));

  return (
    // 親コンポーネントにrefを設定することで、profile iconをクリックしたときに二重にsetIsVisibleがトリガーされるのを防ぎ、DropdownMenuをクリックしたときはref.current.containsに含まれるためunmountしない
    <div className="text-paragraph" ref={dropdownRef}>
      <button
        className="
          flex cursor-pointer items-center
          space-x-1
        "
        onClick={() => setIsVisible((isVisible) => !isVisible)}
      >
        <div className="w-[32px] sm:w-[40px]">
          <img src="/images/profile.png" alt="user" />
        </div>
        <motion.div animate={isVisible ? 'up' : 'down'} variants={iconVariants}>
          <IoMdArrowDropdown className="h-5 w-5" aria-hidden />
        </motion.div>
      </button>
      <DropdownMenu isVisible={isVisible} />
    </div>
  );
};
