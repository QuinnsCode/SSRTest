import { Metadata } from '@redwoodjs/web'

import Lobby from 'src/components/Lobby/Lobby'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div>
        <Lobby />
      </div>
    </>
  )
}

export default HomePage
