import Link from 'next/link';
import DesktopLogo from 'components/logo/desktop-logo';
import MobileLogo from 'components/logo/mobile-logo';

const LogoLink = ({ href, logoType = 'desktop', size = 'md', ...rest }) => {
  return (
    <Link href={href} {...rest}>
      <a className="block">
        {logoType === 'desktop' ? (
          <DesktopLogo size={size} />
        ) : (
          <MobileLogo size={size} />
        )}
      </a>
    </Link>
  );
};

export default LogoLink;
