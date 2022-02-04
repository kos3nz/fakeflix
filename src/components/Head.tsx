import NextHead from 'next/head';

type HeadProps = {
  title: string;
  children?: React.ReactNode;
};

export const Head = ({ title, children }: HeadProps) => {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <title key="title">{title}</title>
      <link rel="icon" href="/Fakeflix_favicon_64.ico" key="favicon" />
      {children}
    </NextHead>
  );
};
