import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import Lobby from 'src/components/Lobby/Lobby'
// import { useAuthId } from 'src/contexts/AuthIdProvider'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  // console.log(supabase.session)
  // const { hasID } = useAuthId()
  //cats
  // https://http.cat/[status_code]
  // https://http.cat/[status_code].jpg

  const codes = [
    '100',
    '101',
    '102',
    '103',
    '200',
    '201',
    '202',
    '203',
    '204',
    '205',
    '206',
    '207',
    '208',
    '226',
    '300',
    '301',
    '302',
    '303',
    '304',
    '305',
    '307',
    '308',
    '400',
    '401',
    '402',
    '403',
    '404',
    '405',
    '406',
    '407',
    '408',
    '409',
    '410',
    '411',
    '412',
    '413',
    '414',
    '415',
    '416',
    '417',
    '418',
    '420',
    '421',
    '422',
    '423',
    '424',
    '425',
    '426',
    '428',
    '429',
    '431',
    '444',
    '450',
    '451',
    '497',
    '498',
    '499',
    '500',
    '501',
    '502',
    '503',
    '504',
    '506',
    '507',
    '508',
    '509',
    '510',
    '511',
    '521',
    '522',
    '523',
    '525',
    '530',
    '599',
  ]

  const random = Math.random() * codes.length
  const index = Math.floor(random)
  const imageUrl = ` https://http.cat/${codes[index]}.jpg`

  return (
    <>
      <Metadata title="Home" image={imageUrl} description="Home page" />

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
