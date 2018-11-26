import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const Experiences: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="30px" height="26px" viewBox="0 0 30 26" version="1.1">
    <title>Experiences</title>
    <defs>
      <filter
        x="-40.9%"
        y="-42.1%"
        width="181.8%"
        height="189.5%"
        filterUnits="objectBoundingBox"
        id="filter-1"
      >
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix
          values="0 0 0 0 0.020530059   0 0 0 0 0.138946191   0 0 0 0 0.227758291  0 0 0 1 0"
          type="matrix"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g id="Player-Account" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="deadwood-header1" transform="translate(-1137.000000, -184.000000)" fillRule="nonzero">
        <g id="Group-9" filter="url(#filter-1)" transform="translate(1141.000000, 186.000000)">
          <rect
            id="Rectangle"
            stroke="#41E0F0"
            strokeWidth="0.8"
            fill="#14344B"
            x="4"
            y="5"
            width="18"
            height="14"
            rx="0.5"
          />
          <path
            d="M0.5,0.5 L17.5,0.5 C17.7761424,0.5 18,0.723857625 18,1 L18,14 C18,14.2761424 17.7761424,14.5 17.5,14.5 L0.5,14.5 C0.223857625,14.5 -1.59533939e-14,14.2761424 -1.59872116e-14,14 L-1.59872116e-14,1 C-1.60210292e-14,0.723857625 0.223857625,0.5 0.5,0.5 Z"
            id="Rectangle"
            stroke="#41E0F0"
            strokeWidth="0.8"
            fill="#14344B"
          />
          <path
            d="M1.5,1.5 L16.3914972,1.5 C16.6676396,1.5 16.8914972,1.72385763 16.8914972,2 C16.8914972,2.16095408 16.8140143,2.3120665 16.6833177,2.40600591 L1.7918205,13.1094073 C1.56758963,13.2705753 1.25516211,13.2194527 1.09399409,12.9952219 C1.0328774,12.910191 1,12.8081176 1,12.7034014 L1,2 C1,1.72385763 1.22385763,1.5 1.5,1.5 Z"
            id="Rectangle"
            fill="#064F58"
          />
        </g>
      </g>
    </g>
  </svg>
)

Experiences.defaultProps = {
  primary: 'none',
  secondary: '#41E0F0'
}

export { Experiences }
