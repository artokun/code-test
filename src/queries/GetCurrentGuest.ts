import gql from 'graphql-tag'

export const GetCurrentGuest = gql`
  query CurrentGuest {
    currentGuest {
      email
      firstName
      lastName
      events {
        id
        experience {
          title
        }
        date
        time
      }
    }
  }
`
