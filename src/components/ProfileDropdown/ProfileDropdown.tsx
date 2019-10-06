import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import { signout } from '../../store/session';

import StoreContext from '../../store/context';

const ProfileDropdown = ({ history }: RouteComponentProps) => {
  const [state, setState] = useContext(StoreContext);

  const logout = useCallback(
    () =>
      signout().then(() => {
        setState(prevState => ({ ...prevState, currentUser: undefined }));
        history.push('/');
      }),
    [history],
  );

  const gender = (state.currentUser && state.currentUser.gender) || 'male';
  return (
    <Dropdown
      direction="left"
      text={state.currentUser && state.currentUser.nickname}
      icon={
        <Image
          style={{ display: 'inline-block', marginLeft: '5px' }}
          circular
          size="mini"
          src={process.env.PUBLIC_URL + `/${gender}.png`}
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
