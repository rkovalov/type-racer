import React, { useCallback, useEffect, useRef } from 'react';
import { Input } from 'semantic-ui-react';

interface Props {
  expectedWord: string;
  disabled: boolean;
  value: string;
  onInputChange: (s: string) => void;
  onWordMatch: () => void;
}

const CheckedInput = (props: Props) => {
  const { expectedWord, onInputChange, onWordMatch, disabled, value } = props;
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onChange = useCallback(
    (_, { value: newValue }) => {
      let updatedValue = newValue;
      if (newValue === expectedWord) {
        updatedValue = '';
        onWordMatch();
      }
      onInputChange(updatedValue);
    },
    [expectedWord, onInputChange, onWordMatch],
  );

  return (
    <Input
      fluid
      ref={inputRef}
      value={value}
      disabled={disabled}
      onChange={onChange}
      placeholder="Type the above text here when the race begins "
    />
  );
};

export default React.memo(CheckedInput);
