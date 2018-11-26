import React, { useState, useContext } from 'react'
import { Mutation, Query } from 'react-apollo'
import { BookingInfo } from '../components/half-pages/BookingInfo'
import { CreateAccount } from '../components/half-pages/CreateAccount'
import { TwoHalvesLayout } from '../layouts/TwoHalvesLayout'
import AuthContext from '../context/AuthContext'
import { Activate } from '../mutations/Activate'
import { VerifyEvent } from '../queries/VerifyEvent'
import { RouteComponentProps } from 'react-router'
import LoadingContext from '../context/LoadingContext'
import { Redirect } from 'react-router-dom'

interface IProps {
  match: {
    params: {
      nonce: string
    }
  }
}

export interface IFormApi {
  getState: () => any
}

export interface IEvent {
  date: string
  time: string
  experience: {
    id: string
    title: string
  }
  location: {
    name: string
    address1: string
    address2: string
    mapUrl: string
  }
  host: any // TODO
  members: any
}

export interface IVerifyGuest {
  email: string
  firstName: string
  lastName: string
  events: IEvent[]
}

const ActivateRoute: React.SFC<RouteComponentProps & IProps> = ({ match }) => {
  const { load } = useContext(LoadingContext)
  const { signIn } = useContext(AuthContext)
  const [state, setState] = useState({
    formApi: { getState: () => {} }
  })

  const setFormApi = (formApi: IFormApi) => {
    setState({ formApi })
  }

  const handleSubmit = async (store: any, payload: any, signIn: any) => {
    const { email } = payload.data.activate
    const formApi: IFormApi = state.formApi

    const { values } = formApi.getState()

    signIn(email, values.password)
  }

  return (
    <Query query={VerifyEvent} variables={{ token: match.params.nonce }}>
      {({ loading, error, data }) => {
        if (error) {
          return `Error! ${error.message}`
        } else if (loading) {
          return null
        } else if (!loading) {
          load()
        }

        if (!data.verify) {
          console.log(data)
          return <Redirect to="/" />
        }
        const guest: IVerifyGuest = data.verify
        const event: IEvent = {
          ...guest.events[0],
          host: {
            email: guest.email,
            firstName: guest.firstName,
            lastName: guest.lastName
          }
        }

        return (
          <Mutation
            mutation={Activate}
            update={(store, payload) => handleSubmit(store, payload, signIn)}
          >
            {activate => {
              const rightProps = {
                handleSubmit: activate,
                setFormApi,
                token: match.params.nonce,
                event
              }
              return (
                <TwoHalvesLayout
                  collapse={false}
                  event={event}
                  left={<BookingInfo event={event} />}
                  loading={false}
                  right={<CreateAccount {...rightProps} />}
                />
              )
            }}
          </Mutation>
        )
      }}
    </Query>
  )
}

export { ActivateRoute }
