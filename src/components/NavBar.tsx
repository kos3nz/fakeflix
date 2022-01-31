import { motion } from 'framer-motion';
import Viewport from 'react-responsive';
import { Logo } from 'components/Logo';
import { NavMenu } from './NavMenu';
import { SearchBar } from 'components/SearchBar';
import { User } from 'components/User';
import { Drawer } from 'components/Drawer';
import { useScrollTop } from 'hooks';

export const NavBar = () => {
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
        {(matches: boolean) =>
          matches ? (
            <Logo href="/" logoType="desktop" size="sm" />
          ) : (
            <Logo href="/" logoType="mobile" size="md" />
          )
        }
      </Viewport>
      <nav className="flex-1 flex justify-end lg:justify-between items-center ml-10">
        <Viewport minWidth={1024}>
          {(matches: boolean) => matches && <NavMenu />}
        </Viewport>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <SearchBar />
          <User />
          <Viewport minWidth={1024}>
            {(matches: boolean) => !matches && <Drawer />}
          </Viewport>
        </div>
      </nav>
    </motion.header>
  );
};
