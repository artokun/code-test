import React, { Component } from 'react'
import { Group, Input, Form, Footnote, Button } from '../../components/forms/ui'
import { Link } from 'react-router-dom'
import { Mail, Lock } from '../icons'
import { IFormApi } from '../../routes/ActivateRoute'
import styled from 'styled-components'
import { device } from '../../styles/media'

interface ILoginFormProps {
  onSubmit: any
}

interface ILoginFormState {
  attempted: boolean
}

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  public formApi!: IFormApi

  state: ILoginFormState = {
    attempted: false
  }

  validateEmail = (value = '') => {
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    switch (true) {
      case !value:
        return 'Email Required'
      case !emailRegExp.test(value):
        return 'Email Invalid'
      default:
        return null
    }
  }

  validatePassword = (value = '') => {
    const errors = []
    let lengthValid = false
    let counter = 0

    if (value.length < 8) {
      errors.push('must be greater than 8 chars')
      lengthValid = false
    } else {
      lengthValid = true
    }
    if (!/[!@#$%^&*]{1}/g.test(value)) {
      errors.push('must contain at least 1 special (!@#$%^&*)')
    } else {
      counter++
    }
    if (!/[0-9]/g.test(value)) {
      errors.push('must contain at least 1 number')
    } else {
      counter++
    }
    if (!/[A-Z]/g.test(value)) {
      errors.push('must contain at least 1 uppercase')
    } else {
      counter++
    }
    if (!/[a-z]/g.test(value)) {
      errors.push('must contain at least 1 lowercase')
    } else {
      counter++
    }

    const valid = lengthValid && counter >= 3
    return !valid ? errors.join('\n') : null
  }

  handleAttempted = () => {
    this.setState({ attempted: true })
  }

  render() {
    const { onSubmit } = this.props
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    return (
      <Form onSubmit={onSubmit}>
        {({ formState }: any) => {
          return (
            <React.Fragment>
              <Group snapDown={true}>
                <Input
                  type="text"
                  field="email"
                  autoFocus={true}
                  autoComplete="email"
                  placeholder="Email Address..."
                  icon={Mail}
                  iconSize={20}
                  iconColors={
                    emailRegExp.test(formState.values.email)
                      ? ['#41A5F0', '#D7F4FE']
                      : []
                  }
                  validateOnChange={true}
                  validateOnBlur={true}
                  validate={this.validateEmail}
                  message="EMAIL REQUIRED"
                  attempted={this.state.attempted}
                  onBlur={this.handleAttempted}
                />
              </Group>
              <Group>
                <Input
                  type="password"
                  field="password"
                  icon={Lock}
                  iconSize={20}
                  iconColors={['#41A5F0', '#D7F4FE']}
                  placeholder="Create your password"
                  validateOnChange={true}
                  validateOnBlur={true}
                  message="required"
                  validate={this.validatePassword}
                />
              </Group>
              <Group>
                <FooterWrapper>
                  <div>
                    <LoginFormButton
                      disabled={!formState.values.password || formState.invalid}
                    >
                      Login
                    </LoginFormButton>
                  </div>
                  <div>
                    <Footnote>
                      Can’t remember your password?
                      <Link to="/reset-password">Reset it Here</Link>
                    </Footnote>
                  </div>
                </FooterWrapper>
              </Group>
            </React.Fragment>
          )
        }}
      </Form>
    )
  }
}

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  align-items: center;
  div:nth-of-type(2) {
    margin: 1rem 0;
  }

  @media ${device.desktop} {
    font-size: 46px;
    grid-template-columns: auto auto;
    div:nth-of-type(1) {
      order: 2;
    }
    div:nth-of-type(2) {
      order: 1;
    }
  }
`
const LoginFormButton = styled(Button)`
  margin: 0;
  width: 100%;
  @media ${device.desktop} {
    margin: 20px 0 0 0;
  }
`

export { LoginForm }
