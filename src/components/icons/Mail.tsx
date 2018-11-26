import * as React from 'react'

interface IProps {
  primary?: string
  secondary?: string
}

const Mail: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 21 14" width="1em" height="1em" {...rest}>
    <title>Mail</title>
    <g stroke={primary} strokeWidth={0.65} fill="none" fillRule="evenodd">
      <rect
        width={19}
        height={12}
        rx={1}
        fill={secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1 1)"
      />
      <path fillRule="nonzero" d="M1.388 1.244l9.171 6.464 8.903-6.464" />
    </g>
  </svg>
)

Mail.defaultProps = {
  primary: '#A0AAB3',
  secondary: '#EAF0F5'
}

export { Mail }
