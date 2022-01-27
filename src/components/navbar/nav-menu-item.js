import Link from 'next/link';

const NavMenuItem = ({ text, href, active, unavailable, ...rest }) => {
  return unavailable ? (
    <li className="p-1 text-gray-700">{text}</li>
  ) : active ? (
    <li className="p-1 font-bold text-red-500">{text}</li>
  ) : (
    <li
      className="p-1 transition duration-200 hover:text-gray-400 cursor-pointer"
      {...rest}
    >
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

export default NavMenuItem;
