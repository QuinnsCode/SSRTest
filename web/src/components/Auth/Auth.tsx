import { useState } from 'react'

import { useAuth } from 'src/auth'

const Auth = () => {
  const { logIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    // alert('this')
    try {
      setLoading(true)
      const { error } = await logIn({ email, authMethod: 'otp' })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex items-center text-center">
      <div className="col-6 form-widget border-2 border-solid border-gray-500 ">
        {/* <h1 className="header">Supabase + RedwoodJS</h1> */}
        <p className="description px-2">
          Sign in via magic link with your email below
        </p>
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
  )
}

export default Auth
