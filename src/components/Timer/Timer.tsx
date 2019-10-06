import React, { useEffect, useRef, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';

type OnTick = (elapsedSeconds: number) => void;
interface Props {
  seconds: number;
  onEnd?: () => void;
  onTick?: OnTick;
}

const Timer = (props: Props) => {
  const { seconds, onEnd, onTick } = props;
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const onTickCb = useRef<OnTick | undefined>(onTick);

  useEffect(() => {
    onTickCb.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        const timeLeft = --prevSeconds;
        if (onTickCb.current) {
          onTickCb.current(seconds - timeLeft);
        }
        if (timeLeft === 0) {
          if (onEnd) {
            onEnd();
          }
          clearInterval(intervalId);
        }
        return timeLeft;
      });
    }, 1000);
    return () => clearInterval(intervalId);
    //  eslint-disable-next-line
  }, []);

  return (
    <Label>
      <Icon name="clock" />
      <span style={{ width: '35px', display: 'inline-block' }}>
        {secondsLeft}
      </span>
    </Label>
  );
};

export default React.memo(Timer);
