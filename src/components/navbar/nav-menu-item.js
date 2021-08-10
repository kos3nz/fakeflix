import Link from 'next/link';

const NavMenuItem = ({ text, href, active }) => {
  return active ? (
    <li className="font-bold">{text}</li>
  ) : (
    <li className="transition duration-200 hover:text-gray-400 cursor-pointer">
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

export default NavMenuItem;
