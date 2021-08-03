import dynamic from 'next/dynamic';
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import LogoLink from 'components/link/logo-link';
import Search from 'components/search';
import UserIcon from 'components/user-icon';

const Viewport = dynamic(() => import('react-responsive'), { ssr: false });

const NavBar = () => {
  const { scrollY } = useViewportScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 95, 100],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)']
  );
  // console.log(backgroundColor);

  const logo = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
    hover: { scale: 1.1 },
  };

  return (
    <motion.nav
      className="
        w-full h-20 px-4 xs:px-6
        fixed flex items-center
        z-30
      "
      style={{ backgroundColor }}
      transition={{ duration: 2 }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={logo}
      >
        <Viewport minWidth={600}>
          {(matches) =>
            matches ? (
              <LogoLink href="/login" logoType="desktop" size="sm" />
            ) : (
              <LogoLink href="/login" logoType="mobile" size="md" />
            )
          }
        </Viewport>
      </motion.div>
      <div className="flex-1 flex justify-end gap-4 sm:gap-6">
        <Search />
        <UserIcon />
      </div>
    </motion.nav>
  );
};

export default NavBar;
