import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(second, boolParam) {
    if(!boolParam) {
      setHistory((prev) => {
        return [...prev, second]
      });
      setMode(second);
    } else {
      setMode(second);
    }
  };
  function back() {
    if(history.length > 1) {
      setHistory((prev) => {
        prev.pop();
        setMode(prev[prev.length - 1]);
        return prev;
      });
    }
  };
  return {
    mode,
    transition,
    back
  };
};
