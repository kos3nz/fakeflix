import Link from 'next/link';
import { useRouter } from 'next/router';
import { navMenuList } from 'const/nav-menu-list';

export const NavMenu = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <ul
      className="
        text-paragraph
        space-y-12
        text-center
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
    <li className="p-1 text-gray-700">{text}</li>
  ) : active ? (
    <li className="p-1 font-bold text-red-500">{text}</li>
  ) : (
    <li className="p-1 transition duration-200 hover:text-gray-400 cursor-pointer">
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
};
