import React from 'react'
import styled from 'styled-components'
import { coords } from '../../config/fixtures'

interface ICircleProps {
  key: number
  cx: number
  cy: number
  'data-id': number
  r: number
  className: string
  ref?: any
}

interface IProps {
  live: number
  setLiveRef: any
}

const PixelMap: React.SFC<IProps> = ({ live, setLiveRef, ...rest }) => {
  const renderCircles = () =>
    coords.map(([cx, cy], dataId) => {
      let circleProps: ICircleProps = {
        key: dataId,
        cx,
        cy,
        'data-id': dataId,
        r: 4,
        className: ''
      }
      if (live === dataId) {
        circleProps = { ...circleProps, className: 'live', ref: setLiveRef }
      }
      return <circle {...circleProps} />
    })

  return (
    <PixelMapWrapper>
      <svg viewBox="0 0 2560 1330" {...rest}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: '#14C1FF', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#282F40', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        {renderCircles()}
      </svg>
    </PixelMapWrapper>
  )
}

const PixelMapWrapper = styled.div`
  max-width: 900px;
  font-size: 0;
  overflow: hidden;
  padding-top: 50px;
  width: 100%;

  svg {
    display: block;
    min-width: 900px;

    circle {
      fill: #41e0f0;
      fill-opacity: 0.25;
    }
  }

  @media screen and (max-width: 900px) {
    max-width: unset;
  }
`

export { PixelMap }
