import cx from 'classnames';
import React from 'react';
import { Segment } from 'semantic-ui-react';

import * as utils from '../../utils';

import styles from './CheckedText.module.scss';

interface Props {
  textMap: ReturnType<typeof utils.textMap>;
  currentWordIndex: number;
}

const CheckedText = (props: Props) => {
  const { textMap, currentWordIndex } = props;
  const words = Array.from(textMap.words());

  return (
    <Segment inverted>
      {words.map((word, wordIndex) => {
        const isCurrent = wordIndex === currentWordIndex;
        const isTyped = wordIndex < currentWordIndex;
        return (
          <span
            key={wordIndex}
            className={cx({
              [styles.typed]: isTyped,
              [styles.typing]: isCurrent,
            })}
          >
            {word.text}
          </span>
        );
      })}
    </Segment>
  );
};

export default CheckedText;
