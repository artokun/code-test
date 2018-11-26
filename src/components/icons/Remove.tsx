import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const Remove: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 23 23" width="1em" height="1em" {...rest}>
    <title>Remove</title>
    <g stroke={primary} fill="none" fillRule="evenodd">
      <circle fill={secondary} fillRule="nonzero" cx={11.5} cy={11.5} r={11} />
      <path d="M8.5 11.5h6" strokeLinecap="square" />
    </g>
  </svg>
)

Remove.defaultProps = {
  primary: '#EC6B8C',
  secondary: '#FFECF1'
}

export { Remove }
