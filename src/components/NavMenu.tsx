import Link from 'next/link';
import { useRouter } from 'next/router';
import { navMenuList } from 'constants/nav-menu-list';

export const NavMenu = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <ul
      className="
        space-y-12
        text-center
        text-paragraph
        lg:flex lg:space-x-5 lg:space-y-0
      "
    >
      {navMenuList.map(({ text, href, unavailable }) => (
        <NavMenuItem
          key={text}
          text={text}
          href={href}
          active={href === currentPath ? true : false}
          unavailable={unavailable || false}
        />
      ))}
    </ul>
  );
};

type NavMenuItemProps = {
  text: string;
  href: string;
  active: boolean;
  unavailable: boolean;
};

const NavMenuItem = ({ text, href, active, unavailable }: NavMenuItemProps) => {
  return unavailable ? (
    <li className="p-2 text-gray-500">{text}</li>
  ) : active ? (
    <li className="p-2 font-bold text-red-500">{text}</li>
  ) : (
    <li className="cursor-pointer p-2 transition duration-200 hover:text-gray-400">
      <Link href={href}>
        <a className="p-1">{text}</a>
      </Link>
    </li>
  );
};
