import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';

import styles from './Home.module.scss';
import logo from './logo.png';
import SignInModal from './SignInModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
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
        <Button color="teal" size="big" onClick={openModal}>
          Start &nbsp; &#x1F680;
        </Button>
        <SignInModal open={isModalOpen} onClose={closeModal} />
      </main>
    </>
  );
}
