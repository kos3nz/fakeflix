const MobileLogo = ({ size = 'md' }) => {
  const maxWidth = {
    sm: 'max-w-[30px]',
    md: 'max-w-[40px]',
    lg: 'max-w-[50px]',
  };

  const logoUrl =
    'https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_favicon_192.png';

  return (
    <img className={`w-full ${maxWidth[size]}`} src={logoUrl} alt="logo" />
  );
};

export default MobileLogo;
