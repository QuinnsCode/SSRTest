import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import Lobby from 'src/components/Lobby/Lobby'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div>
        {/* Home
        <hr /> */}
        <Lobby />
        <>{!isAuthenticated ? <Auth /> : <Account />}</>
      </div>
    </>
  )
}

export default HomePage
