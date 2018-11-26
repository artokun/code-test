import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const SignOut: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="29px" height="30px" viewBox="0 0 29 30" version="1.1">
    <title>Sign Out</title>
    <defs>
      <filter
        x="-34.8%"
        y="-33.3%"
        width="169.6%"
        height="166.7%"
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
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-1136.000000, -241.000000)" fill="#CB6D84" fillRule="nonzero">
        <g filter="url(#filter-1)" transform="translate(1139.000000, 243.000000)">
          <path
            d="M7,2 L7,3.09230767 C3.45711079,4.7356054 1,8.32412446 1,12.4865325 C1,18.2026797 5.63385284,22.8365325 11.35,22.8365325 C17.0661472,22.8365325 21.7,18.2026797 21.7,12.4865325 C21.7,8.72826223 19.6968593,5.43785053 16.7,3.62471949 L16.7,2.47401083 C20.2709455,4.38607287 22.7,8.15263464 22.7,12.4865325 C22.7,18.7549644 17.6184319,23.8365325 11.35,23.8365325 C5.08156809,23.8365325 1.27364785e-12,18.7549644 1.27364785e-12,12.4865325 C1.27364785e-12,7.75911878 2.89019501,3.70674628 7,2 Z M11.65,-5.36459765e-13 C12.0089851,-5.3652571e-13 12.3,0.291014913 12.3,0.65 L12.3,12.35 C12.3,12.7089851 12.0089851,13 11.65,13 C11.2910149,13 11,12.7089851 11,12.35 L11,0.65 C11,0.291014913 11.2910149,-5.37059955e-13 11.65,-5.37125899e-13 Z"
            id="Combined-Shape"
          />
        </g>
      </g>
    </g>
  </svg>
)

SignOut.defaultProps = {
  primary: 'none',
  secondary: '#41E0F0'
}

export { SignOut }
