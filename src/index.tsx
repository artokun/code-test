import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import cloudinary from 'cloudinary-core'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './routes/App'
import { RootContext } from './context/RootContext'
import { ErrorMessage } from './components/error-handling/ErrorMessage'
import { withErrorBoundary } from './components/error-handling/ErrorBoundry'
import { keys } from './config/keys'
import registerServiceWorker from './registerServiceWorker'
import 'cloudinary-video-player'
import 'cloudinary-video-player/dist/cld-video-player.min.css'
import './styles/index.css'
import './styles/typography.css'
// import './i18n'

// export cloudinary constructor
export const cld = cloudinary.Cloudinary.new({
  cloud_name: 'sandboxvr',
  secure: true
})

const ErrorBoundry = withErrorBoundary(ErrorMessage)

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL || keys.apiUrl}/graphql`
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ErrorBoundry>
    <ApolloProvider client={client}>
      <Router>
        <RootContext>
          <App />
        </RootContext>
      </Router>
    </ApolloProvider>
  </ErrorBoundry>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
