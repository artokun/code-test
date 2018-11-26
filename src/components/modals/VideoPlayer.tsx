import React, { Component } from 'react'
import { cld } from '../../index'
import styled from 'styled-components'
import { Play, CloseX } from '../icons'
import { Transition } from 'react-transition-group'
import { desktop, tablet, mobile } from '../../styles/media'


interface IVideoPlayerProps {
  event: any
  toggleVideoPlayer: () => any
  startIndex?: number
}

class VideoPlayer extends Component<IVideoPlayerProps> {
  vplayer: any

  state = {
    currentIndex: 0
  }

  componentDidMount() {
    const { startIndex, event } = this.props

    this.vplayer = cld.videoPlayer('modal-player', {
      fontFace: 'inherit',
      controls: true,
      muted: false
    })

    this.vplayer
      .playlist(event.videoList, {
        autoAdvance: 0,
        repeat: true
      })
      .play()

    if (startIndex) {
      this.vplayer.playlist().playAtIndex(startIndex)
    }

    this.vplayer.on('sourcechanged', this.onSourceChanged)
    document.addEventListener('keydown', this.handleEscButton)
  }

  componentWillUnmount() {
    this.vplayer.dispose()
    document.removeEventListener('keydown', this.handleEscButton)
  }

  handleEscButton = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.props.toggleVideoPlayer()
    }
  }

  handlePlayIndex = (index: number) => {
    this.vplayer.playlist().playAtIndex(index)
  }

  onSourceChanged = () => {
    const currentIndex = this.vplayer.playlist().currentIndex()
    this.setState({ currentIndex })
  }

  renderPlaylistItems = () => {
    if (!this.vplayer) {
      return null
    }
    const { currentIndex } = this.state
    return this.vplayer
      .playlist()
      .list()
      .map((s: any, i: number) => {
        const isActive = i === currentIndex
        return isActive ? (
          <ActivePlaylistItem key={s.objectId}>
            <img
              src={`https://res.cloudinary.com/sandboxvr/video/upload/c_scale,so_14,w_300/${s.publicId()}.jpg`}
              alt="thumbnail"
            />
          </ActivePlaylistItem>
        ) : (
          <PlaylistItem key={s.objectId} onClick={() => this.handlePlayIndex(i)}>
            <img
              src={`https://res.cloudinary.com/sandboxvr/video/upload/c_scale,so_14,w_300/${s.publicId()}.jpg`}
              alt="thumbnail"
            />
            <Play />
          </PlaylistItem>
        )
      })
  }

  render() {
    const { toggleVideoPlayer } = this.props

    return (
      <VideoOverlay onClick={toggleVideoPlayer}>
        <Transition in={!!this.vplayer} timeout={400}>
          {(state: string) => (
            <VideoWrapper onClick={e => e.stopPropagation()} className={state}>
              <CloseButton onClick={toggleVideoPlayer}><CloseX />CLOSE</CloseButton>
              <video id="modal-player" className="cld-video-player cld-fluid" />
              <Playlist>{this.renderPlaylistItems()}</Playlist>
            </VideoWrapper>
          )}
        </Transition>
      </VideoOverlay>
    )
  }
}

const CloseButton = styled.div`
  width: 200px;
  font-family: 'Eina03';
  font-weight: 600;
  font-size: 14px;
  color: #41E0F0;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 20px;

&:hover {
  color: #ffffff;
  }

svg {
  vertical-align: -7px;
  margin-right: 10px;
  }

  @media ${tablet} {
    margin-left: 20px;
  }
`

const PlaylistItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 260px;
  border: 1px solid transparent;
  padding: 2px;
  overflow: hidden;
  background-color: black;
  cursor: pointer;


  img {
    width: 100%;
    opacity: 0.5;
    pointer-events: none;
  }

  svg {
    position: absolute;
    height: 60%;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`

const ActivePlaylistItem = styled(PlaylistItem)`
  border: 3px solid #41e0f0;
  border-radius: 4px;

  img {
    opacity: 0.3;
  }
`

const Playlist = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  border-color: gray;

  @media ${tablet} {
    margin: 30px 13px;
  }
`

const VideoOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding-top: 100px;

  @media ${tablet} {
    padding-top: 50px; 
  }
`

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 90vh;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  #modal-player .vjs-control-bar .vjs-cloudinary-button {
    display: none !important;
  }

  #modal-player .vjs-control-bar .vjs-control .vjs-slider .vjs-play-progress {
    background: linear-gradient(270deg,#41dff0,#053a40) !important;
    box-shadow: 0 2px 12px 0 #053a40 !important;
  }

  &.entered {
    opacity: 1;
    transform: translateY(0px);
  }

  @media ${tablet} {
    width: 100%;
  }
`

export { VideoPlayer }
