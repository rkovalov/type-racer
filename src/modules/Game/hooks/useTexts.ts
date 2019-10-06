import { useEffect, useState } from 'react';
import { fetchRandomText } from '../../../dataProvider';

const useText = () => {
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    fetchRandomText().then(setTexts);
  }, []);
  return [texts];
};

export default useText;
