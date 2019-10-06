import React, { useCallback, useContext, useState } from 'react';
import { Button, Label, Loader } from 'semantic-ui-react';

import { updateUser as updateUserDP } from '../../dataProvider';
import useTexts from './hooks/useTexts';

import StoreContext from '../../store/context';
import ActiveGame from './ActiveGame';

const Game = () => {
  const [activeTextIdx, setActiveTextIdx] = useState(0);
  const [{ currentUser }] = useContext(StoreContext);
  const [inGame, setInGame] = useState(true);
  const [result, setResult] = useState<{
    wpm: number;
    progress: number;
  }>({ wpm: 0, progress: 0 });

  const [texts] = useTexts(activeTextIdx);

  const currentText = texts[activeTextIdx];

  const onFinish = useCallback(
    ({ wpm, progress }) => {
      if (progress === 100 && currentUser) {
        if (!currentUser.bestWpm || wpm > Number(currentUser.bestWpm)) {
          updateUserDP({ ...currentUser, bestWpm: wpm });
        }
      }
      setResult({ wpm, progress });
      setActiveTextIdx(prevIdx => prevIdx + 1);
      setInGame(false);
    },
    [currentUser],
  );

  const tryAgain = useCallback(() => setInGame(true), [setInGame]);

  return (
    <div>
      <h3>Game</h3>
      {!texts.length ? (
        <Loader inverted active inline="centered">
          Loading...
        </Loader>
      ) : inGame ? (
        <ActiveGame text={currentText} onFinish={onFinish} maxTime={60 * 3} />
      ) : (
        <>
          <div>
            <Label>WPM: {result.wpm}</Label>
            <Label>Progress: {result.progress} %</Label>
          </div>
          <br />
          <br />
          <Button onClick={tryAgain} color="blue">
            Play Again
          </Button>
        </>
      )}
    </div>
  );
};

export default React.memo(Game);
