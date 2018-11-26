import React, { Component } from 'react'
import styled from 'styled-components'
import { mobile } from '../../styles/media'

class UnstyledSelectedLocation extends Component<any, any> {
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.forceUpdate()
  }

  renderTethers(liveRect: any, mapRect: any) {
    return this.props.targets.map((t: any, i: number) => {
      const targetRect = t.ref.getBoundingClientRect()

      return (
        <line
          key={i}
          x1={liveRect.left - mapRect.left}
          y1={liveRect.top - mapRect.top}
          x2={targetRect.left + targetRect.width * t.offset.x - mapRect.left}
          y2={targetRect.top + targetRect.height * t.offset.y - mapRect.top}
        />
      )
    })
  }

  render() {
    if (!this.props.liveRef) {
      return null
    }
    const mapRect = this.props.mapRef.getBoundingClientRect()
    const liveRect = this.props.liveRef.getBoundingClientRect()

    return (
      <svg width="100%" height="100%" className={this.props.className}>
        <g className="lines">{this.renderTethers(liveRect, mapRect)}</g>
        <g className="location">
          <circle
            className="inner"
            cx={liveRect.left - mapRect.left}
            cy={liveRect.top - mapRect.top}
            r="4"
          />
          <Outer
            className="outer"
            cx={liveRect.left - mapRect.left}
            cy={liveRect.top - mapRect.top}
            r="4"
            transformOrigin={`${liveRect.left - mapRect.left}px ${liveRect.top -
              mapRect.top}px`}
          />
          <text x={liveRect.left - mapRect.left} y={liveRect.top - mapRect.top}>
            {this.props.title}
          </text>
        </g>
      </svg>
    )
  }
}

const Outer: any = styled.circle`
  r: 1.6em;
  stroke: #3bc4d4;
  stroke-width: 2;
  fill: url('#grad1');
  fill-opacity: 0.2;
  animation-name: locationOuter_Animation;
  animation-duration: 10s;
  transform-origin: ${(props: any) =>
    props.transformOrigin ? props.transformOrigin : 'none'};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
`

const SelectedLocation = styled(UnstyledSelectedLocation)`
  position: absolute;

  circle {
    &.inner {
      r: 0.4em;
      fill: #2995a3;
      fill-opacity: 1;
      stroke-width: 1;
      stroke: #41e0f0;
      animation-name: locationInner_Animation;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in;
    }
  }

  text {
    fill: #ffffff;
    font-size: 12px;
    font-family: 'Eina03';
    text-transform: uppercase;
    letter-spacing: 2.77px;
    transform: ${({ western }) =>
      western ? 'translate(40px, 5px)' : 'translate(-40px, 5px)'};

    text-anchor: ${({ western }) => (western ? 'start' : 'end')};
  }

  line {
    /* stroke: url('#gboth'); */
    stroke: #ffffff;
    stroke-width: 1px;
    stroke-opacity: 0.3;
  }

  @keyframes locationOuter_Animation {
    0%,
    100% {
      transform: scale(0);
      opacity: 0;
      stroke: #41e0f0;
    }

    2% {
      opacity: 0.4;
      transform: scale(1.5);
    }

    3% {
      transform: scale(1);
      opacity: 1;
    }

    40%,
    96% {
      transform: scale(1);
      opacity: 1;
    }

    99% {
      transform: scale(3.5);
      opacity: 0;
    }
  }

  @keyframes locationInner_Animation {
    5%,
    95% {
      fill: #2995a3;
    }

    0%,
    100% {
      fill: #41e0f0;
    }
  }

  @media ${mobile} {
    .lines {
      display: none;
    }

    .location {
      transform: translateX(80px);
    }
  }
`

export { SelectedLocation }
