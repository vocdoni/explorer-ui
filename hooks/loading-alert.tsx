import { createContext, useContext, useState } from 'react';

const UseLoadingAlertContext = createContext({
  message: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setLoadingMessage: (msg: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideLoading: () => {},
});

export function useLoadingAlert() {
  return useContext(UseLoadingAlertContext);
}

// eslint-disable-next-line react/prop-types
export function UseLoadingAlertProvider({ children }) {
  const [message, setMessage] = useState('');

  const hideLoading = () => setMessage('');

  return (
    <UseLoadingAlertContext.Provider value={{ message, setLoadingMessage: setMessage, hideLoading }}>
      {children}
    </UseLoadingAlertContext.Provider>
  );
}
