import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
import Page404 from './components/Page404';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './modules/Dashboard';
import Home from './modules/Home';

// import { fetchRandomText } from './dataProvider';
import StoreContext, { getInitialState, State } from './store/context';
import { getUser } from './store/session';

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    ...getInitialState(),
    currentUser: getUser(),
  });
  return (
    <div className={styles.app}>
      <StoreContext.Provider value={[state, setState]}>
        <Router basename={process.env.REACT_APP_BASE_URL}>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </StoreContext.Provider>
    </div>
  );
};

export default App;
