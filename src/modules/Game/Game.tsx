import React, { useCallback, useMemo, useState } from 'react';
import { Button, Label, Loader } from 'semantic-ui-react';
import useTexts from './hooks/useTexts';

import ActiveGame from './ActiveGame';

const Game = () => {
  const [activeTextIdx, setActiveTextIdx] = useState(0);
  const [inGame, setInGame] = useState(true);
  const [lastResult, setLastResult] = useState<{
    wpm: number;
    progress: number;
  }>({ wpm: 0, progress: 0 });

  const [texts] = useTexts(activeTextIdx);

  const currentText = useMemo(() => {
    return texts[activeTextIdx];
  }, [activeTextIdx, texts]);

  const onFinish = useCallback(({ wpm, progress }) => {
    if (progress === 100) {
      // sentToServer();
    }
    setLastResult({ wpm, progress });
    setInGame(false);
    setActiveTextIdx(prevIdx => prevIdx + 1);
  }, []);

  const tryAgain = useCallback(() => setInGame(true), [setInGame]);

  return (
    <div>
      <h3>Game</h3>
      {!texts.length ? (
        <Loader />
      ) : inGame ? (
        <ActiveGame text={currentText} onFinish={onFinish} maxTime={60 * 3} />
      ) : (
        <>
          <div>
            <Label>WPM: {lastResult.wpm}</Label>
            <Label>Progress: {lastResult.progress} %</Label>
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
