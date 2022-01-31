import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from 'hooks';
import { NavMenu } from 'components/NavMenu';

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [handlerAnimation, setHandlerAnimation] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  const handlerVariants = {
    top: {
      toggle: {
        y: handlerAnimation ? 8 : 0,
        rotate: handlerAnimation ? 45 : 0,
        transition: {
          y: {
            duration: 0.2,
            delay: handlerAnimation ? 0 : 0.2,
          },
          rotate: {
            duration: 0.2,
            delay: handlerAnimation ? 0.2 : 0,
          },
        },
      },
    },
    middle: {
      toggle: {
        opacity: handlerAnimation ? 0 : 1,
        transition: {
          duration: 0.2,
        },
      },
    },
    bottom: {
      toggle: {
        y: handlerAnimation ? -8 : 0,
        rotate: handlerAnimation ? -45 : 0,
        transition: {
          y: {
            duration: 0.2,
            delay: handlerAnimation ? 0 : 0.2,
          },
          rotate: {
            duration: 0.2,
            delay: handlerAnimation ? 0.2 : 0,
          },
        },
      },
    },
  };

  useOutsideClick(drawerRef, (e) => {
    if (handlerRef.current?.contains(e.target as Node)) return;
    setIsOpen(false);
    setHandlerAnimation(false);
  });

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-0 left-0 w-full min-h-screen bg-black/80
            "
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerBGVariants}
          >
            <motion.div
              ref={drawerRef}
              className="
              absolute top-0 right-0
              w-72 h-full
              flex justify-center items-center
            bg-gray-900
              "
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              <NavMenu />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={handlerRef}
        className="w-6 h-6 space-y-[6px] z-50 cursor-pointer"
        onClick={() => {
          setIsOpen((state) => !state);
          setHandlerAnimation((state) => !state);
        }}
      >
        <motion.span
          className="block w-6 h-[2px] bg-gray-200 rounded-sm"
          animate="toggle"
          variants={handlerVariants.top}
        />
        <motion.span
          className="block w-6 h-[2px] bg-gray-200 rounded-sm"
          animate="toggle"
          variants={handlerVariants.middle}
        />
        <motion.span
          className="block w-6 h-[2px] bg-gray-200 rounded-sm"
          animate="toggle"
          variants={handlerVariants.bottom}
        />
      </div>
    </div>
  );
};

const drawerBGVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: '0',
    transition: {
      ease: 'easeIn',
      duration: 0.4,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.4,
    },
  },
};
