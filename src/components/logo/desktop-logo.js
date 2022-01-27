import Image from 'next/image';
import logoUrl from 'images/Fakeflix_logo.png';

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

export default DesktopLogo;
