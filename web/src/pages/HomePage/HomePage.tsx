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

      <div className='w-full'>
        <div className='w-full rw-button text-white bg-black tracking-widest font-2xl px-12 hover:bg-black hover:text-white text-center'>
          Home
          <hr />
        </div>

        <div className='w-full border-2 border-green-900 m-1 flex items-center text-center justify-center'><Lobby /></div>
        <div className='w-full border-2 m-1 border-red-800 flex items-center justify-center'>
          <div className='w-full items-center justify-center flex m-1'>{!isAuthenticated ? <Auth /> : <Account />}</div>
        </div>
      </div>
    </>
  )
}

export default HomePage
