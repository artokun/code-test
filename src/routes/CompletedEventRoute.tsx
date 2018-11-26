import React, { Component } from 'react'
import styled from 'styled-components'
import { mobile } from '../styles/media'
import { EventHero } from '../components/full-pages/EventHero'
import { PixelMap } from '../components/icons'
import { SelectedLocation } from '../components/full-pages/SelectedLocation'
import { BossChart } from '../components/charts/BossChart'
import { VideoList } from '../components/common/VideoList'

// temp imports
import { fakeEventData as fakeEvent } from '../config/fixtures'
import zombieBoss from '../assets/boss_zombie.png'
import { VideoPlayer } from '../components/modals/VideoPlayer'

const L = {
  USSD: { id: 3824, title: 'SAN DIEGO', western: true },
  USSM: { id: 6609, title: 'SAN MATEO', western: true },
  HKHK: { id: 2243, title: 'HONG KONG', western: false },
  CAVA: { id: 1032, title: 'VANCOUVER', western: true },
  SISI: { id: 3303, title: 'SINGAPORE', western: false },
  INJA: { id: 3314, title: 'JAKARTA', western: false }
}

class CompletedEventRoute extends Component<{ event: any; auth: any }> {
  state = {
    mapRef: null,
    liveRef: null,
    teamCardRef: null,
    timeCardRef: null,
    timeScoreRef: null,
    showVideoPlayer: false,
    startIndex: 0
  }

  setMapRef = (ref: any) => this.setState({ mapRef: ref })
  setLiveRef = (ref: any) => this.setState({ liveRef: ref })
  setTeamCardRef = (ref: any) => this.setState({ teamCardRef: ref })
  setTimeCardRef = (ref: any) => this.setState({ timeCardRef: ref })
  setScoreCardRef = (ref: any) => this.setState({ timeScoreRef: ref })

  handleToggleVideoPlayer = () => {
    this.setState({ showVideoPlayer: !this.state.showVideoPlayer })
  }

  handleSetStartIndex = (index: number) => {
    this.setState({ startIndex: index, showVideoPlayer: true })
  }

  renderPlayers(event: any) {
    return event.team.players.map((player: any, index: number) => (
      <React.Fragment key={index}>
        <h3>{player.name}</h3>
        <PlayerScore>
          <ScoreBar style={{ width: player.scoreWidth }} />
          <div className="score-rank">
            <h4>{player.score}</h4>
            <p>Top {player.scorePercentile}%</p>
          </div>
        </PlayerScore>
      </React.Fragment>
    ))
  }

  render() {
    const { event } = this.props
    const { id, title, western } = L['USSD']
    const targets = [
      {
        ref: this.state.teamCardRef,
        offset: { x: western ? 0.6 : 0.4, y: 1.05 }
      },
      {
        ref: this.state.timeCardRef,
        offset: { x: western ? 0.6 : 0.4, y: -0.05 }
      },
      {
        ref: this.state.timeScoreRef,
        offset: { x: western ? -0.025 : 1.05, y: 0.25 }
      }
    ]

    // For test data
    event.team = event.team ? event.team : fakeEvent.team
    event.stats = event.stats ? event.stats : fakeEvent.stats
    event.totalTeams = event.totalTeams
      ? event.totalTeams
      : fakeEvent.totalTeams
    event.videoList = event.videoList ? event.videoList : fakeEvent.videoList
    event.posterSrc = event.posterSrc ? event.posterSrc : fakeEvent.posterSrc

    return (
      <EventWrapper>
        <EventHero
          event={event}
          toggleVideoPlayer={this.handleToggleVideoPlayer}
        />
        <MapWrapper ref={this.setMapRef}>
          <PixelMap live={id} setLiveRef={this.setLiveRef} />
          <SelectedLocation
            mapRef={this.state.mapRef}
            liveRef={this.state.liveRef}
            targets={targets}
            title={title}
            western={western}
          />
          <TeamCard western={western} ref={this.setTeamCardRef}>
            <h2>{event.team.name}</h2>
            <p>Team Name</p>
            <h3>{event.team.winner}</h3>
            <p>Team Winner</p>
          </TeamCard>
          <TimeCard western={western} ref={this.setTimeCardRef}>
            <h2>{event.stats.completionTime}</h2>
            <p>Completion Time</p>
            <h3>Top {event.stats.percentOfCompletion}% of Teams</h3>
            <p>Rank</p>
          </TimeCard>
          <ScoreCard western={western} ref={this.setScoreCardRef}>
            <h2>{event.stats.score}</h2>
            <p>Team Score</p>
            <h3>
              {event.stats.teamRank} / {event.totalTeams} teams
            </h3>
            <p>Rank</p>
            {this.renderPlayers(event)}
          </ScoreCard>
        </MapWrapper>
        <VideoList event={event} setStartIndex={this.handleSetStartIndex} />
        <BossChart boss={{ img: zombieBoss, name: 'Zombie Boss' }} />
        {this.state.showVideoPlayer && (
          <VideoPlayer
            startIndex={this.state.startIndex}
            event={event}
            toggleVideoPlayer={this.handleToggleVideoPlayer}
          />
        )}
      </EventWrapper>
    )
  }
}

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #1c212f;
  padding-bottom: 200px;
`

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-self: center;
  max-width: 1440px;
  width: 100%;
  transform: translateY(-10%);
  min-height: 800px;

  @media ${mobile} {
    flex-direction: column;
    transform: translateY(-120px);

    svg {
      transform: translate(-80px);
    }
  }
`

const EventCard = styled.div`
  background-color: rgba(38, 44, 59, 0.65);
  position: absolute;
  border: 1px solid #3d4763;
  border-radius: 4px 4px 4px 4px;
  box-shadow: 0 19px 24px 10px rgba(0, 0, 0, 0.25);
  padding: 20px 30px;
  margin: 0;

  h2 {
    color: #ffffff;
    font-family: 'Eina03';
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 0;
    color: white;
    margin: 0;
    padding: 0;
  }

  h3 {
    color: white;
    font-weight: bold;
    font-family: 'Eina03';
    margin: 0;
    padding: 0;
  }

  p {
    color: #a8b2ce;
    font-family: 'Eina03';
    font-size: 12px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0.4rem 0 1rem 0;
    padding: 0;
    letter-spacing: 2.77px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ${mobile} {
    min-width: unset;
    width: calc(100% - 60px);
    position: static;
    align-self: center;
    margin-bottom: 30px;
  }
`
const TeamCard = styled(EventCard)<{ western: boolean }>`
  min-width: 366px;
  top: 0;
  ${({ western }) => (western ? 'left' : 'right')}: 30px;

  @media ${mobile} {
    margin-top: calc(50vw - 440px);
  }
`
const TimeCard = styled(EventCard)<{ western: boolean }>`
  width: 225px;
  top: 440px;
  ${({ western }) => (western ? 'left' : 'right')}: 30px;
`
const ScoreCard = styled(EventCard)<{ western: boolean }>`
  width: 440px;
  top: 200px;
  ${({ western }) => (western ? 'right' : 'left')}: 30px;
`
const ScoreBar = styled.div`
  background: #2995a3;
  border: 1px solid #41e0f0;
  box-shadow: 1px 10px 12px 5px rgba(5, 18, 27, 0.11);
  height: 8px;
  width: 286px;
  margin: 1rem 1rem 1rem 0;
`
const PlayerScore = styled.div`
  display: flex;

  h4 {
    margin: 0;
    padding: 0;
    color: white;
    font-weight: bold;
    font-family: 'Eina03';
  }
  .score-rank {
    margin-top: 0.5rem;
  }
`

export { CompletedEventRoute }
