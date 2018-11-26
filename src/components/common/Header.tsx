import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  useToggle,
  useWindowSize,
  useScroll,
  useOnClickOutside
} from '../../hooks'
import { tablet } from '../../styles/media'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../../components/icons'
import AuthContext from '../../context/AuthContext'
import { VrGuy } from '../icons'
import { Hamburger } from '../common/Hamburger'
import { Button } from '../forms/ui'
import { Experiences } from '../icons/Experiences'
import { SignOut } from '../icons/SignOut'
import { Query } from 'react-apollo'
import { GetCurrentGuest } from '../../queries/GetCurrentGuest'

interface IHeaderStyleProps {
  dark?: boolean
}

const Header: React.SFC<{ location: { pathname: string } }> = ({
  location
}) => {
  const modalRef: React.RefObject<HTMLUListElement> = useRef()
  const ignore1: React.RefObject<any> = useRef()
  const ignore2: React.RefObject<any> = useRef()
  const { isAuthed, signOut } = useContext(AuthContext)
  const authed = isAuthed()
  const [modalOpen, toggleModal] = useToggle(false)
  const { width } = useWindowSize()
  const top = useScroll()
  const IS_MOBILE = width ? width < 1024 : false
  const IS_TOP = typeof top === 'number' ? top < 15 : false
  const [links] = useState([
    { title: 'Locations', url: '/locations' },
    { title: 'About', url: '/about' },
    { title: 'Login', url: '/login', hideOnAuth: true }
  ])
  useEffect(
    () => {
      if (modalOpen || !authed) {
        toggleModal(false)
      }
    },
    [width, authed]
  )
  useOnClickOutside(modalRef, () => toggleModal(false), [ignore1, ignore2])

  const renderModal = (currentGuest: any) => {
    return (
      <Modal ref={modalRef}>
        {links.map(
          (link, index) =>
            (!link.hideOnAuth || !authed) && (
              <ModalRow key={index}>
                <Link to={link.url}>{link.title}</Link>
              </ModalRow>
            )
        )}
        {authed && currentGuest && (
          <>
            <ModalRow>
              <VrGuy
                primary="#41E0F0"
                secondary="#064F58"
                tertiary="#14344B"
                quatrinary="#14344B"
                height="23px"
              />
              <span>Edit Profile</span>
            </ModalRow>
            <ModalRow className="experiences">
              <h5>Your Experiences</h5>
              <ul>
                {currentGuest.events.map((event: any) => {
                  return (
                    <ExperienceRow key={event.id}>
                      <Link to={`/event/${event.id}`} key={event.id}>
                        <Experiences />
                        <span>{event.experience.title}</span>
                        <small>
                          {event.time} - {event.date}
                        </small>
                      </Link>
                    </ExperienceRow>
                  )
                })}
              </ul>
            </ModalRow>
            <ModalRow onClick={signOut}>
              <SignOut />
              <span style={{ color: '#CB6D84' }}>Sign Out</span>
            </ModalRow>
          </>
        )}
        <ModalRow>
          <StyledModalButton>Book An Experience</StyledModalButton>
        </ModalRow>
      </Modal>
    )
  }

  switch (true) {
    case location.pathname === '/login':
      return (
        <LoginHeaderStyles>
          <LoginWrapper>
            <Link className="logo" to="/">
              <Logo primary="#FFFFFF" />
            </Link>
            {authed && <Link to="/logout">Sign Out</Link>}
          </LoginWrapper>
        </LoginHeaderStyles>
      )
    default:
      return (
        <HeaderStyles dark={false}>
          <LoginWrapper className={IS_TOP ? 'top' : ''}>
            <Link className="logo" to="/" style={{ zIndex: 1 }}>
              <Logo primary="#FFFFFF" />
            </Link>
            <Query query={GetCurrentGuest}>
              {({ loading, error, data }) => {
                if (loading) return null
                if (error) signOut()
                if (authed && data && data.currentGuest) {
                  return (
                    <>
                      {IS_MOBILE ? (
                        <Hamburger
                          ref={ignore1}
                          style={{
                            zIndex: 1
                          }}
                          onClick={() => toggleModal()}
                          isActive={modalOpen}
                        />
                      ) : (
                        <User ref={ignore2} onClick={() => toggleModal()}>
                          <UserName>
                            {data.currentGuest.firstName}{' '}
                            {data.currentGuest.lastName}
                          </UserName>
                          <Avatar>
                            <VrGuy
                              primary="#41E0F0"
                              secondary="#064F58"
                              tertiary="#14344B"
                              quatrinary="#14344B"
                              height="23px"
                            />
                          </Avatar>
                        </User>
                      )}
                      {modalOpen && renderModal(data.currentGuest)}
                    </>
                  )
                }
                return (
                  <>
                    {IS_MOBILE ? (
                      <Hamburger
                        ref={ignore1}
                        style={{
                          zIndex: 1
                        }}
                        onClick={() => toggleModal()}
                        isActive={modalOpen}
                      />
                    ) : (
                      <LinksWrapper>
                        <ul>
                          {links.map((link, index) => (
                            <li key={index}>
                              <Link to={link.url}>{link.title}</Link>
                            </li>
                          ))}
                          <li>
                            <StyledButton>Book An Experience</StyledButton>
                          </li>
                        </ul>
                      </LinksWrapper>
                    )}
                    {modalOpen && renderModal(null)}
                  </>
                )
              }}
            </Query>
          </LoginWrapper>
        </HeaderStyles>
      )
  }
}

