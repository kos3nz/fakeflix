import Image from 'next/image';
import mobileLogoUrl from 'images/Fakeflix_mobile_logo.png';

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

export default MobileLogo;
