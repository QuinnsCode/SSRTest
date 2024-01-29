import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { useAuthId } from 'src/contexts/AuthIdProvider'

const LoginButton = () => {
  const { client: supabase, logOut, isAuthenticated } = useAuth()

  const { deleteID, hasID, token } = useAuthId()

  const logOutUser = async () => {
    logOut().then(await deleteID())
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
          onClick={async (e) => {
            e.preventDefault()
            await goToLoginPage()
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
