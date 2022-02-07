type BannerBGProps = {
  imageUrl: string;
  children: React.ReactNode;
};

export const BannerBackground = ({ imageUrl, children }: BannerBGProps) => {
  return (
    <div
      className={`
          relative flex h-9/10
          w-full items-end
          justify-center
          bg-cover bg-center lg:h-[80vh]
          lg:items-center lg:justify-start
        `}
    >
      <img
        src={imageUrl}
        alt="background"
        className="absolute h-full w-full object-cover"
      />
      <div
        className="
          absolute top-0 left-0
          h-full w-full
        bg-gray-900 opacity-20
        "
      />
      <div
        className="
        absolute -bottom-1 left-0
        h-[50%] w-full
        bg-gradient-to-t from-gray-900 via-gray-900-opacity-75
      "
      />
      {children}
    </div>
  );
};
