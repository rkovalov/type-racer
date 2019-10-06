import React, { useCallback, useMemo, useState } from 'react';
import { Form, Header, Loader, Progress, Segment } from 'semantic-ui-react';
import Timer from '../../components/Timer';
import CheckedInput from './components/CheckedInput';
import useTexts from './hooks/useTexts';
import textMap from './utils/textMap';

const Game = () => {
  const [playedTextIdxs] = useState<number[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [progress, setProgress] = useState(1);
  const [currentInput, setCurrentInput] = useState('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [texts] = useTexts();
  const currentText = useMemo(() => {
    return texts[playedTextIdxs.length];
  }, [playedTextIdxs, texts]);

  const quoteMap = useMemo(() => textMap(currentText), [currentText]);
  const currentWord = useMemo(() => quoteMap.getWord(wordIndex), [
    quoteMap,
    wordIndex,
  ]);
  // const currentOffset = quoteMap.getWordOffset(wordIndex);
  // const cursorPosition = currentOffset + currentInput.length;

  const onWaitingTimerEnd = useCallback(() => {
    setIsGameStarted(true);
  }, [setIsGameStarted]);

  const onGameTimerEnd = useCallback(() => [], []);

  const onWordMatch = useCallback(() => {
    if (wordIndex < quoteMap.wordsCount() - 1) {
      setProgress(((wordIndex + 1) * 100) / quoteMap.wordsCount());
      setWordIndex(wordIndex + 1);
    } else {
      setProgress(1);
      // Finish
    }
  }, [setWordIndex, setProgress, wordIndex, quoteMap]);

  const onGameTimerTick = (elapsedSeconds: number) => {
    setCurrentWpm(Math.floor((wordIndex * 60) / elapsedSeconds));
  };

  return (
    <div>
      <h3>Game</h3>
      {!texts.length ? (
        <Loader />
      ) : (
        <>
          <Header inverted>
            {isGameStarted ? (
              <>
                The race is on! Type the text below:{' '}
                <Timer
                  key="game-timer"
                  seconds={60 * 3}
                  onEnd={onGameTimerEnd}
                  onTick={onGameTimerTick}
                />
              </>
            ) : (
              <>
                Get Ready to Race:{' '}
                <Timer
                  key="waiting-timer"
                  seconds={2}
                  onEnd={onWaitingTimerEnd}
                />
              </>
            )}
          </Header>
          <div>WPM: {currentWpm}</div>
          <Progress percent={progress} indicating color="olive" />
          <Segment inverted>{currentText}</Segment>
          <Form.Field>
            <CheckedInput
              expectedWord={currentWord.toString()}
              disabled={!isGameStarted}
              value={currentInput}
              onInputChange={setCurrentInput}
              onWordMatch={onWordMatch}
            />
          </Form.Field>
        </>
      )}
    </div>
  );
};

export default React.memo(Game);
