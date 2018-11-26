import gql from 'graphql-tag'

export const GetEvent = gql`
  query GetEvent($eventId: ID!) {
    event(id: $eventId) {
      date
      time
      experience {
        id
        title
      }
      location {
        name
        address1
        address2
        phone
        mapUrl
      }
      host {
        id
        firstName
        lastName
        email
      }
      members {
        id
        firstName
        lastName
        email
      }
      status
    }
  }
`
