import { useState, useEffect } from 'react'

import { useAuth } from 'src/auth'
import { useAuthId } from 'src/contexts/AuthIdProvider'

const Account = () => {
  const { client: supabase, currentUser, logOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const { deleteID } = useAuthId()

  useEffect(() => {
    getProfile()
  }, [supabase.auth.session])

  async function getProfile() {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log({ user })

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data?.username)
        setWebsite(data?.website)
        setAvatarUrl(data?.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      // console.log({ currentUser })
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }
      // Don't return the value after inserting
      const { error } = await supabase.from('profiles').upsert(updates, {})

      if (error) {
        throw error
      }

      alert('Updated profile!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget mx-1 rounded-xl border-2 border-slate-900 shadow-sm shadow-gray-400">
        <div className="header text-center">Supabase + RedwoodJS</div>
        <div className="form-widget mx-2">
          <div className="rw-button pointer-events-none my-0.5 inline-flex w-full bg-black text-white">
            <label className="inline-flex w-20" htmlFor="email">
              Email:
            </label>
            <hr />
            <input
              id="email"
              type="text"
              value={currentUser?.email as string}
              disabled
              className="mx-2 inline-flex px-2 hover:overflow-visible"
            />
          </div>
          <div className="rw-button my-0.5 text-black">
            <label htmlFor="username" className="w-20 hover:text-white ">
              Name
            </label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className="mx-2 px-2 text-slate-800 hover:text-black"
            />
          </div>
          <div className="rw-button my-0.5 text-black">
            <label htmlFor="website" className="w-20 hover:text-white ">
              Website
            </label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
              className="mx-2 px-2 text-slate-800 hover:text-black"
            />
          </div>

          <div className="flex w-full">
            <div className="rw-button m-1 w-36 rounded-lg ">
              <button
                className="button primary block"
                onClick={async () =>
                  await updateProfile({ username, website, avatar_url })
                }
                disabled={loading}
              >
                {loading ? 'Loading ...' : 'Update'}
              </button>
            </div>
            <div className=" m-1 flex w-full flex-row-reverse rounded-xl px-1 ">
              <button
                className="button rw-button flex-row-reverse rounded-lg bg-black text-white "
                onClick={async () => {
                  deleteID()
                  // navigate(routes.home())
                  logOut()
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
