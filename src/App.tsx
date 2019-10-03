// import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import styles from './App.module.scss';

import { fetchRandomText } from './dataProvider';
import logo from './logo.png';

const App: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  // tslint:disable-next-line:no-console
  console.log(texts);
  useEffect(() => {
    fetchRandomText().then(setTexts);
  }, []);
  // tslint:disable-next-line:no-console
  console.log(styles);
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.Grow}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
        </div>

        <h2>TypeRacer Game</h2>
        <div className="">Increase your typing speed!</div>
        <br />
        <Button color="teal" size="large">
          Start &nbsp; &#x1F680;
        </Button>
      </header>
    </div>
  );
};

export default App;
