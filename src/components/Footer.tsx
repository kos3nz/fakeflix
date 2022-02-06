export const Footer = () => {
  return (
    <footer className="relative my-[2vh] flex flex-col items-center justify-center">
      <div className="flex items-center">
        <span className="mr-1 text-sm text-gray-500">Developed by</span>
        <a href="#" className="flex items-center">
          <span className="mr-1 font-bold text-gray-400">Kos</span>
          <div
            className="
            flex h-9 w-9
            items-center justify-center rounded-full
            bg-gradient-to-tl from-blue-600 to-pink-500
            "
          >
            <span
              className="
              flex h-[34px] w-[34px]
              items-center justify-center rounded-full
              bg-gray-900 text-xs
            font-bold
              "
            >
              KM
            </span>
          </div>
        </a>
      </div>
      <span className="mt-2 text-xs text-gray-500">Inspired by Th3Wall</span>
    </footer>
  );
};
