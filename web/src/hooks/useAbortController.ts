import { useEffect, useRef, useCallback } from 'react'

const useAbortController = (promise, timeoutMs) => {
  const timeoutRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    const timeoutPromise = new Promise((_, reject) => {
      timeoutRef.current = setTimeout(() => {
        reject(new Error('Timeout exceeded'))
      }, timeoutMs)
    })

    Promise.race([promise, timeoutPromise])
      .then((result) => {
        clearTimer()
        return result
      })
      .catch((error) => {
        clearTimer()
        if (error.name !== 'AbortError') {
          alert('error of promise')
          throw error
        }
      })

    return () => {
      abortController.abort()
      clearTimer()
      alert('cleanup')
    }
  }, [promise, clearTimer, timeoutMs])

  return { promise }
}

export default useAbortController
