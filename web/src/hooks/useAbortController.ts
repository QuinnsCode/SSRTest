import { useRef, useCallback } from 'react'

import { useToast } from 'src/contexts/ToastProvider'
class TimeoutError extends Error {
  constructor(message = 'Timeout exceeded') {
    super(message)
    this.name = 'TimeoutError'
  }
}

const useAbortController = () => {
  const timeoutRef = useRef(null)

  const { showToast } = useToast()

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const createAbortablePromise = (promise, timeoutMs) => {
    return new Promise((resolve, reject) => {
      const abortController = new AbortController()

      const timeoutPromise = new Promise((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          showToast('Task timed out! Please try again', 'error')
          reject(new TimeoutError())
        }, timeoutMs)
      })

      Promise.race([promise, timeoutPromise])
        .then((result) => {
          clearTimer()
          resolve(result)
        })
        .catch((error) => {
          clearTimer()
          if (error instanceof TimeoutError) {
            showToast('Task timed out! Please try again', 'error')
            reject(error)
          }
        })

      return () => {
        abortController.abort()
        clearTimer()
      }
    })
  }

  return { createAbortablePromise }
}

export default useAbortController
