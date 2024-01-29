// toast-provider.js
import React, { createContext, useEffect, useContext, useState } from 'react'

import { toast, Toaster } from '@redwoodjs/web/dist/toast'
const ToastContext = createContext()

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    setToastMessage(message)
  }

  const hideToast = () => {
    setToastMessage('')
  }

  useEffect(() => {
    // Set the initial message after the initial render on the client side
    setToastMessage('')
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 1500 }} />
      {toastMessage ? (
        <div className="toast hidden">{toast.success(toastMessage)}</div>
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
