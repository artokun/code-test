import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext'

const PrivateRoute: React.SFC<RouteProps> = ({
  component: Private,
  ...rest
}) => {
  const Component: any = Private
  return (
    <AuthConsumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            return auth.isAuthed() ? (
              <Component {...auth} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }}
        />
      )}
    </AuthConsumer>
  )
}

export { PrivateRoute }
