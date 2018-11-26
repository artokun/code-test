import * as React from 'react'
import { Link } from 'react-router-dom'
import { IFormApi } from '../../routes/ActivateRoute'
import { Lock, VrGuy } from '../icons'
import { Button, Footnote, Form, Group, Input } from './ui/'

interface ICAFProps {
  user: any
  onSubmit: any
  getApi: (formApi: IFormApi) => any
}

export interface IFormState {
  invalid: boolean
  values: {
    password?: string
  }
}

export interface IFormHOC {
  formState: IFormState
}

const CreateAccountForm: React.SFC<ICAFProps> = ({ user, ...props }) => {
  function required(value = '') {
    return !value ? 'required' : null
  }
  function validatePassword(value = '') {
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

  return (
    <Form {...props} initialValues={user}>
      {(formApi: IFormHOC) => {
        const {
          formState: {
            invalid,
            values: { password }
          }
        } = formApi
        return (
          <React.Fragment>
            <Group>
              <Input
                type="text"
                field="firstName"
                icon={VrGuy}
                iconColors={['#41A5F0', '#DCE8F1', '#D7F4FE']}
                placeholder="First Name"
                message="required"
                validateOnChange={true}
                validateOnBlur={true}
                validate={required}
              />
              <Input
                type="text"
                field="lastName"
                placeholder="Last Name"
                message="required"
                validateOnChange={true}
                validateOnBlur={true}
                validate={required}
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
                validate={validatePassword}
              />
            </Group>
            {/* <Group>
              <Checkbox field="newsletter">
                Keep me informed of news and new Sandbox VR experiences.
              </Checkbox>
            </Group> */}
            <Group>
              <Button type="submit" disabled={!password || invalid}>
                Create Account
              </Button>
            </Group>
            <Footnote>
              By clicking “Create Account” you agree to the{' '}
              <Link to="/terms-and-conditions">Terms and Services</Link> of
              Sandbox VR
            </Footnote>
          </React.Fragment>
        )
      }}
    </Form>
  )
}

export { CreateAccountForm }
