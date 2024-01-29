import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
// import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import { AuthIdProvider } from 'src/contexts/AuthIdProvider'
import { ToastProvider } from 'src/contexts/ToastProvider'
import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'

import './scaffold.css'
import './index.css'

//auth provider is supabase client being made in this case

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider
          useAuth={useAuth}
          graphQLClientConfig={{
            httpLinkConfig: { credentials: 'include' },
          }}
        >
          <ToastProvider>
            <AuthIdProvider>
              <Routes />
            </AuthIdProvider>
          </ToastProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
