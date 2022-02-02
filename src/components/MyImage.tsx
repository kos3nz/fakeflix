import Image, { ImageLoaderProps, ImageProps } from 'next/image';

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUD_NAME
  }/image/fetch/w_${width},q_${quality || 75}/${src}`;
};

export const MyImage = (props: Omit<ImageProps, 'loader'>) => {
  return <Image loader={myLoader} alt={props.alt} {...props} />;
};

export default MyImage;
