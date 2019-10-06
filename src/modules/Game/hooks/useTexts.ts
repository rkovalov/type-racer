import { useEffect, useState } from 'react';
import { fetchRandomText } from '../../../dataProvider';

const useTexts = (activeTextIdx: number) => {
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    if (!texts.length || activeTextIdx === texts.length - 1) {
      fetchRandomText().then(nextTexts =>
        setTexts(prevTexts => [...prevTexts, ...nextTexts]),
      );
    }
  }, [activeTextIdx, texts]);
  return [texts];
};

export default useTexts;
