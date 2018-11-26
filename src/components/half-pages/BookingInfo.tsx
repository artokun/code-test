import * as React from 'react'
import Imgix from 'react-imgix'
import Transition from 'react-transition-group/Transition'
import { IEvent } from '../../routes/ActivateRoute'
import styled from 'styled-components'
import { keys } from '../../config/keys'
import { Button } from '../forms/ui'
import { VrGuy } from '../icons'
import { Label, SubTitle, Title } from '../text'

const domain = keys.imigxDomain

interface IProps {
  loading?: boolean
  collapse?: boolean
  event: IEvent
  toggleCollapse?: () => any
}

class BookingInfo extends React.Component<IProps> {
  public static defaultProps = {
    collapse: false,
    loading: false,
    toggleCollapse: () => {
      throw new Error('BookingInfo.toggleCollapse() not assigned')
    }
  }

  public render() {
    const { event, loading, collapse } = this.props

    const posterProps = {
      attributeConfig: {
        sizes: 'data-sizes',
        src: 'data-src',
        srcSet: 'data-srcset'
      },
      className: 'poster lazyload',
      imgixParams: {
        auto: 'format',
        dpr: 2,
        fit: 'crop'
      },
      width: 365
    }

    return (
      <BookingInfoWrapper>
        {loading || !event ? (
          <Activity />
        ) : (
          <Transition timeout={400} in={collapse}>
            {status => (
              <React.Fragment>
                <PosterWrapper className={status}>
                  <Poster className="poster-wrapper">
                    <Imgix
                      src={`${domain}/posters/${event.experience.id}.png`}
                      {...posterProps}
                    />
                    <div className="overlay-triangle" />
                  </Poster>
                  <InfoGroup>
                    {document.referrer.includes('checkfront.com') && (
                      <Message>Thank you, your event is booked!</Message>
                    )}
                    <Title
                      style={{
                        color: 'white',
                        fontSize: 66,
                        padding: 0,
                        textAlign: 'center',
                        zIndex: 1
                      }}
                    >
                      {event.experience.title}
                    </Title>
                    <Info event={event} />
                  </InfoGroup>
                </PosterWrapper>
                <ConfirmationGroup className={status}>
                  <Title
                    style={{
                      color: 'white',
                      fontSize: 66,
                      padding: 0,
                      textAlign: 'left',
                      zIndex: 1
                    }}
                  >
                    {event.experience.title}
                  </Title>
                  <Info event={event} />
                  <SubTitle color="white" hasLine={true}>
                    Your VR Guests
                  </SubTitle>
                  {event.host && event.members && this.renderMembers(event)}
                  <Button onClick={this.props.toggleCollapse}>
                    Invite Friends
                  </Button>
                </ConfirmationGroup>
              </React.Fragment>
            )}
          </Transition>
        )}
      </BookingInfoWrapper>
    )
  }

  private renderMembers = (event: IEvent) => {
    const { firstName, lastName, email } = event.host

    const iconProps = {
      primary: '#41A5F0',
      secondary: '#D7F4FE'
    }

    return (
      <HostBlock>
        <Booked>
          {firstName && lastName ? (
            <Initials>
              <span>
                {firstName.substr(0, 1)}
                {lastName.substr(0, 1)}
              </span>
            </Initials>
          ) : (
            <VrGuy {...iconProps} />
          )}
          {email}
          <Label clear={true}>Host</Label>
        </Booked>
        <Booked>
          <VrGuy {...iconProps} />
          and {event.members.length} more players
        </Booked>
      </HostBlock>
    )
  }
}

const Info: React.StatelessComponent<IEvent & any> = ({ event }) => {
  const { date, time, location } = event
  return (
    <InfoStyles>
      <p>
        {date}
        <span />
        {time}
      </p>
      <a href={location.mapUrl} target="_blank">
        {location.address1}
        <br />
        {location.address2}
      </a>
    </InfoStyles>
  )
}

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InfoStyles = styled.div`
  font-size: 13px;
  font-weight: 600;
  z-index: 2;
  width: 365px;

  p {
    color: white;
    margin-bottom: 15px;

    span {
      width: 1px;
      background-color: white;
      height: 20px;
      display: inline-block;
      position: relative;
      margin: 0 10px;
      opacity: 0.6;
      top: 5px;
    }
  }
`

const ConfirmationGroup = styled(InfoGroup)`
  align-items: stretch;
  position: absolute;
  opacity: 0;
  left: 90%;
  top: 150px;
  width: 50vw;
  transform: translateY(-30%);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  pointer-events: none;

  h1 {
    margin-left: -10px;
  }

  & ${InfoStyles} {
    margin: 0 0 40px 5px;
  }

  button {
    align-self: flex-start;
  }

  &.entered {
    opacity: 1;
    transform: translateY(0%);
    pointer-events: all;
  }
  &.exited {
    display: none;
  }
`

const Activity = () => {
  return <ActivityStyles />
}

const ActivityStyles = styled.div``

const Message = styled.div`
  height: 47px;
  width: 365px;
  background-color: white;
  z-index: 1;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Eina03;
  font-size: 14px;
  font-weight: bold;
  color: #36a984;
  margin-bottom: 15px;
`

const BookingInfoWrapper = styled.section`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const Poster = styled.div`
  align-self: center;
  position: relative;
  margin-bottom: 30px;
  width: 365px;
  height: 540px;
  transition: 1s ease-out;

  .poster {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    box-shadow: 0 0 60px 30px rgba(0, 0, 0, 0);
    opacity: 0;

    transition: opacity 1s ease-out, box-shadow 1s ease-out;

    &.lazyloaded {
      opacity: 1;
      box-shadow: 0 0 60px 30px rgba(0, 0, 0, 0.4);
    }
  }

  .overlay-triangle {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    &:after {
      content: '';
      transition: opacity 5s ease-in-out 0.5s;
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(255deg, #ffffff 0%, transparent 100%);
      transform: skewX(34deg) translateX(50%);
    }
  }

  .lazyloaded {
    & ~ .overlay-triangle:after {
      opacity: 0.5;
    }
  }
`

const PosterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  ${InfoGroup} {
    opacity: 1;
    transform: translateY(0%);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    pointer-events: all;
  }

  &.entering,
  &.entered {
    ${InfoGroup} {
      opacity: 0;
      transform: translateY(50%);
      pointer-events: none;
    }
  }
  &.exiting {
    ${InfoGroup} {
      opacity: 1;
      transform: translateY(0%);
      transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s;
      pointer-events: all;
    }
  }
`

const Booked = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  font-family: 'Eina03';
  font-weight: 600;
  max-width: 600px;

  svg {
    padding: 10px;
    background-color: white;
    border-radius: 50%;
    width: 54px;
    height: 54px;
    margin-right: 13px;
  }
`

const HostBlock = styled.div`
  margin-top: 30px;
  color: white;
`

const Initials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  color: #313542;
  width: 54px;
  height: 54px;
  font-size: 18px;
  margin-right: 13px;

  span {
    position: relative;
    top: -2px;
  }
`

export { BookingInfo }
