import * as Sentry from '@sentry/browser'
import React, { useEffect, useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { ActivateRoute } from './ActivateRoute'
import { LoginRoute } from './LoginRoute'
import { ReservedEventRoute } from './ReservedEventRoute'
import { CompletedEventRoute } from './CompletedEventRoute'
import { EventRouteManager } from './EventRouteManager'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import AuthContext from '../context/AuthContext'

const App: React.SFC = () => {
  const { signOut } = useContext(AuthContext)
  useEffect(() => {
    Sentry.init({
      dsn: 'https://ebf4b5eedef74c1cbc11249926df9405@sentry.io/1280812',
      environment:
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
    })
  })

  return (
    <Main>
      <Route path="/" component={Header} />
      <Route exact path="/" render={() => <Dashboard />} />
      <Route path="/activate/:nonce" component={ActivateRoute} />
      <Switch>
        <EventRouteManager
          exact
          path="/event/:id"
          reserved={ReservedEventRoute}
          completed={CompletedEventRoute}
          cancelled={undefined} // TODO: create cancelled route
        />
        <Redirect exact from="/event" to="/" />
      </Switch>
      <Route path="/login" component={LoginRoute} />
      <Route
        path="/logout"
        render={() => {
          signOut()
          return <Redirect to="/login" />
        }}
      />
      <Route path="/" component={Footer} />
    </Main>
  )
}

const Dashboard = styled.section`
  background-color: #1c212f;
  height: 100vh;
`

const Main = styled.main`
  font-family: 'Eina01';
  color: #313542;
  min-height: 100vh;
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  a {
    color: #2d89ce;
    font-family: 'Eina03';
    font-weight: 600;
    text-decoration: none;
  }
`

export default App
