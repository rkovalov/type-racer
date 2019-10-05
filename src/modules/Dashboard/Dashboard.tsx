import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, Grid, Header, Image } from 'semantic-ui-react';
import { signout } from '../../store/session';
import ActivityFeed from '../ActivityFeed';

import StoreContext from '../../store/context';

const ProfileDropdown = withRouter(({ history }: RouteComponentProps) => {
  const logout = useCallback(() => signout().then(() => history.push('/')), [
    history,
  ]);
  const [state] = useContext(StoreContext);
  return (
    <Dropdown
      direction="left"
      text={state.currentUser && state.currentUser.nickname}
      icon={
        <Image
          style={{ display: 'inline-block', marginLeft: '5px' }}
          circular
          size="mini"
          src={process.env.PUBLIC_URL + '/male.png'}
        />
      }
    >
      <Dropdown.Menu>
        <Dropdown.Item icon="sign-out" text="Sign out" onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  );
});

const Dashboard = () => {
  return (
    <>
      <Header inverted dividing textAlign="right" style={{ padding: '10px' }}>
        <ProfileDropdown />
      </Header>
      <Grid divided inverted stretched style={{ height: '100vh' }}>
        <Grid.Column width={4}>
          <ActivityFeed />
        </Grid.Column>
        <Grid.Column width={12}>Dashboard</Grid.Column>
      </Grid>
    </>
  );
};

export default React.memo(Dashboard);
