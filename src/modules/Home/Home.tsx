import React from 'react';
import { Button } from 'semantic-ui-react';

import styles from './Home.module.scss';
import logo from './logo.png';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.grow}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
      </header>
      <main>
        <h2>Type Racer Game</h2>
        <div className="">Increase your typing speed!</div>
        <br />
        <Button color="teal" size="big">
          Start &nbsp; &#x1F680;
        </Button>
      </main>
    </>
  );
}
