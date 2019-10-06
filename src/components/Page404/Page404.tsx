import React from 'react';
import imgSrc from './404.svg';

const Page404 = React.memo(() => (
  <img
    src={imgSrc}
    style={{ height: '100vh' }}
    alt="404"
    data-testid="404-img"
  />
));

Page404.displayName = 'Page404';

export default Page404;
