import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { TwoHalvesLayout } from '../layouts/TwoHalvesLayout'
import { BookingInfo } from '../components/half-pages/BookingInfo'
import { InvitePlayers } from '../components/half-pages/InvitePlayers'
import { Invite } from '../mutations/Invite'

export interface IFormApi {
  getState: () => any
  setValues: (players: any) => any
}

interface IReservedEventProps {
  event: any
  auth: any
  eventId: string
}

class ReservedEventRoute extends Component<IReservedEventProps> {
  state = {
    collapse: false,
    maxGuests: 6
  }
  formApi!: IFormApi

  mutationCallback = async (store: any, payload: any) => {
    // console.log(payload)
    // const { values } = this.formApi.getState()
    // this.setState({
    //   payload
    // })
  }

  handleSkip = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  handlePreSubmit = (values: any, cb: any) => {
    console.log(values)

    cb({ variables: { players: values.players, eventId: this.props.eventId } })
    this.setState({ collapse: true })
    console.log('triggered')
  }

  render() {
    let event = { ...this.props.event }
    const { collapse } = this.state
    const leftProps = {
      collapse,
      toggleCollapse: this.handleSkip
    }
    const rightProps = {
      maxGuests: this.state.maxGuests,
      setFormApi: this.setFormApi,
      onSkip: this.handleSkip,
      initialValues: { players: [] }
    }

    return (
      <Mutation
        mutation={Invite}
        update={(store, call) => this.mutationCallback(store, call.data)}
      >
        {(invite, call) => {
          event =
            call && call.data && call.data.invite ? call.data.invite : event

          return (
            <TwoHalvesLayout
              event={event}
              collapse={collapse}
              loading={false}
              left={<BookingInfo event={event} {...leftProps} />}
              right={
                <InvitePlayers
                  event={event}
                  onSubmit={(values: any) =>
                    this.handlePreSubmit(values, invite)
                  }
                  {...rightProps}
                />
              }
            />
          )
        }}
      </Mutation>
    )
  }

  private setFormApi = (formApi: IFormApi) => {
    this.formApi = formApi
  }
}

export { ReservedEventRoute }
