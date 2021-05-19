import { useState } from "react";

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);

  // Back Function - goes back to the previous state //
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        return history.slice(0, history.length - 1);
      });
    };
  };

  // Transition Function - calls back || setHistory to update the state //
  const transition = (newMode, replace = false) => {
    if (replace === true) {
      back();
    }

    setHistory(prev => {
      return [...prev, newMode];
    })
  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
};