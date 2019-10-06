import React, { useCallback, useContext, useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import StoreContext from '../../store/context';
import styles from './Home.module.scss';
import logo from './logo.png';
import SignInModal from './SignInModal';

const Home = (props: RouteComponentProps) => {
  const { match, history, location } = props;
  const [{ currentUser }] = useContext(StoreContext);
  const openSignModal = useCallback(() => {
    history.push('/?sign-in');
  }, [history]);
  const closeSignModal = useCallback(() => {
    history.push(match.path);
  }, [history, match]);
  const isSignModalOpen = useMemo(() => location.search.includes('?sign-in'), [
    location.search,
  ]);
  const onSigninSuccess = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

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
        {currentUser ? (
          <Link to="/dashboard">
            <Button color="teal" size="big">
              My Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Button color="teal" size="big" onClick={openSignModal}>
              Get Started &nbsp; &#x1F680;
            </Button>
            <SignInModal
              open={isSignModalOpen}
              onClose={closeSignModal}
              onSigninSuccess={onSigninSuccess}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
