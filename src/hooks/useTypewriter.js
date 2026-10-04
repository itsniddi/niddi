import { useEffect, useState } from 'react';

export function useTypewriter(words, { type = 85, del = 45, hold = 1700 } = {}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((v) => v + 1);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? del : type
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, type, del, hold]);

  return text;
}
