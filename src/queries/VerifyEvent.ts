import gql from 'graphql-tag'

export const VerifyEvent = gql`
  query verify($token: String!) {
    verify(token: $token) {
      email
      firstName
      lastName
      events {
        date
        time
        location {
          name
          address1
          address2
          mapUrl
        }
        experience {
          id
          title
        }
      }
    }
  }
`
