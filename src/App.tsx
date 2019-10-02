import React, { useEffect, useState } from 'react';
import './App.css';

import { fetchRandomText } from './dataProvider';
import logo from './logo.svg';

const App: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  // tslint:disable-next-line:no-console
  console.log(texts);
  useEffect(() => {
    fetchRandomText().then(setTexts);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span />
        <span />
        <p>
          Edit <code>src/App.tsx</code> and save
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
