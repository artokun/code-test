import React from 'react'
import styled from 'styled-components'
import { Title } from '../text/Title'
import { Paragraph } from '../text/Paragraph'
import { PlayerForm } from '../forms/PlayerForm'

const InvitePlayers = (props: any) => {
  return (
    <InvitePlayersStyles>
      <PanelStyle>
        <Title hasLine={true}>Invite Guests</Title>
        <Paragraph style={{ width: 550, padding: 0 }}>
          We will send scores and team videos from inside Virtual Reality to all
          invited guests. Invite your guests so they get access.
        </Paragraph>
        <PlayerForm {...props} />
      </PanelStyle>
    </InvitePlayersStyles>
  )
}

const InvitePlayersStyles = styled.section`
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

export { InvitePlayers }
