import { motion } from 'framer-motion';
import Viewport from 'react-responsive';
import LogoLink from 'components/link/logo-link';
import NavMenu from './nav-menu';
import SearchBar from 'components/SearchBar';
import UserIcon from 'components/User-icon';

import { useScrollTop } from 'hooks';
import Drawer from 'components/drawer';

const NavBar = () => {
  const isScrollTop = useScrollTop(50);

  return (
    <motion.header
      className="
        w-full h-20 px-[4%]
        fixed flex items-center
        transition duration-300
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
      <nav className="flex-1 flex justify-end lg:justify-between items-center ml-10">
        <Viewport minWidth={1024}>
          {(matches) => matches && <NavMenu />}
        </Viewport>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <SearchBar />
          <UserIcon />
          <Viewport minWidth={1024}>
            {(matches) => !matches && <Drawer />}
          </Viewport>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavBar;
