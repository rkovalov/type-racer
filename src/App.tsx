import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
import Page404 from './components/Page404';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './modules/Dashboard';
import Home from './modules/Home';

import { fetchRandomText } from './dataProvider';

const App: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  // tslint:disable-next-line:no-console
  console.log(texts);
  useEffect(() => {
    fetchRandomText().then(setTexts);
  }, []);
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
