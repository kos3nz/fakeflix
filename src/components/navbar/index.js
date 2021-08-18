import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import LogoLink from 'components/link/logo-link';
import NavMenu from './nav-menu';
import MobileNavMenu from './mobile-nav-menu';
import Search from 'components/search';
import UserIcon from 'components/user-icon';

import { useScrollTop } from 'hooks';

const Viewport = dynamic(() => import('react-responsive'), { ssr: false });

const NavBar = () => {
  const isScrollTop = useScrollTop();

  return (
    <motion.header
      className="
        w-full h-20 px-6 xs:px-8
        fixed flex items-center
        transition duration-500
        z-30
      "
      style={{
        backgroundColor: isScrollTop ? 'transparent' : 'rgba(28, 25, 24, 1)',
      }}
    >
      <Viewport minWidth={600}>
        {(matches) =>
          matches ? (
            <LogoLink href="/" logoType="desktop" size="sm" />
          ) : (
            <LogoLink href="/" logoType="mobile" size="md" />
          )
        }
      </Viewport>
      <nav className="flex-1 flex items-center ml-10">
        <Viewport minWidth={1024}>
          {(matches) =>
            matches ? <NavMenu /> : <MobileNavMenu isScrollTop={isScrollTop} />
          }
        </Viewport>
        <div className="flex-1 flex justify-end gap-4 sm:gap-6">
          <Search />
          <UserIcon />
        </div>
      </nav>
    </motion.header>
  );
};

export default NavBar;
