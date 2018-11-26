import React, { useContext } from 'react'
import styled from 'styled-components'
import { Title } from '../components/text'
import { device } from '../styles/media'
import { LoginForm } from '../components/forms/LoginForm'
import AuthContext from '../context/AuthContext'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import LoadingContext from '../context/LoadingContext'

export interface IFormApi {
  getState: () => any
  setValues: (players: any) => any
}

interface ILoginFormProps {
  email: string
  password: string
}

const LoginRoute: React.SFC<RouteComponentProps> = ({ history }) => {
  const { signIn, loading, latestEvent } = useContext(AuthContext)
  const { load } = useContext(LoadingContext)

  if (!loading) {
    load()
  }

  if (latestEvent && latestEvent.id) {
    return <Redirect to={`/event/${latestEvent.id}`} />
  }

  const handleSubmit = (values: ILoginFormProps) => {
    const { email, password } = values
    signIn(email, password)
  }

  return (
    <LoginWrapper>
      <LoginCard>
        <Title hasLine={true} style={{ margin: '1.5rem 0' }}>
          Login
        </Title>
        <LoginForm
          onSubmit={(values: ILoginFormProps) => handleSubmit(values)}
        />
      </LoginCard>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 7rem 1.5rem;

  @media ${device.desktop} {
    background-color: #313542;
    align-items: center;
    justify-items: center;
    margin: 0;
  }
`

const LoginCard = styled.div`
  background-color: white;
  width: 360px;

  @media ${device.desktop} {
    width: 680px;
    border-radius: 8px 8px 8px 8px;
    height: 400px;
    padding: 24px 45px;
  }
`

export { LoginRoute }
