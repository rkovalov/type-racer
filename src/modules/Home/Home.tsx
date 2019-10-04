import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import styles from './Home.module.scss';
import logo from './logo.png';
import SignInModal from './SignInModal';

const Home = (props: RouteComponentProps) => {
  const { match, history, location } = props;
  const openSignModal = useCallback(() => {
    history.push('/?sign-in');
  }, [history]);
  const closeSignModal = useCallback(() => {
    history.push(match.path);
  }, [history, match]);
  const isSignModalOpen = useMemo(() => location.search.includes('?sign-in'), [
    location.search,
  ]);
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
        <Button color="teal" size="big" onClick={openSignModal}>
          Start &nbsp; &#x1F680;
        </Button>
        <SignInModal onClose={closeSignModal} open={isSignModalOpen} />
      </main>
    </>
  );
};

export default Home;
