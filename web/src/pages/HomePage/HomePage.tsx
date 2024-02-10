import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'
import Lobby from 'src/components/Lobby/Lobby'
import { useAuthId } from 'src/contexts/AuthIdProvider'
// import { useAuthId } from 'src/contexts/AuthIdProvider'

const HomePage = () => {
  // const { isAuthenticated } = useAuth()

  const { id } = useAuthId()
  console.log({ id })
  const isAuthenticated = id

  // const isAuthenticated =

  // console.log(supabase.session)
  // const { hasID } = useAuthId()
  // cats
  // if you want to redirect to a page
  // https://http.cat/[status_code]
  // if you want to display error cats
  // https://http.cat/[status_code].jpg

  const catCodes = [
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
  const index = Math.floor(Math.random() * catCodes.length)
  const catImageUrl = ` https://http.cat/${catCodes[index]}.jpg`
  //render website
  const website = process.env.PROJECT_WEBSITE
  //this is your render deployment without the https:// or starter part
  const shortWebsite = process.env.SHORT_PROJECT_WEBSITE
  const ogImageUrl =
    'https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/https%3A%2F%2Fssrtest-web-server.onrender.com/Redwood%20%2B%20Supabase%20%2B%20SSR/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F2ee09c87-81b7-4f86-8d81-a34b9ac97b04.jpg%3Ftoken%3DwP8l_Zx2mKe-TmSXU9qZITXA4yKbZJhIrlmDsbb86iM%26height%3D225%26width%3D225%26expires%3D33242599958/og.png'
  const twitterImageUrl =
    'https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/https%3A%2F%2Fssrtest-web-server.onrender.com/Redwood%20%2B%20Supabase%20%2B%20SSR/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F2ee09c87-81b7-4f86-8d81-a34b9ac97b04.jpg%3Ftoken%3DwP8l_Zx2mKe-TmSXU9qZITXA4yKbZJhIrlmDsbb86iM%26height%3D225%26width%3D225%26expires%3D33242599958/og.png'

  const shortContent = 'Redwood + Supabase + SSR'
  const longContent = 'RedwoodJS + Supabase Auth + Server Side Rendering '

  return (
    <>
      <Metadata
        title="Redwood + Supabase + SSR - Home"
        image={catImageUrl}
        description="Home page"
      />

      <Metadata name="description" content={shortContent} />

      <Metadata property="og:url" content={website} />
      <Metadata property="og:type" content="website" />
      <Metadata property="og:title" content={shortContent} />
      <Metadata property="og:description" content={longContent} />
      <Metadata property="og:image" content={ogImageUrl} />

      <Metadata name="twitter:card" content="summary_large_image" />
      <Metadata property="twitter:domain" content={shortWebsite} />
      <Metadata property="twitter:url" content={website} />
      <Metadata name="twitter:title" content={shortContent} />
      <Metadata name="twitter:description" content={longContent} />
      <Metadata name="twitter:image" content={twitterImageUrl} />

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
