import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Game from '../Game';
import TopPlayers from '../TopPlayers';

// import StoreContext from '../../store/context';
import ProfileDropdown from '../../components/ProfileDropdown';

const Dashboard = () => {
  return (
    <>
      <Header inverted dividing textAlign="right" style={{ padding: '10px' }}>
        <ProfileDropdown />
      </Header>
      <Grid divided inverted stretched style={{ padding: '0 20px' }}>
        <Grid.Column width={4}>
          <TopPlayers />
        </Grid.Column>
        <Grid.Column width={12}>
          <Game />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default React.memo(Dashboard);
