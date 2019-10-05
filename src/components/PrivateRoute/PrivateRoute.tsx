import React, { useContext } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import StoreContext from '../../store/context';

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [state] = useContext(StoreContext);
  return (
    <Route
      {...rest}
      render={props =>
        state.currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default React.memo(PrivateRoute);
