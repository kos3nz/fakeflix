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

  let width;
  switch (size) {
    case 'sm': {
      width = logoType === 'desktop' ? 'w-[120px]' : 'w-[30px]';
      break;
    }
    case 'md': {
      width = logoType === 'desktop' ? 'w-[160px]' : 'w-[40px]';
      break;
    }
    case 'lg': {
      width = logoType === 'desktop' ? 'w-[200px]' : 'w-[50px]';
      break;
    }
    default:
      break;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={logoVariants}
      className={`${width}`}
    >
      <Link href={href} {...rest}>
        <a className="block">
          {logoType === 'desktop' ? <DesktopLogo /> : <MobileLogo />}
        </a>
      </Link>
    </motion.div>
  );
};

export default LogoLink;
