import { createContext, useContext, useState } from 'react';

const UseAlertMessageContext = createContext({
  message: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setAlertMessage: (msg: string, seconds?: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearAlert: () => {},
});

export function useAlertMessage() {
  return useContext(UseAlertMessageContext);
}

// eslint-disable-next-line react/prop-types
export function UseAlertMessageProvider({ children }) {
  const [message, setMessage] = useState('');
  const [timeout, setTimeoutTracker] = useState(null);

  const setAlertMessage = (msg: string, seconds = 8) => {
    if (timeout) clearTimeout(timeout);

    setMessage(msg);
    const newTo = setTimeout(() => {
      clearAlert();
      setTimeoutTracker(null);
    }, 1000 * seconds);
    setTimeoutTracker(newTo);
  };
  const clearAlert = () => setMessage('');

  return (
    <UseAlertMessageContext.Provider value={{ message, setAlertMessage, clearAlert }}>
      {children}
    </UseAlertMessageContext.Provider>
  );
}
