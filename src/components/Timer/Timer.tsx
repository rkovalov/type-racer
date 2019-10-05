import React, { useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';

interface Props {
  seconds: number;
  onEnd?: () => void;
}

const Timer = (props: Props) => {
  const { seconds, onEnd } = props;
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        const timeLeft = --prevSeconds;
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
    <Label color={undefined}>
      <Icon name="clock" />
      <span style={{ width: '35px', display: 'inline-block' }}>
        {secondsLeft}
      </span>
    </Label>
  );
};

export default React.memo(Timer);
