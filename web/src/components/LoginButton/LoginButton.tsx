import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

const LoginButton = () => {
  const { client: supabase, logOut, isAuthenticated } = useAuth()

  const logOutUser = async () => {
    await logOut()
  }

  const goToLoginPage = async () => {
    navigate(routes.login())
  }

  return (
    <>
      {isAuthenticated ? (
        <button
          onClick={() => {
            logOutUser()
          }}
          className="rw-button rounded-2xl border-2 border-white bg-black px-2 py-1 text-white hover:bg-gray-800 hover:text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            goToLoginPage()
          }}
          className="rw-button rounded-2xl border-2 border-white bg-black px-2 py-1 text-white hover:bg-gray-800 hover:text-white"
        >
          Login
        </button>
      )}
    </>
  )
}

export default LoginButton
