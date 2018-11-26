import React from "react";
import styled from 'styled-components'

const UnstyledCloseX = (props: any) => (
  <svg width={25} height={25} {...props}>
    <defs>
    <linearGradient id="grad" x1="0%" y1="0" x2="0" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14C1FF', stopOpacity: .4 }} />
        <stop offset="100%" style={{ stopColor: '#282F40', stopOpacity: .4 }} />
      </linearGradient>
    </defs>
    <g fill="none">
      <rect
        stroke="#3BC4D4"
        className="grad"
        x={0.5}
        y={0.5}
        width={24}
        height={24}
        rx={3}
      />
      <path
        d="M13.2 12.5l3.9 3.9a.5.5 0 1 1-.7.7l-3.9-3.9-3.9 3.9a.5.5 0 1 1-.7-.7l3.9-3.9-3.9-3.9a.5.5 0 1 1 .7-.7l3.9 3.9 3.9-3.9a.5.5 0 1 1 .7.7l-3.9 3.9z"
        fill="#3BC4D4"
      />
    </g>
  </svg>
)

const CloseX = styled(UnstyledCloseX)`
  .grad {
    fill: url('#grad');
  }
  `

export { CloseX };
