// toast-provider.js
import React, { createContext, useEffect, useContext, useState } from 'react'

import { toast, Toaster } from '@redwoodjs/web/dist/toast'
const ToastContext = createContext()

const ToastProvider = ({ children }) => {
  const [toastMessageAndType, setToastMessageAndType] = useState({})

  const showToast = (message, type) => {
    setToastMessageAndType({ message, type })
  }

  const hideToast = () => {
    setToastMessageAndType({ message: '', type: '' })
  }

  useEffect(() => {
    // Set the initial message after the initial render on the client side
    setToastMessageAndType({ message: '', type: '' })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 1500 }} />
      {toastMessageAndType?.message ? (
        <>
          {toastMessageAndType?.type === 'success' ? (
            <div className="toast hidden">
              {toast.success(toastMessageAndType?.message)}
            </div>
          ) : null}
          {toastMessageAndType?.type === 'error' ? (
            <div className="toast hidden">
              {toast.error(toastMessageAndType?.message)}
            </div>
          ) : null}
          {toastMessageAndType?.type !== 'success' &&
          toastMessageAndType?.type !== 'error' ? (
            <div className="toast hidden">
              {toast(toastMessageAndType?.message)}
            </div>
          ) : null}
        </>
      ) : null}
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export { ToastProvider, useToast }
