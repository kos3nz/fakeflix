const DesktopLogo = ({ size = 'md' }) => {
  const maxWidth = {
    sm: 'max-w-[120px]',
    md: 'max-w-[160px]',
    lg: 'max-w-[200px]',
  };

  const logoUrl =
    'https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png';

  return (
    <img className={`w-full ${maxWidth[size]}`} src={logoUrl} alt="logo" />
  );
};

export default DesktopLogo;
