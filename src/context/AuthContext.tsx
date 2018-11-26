import React, { useState } from 'react'
import Auth0 from 'auth0-js'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GetCurrentGuest } from '../queries/GetCurrentGuest'
import { keys } from '../config/keys'
import { ApolloError } from 'apollo-client'

export interface IAuthUser {
  name: string
}

export interface IAuthContext {
  signIn: (username: string, password: string, redirect?: string) => any
  signOut: () => any
  isAuthed: () => any
  loading?: boolean
  error?: ApolloError
  guest?: { currentGuest: any }
  latestEvent?: { id: string; checkfrontBookingId: string }
}

const defaultContext: IAuthContext = {
  signIn: () => {},
  signOut: () => {},
  isAuthed: () => {},
  loading: false,
  error: undefined,
  guest: undefined,
  latestEvent: undefined
}

const AuthContext = React.createContext(defaultContext)

const AuthComponent: React.SFC<RouteComponentProps> = ({
  children,
  history
}) => {
  const auth0 = new Auth0.WebAuth(keys.webAuth)

  const [state, setState] = useState({
    ...defaultContext,
    isAuthed: () => {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at')!)
      if (expiresAt) {
        return new Date().getTime() < expiresAt
      }
      cleanUp()
      return false
    },
    signIn: (username: string, password: string) => {
      auth0.client.login(
        {
          audience: keys.webAuth.audience,
          password,
          realm: 'Username-Password-Authentication',
          username
        },
        (err: any, authResult: auth0.Auth0DecodedHash) => {
          if (err) {
            console.error(err)
            // TODO: Add sentry here
            return null
          }
          setSession(authResult)
          setState(state)
          history.goBack()
        }
      )
    },
    signOut: () => {
      cleanUp()
      setState(state)
      return null
    }
  })

  const setSession = (authResult: any) => {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  const cleanUp = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  return (
    <Query query={GetCurrentGuest}>
      {({ loading, error, data: guest }) => {
        let latestEvent = null
        if (
          guest &&
          guest.currentGuest &&
          guest.currentGuest.events &&
          guest.currentGuest.events.length
        ) {
          latestEvent =
            guest.currentGuest.events[guest.currentGuest.events.length - 1]
        }
        const auth = { ...state, guest, loading, error, latestEvent }
        return (
          <AuthContext.Provider value={state.isAuthed() ? auth : state}>
            {children}
          </AuthContext.Provider>
        )
      }}
    </Query>
  )
}

const AuthConsumer = AuthContext.Consumer
const AuthProvider = withRouter(AuthComponent)
export { AuthProvider, AuthConsumer }
export default AuthContext
