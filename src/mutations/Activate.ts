import gql from 'graphql-tag'

export const Activate = gql`
  mutation activate($token: String!, $password: String!) {
    activate(token: $token, password: $password) {
      email
    }
  }
`
