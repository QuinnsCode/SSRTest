import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
// import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'

import {ToastProvider} from 'src/contexts/ToastProvider'
import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
