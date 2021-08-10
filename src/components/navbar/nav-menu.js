import NavMenuItem from './nav-menu-item';
import items from 'const/nav-menu-list';

const NavMenu = () => (
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
        active={item.active}
      />
    ))}
  </ul>
);

export default NavMenu;
