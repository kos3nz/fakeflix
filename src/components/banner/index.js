const Banner = ({ children }) => (
  <header
    className="
          w-full h-9/10
          bg-cover bg-center
          relative
          flex items-end justify-center
        "
    style={{
      backgroundImage:
        "url('https://image.tmdb.org/t/p/original//xGexTKCJDkl12dTW4YCBDXWb1AD.jpg')",
    }}
  >
    <div
      className="
            absolute top-0 left-0
            w-full h-full
          bg-gray-900 opacity-20
          "
    />
    <div
      className="
            absolute bottom-0 left-0
            w-full h-28
            bg-gradient-to-t  from-gray-900
          "
    />
    {children}
  </header>
);

export default Banner;
