import React, { useCallback, useMemo, useState } from 'react';
import { Form, Header, Loader, Progress } from 'semantic-ui-react';
import Timer from '../../components/Timer';
import CheckedInput from './components/CheckedInput';
import CheckedText from './components/CheckedText';
import useTexts from './hooks/useTexts';
import * as utils from './utils';

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

  const textMap = useMemo(() => utils.textMap(currentText), [currentText]);
  const currentWord = useMemo(() => textMap.getWord(wordIndex), [
    textMap,
    wordIndex,
  ]);
  // const currentOffset = textMap.getWordOffset(wordIndex);
  // const cursorPosition = currentOffset + currentInput.length;

  const onWaitingTimerEnd = useCallback(() => {
    setIsGameStarted(true);
  }, [setIsGameStarted]);

  const onGameTimerEnd = useCallback(() => [], []);

  const onWordMatch = useCallback(() => {
    if (wordIndex < textMap.wordsCount() - 1) {
      setProgress(((wordIndex + 1) * 100) / textMap.wordsCount());
      setWordIndex(wordIndex + 1);
    } else {
      setProgress(100);
      // Finish
    }
  }, [setWordIndex, setProgress, wordIndex, textMap]);

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
          <CheckedText textMap={textMap} currentWordIndex={wordIndex} />
          <Form.Field>
            <CheckedInput
              expectedWord={currentWord.text}
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
