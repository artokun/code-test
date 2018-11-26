import React from 'react'
import styled from 'styled-components'

const UnstyledPlay = (props: any) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 121 121"
    {...props}
  >
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0" x2="0" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14C1FF', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#282F40', stopOpacity: 1 }} />
      </linearGradient>
      <path id="c" d="M41.404 53.941l29.508-6.783-6.783 29.508z" />
      <filter
        id="b"
        width="176.2%"
        height="176.2%"
        x="-32.2%"
        y="-37.3%"
        filterUnits="objectBoundingBox"
      >
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius={0.75}
          result="shadowSpreadOuter1"
        />
        <feOffset dx={2} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation={3}
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0.0239327784 0 0 0 0 0.127952663 0 0 0 0 0.205436862 0 0 0 1 0"
        />
      </filter>
    </defs>
    <g fill="none">
      <circle
        cx={60.5}
        cy={60.25}
        fill="#313A4E"
        stroke="#171C27"
        strokeWidth={1.5}
        opacity={0.4}
        r={59}
        className="bg"
      />
      <circle
        cx={60.5}
        cy={60.25}
        className="grad-circle"
        fillOpacity={0.2}
        r={52}
      />
        <use className="triangle" fill="#2995A3" stroke="#41E0F0" strokeWidth={1.5} xlinkHref="#c" />
      
      <path
        className="outer"
        d="M60.5 12.226c-26.51 0-48 21.5-48 48.024 0 26.522 21.49 48.023 48 48.023s48-21.5 48-48.023h-1.2c0 25.86-20.953 46.823-46.8 46.823-25.847 0-46.8-20.964-46.8-46.823 0-25.86 20.953-46.823 46.8-46.823v-1.201z"
        fill="#41E0F0"
      />
      <path
        className="inner"
        d="M77.133 101.417c22.747-9.19 33.74-35.072 24.554-57.808-9.186-22.736-35.072-33.717-57.82-24.526-22.747 9.19-33.74 35.071-24.554 57.807l1.113-.45c-8.938-22.12 1.759-47.303 23.891-56.245 22.132-8.942 47.32 1.742 56.257 23.864 8.938 22.121-1.759 47.303-23.891 56.245l.45 1.113z"
        fill="#41E0F0"
      />
    </g>
  </svg>
)

const Play = styled(UnstyledPlay)`
  .grad-circle {
    fill: url('#grad2');
  }

  .triangle {
    transform-origin: 50% 50%;
    transform: rotate(45deg);
  }


  .outer {
    animation-name: outer_Animation;
    animation-duration: 8s;
  }
  
  .inner,
  .outer {
    animation-name: inner_Animation;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: 50% 50%;
  }

  .outer {
    animation-name: outer_Animation;
    animation-duration: 8s;
  }

  &:hover {

    .inner,
    .outer {
      animation-duration: 3s;
      stroke: rgba(255,255,255,.5);
    }
  }

  @keyframes inner_Animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes outer_Animation {
    0% {
      transform: rotate(-360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`

export { Play }
