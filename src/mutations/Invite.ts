import gql from 'graphql-tag'

export const Invite = gql`
  mutation invite($players: [PlayerInput!], $eventId: String!) {
    invite(players: $players, eventId: $eventId) {
      id
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
      }
    }
  }
`
