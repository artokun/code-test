import React, { Component } from 'react'
import { Form, Scope, Button, Input, Group } from './ui'
import styled from 'styled-components'
import { Label } from '../text/Label'
import { Mail, VrGuy, Add, Remove, CircleCheck, Arrow } from '../icons'
import Transition from 'react-transition-group/Transition'
import { IFormApi } from '../../routes/ReservedEventRoute'

interface IPlayerFormProps {
  maxGuests: any
  event: any
  getApi: (formApi: IFormApi) => any
  setFormApi: (setFormApi: IFormApi) => any
  onSkip: any
  onSubmit: any
  initialValues: any
}

interface IPlayerFormState {
  attempted: { [key: string]: boolean }
}

class PlayerForm extends Component<IPlayerFormProps, IPlayerFormState> {
  public formApi!: IFormApi

  public state: IPlayerFormState = {
    attempted: { 'email-0': false }
  }

  public componentDidMount() {
    const { maxGuests, event } = this.props
    if (event.members.length + 1 < maxGuests) {
      this.handleAddPlayer(0)
    }
  }

  public render() {
    const { maxGuests, onSubmit, initialValues, event } = this.props
    const host = {
      email: event.host.email,
      firstName: event.host.firstName,
      lastName: event.host.lastName
    }
    const members = event.members.map(
      ({ id, email, firstName, lastName }: any) => ({
        id,
        email,
        firstName,
        lastName
      })
    )
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    return (
      <Form
        getApi={this.setFormApi}
        initialValues={initialValues}
        onSubmit={(values: any) => this.handleSubmit(values, onSubmit)}
      >
        {({ formState }: any) => {
          const { players = [] } = formState.values
          const invited = players.filter((p: any) => emailRegExp.test(p.email))
            .length
          const newIsValid =
            !!invited && emailRegExp.test(players[players.length - 1].email)
          return (
            <React.Fragment>
              <PlayerBlock>
                <HostBlock full={invited + members.length + 1 >= maxGuests}>
                  <span className="invited">
                    {invited + members.length + 1 >= maxGuests && (
                      <CircleCheck />
                    )}
                    <span className="invited-guests">
                      {invited + members.length + 1}/{maxGuests} GUESTS
                    </span>
                  </span>
                  {this.renderHost(host)}
                  {this.renderMembers(members)}
                </HostBlock>
                {this.renderPlayers(players, members)}
                <Transition
                  timeout={100}
                  in={
                    !players.length ||
                    (!formState.invalid &&
                      newIsValid &&
                      invited + members.length + 1 < maxGuests)
                  }
                >
                  {status => (
                    <AddButton
                      className={`add-${status}`}
                      onClick={() => this.handleAddPlayer(members.length - 1)}
                    >
                      <Add />
                      <span>Add Another Player</span>
                    </AddButton>
                  )}
                </Transition>
              </PlayerBlock>
              <StickyFooter>
                <Button
                  onClick={this.handleSkip}
                  icon={Arrow}
                  iconRight={true}
                  secondary={true}
                >
                  Skip this, I'm all set!
                </Button>
                <Button
                  type="submit"
                  disabled={
                    invited + members.length >= maxGuests ||
                    formState.invalid ||
                    !invited
                  }
                >
                  {`Invite${invited ? ` ${invited}` : ''} Friend${
                    invited === 1 ? '' : 's'
                  }`}
                </Button>
              </StickyFooter>
            </React.Fragment>
          )
        }}
      </Form>
    )
  }
  private setFormApi = (formApi: any) => {
    this.formApi = formApi
    this.props.setFormApi(formApi)
  }

  private validateEmail = (value = '', { players }: any) => {
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const { host = {}, members = [] } = this.props.event

    switch (true) {
      case !value:
        return 'Email Required'
      case !emailRegExp.test(value):
        return 'Email Invalid'
      case players.filter(
        (p: any) => String(p.email).toLowerCase() === value.toLowerCase()
      ).length > 1:
        return 'Duplicate Email'
      case members.filter(
        (m: any) => String(m.email).toLowerCase() === value.toLowerCase()
      ).length > 0:
        return 'Already Invited'
      case host.email.toLowerCase() === value.toLowerCase():
        return 'Host Already Invited'
      default:
        return null
    }
  }

  private handleSkip = (event: any) => {
    event.preventDefault()
    this.props.onSkip()
  }

  private handleSubmit(values: any, cb: any) {
    this.formApi.setValues({ players: [] })
    cb(values)
  }

  private handleDeletePlayer = (index: any) => {
    const players = [...this.formApi.getState().values.players] || []
    if (players[index]) {
      players.splice(index, 1)
    }
    this.formApi.setValues({ players })
    this.setState({ attempted: { [`email-${index}`]: false } })
  }

  private handleAddPlayer = (index: number) => {
    const players = this.formApi.getState().values.players || []
    this.formApi.setValues({ players: [...players, {}] })
    this.setState({ attempted: { [`email-${index}`]: false } })
  }

