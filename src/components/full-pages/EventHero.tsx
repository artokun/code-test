import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../../styles/media'
import { Play, Ocular1 } from '../icons'
import {
  ShareArrow,
  ShareIcon,
  ShareLink,
  ShareTwitter,
  ShareFacebook
} from '../icons'
import { Label } from '../text'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Video } from 'cloudinary-react'

interface IEventHeroProps {
  event: {
    experience: {
      title: string
    }
    videoList: Array<string>
    posterSrc: string
    date: string
    time: string
  }
  toggleVideoPlayer: () => any
}

const EventHero: React.SFC<IEventHeroProps> = ({
  event,
  toggleVideoPlayer
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  return (
    <VideoWrapper>
      <VideoBG
        cloudName="sandboxvr"
        poster={event.posterSrc}
        publicId={event.videoList[0]}
        fallbackContent="Your browser does not support HTML5 video tags."
        width="100%"
        quality="100"
        loop={true}
        autoPlay={true}
        muted={true}
        Transformation={'deadwoodhero'}
      />

      <EventInfo>
        <h1>{event.experience.title}</h1>
        <p>
          On {event.date} {event.time}
        </p>
        <Share>
          <div
            className={`button ${modalOpen && 'modalOpen'}`}
            onClick={() => {
              console.log('modal open')
              setModalOpen(!modalOpen)
            }}
          >
            Share This Experience <ShareIcon />
          </div>

          {modalOpen && (
            <div className="modal">
              <div
                className="button"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=We%20absolutely%20dominated%20Amber%20Sky%20at%20@SandboxVR.%20Check%20out%20this%20video%20of%20us%20-%20the%20future%20is%20now%20and%20it%20is%20awesome!&via=SandboxVR&url=${encodeURIComponent(
                      'https://sandboxvr.com'
                    )}`,
                    'Twitter-dialog',
                    'width=626,height=436'
                  )
                  return false
                }}
              >
                <ShareTwitter /> Share On Twitter <ShareArrow />
              </div>
              <div
                className="button"
                onClick={() => {
                  window.open(
                    'https://www.facebook.com/sharer/sharer.php?u=' +
                      encodeURIComponent('https://sandboxvr.com'),
                    'facebook-share-dialog',
                    'width=626,height=436'
                  )
                  return false
                }}
              >
                <ShareFacebook />
                Share On Facebook <ShareArrow />
              </div>
              {/* <div className="button">
                <Mail primary="#41e0f0" secondary="transparent" /> Share Via Email <ShareArrow />
              </div> */}

              {copied ? (
                <div className="copied-label">
                  <Label blue={true}>Copied to clipboard</Label>
                </div>
              ) : (
                <CopyToClipboard
                  text="https://player.sandboxvr.com/event/completed"
                  onCopy={() => {
                    setCopied(true)
                    setTimeout(() => {
                      setModalOpen(false)
                      setCopied(false)
                    }, 3000)
                  }}
                >
                  <div className="button">
                    <ShareLink />
                    Copy Link <ShareArrow />
                  </div>
                </CopyToClipboard>
              )}
            </div>
          )}
        </Share>
      </EventInfo>
      <PlayWrapper>
        <Ocular1 className="ocular-1" />
        <a className="play-button" onClick={toggleVideoPlayer}>
          <Play />
        </a>
      </PlayWrapper>
    </VideoWrapper>
  )
}

const Share = styled.div`
  margin: 2rem 0;
  z-index: 1;
  position: relative;

  div.button {
    background: rgba(65, 224, 240, 0.25);
    border-radius: 4px;
    border: 1px solid #41e0f0;
    height: 50px;
    padding: 13px 20px;
    margin: 0.5rem 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    color: #41e0f0;
    font-weight: 600;

    svg {
      margin-right: 1rem;
      margin-left: 0;
    }
    svg:last-child {
      margin-right: 0;
      margin-left: 1rem;
    }
    &:hover {
      background: rgba(65, 224, 240, 0.45);
      color: #b7f8ff;
      svg g {
        fill: #b7f8ff;
        outline: #b7f8ff;
        stroke-width: 0;
      }
    }
  }
  div.button.modalOpen {
    background: rgba(65, 224, 240, 0.45);
    color: #b7f8ff;
  }
  .modal {
    display: grid;
    grid-template-rows: auto;
    background: #262c3b;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #3d4763;
    box-shadow: 0 19px 24px 10px rgba(0, 0, 0, 0.25);
    width: fit-content;
    padding: 1rem 1.5rem;
    z-index: 1;
    justify-content: center;
    align-items: center;
    .button {
      width: 100%;
      display: grid;
      grid-template-columns: auto auto 1fr;
      justify-content: flex-start;
    }
    .copied-label {
      text-align: center;
      margin: 1rem 0;
      span {
        width: fit-content;
        padding: 0 1rem;
      }
    }
  }

  @media ${tablet} {
    display: none;
  }
`
const VideoWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  max-height: 700px;
  overflow: hidden;
  background-color: black;
  &:after {
    content: '';
    display: block;
    position: absolute;
    pointer-events: none;
    width: 100%;
    bottom: -2px;
    height: 75%;
    background-image: linear-gradient(to bottom, transparent, rgba(28, 33, 47));
  }
`

const PlayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  transform: translate(0%, -18%);
  transition: all 0.3s ease-in-out;

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ocular-1 {
    width: 1000px;
    stroke-opacity: 0.1;
    fill-opacity: 0.1;
    position: absolute;
    transition: width 0.3s ease-in-out;
  }

  .play-button {
    z-index: 1;
    transition: width 0.3s ease-in-out;
    cursor: pointer;

    svg {
      width: 120px;
    }
  }

  @media ${tablet} {
    transform: translate(25%, 0%);
  }

  @media ${mobile} {
    transform: translate(35%, 0%);
    .ocular-1 {
      width: 400px;
      stroke-opacity: 0.2;
      fill-opacity: 0.2;
    }

    .play-button {
      width: 60px;
    }
  }
`

const VideoBG = styled(Video)`
  height: 50vw;
  max-height: 700px;
  min-height: 280px;
  width: 100%;
  top: 0;
  padding: 0;
  object-fit: cover;
  object-position: 50% 30%;
  opacity: 0.5;
`

const EventInfo = styled.div`
  height: 100%;
  top: 0;
  position: absolute;
  padding: 120px 40px 52px;
  color: white;
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;

  h1 {
    font-family: 'Eina03';
    width: 550px;
    font-size: 90px;
    font-weight: bold;
    color: white;
    line-height: 1.1;
    margin: 0 0 20px;

    @media screen and (max-width: 1440px) {
      font-size: 70px;
      width: 490px;
    }

    @media screen and (max-width: 1200px) {
      font-size: 60px;
      width: 425px;
    }

    @media screen and (max-width: 1100px) {
      width: 375px;
    }
  }

  p {
    color: #a8b2ce;
    font-family: 'Eina03';
    font-size: 12px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0 0 0 4px;
    padding: 0;
    letter-spacing: 2.77px;
  }

  @media ${mobile} {
    padding-top: 80px;

    h1 {
      font-size: 46px;
      width: 300px;
    }
    p {
      color: #ffffff;
    }
  }
`

export { EventHero }
