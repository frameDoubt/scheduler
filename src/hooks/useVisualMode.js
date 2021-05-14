import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(second) { setMode(second) }
  function back() {}

  return {
    mode,
    transition,
    back
  };
};
