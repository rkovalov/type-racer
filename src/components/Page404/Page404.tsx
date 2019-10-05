import React from 'react';
import imgSrc from './404.svg';

const Page404 = () => (
  <img src={imgSrc} style={{ height: '100vh' }} alt="404" />
);

export default React.memo(Page404);
