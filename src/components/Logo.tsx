import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import logoUrl from 'images/Fakeflix_logo.png';
import mobileLogoUrl from 'images/Fakeflix_mobile_logo.png';

type LogoProps = {
  href: string;
  logoType: 'desktop' | 'mobile';
  size: 'sm' | 'md' | 'lg';
};

const logoVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  hover: { scale: 1.1 },
};

export const Logo = ({
  href,
  logoType = 'desktop',
  size = 'md',
}: LogoProps) => {
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
      <Link href={href}>
        <a className="block">
          {logoType === 'desktop' ? <DesktopLogo /> : <MobileLogo />}
        </a>
      </Link>
    </motion.div>
  );
};

const DesktopLogo = () => {
  return (
    <Image
      src={logoUrl}
      alt="logo"
      layout="responsive"
      width={65}
      height={18}
      priority
    />
  );
};

const MobileLogo = () => {
  return (
    <Image
      src={mobileLogoUrl}
      alt="logo"
      layout="responsive"
      width={1}
      height={1}
      quality={40}
      priority
    />
  );
};
