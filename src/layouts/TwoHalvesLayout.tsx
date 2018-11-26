import * as React from 'react'
import Transition from 'react-transition-group/Transition'
import styled from 'styled-components'
import { keys } from '../config/keys'
import { IEvent } from '../routes/ActivateRoute'
// import { Ocular0 } from '../components/icons'

const domain: string = keys.imigxDomain

interface IProps {
  left: React.Component | JSX.Element
  right: React.Component | JSX.Element
  collapse: boolean
  event: IEvent
  loading: boolean
}

const TwoHalvesLayout: React.SFC<IProps> = props => {
  const { left, right, collapse, event, loading } = props

  return (
    <Transition component={null} timeout={4000} appear={true} in={!loading}>
      {status => {
        return (
          <ContainerStyle className={`${status}${collapse ? ' collapse' : ''}`}>
            <Background
              className={`bg ${status}`}
              src={`${domain}/experience-wide/${event.experience.id}.png?w=${
                window.innerWidth
              }&auto=format&bri=-50&gam=-40`}
            />
            {/* <Ocular0 viewBox="0 -200 596 596" className="ocular-0" /> */}
            <PanelStyle className="left">{left}</PanelStyle>
            <PanelStyle className="right" gradient={true}>
              {right}
            </PanelStyle>
          </ContainerStyle>
        )
      }}
    </Transition>
  )
}

const ContainerStyle = styled.section`
  display: flex;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: black;

  .left {
    flex: 1 1 100%;
  }
  .right {
    flex: 0 0 0%;
  }

  .ocular-0 {
    height: 80%;
    width: 80%;
    position: absolute;
    bottom: 0;
    pointer-events: none;
    opacity: 0.2;
    right: 0;
  }
  .right {
    z-index: 1;
    section > div {
      opacity: 1;
    }

    footer {
      transform: translate3d(0, 0, 0);
    }
  }

  .bg {
    filter: blur(0px);
  }

  &.entering {
    .right {
      section > div {
        opacity: 0;
      }

      footer {
        transform: translate3d(0, 100%, 0);
      }
    }
  }
  &.entered {
    .right {
      flex: 0 0 50%;
      transform: translateX(0%);
      transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s,
        flex 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

      section > div {
        opacity: 1;
        transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s;
      }

      footer {
        transform: translate3d(0, 0, 0);
        transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 1s;
      }
    }
    .bg {
      filter: blur(20px);
      transition: filter 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .ocular-0 {
      right: calc(100vw - 65%);
      opacity: 0.5;
      transition: opacity 1s cubic-bezier(0.645, 0.045, 0.355, 1),
        right 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &.collapse {
      .right {
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

        section > div {
          opacity: 0;
        }

        footer {
          transform: translate3d(0, 100%, 0);
        }
      }

      .left {
      }
    }
  }
`

const Background = styled.div<{ src: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center 70%;
    transition: opacity 1s linear 1s, filter 1s linear 1s;

    &.exited {
      opacity: 0;
    }
    &.entering {
      opacity: 1;
    }
  }
`

const PanelStyle = styled.article<{ gradient?: boolean }>`
  height: 100%;
  position: relative;

  &.right {
    overflow: hidden;
  }

  &:after {
    content: '';
    display: ${({ gradient }) => (gradient ? 'block' : 'none')};
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  }
`
const errorStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontSize: '20px',
  height: '100%',
  justifyContent: 'center'
}

TwoHalvesLayout.defaultProps = {
  collapse: false,
  left: <div style={{ backgroundColor: 'red', ...errorStyles }}>Left component missing</div>,
  loading: false,
  right: <div style={{ backgroundColor: 'blue', ...errorStyles }}>Right component missing</div>
}

export { TwoHalvesLayout }
