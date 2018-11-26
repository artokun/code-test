import * as React from 'react'

interface IAddProps {
  primary?: string
  secondary?: string
}

const Add: React.SFC<IAddProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 23 23" width="1em" height="1em" {...rest}>
    <title>Add</title>
    <g stroke={primary} fill="none" fillRule="evenodd">
      <circle fill={secondary} fillRule="nonzero" cx={11.5} cy={11.5} r={11} />
      <path d="M11.5 8.5v6M8.5 11.5h6" strokeLinecap="square" />
    </g>
  </svg>
)

Add.defaultProps = {
  primary: '#41A5F0',
  secondary: '#D7F4FE'
}

export { Add }
