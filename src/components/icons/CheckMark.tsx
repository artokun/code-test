import * as React from 'react'

interface IProps {
  primary?: string
  style?: {
    height?: number
    width?: number
  }
}

const CheckMark: React.SFC<IProps> = ({ primary, ...rest }) => (
  <svg viewBox="0 0 13 11" width="1em" height="1em" {...rest}>
    <title>CheckMark</title>
    <path
      d="M1.443 5.836l3.861 3.197 6.04-8.078"
      fillRule="nonzero"
      stroke={primary}
      strokeWidth={2}
      fill="none"
    />
  </svg>
)

CheckMark.defaultProps = {
  primary: '#41A5F0'
}

export { CheckMark }
