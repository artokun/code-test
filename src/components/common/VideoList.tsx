import React, { useRef } from 'react'
import { Play } from '../icons'
import styled from 'styled-components'
import { tablet, mobile } from '../../styles/media'

interface IProps {
  event: any
  setStartIndex: (index: number) => any
}

const VideoList: React.SFC<IProps> = ({ event, setStartIndex }) => {
  const renderPlaylistItems = () => {
    if (event && event.videoList && event.videoList.length) {
      return event.videoList.map((s: any, i: number) => {
        return (
          <PlaylistItem key={s + i} onClick={() => setStartIndex(i)}>
            <div className="padder">
              <img
                src={`https://res.cloudinary.com/sandboxvr/video/upload/c_fill,so_14,w_480,ar_3:2/${s}.jpg`}
                alt="video thumbnail"
              />
              <Play />
            </div>
          </PlaylistItem>
        )
      })
    }
    return null
  }
  return (
    <VideoWrapper>
      <p>Watch Your Experience</p>
      <Playlist>{renderPlaylistItems()}</Playlist>
    </VideoWrapper>
  )
}

const VideoWrapper = styled.div`
  margin-bottom: 100px;
  max-width: 1440px;
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    padding: 0 30px;
    height: 16px;
    color: #ffffff;
    font-size: 12px;
    font-family: Eina03;
    text-transform: uppercase;
    letter-spacing: 2.77px;
  }
`

const Playlist = styled.div`
  display: flex;
  padding: 30px;
  border-color: gray;
  position: relative;
  max-width: 1024px;

  @media ${tablet} {
    padding: 30px;
  }

  @media ${mobile} {
    flex-direction: column;
  }
`

const PlaylistItem = styled.div`
  display: flex;
  flex: 1;
  max-height: 480px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
  border: 3px solid transparent;
  background-size: cover;
  cursor: pointer;
  transition: border 0.2s ease-out;

  .padder {
    padding-top: 66.66%;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    box-shadow: 5px 5px 50px 10px rgba(0, 0, 0, 0.4);

    svg {
      top: 50%;
      left: 50%;
      position: absolute;
      height: 50%;
      max-height: 100px;
      transform: translate(-50%, -50%);
    }
    img {
      top: 0;
      position: absolute;
      width: 100%;
      transition: opacity 0.2s ease-out, transform 2s ease-out;
    }
  }

  &:not(:first-child) {
    margin-left: 5%;
  }

  &:hover {
    border: 3px solid #41e0f0;

    img {
      opacity: 0.3;
      transform-origin: 50% 50%;
      transform: scale(1.05);
    }
    svg {
      .inner,
      .outer {
        animation-duration: 3s;
        stroke: rgba(255, 255, 255, 0.5);
      }
    }
  }

  @media ${mobile} {
    margin-bottom: 30px;

    &:not(:first-child) {
      margin-left: unset;
    }
  }
`

export { VideoList }
