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
            className="absolute top-0 left-0 min-h-screen w-full bg-black/80
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
              flex h-full
              w-72 items-center justify-center
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
        className="z-50 h-6 w-6 cursor-pointer space-y-[6px]"
        onClick={() => {
          setIsOpen((state) => !state);
          setHandlerAnimation((state) => !state);
        }}
      >
        <motion.span
          className="block h-[2px] w-6 rounded-sm bg-gray-200"
          animate="toggle"
          variants={handlerVariants.top}
        />
        <motion.span
          className="block h-[2px] w-6 rounded-sm bg-gray-200"
          animate="toggle"
          variants={handlerVariants.middle}
        />
        <motion.span
          className="block h-[2px] w-6 rounded-sm bg-gray-200"
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
