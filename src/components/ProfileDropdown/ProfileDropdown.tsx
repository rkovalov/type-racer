import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import { signout } from '../../store/session';

import StoreContext from '../../store/context';

const ProfileDropdown = ({ history }: RouteComponentProps) => {
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
};

export default withRouter(React.memo(ProfileDropdown));
