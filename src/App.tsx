import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
