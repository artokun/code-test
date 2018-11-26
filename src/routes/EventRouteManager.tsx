import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext'
import { Query } from 'react-apollo'
import { GetEvent } from '../queries/GetEvent'
import { completedEvent, reservedEvent } from '../config/fixtures'
import LoadingContext from '../context/LoadingContext'

interface IEventRouteProps {
  reserved: React.ComponentClass<any> | React.StatelessComponent<any>
  cancelled?: React.ComponentClass<any> | React.StatelessComponent<any>
  completed: React.ComponentClass<any> | React.StatelessComponent<any>
}

const EventRouteManager: React.SFC<RouteProps & IEventRouteProps> = ({
  reserved: Reserved,
  cancelled: Cancelled,
  completed: Completed,
  ...rest
}) => {
  const { load } = useContext(LoadingContext)

  return (
    <AuthConsumer>
      {auth => (
        <Route
          {...rest}
          render={props => (
            <Query
              query={GetEvent}
              variables={{ eventId: props.match.params.id }}
            >
              {({ loading, error, data }) => {
                if (error) {
                  console.error(`Error! ${error.message}`)
                }
                if (loading) {
                  return null
                } else if (!loading) {
                  load()
                }
                const eventId = props.match.params.id
                const isTest =
                  ['development', 'test'].indexOf(process.env.NODE_ENV) !== -1
                switch (true) {
                  case !eventId:
                    return <Redirect to="/" />
                  case eventId === 'completed' && isTest:
                    return <Completed event={completedEvent} auth={auth} />
                  case eventId === 'reserved' && isTest:
                    return <Reserved event={reservedEvent} auth={auth} />
                  case Boolean(loading):
                    return 'Loading...'
                  case !Boolean(data && data.event):
                    return `Event ID "${eventId}" does not exist.`
                  case data.event.status === 'completed':
                    return <Completed event={data.event} auth={auth} />
                  case data.event.status === 'reserved' ||
                    data.event.status === 'cancelled':
                    return (
                      <Reserved
                        event={data.event}
                        auth={auth}
                        eventId={eventId}
                      />
                    )
                  // case data.event.status === 'cancelled':
                  //   return <Redirect to="/" />
                  default: {
                    return isTest ? (
                      <pre
                        style={{
                          margin: 0,
                          padding: '80px 50px',
                          backgroundColor: 'black',
                          color: 'white'
                        }}
                      >
                        <h2>Error: Missing required properties</h2>
                        {JSON.stringify(data.event, null, 2)}
                      </pre>
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                }
              }}
            </Query>
          )}
        />
      )}
    </AuthConsumer>
  )
}

export { EventRouteManager }
