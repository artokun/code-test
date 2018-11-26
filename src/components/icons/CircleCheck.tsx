import * as React from 'react'

interface IProps {
  primary?: string
  secondary?: string
}

const CircleCheck: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" {...rest}>
    <title>CircleCheck</title>
    <g
      transform="translate(1 1)"
      fillRule="nonzero"
      stroke={primary}
      fill="none"
    >
      <circle fill={secondary} cx={9} cy={9} r={9.5} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.968 9.018L7.9 11.846l5.66-6.02"
      />
    </g>
  </svg>
)

CircleCheck.defaultProps = {
  primary: '#36A984',
  secondary: '#CFF2E7'
}

export { CircleCheck }
