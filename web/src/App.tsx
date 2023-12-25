import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
// import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
