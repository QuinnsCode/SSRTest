import { useEffect, useState } from 'react'

import { useAuth } from 'src/auth'
import useAbortController from 'src/hooks/useAbortController'

const Auth = () => {
  const { logIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { createAbortablePromise } = useAbortController()

  // const handleLogin = async (email) => {
  //   // alert('this')
  //   try {
  //     setLoading(true)
  //     const { error } = await logIn({ email, authMethod: 'otp' })
  //     if (error) throw error
  //     alert('Check your email for the login link!')
  //   } catch (error) {
  //     alert(error.error_description || error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const abortablePromise = createAbortablePromise(
        logIn({ email, authMethod: 'otp' }),
        3000
      )

      await abortablePromise
      console.log({ abortablePromise })
      if (abortablePromise) {
        alert('Check your email for the login link!')
      } else {
        alert('oh no!')
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const mockAsyncRequest = (delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Mock data')
      }, delay)
    })
  }

  const handleTestAbortController = async () => {
    try {
      const abortablePromise = createAbortablePromise(
        mockAsyncRequest(2000),
        1000
      )
      const result = await abortablePromise
      console.log('Data received:', result)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    if (isLoading) {
      handleTestAbortController().then(() => setIsLoading(false))
    }
  }, [isLoading])

  return (
    <div className="row flex-center flex w-full items-center text-center">
      <div className="col-6 form-widget w-full border-2 border-solid border-gray-500">
        {/* <h1 className="header">Supabase + RedwoodJS</h1> */}

        <div className="w-full">Test</div>
        <div className="w-full items-center text-center">
          <button
            className="rw-button inline-flex rounded-lg border-2 border-white bg-black text-white hover:bg-gray-600 hover:text-white"
            onClick={() => setIsLoading(true)}
          >
            {isLoading ? 'Loading...' : 'Start Async Test'}
          </button>
        </div>

        <div className="hidden">
          <div className="description px-2">
            Sign in via magic link with your email below
          </div>
          <div className="px-2">
            <input
              className="inputField border-2 border-solid border-gray-500 text-center tracking-wider"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full items-center px-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLogin(email)
              }}
              className="rw-button inline-flex rounded-lg border-2 border-solid border-white bg-black text-center text-white hover:bg-gradient-to-br hover:from-slate-600 hover:via-gray-800 hover:to-gray-500 hover:text-white"
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
