function* allMatches(regex: RegExp, str: string) {
  let match = regex.exec(str);

  while (match) {
    yield match;
    match = regex.exec(str);
  }
}

const mapMatches = (
  regex: RegExp,
  str: string,
  fn: (match: RegExpExecArray) => any,
) => Array.from(allMatches(regex, str)).map(fn);

const Word = ({ offset, text }: { offset: number; text: string }) => {
  // @ts-ignore
  const [word, whitespace] = text.match(/([^\s]+)(\s|$)/).slice(1);
  return {
    letters: Array.from(text),
    offset,
    text,
    whitespace,
    word,
    // tslint:disable-next-line: object-literal-sort-keys
    hasWhitespace: () => Boolean(whitespace),
  };
};

export const textMap = (text: string) => {
  const allWords = mapMatches(/[^\s]+(\s|$)/g, text, (match: RegExpExecArray) =>
    Word({ text: match[0], offset: match.index }),
  );

  return {
    text,
    // tslint:disable-next-line: object-literal-sort-keys
    getWord: (i: number) => allWords[i],
    getWordOffset: (i: number) => allWords[i].offset,
    words: () => allWords.values(),
    wordsCount: () => allWords.length,
  };
};
