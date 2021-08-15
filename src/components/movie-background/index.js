const MovieBG = ({ imageUrl, children }) => {
  return (
    <div
      className={`
          w-full h-9/10 lg:h-[80vh]
          bg-cover bg-center
          relative
          flex items-end justify-center
          lg:items-center lg:justify-start
        `}
      style={{
        backgroundImage: `url(${imageUrl})`,
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
        w-full h-[50%]
        bg-gradient-to-t via-gray-900-opacity-75 from-gray-900
      "
      />
      {children}
    </div>
  );
};
export default MovieBG;
