import * as React from 'react'

interface IProps {
  primary?: string
  secondary?: string
}

const Lock: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 21 20" width="1em" height="1em" {...rest}>
    <title>Lock</title>
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <rect
        stroke={primary}
        strokeWidth={0.65}
        fill={secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
        width={19}
        height={18}
        rx={1}
      />
      <path
        d="M8.808 8.83a1.5 1.5 0 1 1 1.384 0L12 11H7l1.808-2.17z"
        fill={primary}
        fillRule="nonzero"
      />
    </g>
  </svg>
)

Lock.defaultProps = {
  primary: '#A0AAB3',
  secondary: '#EAF0F5'
}

export { Lock }
