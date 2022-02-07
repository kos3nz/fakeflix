import { motion } from 'framer-motion';
import Viewport from 'react-responsive';
import { Logo } from 'components/Logo';
import { NavMenu } from './NavMenu';
import { SearchBar } from 'components/SearchBar';
import { Profile } from 'components/Profile';
import { Drawer } from 'components/Drawer';
import { useScrollTop } from 'hooks';

export const NavBar = () => {
  const isScrollTop = useScrollTop(50);

  return (
    <motion.header
      className="
        fixed z-30 flex
        h-20 w-full items-center
        px-[4%] transition
        duration-300
      "
      style={{
        backgroundColor: isScrollTop ? 'transparent' : 'rgba(28, 25, 24, 1)',
      }}
    >
      <Viewport minWidth={600}>
        {(matches: boolean) =>
          matches ? (
            <Logo href="/" logoType="desktop" size="sm" />
          ) : (
            <Logo href="/" logoType="mobile" size="md" />
          )
        }
      </Viewport>
      <nav className="ml-10 flex flex-1 items-center justify-end lg:justify-between">
        <Viewport minWidth={1024}>
          {(matches: boolean) => matches && <NavMenu />}
        </Viewport>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <SearchBar />
          <Profile />
          <Viewport minWidth={1024}>
            {(matches: boolean) => !matches && <Drawer />}
          </Viewport>
        </div>
      </nav>
    </motion.header>
  );
};
