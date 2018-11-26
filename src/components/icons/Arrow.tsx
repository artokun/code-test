import * as React from 'react'

interface IProps {
  primary?: string
}

const Arrow: React.SFC<IProps> = ({ primary, ...rest }) => (
  <svg viewBox="0 0 22 8" width="1em" height="1em" {...rest}>
    <title>Arrow</title>
    <path
      d="M12.76 4.21H0v-1h12.76V0l8.75 3.563-8.75 3.563V4.209z"
      fill={primary}
      fillRule="nonzero"
    />
  </svg>
)

Arrow.defaultProps = {
  primary: '#41A5F0'
}

export { Arrow }
