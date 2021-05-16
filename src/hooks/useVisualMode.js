import { useState } from "react";

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);

  const back = function () {
    if (history.length > 1) {
      setHistory(prev => {
        return history.slice(0, history.length - 1);
      })
    }
  };

  const transition = function (newMode, replace = false) {
    if (replace === true) {
      back();
    }

    setHistory(prev => {
      return [...prev, newMode];
    })
  };

  const mode = history.slice(-1)[0];

  return { mode, transition, back };
}