import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import Lobby from 'src/components/Lobby/Lobby'
import { useAuthId } from 'src/contexts/AuthIdProvider'

const HomePage = () => {
  const { isAuthenticated, getCurrentUser } = useAuth()
  const { hasID } = useAuthId()
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div className="w-full">
        <div className="rw-button font-2xl w-full bg-black px-12 text-center tracking-widest text-white hover:bg-black hover:text-white">
          Home
          <hr />
        </div>

        <div className="m-1 flex w-full items-center justify-center border-2 border-green-900 text-center">
          <Lobby />
        </div>
        <div className="m-1 flex w-full items-center justify-center border-2 border-red-800">
          <div className="m-1 flex w-full items-center justify-center">
            {!isAuthenticated ? <Auth /> : <Account />}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
