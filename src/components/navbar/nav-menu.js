import { useRouter } from 'next/router';
import NavMenuItem from './nav-menu-item';
import items from 'const/nav-menu-list';

const NavMenu = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <ul
      className="
    flex space-x-6
    text-gray-300
    "
    >
      {items.map((item) => (
        <NavMenuItem
          key={item.text}
          text={item.text}
          href={item.href}
          active={item.href === currentPath ? true : false}
        />
      ))}
    </ul>
  );
};

export default NavMenu;
