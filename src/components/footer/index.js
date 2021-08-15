const Footer = () => {
  return (
    <footer className="my-[2vh] flex flex-col justify-center items-center">
      <div className="flex items-center">
        <span className="mr-1 text-sm text-gray-500">Developed by</span>
        <a href="#" className="flex items-center">
          <span className="mr-1 font-bold text-gray-400">Kos</span>
          <div
            className="
            w-9 h-9 rounded-full
            flex items-center justify-center
            bg-gradient-to-tl from-blue-600 to-pink-500
            "
          >
            <span
              className="
              w-[34px] h-[34px] rounded-full
              flex items-center justify-center
              font-bold text-xs
            bg-gray-900
              "
            >
              KM
            </span>
          </div>
        </a>
      </div>
      <span className="text-xs text-gray-500 mt-2">Inspired by Th3Wall</span>
    </footer>
  );
};

export default Footer;
