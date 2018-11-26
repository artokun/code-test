import * as React from 'react'
import { IFormApi, IEvent } from '../../routes/ActivateRoute'
import styled from 'styled-components'
import { CreateAccountForm } from '../forms/CreateAccountForm'
import { Paragraph, Title } from '../text'

interface IProps {
  handleSubmit: (activate: any) => any
  setFormApi: (formApi: IFormApi) => any
  token: string
  event: IEvent
}

const CreateAccount: React.SFC<IProps> = ({
  handleSubmit,
  setFormApi,
  token,
  event
}) => {
  const onSubmit = (e: any) => {
    handleSubmit({ variables: { token, password: e.password } })
  }

  const {
    host: { email, firstName, lastName }
  } = event
  const user = {
    email,
    firstName,
    lastName
  }
  return (
    <CreatePlayerStyles>
      <PanelStyle>
        <Title hasLine={true}>Create Your Account</Title>
        <Paragraph>
          Create your Sandbox VR account. This will allow you to keep track of
          scores, compete with friends and collect virtual trophies as you
          progress thru the experience.
        </Paragraph>
        <CreateAccountForm
          getApi={setFormApi}
          onSubmit={onSubmit}
          user={user}
        />
      </PanelStyle>
    </CreatePlayerStyles>
  )
}

const CreatePlayerStyles = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
  padding-bottom: 100px;
  background-color: white;
`

const PanelStyle = styled.div`
  /* height: 100%; */
  padding: 120px 50px 50px 80px;
`

export { CreateAccount }