const ExperienceRow = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: 60px;
  font-family: 'Eina03';
  letter-spacing: 0;
  position: relative;

  span {
    display: block;
    color: #41e0f0;
    font-size: 14px;
    padding: 0 42px;
    font-weight: 600;
  }

  small {
    padding: 0 42px;
  }

  svg {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 28px;
  }
`

const ModalRow = styled.li`
  border-bottom: 1px solid #3d4763;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: 60px;
  font-family: 'Eina03';
  letter-spacing: 0;

  &.experiences {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    h5,
    small {
      color: #a8b2ce;
      font-size: 12px;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 2.77px;
    }
  }

  a {
    color: #ffffff !important;
    font-weight: bold;

    &:visited {
      color: #ffffff;
    }
  }

  span {
    color: #41e0f0;
    font-size: 14px;
    padding: 0 42px;
    font-weight: 600;
  }

  svg {
    position: absolute;
    width: 28px;
  }

  &:last-child {
    border-bottom: none;

    span {
      color: #ffffff;
    }
  }

  @media ${tablet} {
    &.experiences {
      overflow: hidden;
      min-height: 160px;
      ul {
        width: 100%;
        max-height: 100%;
        overflow-y: scroll;
      }
    }
  }
`

const User = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Modal = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 52px;
  top: 80px;
  background: #262c3b;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #3d4763;
  box-shadow: 0 19px 24px 10px rgba(0, 0, 0, 0.25);
  padding: 10px 32px 32px;
  width: 350px;

  @media ${tablet} {
    overflow-y: scroll;
    top: 0;
    left: 0;
    right: unset;
    width: 100vw;
    height: 100vh;
    min-height: 61px;
    padding: 85px 32px 32px;
  }
`

const StyledButton = styled(Button)`
  height: 50px;
  display: inline-flex;
  min-width: 194px;
  margin-top: 0;
`

const StyledModalButton = styled(StyledButton)`
  font-size: 14px;
  width: 100%;
  padding: 0;
  margin-top: 2rem;
`

const LinksWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-flex;
      color: white;

      a {
        padding: 1rem 1.5rem;
        color: white;
      }
    }
    li:last-child {
      margin: 0 0 0 1.5rem;
    }
  }
`

const UserName = styled.div`
  color: white;
  margin-right: 1rem;
  display: inline-block;
  font-family: 'Eina03';
  font-size: 14px;
  font-weight: bold;
`

const Avatar = styled.div`
  background-color: #313a4e;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  /* padding: 1rem; */
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const HeaderStyles = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: IHeaderStyleProps) =>
    props.dark ? 'rgba(23,27,39,0.95)' : 'none'};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  .logo {
    width: 173px;
    height: 26px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  @media ${tablet} {
    position: fixed;

    .logo {
      height: 22px;
    }
  }
`

const LoginWrapper = styled.div`
  padding: 20px 52px;
  position: relative;
  display: flex;
  max-width: 1440px;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media ${tablet} {
    background-color: #262c3b;
    padding: 20px 30px;
    transition: background-color 0.2s ease-in-out;

    &.top {
      background-color: transparent;
    }
  }
`

const LoginHeaderStyles = styled(HeaderStyles)`
  color: white;
  background-color: #313542;

  .logo {
    width: 100px;
  }

  ${LoginWrapper} {
    padding: 20px;
  }
`

export { Header }
