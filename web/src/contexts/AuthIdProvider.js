// toast-provider.js
import React, { createContext, useContext, useEffect, useState } from 'react'

import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const AuthIdContext = createContext()

const AuthIdProvider = ({ children }) => {
  const [id, setID] = useState()

  const updateID = (idInput) => {
    setID(idInput)
  }

  const deleteID = () => {
    setID()
  }

  const hasID = () => {
    return !!id
  }

  useEffect(() => {
    setTimeout(deleteID, 10)
  }, [])

  // Expose the updateID function in the context value
  const contextValue = { id, updateID, deleteID, hasID }

  return (
    <AuthIdContext.Provider value={contextValue}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 1500 }} />
      {/* {id ? <div className="toast hidden">{toast.success(id)}</div> : null} */}
      {children}
    </AuthIdContext.Provider>
  )
}

const useAuthId = () => {
  const context = useContext(AuthIdContext)
  if (!context) {
    throw new Error('useAuthId must be used within an AuthIdProvider')
  }
  return context
}

export { AuthIdProvider, useAuthId }
