import Link from 'next/link';

const NavMenuItem = ({ text, href, active, unavailable, ...rest }) => {
  return unavailable ? (
    <li className="text-gray-400">{text}</li>
  ) : active ? (
    <li className="font-bold">{text}</li>
  ) : (
    <li
      className="transition duration-200 hover:text-gray-400 cursor-pointer"
      {...rest}
    >
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

export default NavMenuItem;
