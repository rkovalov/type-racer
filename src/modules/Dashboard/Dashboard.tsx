import React from 'react';
import { Grid, Header, Responsive } from 'semantic-ui-react';
import Game from '../Game';
import TopPlayers from '../TopPlayers';

import ProfileDropdown from '../../components/ProfileDropdown';

const Dashboard = () => {
  return (
    <>
      <Header inverted dividing textAlign="right" style={{ padding: '5px' }}>
        <ProfileDropdown />
      </Header>
      <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
        <div style={{ padding: '10px' }}>
          <Game />
          <br />
          <TopPlayers />
        </div>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Grid stackable divided inverted style={{ padding: '0 20px' }}>
          <Grid.Column width={4}>
            <TopPlayers />
          </Grid.Column>
          <Grid.Column width={12}>
            <Game />
          </Grid.Column>
        </Grid>
      </Responsive>
    </>
  );
};

export default React.memo(Dashboard);
