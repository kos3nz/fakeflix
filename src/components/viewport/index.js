import MediaQuery from 'react-responsive';

const Viewport = ({ minWidth, children, ...rest }) => {
  return (
    <MediaQuery minWidth={minWidth} {...rest}>
      {children}
    </MediaQuery>
  );
};

export default Viewport;
