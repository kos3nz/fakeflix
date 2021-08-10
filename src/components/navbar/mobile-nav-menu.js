import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowDropDown } from 'react-icons/md';
import NavMenuItem from './nav-menu-item';
import items from 'const/nav-menu-list';
import { useOutsideClick } from 'hooks';

const MobileNavMenu = ({ isScrollTop }) => {
  const [isVisible, setIsVisible] = useState(false);
  const listItemRef = useRef();

  useOutsideClick(listItemRef, () => {
    if (listItemRef.current) setIsVisible((isVisible) => !isVisible);
  });

  const listItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div
        className="
          w-full h-10 pb-2
          absolute top-[68px] left-0
          flex justify-center
          text-paragraph text-sm xs:text-base
        "
        style={{
          backgroundColor: isScrollTop ? 'transparent' : 'rgba(28, 25, 24, 1)',
        }}
      >
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <span className="pr-2">Discover</span>
          <MdArrowDropDown className="w-5 h-5" />
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="
            absolute top-0 left-0
            w-full h-screen
            flex justify-center items-center
            bg-gray-800/60
            backdrop-filter backdrop-blur-md
            z-50
          "
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={listItemVariants}
          >
            <ul
              className="
                py-4 px-8 space-y-16
              text-paragraph text-center
                rounded-md
                border-1 border-gray-300
              "
              ref={listItemRef}
            >
              {items.map((item) => (
                <NavMenuItem
                  key={item.text}
                  text={item.text}
                  href={item.href}
                  active={item.active}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavMenu;
