import { createContext, useContext, useState } from 'react'

const UseAlertMessageContext = createContext({ message: '', setAlertMessage: (msg: string, seconds?: number) => { }, clearAlert: () => { } })

export function useAlertMessage() {
  return useContext(UseAlertMessageContext)
}

export function UseAlertMessageProvider({ children }) {
  const [message, setMessage] = useState('')
  const [timeout, setTimeoutTracker] = useState(null)

  const setAlertMessage = (msg: string, seconds: number = 8) => {
    if (timeout) clearTimeout(timeout)

    setMessage(msg)
    const newTo = setTimeout(() => {
      clearAlert()
      setTimeoutTracker(null)
    }, 1000 * seconds)
    setTimeoutTracker(newTo)
  }
  const clearAlert = () => setMessage('')

  return <UseAlertMessageContext.Provider value={{ message, setAlertMessage, clearAlert }}>
    {children}
  </UseAlertMessageContext.Provider>
}