  private renderHost = (host: any) => {
    return (
      <Booked>
        <VrGuy />
        {host.firstName} {host.lastName}
        <Label>Host</Label>
      </Booked>
    )
  }
  private renderMembers = (members = []) => {
    return members.map((member: any) => (
      <Booked key={member.id}>
        <VrGuy />
        {member.firstName} {member.lastName}
      </Booked>
    ))
  }

  private handleBlur = (e: any, index: number) =>
    e.target.value &&
    this.setState({
      attempted: { [`email-${index}`]: true }
    })

  private renderPlayers = (players: any, members: any) => {
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const invited = players.filter((p: any) => emailRegExp.test(p.email)).length

    return players
      .sort((a: any, b: any) => a.host < b.host)
      .map((player: any, index: any) => (
        <Scope scope={`players[${index}]`} key={index}>
          <Transition timeout={0} appear={true} in={true}>
            {status => (
              <Invited className={`group-${status}`}>
                <Group snapDown={true}>
                  <Input
                    type="text"
                    field="email"
                    autoFocus={true}
                    autoComplete="new-username"
                    placeholder={`player${index +
                      members.length +
                      2}@example.com`}
                    icon={Mail}
                    iconSize={20}
                    iconColors={
                      emailRegExp.test(player.email)
                        ? ['#41A5F0', '#D7F4FE']
                        : []
                    }
                    validateOnChange={true}
                    validateOnBlur={true}
                    validate={this.validateEmail}
                    message="EMAIL REQUIRED"
                    attempted={this.state.attempted[`email-${index}`]}
                    onBlur={(e: any) => this.handleBlur(e, index)}
                  />
                </Group>
                <Group>
                  <Input
                    type="text"
                    field="firstName"
                    autoComplete="new-username"
                    placeholder="First Name"
                    icon={VrGuy}
                    iconColors={player.lastName ? ['#41A5F0', '#D7F4FE'] : null}
                  />
                  <Input type="text" field="lastName" placeholder="Last Name" />
                </Group>
                <Transition
                  timeout={300}
                  in={invited + members.length + 1 > 1 && status === 'entered'}
                >
                  {state => (
                    <RemoveIcon
                      className={`remove-${state}`}
                      onClick={() => this.handleDeletePlayer(index)}
                    />
                  )}
                </Transition>
              </Invited>
            )}
          </Transition>
        </Scope>
      ))
  }
}

const RemoveIcon = styled(Remove)`
  height: 50px;
  width: 50px;
  padding: 13px;
  position: absolute;
  left: -55px;
  top: 32px;
  cursor: pointer;
  transition: all 0.5s ease-out;
  pointer-events: none;

  &.remove {
    &-exited {
      opacity: 0;
      transform: translate3d(20px, 0, 0);
    }
    &-entered {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      pointer-events: all;
    }
  }

  g {
    stroke: #d2d8dd;
    transition: stroke 0.2s ease-out;
  }
  circle {
    fill: #ffffff;
    transition: fill 0.2s ease-out;
  }

  &:hover {
    g {
      stroke: #ec6b8c;
    }
    circle {
      fill: #ffecf1;
    }
  }
  &:active {
    g {
      stroke: #ffecf1;
    }
    circle {
      fill: #ec6b8c;
    }
  }
`

const Invited = styled.div`
  position: relative;
  transition: all 0.3s ease-in-out;

  &.group {
    &-exited {
      opacity: 0;
      transform: translate3d(0, -5px, 0);
    }
    &-entered {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`

const Booked = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  font-family: 'Eina03';
  font-weight: 600;
  max-width: 600px;

  svg {
    height: 34px;
    width: 30px;
    margin-right: 13px;
  }
`

const PlayerBlock = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;
`

const HostBlock = styled.div<{ full: boolean }>`
  .invited {
    display: flex;
    font-family: 'Eina03';
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    flex: 1;
    justify-content: flex-end;
    position: relative;
    top: 25px;

    &-guests {
      position: relative;
      top: -1px;
      color: ${({ full }) => (full ? '#36A984' : 'inherit')};
    }

    svg {
      height: 18px;
      width: 18px;
      margin-right: 5px;
    }
  }
`

const StickyFooter = styled.footer`
  background-color: #313541;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50vw;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 1;

  button {
    margin: 0;

    svg {
      transform: translateX(0px);
      transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover {
      color: #41a5f0;

      svg {
        transform: translateX(20px);
      }
    }
  }
`

const AddButton = styled.span`
  display: flex;
  align-items: center;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;

  &.add {
    &-exited {
      opacity: 0;
    }
    &-entered {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
      pointer-events: all;
    }
  }

  svg {
    height: 23px;
    width: 23px;
    margin-right: 10px;
  }

  span {
    color: #2d89ce;
    font-size: 14px;
    font-family: 'Eina01';
    font-weight: 600;
    letter-spacing: 0;
    line-height: 26px;
  }

  &:focus,
  &:active {
    outline: none;
  }
`

export { PlayerForm }
