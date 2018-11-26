import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PublicRoute: React.SFC<RouteProps> = ({ component: Public, ...rest }) => {
  const Component: any = Public
  const auth = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => {
        return !auth.isAuthed() ? (
          <Component {...auth} {...props} />
        ) : auth.latestEvent ? (
          <Redirect to={`/event/${auth.latestEvent.id}`} />
        ) : (
          <Redirect to="/" />
        )
      }}
    />
  )
}

export { PublicRoute }
