import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Header, Progress } from 'semantic-ui-react';
import Timer from '../../components/Timer';
import CheckedInput from './components/CheckedInput';
import CheckedText from './components/CheckedText';
import * as utils from './utils';

interface Props {
  text: string;
  maxTime: number; // seconds
  onFinish?: (status: { wpm: number; progress: number }) => void;
}

const ActiveGame = ({ text, onFinish, maxTime }: Props) => {
  const [wpm, setWpm] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(1);
  const [currentInput, setCurrentInput] = useState('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const textMap = useMemo(() => utils.textMap(text), [text]);
  const currentWord = useMemo(() => textMap.getWord(wordIndex), [
    textMap,
    wordIndex,
  ]);

  const onGameFinish = useCallback(() => {
    if (onFinish) {
      onFinish({ wpm, progress });
    }
  }, [onFinish, wpm, progress]);

  useEffect(() => {
    if (progress === 100) {
      onGameFinish();
    }
  }, [onGameFinish, progress]);

  const onWaitingTimerEnd = useCallback(() => {
    setIsGameStarted(true);
  }, [setIsGameStarted]);

  const onWordMatch = useCallback(() => {
    if (wordIndex < textMap.wordsCount() - 1) {
      setProgress(((wordIndex + 1) * 100) / textMap.wordsCount());
      setWordIndex(wordIndex + 1);
    } else {
      setProgress(100);
    }
  }, [setWordIndex, setProgress, wordIndex, textMap]);

  const onGameTimerTick = (elapsedSeconds: number) => {
    setWpm(Math.floor((wordIndex * 60) / elapsedSeconds));
  };

  return (
    <>
      <Header inverted>
        {isGameStarted ? (
          <>
            The race is on! Type the text below:{' '}
            <Timer
              key="game-timer"
              seconds={maxTime}
              onEnd={onGameFinish}
              onTick={onGameTimerTick}
            />
          </>
        ) : (
          <>
            Get Ready to Race:{' '}
            <Timer key="waiting-timer" seconds={2} onEnd={onWaitingTimerEnd} />
          </>
        )}
      </Header>
      <div>WPM: {wpm}</div>
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
  );
};

export default React.memo(ActiveGame);
