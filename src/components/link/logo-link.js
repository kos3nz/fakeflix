import Link from 'next/link';
import { motion } from 'framer-motion';
import DesktopLogo from 'components/logo/desktop-logo';
import MobileLogo from 'components/logo/mobile-logo';

const LogoLink = ({ href, logoType = 'desktop', size = 'md', ...rest }) => {
  const logoVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={logoVariants}
    >
      <Link href={href} {...rest}>
        <a className="block">
          {logoType === 'desktop' ? (
            <DesktopLogo size={size} />
          ) : (
            <MobileLogo size={size} />
          )}
        </a>
      </Link>
    </motion.div>
  );
};

export default LogoLink;
