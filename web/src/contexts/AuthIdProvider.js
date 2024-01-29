// toast-provider.js
import React, { createContext, useContext, useEffect, useState } from 'react'

import { toast, Toaster } from '@redwoodjs/web/dist/toast'
const AuthIdContext = createContext()

const AuthIdProvider = ({ children }) => {
  const [id, setID] = useState('')

  const updateID = (idInput) => {
    setID(idInput)
  }

  const deleteID = () => {
    setID('')
  }

  const hasID = () => {
    return !!id
  }

  const token = (id) => {
    return id
  }

  useEffect(() => {
    setTimeout(deleteID, 10)
  })

  return (
    <AuthIdContext.Provider value={{ updateID, deleteID, hasID }}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 1500 }} />
      {id ? <div className="toast hidden">{toast.success(id)}</div> : null}
      {children}
    </AuthIdContext.Provider>
  )
}

const useAuthId = () => {
  const context = useContext(AuthIdContext)
  if (!context) {
    throw new Error('useAuthId must be used within a Auth2ContextProvider')
  }
  return context
}

export { AuthIdProvider, useAuthId }
