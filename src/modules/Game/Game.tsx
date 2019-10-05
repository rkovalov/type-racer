import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Form, Input, Loader, Progress, Segment } from 'semantic-ui-react';
import Timer from '../../components/Timer';
import { fetchRandomText } from '../../dataProvider';

const Game = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [playedTextIdxs] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const inputRef = useRef<Input>(null);
  const currentText = useMemo(() => {
    return texts[playedTextIdxs.length];
  }, [playedTextIdxs, texts]);
  // const [textIndex, setTextIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchRandomText().then(setTexts);
  }, []);

  const onWaitingTimerEnd = useCallback(() => {
    setIsGameStarted(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [setIsGameStarted, inputRef]);

  return (
    <div>
      <h3>Game</h3>
      {!texts.length ? (
        <Loader />
      ) : (
        <>
          <div>
            {isGameStarted ? (
              <>
                The race is on! Type the text below: <Timer seconds={60 * 3} />
              </>
            ) : (
              <>
                Get Ready to Race:{' '}
                <Timer seconds={10} onEnd={onWaitingTimerEnd} />
              </>
            )}
          </div>
          <Progress percent={0} indicating color="olive" />
          <Segment inverted>{currentText}</Segment>
          <Form.Field>
            <Input
              fluid
              autoFocus
              ref={inputRef}
              disabled={!isGameStarted}
              placeholder="Type the above text here when the race begins "
            />
          </Form.Field>
        </>
      )}
    </div>
  );
};

export default React.memo(Game);
